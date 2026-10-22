/**
 * ============================================================================
 * AISmartCropEngine — Client-Side Intelligent Photo Cropping & Auto-Framing
 * 
 * Uses Computer Vision heuristics (Face Detection, Saliency Mapping, Skin Tone
 * Distribution in YCbCr space, Sobel Gradient Edge Energy, and Golden Ratio /
 * Rule of Thirds priors) to automatically identify the optimal focal area
 * and prevent heads, faces, pets, or primary subjects from getting cut off.
 * ============================================================================
 */

class AISmartCropEngine {
  constructor() {
    this.cache = new Map(); // Cache results by photo ID or URL
    this.hasNativeFaceDetector = typeof window !== 'undefined' && 'FaceDetector' in window;
    this.offscreenCanvas = null;
    this.offscreenCtx = null;
  }

  /**
   * Lazy-initialize an offscreen canvas for computer vision processing
   */
  getCanvas(width = 160, height = 160) {
    if (!this.offscreenCanvas) {
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });
    }
    this.offscreenCanvas.width = width;
    this.offscreenCanvas.height = height;
    return { canvas: this.offscreenCanvas, ctx: this.offscreenCtx };
  }

  /**
   * Analyze an image to find its optimal focal point (x: 0..1, y: 0..1)
   * @param {HTMLImageElement|string} imageOrUrl 
   * @param {Object} options { mode: 'face'|'subject'|'thirds' }
   * @returns {Promise<{x: number, y: number, type: string, confidence: number, faces: Array}>}
   */
  async analyzePhoto(imageOrUrl, options = { mode: 'face' }) {
    const cacheKey = typeof imageOrUrl === 'string' ? `${imageOrUrl}_${options.mode}` : `${imageOrUrl.src}_${options.mode}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Ensure image is loaded
    let img;
    if (typeof imageOrUrl === 'string') {
      img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageOrUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    } else {
      img = imageOrUrl;
      if (!img.complete || img.naturalWidth === 0) {
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }
    }

    if (!img.complete || img.naturalWidth === 0) {
      // Fallback center
      return { x: 0.5, y: 0.5, type: 'fallback', confidence: 0.5, faces: [] };
    }

    let result = null;

    // 1. Try Native Browser FaceDetector API if available (Ultra-accurate on Chromium)
    if (this.hasNativeFaceDetector && options.mode !== 'subject') {
      try {
        const detector = new window.FaceDetector({ maxDetectedFaces: 6, fastMode: true });
        const faces = await detector.detect(img);

        if (faces && faces.length > 0) {
          result = this.processDetectedFaces(faces, img.naturalWidth, img.naturalHeight);
        }
      } catch (err) {
        // Fallback to Canvas CV if native detection fails or security restrictions apply
      }
    }

    // 2. Computer Vision Saliency & Skin/Edge Analysis (Fast, 100% Cross-Browser)
    if (!result) {
      result = this.analyzeSaliency(img, options);
    }

    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * Process bounding boxes of detected faces to find the combined center of interest
   */
  processDetectedFaces(faces, imgW, imgH) {
    let totalWeight = 0;
    let weightedX = 0;
    let weightedY = 0;

    faces.forEach((face) => {
      const box = face.boundingBox;
      // Face area defines importance
      const area = box.width * box.height;
      const centerX = box.x + box.width / 2;
      // Top-bias: eye-level (~38% of face box) gives more natural photographic framing than mouth/chin
      const centerY = box.y + box.height * 0.38;

      weightedX += centerX * area;
      weightedY += centerY * area;
      totalWeight += area;
    });

    const normX = totalWeight > 0 ? (weightedX / totalWeight) / imgW : 0.5;
    const normY = totalWeight > 0 ? (weightedY / totalWeight) / imgH : 0.4;

    return {
      x: Math.max(0.08, Math.min(0.92, normX)),
      y: Math.max(0.08, Math.min(0.92, normY)),
      type: 'face',
      confidence: 0.96,
      faces: faces.map(f => ({
        x: f.boundingBox.x / imgW,
        y: f.boundingBox.y / imgH,
        w: f.boundingBox.width / imgW,
        h: f.boundingBox.height / imgH
      }))
    };
  }

  /**
   * Deep Computer Vision analysis: computes skin-color likelihood (YCbCr),
   * edge gradient (Sobel), color saturation, and Rule of Thirds photographic bias.
   */
  analyzeSaliency(img, options) {
    const targetW = 140;
    const targetH = Math.round(140 * (img.naturalHeight / img.naturalWidth));
    const { ctx } = this.getCanvas(targetW, targetH);

    try {
      ctx.drawImage(img, 0, 0, targetW, targetH);
      const imgData = ctx.getImageData(0, 0, targetW, targetH);
      const data = imgData.data;

      let totalEnergy = 0;
      let weightedSumX = 0;
      let weightedSumY = 0;

      const isFacePriority = options.mode === 'face';
      const isThirdsMode = options.mode === 'thirds';

      // Scan pixels
      for (let y = 1; y < targetH - 1; y++) {
        for (let x = 1; x < targetW - 1; x++) {
          const idx = (y * targetW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // 1. Skin Tone Detection in YCbCr color space
          // Human skin clusters within narrow chrominance bounds regardless of ethnicity
          const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
          const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

          let skinScore = 0;
          if (cb >= 78 && cb <= 130 && cr >= 132 && cr <= 178) {
            const dCb = cb - 104;
            const dCr = cr - 155;
            skinScore = Math.max(0, 1 - (dCb * dCb + dCr * dCr) / 900);
          }

          // 2. High Frequency / Detail Edge Detection (Sobel-like gradient)
          const leftIdx = (y * targetW + (x - 1)) * 4;
          const rightIdx = (y * targetW + (x + 1)) * 4;
          const upIdx = ((y - 1) * targetW + x) * 4;
          const downIdx = ((y + 1) * targetW + x) * 4;

          const lumL = 0.299 * data[leftIdx] + 0.587 * data[leftIdx + 1] + 0.114 * data[leftIdx + 2];
          const lumR = 0.299 * data[rightIdx] + 0.587 * data[rightIdx + 1] + 0.114 * data[rightIdx + 2];
          const lumU = 0.299 * data[upIdx] + 0.587 * data[upIdx + 1] + 0.114 * data[upIdx + 2];
          const lumD = 0.299 * data[downIdx] + 0.587 * data[downIdx + 1] + 0.114 * data[downIdx + 2];

          const edgeScore = Math.min(255, Math.abs(lumR - lumL) + Math.abs(lumD - lumU)) / 255;

          // 3. Color Saturation & Contrast
          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);
          const satScore = maxC > 0 ? (maxC - minC) / maxC : 0;

          // 4. Photographic Composition Bias (Rule of Thirds & Upper-Center Weight)
          const normX = x / targetW;
          const normY = y / targetH;

          let compPrior = 1.0;
          if (isThirdsMode) {
            // Distance to nearest Rule of Thirds lines (x=0.33, x=0.66, y=0.33, y=0.66)
            const dX = Math.min(Math.abs(normX - 0.333), Math.abs(normX - 0.666));
            const dY = Math.min(Math.abs(normY - 0.333), Math.abs(normY - 0.666));
            compPrior = 1.0 + Math.exp(-(dX * dX + dY * dY) / 0.08);
          } else {
            // Upper-center bias (where heads and primary subjects sit in natural photos)
            const dX = normX - 0.5;
            const dY = normY - 0.38;
            compPrior = 0.5 + Math.exp(-(dX * dX * 2.5 + dY * dY * 4.0));
          }

          // Weighted Energy
          let energy;
          if (isFacePriority) {
            energy = (skinScore * 4.0 + edgeScore * 1.5 + satScore * 0.8) * compPrior;
          } else {
            energy = (skinScore * 1.5 + edgeScore * 3.0 + satScore * 1.8) * compPrior;
          }

          if (energy > 0.05) {
            weightedSumX += normX * energy;
            weightedSumY += normY * energy;
            totalEnergy += energy;
          }
        }
      }

      if (totalEnergy > 0) {
        const centroidX = weightedSumX / totalEnergy;
        const centroidY = weightedSumY / totalEnergy;

        return {
          x: Math.max(0.1, Math.min(0.9, centroidX)),
          y: Math.max(0.1, Math.min(0.9, centroidY)),
          type: 'saliency',
          confidence: 0.86,
          faces: []
        };
      }
    } catch (e) {
      // Cross-origin image read failure or security restriction
    }

    // Default pleasant upper-center portrait framing
    return { x: 0.5, y: 0.38, type: 'rule-of-thirds', confidence: 0.7, faces: [] };
  }

  /**
   * Calculates the exact panX and panY offsets required to frame the focal point
   * in the destination slot without ever leaving empty black/white margins.
   * 
   * @param {Object} focalPoint { x: 0..1, y: 0..1 }
   * @param {number} imgW Natural width of image
   * @param {number} imgH Natural height of image
   * @param {number} slotW Pixel width of slot on canvas
   * @param {number} slotH Pixel height of slot on canvas
   * @param {number} currentZoom Current zoom percentage (e.g. 100..250)
   * @returns {{panX: number, panY: number, focalX: number, focalY: number, optimalZoom: number}}
   */
  calculateOptimalCrop(focalPoint, imgW, imgH, slotW, slotH, currentZoom = 100) {
    if (!focalPoint || imgW <= 0 || imgH <= 0 || slotW <= 0 || slotH <= 0) {
      return { panX: 0, panY: 0, focalX: 0.5, focalY: 0.5, optimalZoom: currentZoom };
    }

    const imgRatio = imgW / imgH;
    const slotRatio = slotW / slotH;
    const zoomMultiplier = (currentZoom || 100) / 100;

    let dispW, dispH;

    // Cover Fit Base Scaling
    if (imgRatio > slotRatio) {
      // Image is wider than slot: height fits, width has horizontal panning room
      dispH = slotH;
      dispW = slotH * imgRatio;
    } else {
      // Image is taller than slot: width fits, height has vertical panning room
      dispW = slotW;
      dispH = slotW / imgRatio;
    }

    // Apply zoom
    dispW *= zoomMultiplier;
    dispH *= zoomMultiplier;

    // Max allowed pan to avoid showing empty edge margins
    const maxPanX = Math.max(0, (dispW - slotW) / 2);
    const maxPanY = Math.max(0, (dispH - slotH) / 2);

    // Desired shift to place focal point at center
    // focalPoint.x is 0..1. When focalPoint.x = 0.5, panX = 0.
    // When focalPoint.x < 0.5 (subject on left), we shift image RIGHT (positive panX).
    let targetPanX = (0.5 - focalPoint.x) * (dispW - slotW);
    let targetPanY = (0.5 - focalPoint.y) * (dispH - slotH);

    // Clamp strictly within bounds
    const clampedPanX = Math.max(-maxPanX, Math.min(maxPanX, targetPanX));
    const clampedPanY = Math.max(-maxPanY, Math.min(maxPanY, targetPanY));

    return {
      panX: Math.round(clampedPanX),
      panY: Math.round(clampedPanY),
      focalX: focalPoint.x,
      focalY: focalPoint.y,
      optimalZoom: currentZoom
    };
  }
}

// Export for browser and node
if (typeof window !== 'undefined') {
  window.AISmartCropEngine = AISmartCropEngine;
}
if (typeof module !== 'undefined') {
  module.exports = { AISmartCropEngine };
}
