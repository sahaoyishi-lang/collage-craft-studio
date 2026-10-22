/* ==========================================================================
   CollageCraft Studio — Interactive Application Engine
   Aesthetic clear-cut photo collages (2 to 10 photos) with dainty bows,
   hearts, customizable gaps, borders, pastel backgrounds, and 300 DPI export.
   ========================================================================== */

(function () {
  'use strict';

  // AI SmartCrop Engine Instance (Chromium FaceDetector + Computer Vision Saliency)
  const smartCropEngine = typeof AISmartCropEngine !== 'undefined' ? new AISmartCropEngine() : null;

  // State Management
  const state = {
    currentTemplate: null,
    userPhotos: [],          // [{ id, name, url }]
    slotAssignments: {},     // { [slotId]: { photo, zoom: 100, rotation: 0, flipX: false, panX: 0, panY: 0, focalPoint, isSmartCropped } }
    selectedSlotId: null,
    
    // AI SmartCrop & Auto-Framing
    smartcropOnAutofill: true,
    showFocalIndicators: true,
    smartcropMode: 'face',   // 'face' | 'subject' | 'thirds'
    
    // Customization Tokens
    photoGap: 12,            // 0px to 36px
    cornerRadius: 12,        // 0px to 48px
    outerMargin: 20,         // 0px to 60px
    borderWidth: 0,          // 0px to 20px
    borderStyle: 'solid',    // 'solid' | 'double' | 'dashed' | 'dotted'
    borderColor: '#ffffff',
    shadowDepth: 1,          // 0: none, 1: soft, 2: medium, 3: floating
    
    // Background
    canvasBg: 'pure-white',
    customBgColor: '#ffffff',
    
    // Aspect Ratio & Sizing
    aspectRatio: '1:1',
    currentView: 'catalog',  // 'catalog' | 'studio'
    
    // Bows & Hearts Decorations
    showPresetBows: true,
    showPresetHearts: true,
    bowStyle: 'coquette-pink',
    heartStyle: 'blush-pink',
    stampedStickers: [],     // [{ id, type, style, x: 50, y: 50, size: 50, rotation: 0 }]
    
    // Filters & Typography
    activeFilter: 'normal',
    showTitles: true,
    headingText: 'Forever In My Heart',
    subtitleText: 'COLLECTED MOMENTS',
    fontFamily: "'Playfair Display', serif",
    textColor: '#0f172a',
    
    // Catalog Filtering
    photoCountFilter: 'all', // 'all' | '2' | '3' | ... | '10'
    activeCategory: 'all',
    aspectRatioFilter: 'all',
    searchQuery: '',
    
    // Export Settings
    exportScale: 2,
    exportFormat: 'png',
    
    // Drag & Drop State
    draggedPhoto: null,
    draggedSourceSlotId: null,

    // Device Photos Full Access Library
    deviceLibrary: {
      connected: false,
      folderName: '',
      dirHandle: null,
      photos: [],
      searchQuery: '',
      sortBy: 'newest'
    }
  };

  // DOM Elements Cache
  const DOM = {
    // Navigation
    navCatalogBtn: document.getElementById('nav-catalog-btn'),
    navStudioBtn: document.getElementById('nav-studio-btn'),
    brandLogoBtn: document.getElementById('brand-logo-btn'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    headerExportBtn: document.getElementById('header-export-btn'),
    quickDemoPhotosBtn: document.getElementById('quick-demo-photos-btn'),
    
    // Views
    catalogView: document.getElementById('catalog-view'),
    studioView: document.getElementById('studio-view'),
    
    // Catalog Filters
    photoCountPillsContainer: document.getElementById('photo-count-pills-container'),
    catalogSearchInput: document.getElementById('catalog-search-input'),
    searchClearBtn: document.getElementById('search-clear-btn'),
    filterAspectRatio: document.getElementById('filter-aspect-ratio'),
    categoryPillsContainer: document.getElementById('category-pills-container'),
    templatesGridContainer: document.getElementById('templates-grid-container'),
    heroTemplatesCount: document.getElementById('hero-templates-count'),

    // Studio Header & Controls
    backToCatalogBtn: document.getElementById('back-to-catalog-btn'),
    studioTemplateTitle: document.getElementById('studio-template-title'),
    studioTemplateSpecs: document.getElementById('studio-template-specs'),
    trackerText: document.getElementById('tracker-text'),
    studioSlotsTracker: document.getElementById('studio-slots-tracker'),
    studioAspectSwitcher: document.getElementById('studio-aspect-switcher'),
    magicAutofillBtn: document.getElementById('magic-autofill-btn'),
    aiSmartcropAllBtn: document.getElementById('ai-smartcrop-all-btn'),
    shuffleSlotsBtn: document.getElementById('shuffle-slots-btn'),
    clearSlotsBtn: document.getElementById('clear-slots-btn'),
    studioExportBtn: document.getElementById('studio-export-btn'),

    // Left Tray & Device Photos
    uploadDropzone: document.getElementById('upload-dropzone'),
    fileInput: document.getElementById('file-input'),
    trayLoadDemoBtn: document.getElementById('tray-load-demo-btn'),
    photosTrayGrid: document.getElementById('photos-tray-grid'),
    trayEmptyState: document.getElementById('tray-empty-state'),
    uploadedCountBadge: document.getElementById('uploaded-count-badge'),

    // Device Photos Full Access
    headerDevicePhotosBtn: document.getElementById('header-device-photos-btn'),
    btnOpenDevicePhotosModal: document.getElementById('btn-open-device-photos-modal'),
    dropzoneDeviceFolderLink: document.getElementById('dropzone-device-folder-link'),
    deviceConnectBanner: document.getElementById('device-connect-banner'),
    deviceStatusBar: document.getElementById('device-status-bar'),
    deviceFolderName: document.getElementById('device-folder-name'),
    btnDeviceDisconnect: document.getElementById('btn-device-disconnect'),
    btnDeviceRescan: document.getElementById('btn-device-rescan'),
    btnDeviceChangeFolder: document.getElementById('btn-device-change-folder'),
    btnDeviceAutofill: document.getElementById('btn-device-autofill'),
    devicePhotosSearch: document.getElementById('device-photos-search'),
    devicePhotosSort: document.getElementById('device-photos-sort'),
    deviceFolderInput: document.getElementById('device-folder-input'),
    deviceBulkInput: document.getElementById('device-bulk-input'),
    devicePhotosModal: document.getElementById('device-photos-modal'),
    closeDeviceModalBtn: document.getElementById('close-device-modal-btn'),
    btnCancelDeviceModal: document.getElementById('btn-cancel-device-modal'),
    btnGrantFolderAccess: document.getElementById('btn-grant-folder-access'),
    btnGrantBulkAccess: document.getElementById('btn-grant-bulk-access'),

    // Center Stage & Artboard
    studioCenterStage: document.getElementById('studio-center-stage'),
    artboardContainer: document.getElementById('artboard-container'),
    artboardInner: document.getElementById('artboard-inner'),
    artboardTextHeader: document.getElementById('artboard-text-header'),
    canvasMainTitle: document.getElementById('canvas-main-title'),
    canvasSubtitle: document.getElementById('canvas-subtitle'),
    canvasSlotsContainer: document.getElementById('canvas-slots-container'),
    canvasDecorationsContainer: document.getElementById('canvas-decorations-container'),
    canvasStickersContainer: document.getElementById('canvas-stickers-container'),

    // Right Customizer Accordions
    sliderPhotoGap: document.getElementById('slider-photo-gap'),
    valPhotoGap: document.getElementById('val-photo-gap'),
    sliderCornerRadius: document.getElementById('slider-corner-radius'),
    valCornerRadius: document.getElementById('val-corner-radius'),
    sliderOuterMargin: document.getElementById('slider-outer-margin'),
    valOuterMargin: document.getElementById('val-outer-margin'),
    sliderBorderWidth: document.getElementById('slider-border-width'),
    valBorderWidth: document.getElementById('val-border-width'),
    selectBorderStyle: document.getElementById('select-border-style'),
    pickerBorderColor: document.getElementById('picker-border-color'),
    borderColorSwatches: document.getElementById('border-color-swatches'),
    sliderShadowDepth: document.getElementById('slider-shadow-depth'),
    valShadowDepth: document.getElementById('val-shadow-depth'),

    // AI SmartCrop & Framing Customizer
    toggleSmartcropAutofill: document.getElementById('toggle-smartcrop-autofill'),
    toggleSmartcropIndicators: document.getElementById('toggle-smartcrop-indicators'),
    selectSmartcropMode: document.getElementById('select-smartcrop-mode'),
    btnRunSmartcropNow: document.getElementById('btn-run-smartcrop-now'),
    btnResetCenterCrop: document.getElementById('btn-reset-center-crop'),

    // Bows & Hearts
    togglePresetBows: document.getElementById('toggle-preset-bows'),
    togglePresetHearts: document.getElementById('toggle-preset-hearts'),
    selectBowStyle: document.getElementById('select-bow-style'),
    selectHeartStyle: document.getElementById('select-heart-style'),
    stickersStampPalette: document.getElementById('stickers-stamp-palette'),
    clearStickersBtn: document.getElementById('clear-stickers-btn'),

    // Background & Filters
    texturesPickerGrid: document.getElementById('textures-picker-grid'),
    pickerCustomBg: document.getElementById('picker-custom-bg'),
    filtersChipsContainer: document.getElementById('filters-chips-container'),

    // Typography
    toggleShowTitles: document.getElementById('toggle-show-titles'),
    inputHeadingText: document.getElementById('input-heading-text'),
    inputSubtitleText: document.getElementById('input-subtitle-text'),
    selectFontFamily: document.getElementById('select-font-family'),
    pickerTextColor: document.getElementById('picker-text-color'),

    // Modals
    exportModal: document.getElementById('export-modal'),
    closeExportModalBtn: document.getElementById('close-export-modal-btn'),
    btnDownloadImage: document.getElementById('btn-download-image'),
    btnCopyClipboard: document.getElementById('btn-copy-clipboard'),
    btnPrintCollage: document.getElementById('btn-print-collage'),

    slotEditModal: document.getElementById('slot-edit-modal'),
    closeSlotModalBtn: document.getElementById('close-slot-modal-btn'),
    slotModalPreviewImg: document.getElementById('slot-modal-preview-img'),
    modalSliderZoom: document.getElementById('modal-slider-zoom'),
    modalZoomVal: document.getElementById('modal-zoom-val'),
    modalSliderPanX: document.getElementById('modal-slider-pan-x'),
    modalPanXVal: document.getElementById('modal-pan-x-val'),
    modalSliderPanY: document.getElementById('modal-slider-pan-y'),
    modalPanYVal: document.getElementById('modal-pan-y-val'),
    modalRotateLeftBtn: document.getElementById('modal-rotate-left-btn'),
    modalRotateRightBtn: document.getElementById('modal-rotate-right-btn'),
    modalFlipBtn: document.getElementById('modal-flip-btn'),
    modalSmartcropSlotBtn: document.getElementById('modal-smartcrop-slot-btn'),
    modalReplacePhotoBtn: document.getElementById('modal-replace-photo-btn'),
    modalRemovePhotoBtn: document.getElementById('modal-remove-photo-btn'),
    modalSaveSlotBtn: document.getElementById('modal-save-slot-btn'),

    toastContainer: document.getElementById('toast-container')
  };

  /* ==========================================================================
     INIT & BOOTSTRAP
     ========================================================================== */
  function init() {
    // Default active template: Classic Quad
    state.currentTemplate = COLLAGE_TEMPLATES[6] || COLLAGE_TEMPLATES[0];
    state.aspectRatio = state.currentTemplate.aspectRatio || '1:1';

    // Populate catalog
    renderCatalog();

    // Populate customizer controls
    renderTextureSwatches();
    renderFilterChips();

    // Setup Event Listeners
    setupEventListeners();

    // Update hero metric count
    if (DOM.heroTemplatesCount) {
      DOM.heroTemplatesCount.textContent = COLLAGE_TEMPLATES.length + "+";
    }

    // Auto-load starter sample photos for instant interactive experience
    loadSamplePhotos(false);
  }

  /* ==========================================================================
     VIEW SWITCHING & NAVIGATION
     ========================================================================== */
  function switchView(viewName) {
    state.currentView = viewName;
    if (viewName === 'catalog') {
      DOM.catalogView.style.display = 'block';
      DOM.studioView.style.display = 'none';
      DOM.navCatalogBtn.classList.add('active');
      DOM.navStudioBtn.classList.remove('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      DOM.catalogView.style.display = 'none';
      DOM.studioView.style.display = 'flex';
      DOM.navCatalogBtn.classList.remove('active');
      DOM.navStudioBtn.classList.add('active');
      setupArtboardDimensions();
      renderArtboard();
    }
  }

  function openTemplateInStudio(templateId) {
    const template = COLLAGE_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    state.currentTemplate = template;
    state.canvasBg = template.bgStyle || 'pure-white';
    state.aspectRatio = template.aspectRatio || '1:1';
    state.slotAssignments = {}; // reset slot mapping for new template

    // Set titles
    if (template.defaultText) {
      state.headingText = template.defaultText.title;
      state.subtitleText = template.defaultText.subtitle;
      DOM.canvasMainTitle.textContent = template.defaultText.title;
      DOM.canvasSubtitle.textContent = template.defaultText.subtitle;
      DOM.inputHeadingText.value = template.defaultText.title;
      DOM.inputSubtitleText.value = template.defaultText.subtitle;
      if (template.defaultText.fontFamily) {
        state.fontFamily = template.defaultText.fontFamily;
        DOM.selectFontFamily.value = template.defaultText.fontFamily;
        DOM.canvasMainTitle.style.fontFamily = template.defaultText.fontFamily;
      }
    }

    updateStudioSpecs();
    switchView('studio');

    // Auto-fill slots if photos are already uploaded
    if (state.userPhotos.length > 0) {
      autoFillSlots(true);
    } else {
      showToast(`Selected "${template.title}". Click "Auto-Fill" or upload photos!`, "info");
    }
  }

  function updateStudioSpecs() {
    if (!state.currentTemplate) return;
    const tpl = state.currentTemplate;
    DOM.studioTemplateTitle.textContent = tpl.title;
    DOM.studioTemplateSpecs.textContent = `${tpl.photoCount} Photo Slots • ${state.aspectRatio} Ratio`;

    // Update active aspect ratio pill
    if (DOM.studioAspectSwitcher) {
      DOM.studioAspectSwitcher.querySelectorAll('.aspect-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.ratio === state.aspectRatio);
      });
    }
  }

  /* ==========================================================================
     CATALOG RENDERING & FILTERING
     ========================================================================== */
  function renderCatalog() {
    DOM.templatesGridContainer.innerHTML = '';

    const filtered = COLLAGE_TEMPLATES.filter(tpl => {
      // Photo count filter (Exact count: 2, 3, 4, 5, 6, 7, 8, 9, 10)
      if (state.photoCountFilter !== 'all') {
        const targetCount = parseInt(state.photoCountFilter, 10);
        if (tpl.photoCount !== targetCount) return false;
      }
      // Category filter
      if (state.activeCategory !== 'all' && tpl.category !== state.activeCategory) {
        return false;
      }
      // Aspect ratio filter
      if (state.aspectRatioFilter !== 'all' && tpl.aspectRatio !== state.aspectRatioFilter) {
        return false;
      }
      // Search Query
      if (state.searchQuery.trim() !== '') {
        const q = state.searchQuery.toLowerCase();
        const matchTitle = tpl.title.toLowerCase().includes(q);
        const matchDesc = tpl.description.toLowerCase().includes(q);
        const matchTags = tpl.tags.some(tag => tag.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTags) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      DOM.templatesGridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);">No collage templates found</div>
          <p style="font-size: 0.9rem; margin-top: 0.25rem;">Try choosing another photo count or reset the filters.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(tpl => {
      const card = document.createElement('article');
      card.className = 'template-card';
      card.setAttribute('data-template-id', tpl.id);

      const badgeClass = tpl.badge ? tpl.badge.toLowerCase().replace(/\s+/g, '-') : '';

      // Generate Clear-Cut Blueprint Vector Preview
      const blueprintHtml = renderCardBlueprintPreview(tpl);

      card.innerHTML = `
        <div class="card-media-wrapper">
          ${blueprintHtml}
          ${tpl.badge ? `<div class="card-badge ${badgeClass}">${tpl.badge}</div>` : ''}
          <div class="card-photo-count-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            ${tpl.photoCount} Photos
          </div>
          <div class="card-overlay-actions">
            <button class="btn btn-primary btn-use-template" data-id="${tpl.id}">
              ✨ Use This Layout
            </button>
          </div>
        </div>
        <div class="card-content">
          <span class="card-category">${tpl.categoryLabel}</span>
          <h3 class="card-title">${tpl.title}</h3>
          <p class="card-desc">${tpl.description}</p>
          <div class="card-tags">
            ${tpl.tags.map(t => `<span class="card-tag">#${t}</span>`).join('')}
          </div>
          <div class="card-footer">
            <span class="aspect-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
              ${tpl.aspectRatio}
            </span>
            <button class="btn btn-primary btn-use-template" data-id="${tpl.id}" style="padding: 0.4rem 0.95rem; font-size: 0.82rem;">
              Customize Layout ➔
            </button>
          </div>
        </div>
      `;

      DOM.templatesGridContainer.appendChild(card);
    });

    // Card Event Listeners
    DOM.templatesGridContainer.querySelectorAll('.btn-use-template').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openTemplateInStudio(btn.dataset.id);
      });
    });

    DOM.templatesGridContainer.querySelectorAll('.template-card').forEach(card => {
      card.addEventListener('click', () => {
        openTemplateInStudio(card.dataset.templateId);
      });
    });
  }

  // Generates clean proportional vector slot representation for catalog preview
  function renderCardBlueprintPreview(tpl) {
    let slotsHtml = '';
    tpl.slots.forEach(slot => {
      slotsHtml += `
        <div class="blueprint-slot shape-${slot.shape || 'rect'}" style="left:${slot.x}%; top:${slot.y}%; width:${slot.w}%; height:${slot.h}%; transform: translate(-50%, -50%) rotate(${slot.rotation || 0}deg);">
          <span class="blueprint-slot-num">${slot.id}</span>
        </div>
      `;
    });

    let decosHtml = '';
    if (tpl.decorations) {
      tpl.decorations.forEach(deco => {
        const svg = getDecorationSvgString(deco.type, deco.style || 'coquette-pink', Math.min(22, deco.size * 0.45));
        decosHtml += `
          <div class="blueprint-deco" style="left:${deco.x}%; top:${deco.y}%;">
            ${svg}
          </div>
        `;
      });
    }

    return `
      <div class="card-blueprint-preview bg-${tpl.bgStyle || 'pure-white'}">
        ${slotsHtml}
        ${decosHtml}
      </div>
    `;
  }

  /* ==========================================================================
     PHOTO TRAY & UPLOAD ENGINE
     ========================================================================== */
  function handleFiles(files) {
    if (!files || files.length === 0) return;

    let loadedCount = 0;
    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith('image/') && !/\.(jpe?g|png|webp|avif|heic|gif|bmp)$/i.test(file.name)) return;

      const newPhoto = {
        id: `photo-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`,
        name: file.name,
        file: file,
        url: URL.createObjectURL(file),
        lastModified: file.lastModified || Date.now(),
        size: file.size,
        isDevice: false
      };
      state.userPhotos.unshift(newPhoto);
      loadedCount++;
    });

    if (loadedCount > 0) {
      renderPhotoTray();
      showToast(`Added ${loadedCount} photo${loadedCount > 1 ? 's' : ''} to your tray!`, 'success');
      if (state.currentView === 'studio') {
        autoFillSlots(true);
      }
    }
  }

  function renderPhotoTray() {
    DOM.photosTrayGrid.innerHTML = '';
    
    // Filter and Sort Tray Photos
    let displayPhotos = [...state.userPhotos];

    if (state.deviceLibrary && state.deviceLibrary.searchQuery) {
      const q = state.deviceLibrary.searchQuery.toLowerCase();
      displayPhotos = displayPhotos.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.folder && p.folder.toLowerCase().includes(q))
      );
    }

    if (state.deviceLibrary && state.deviceLibrary.sortBy) {
      if (state.deviceLibrary.sortBy === 'newest') {
        displayPhotos.sort((a, b) => (b.lastModified || 0) - (a.lastModified || 0));
      } else if (state.deviceLibrary.sortBy === 'oldest') {
        displayPhotos.sort((a, b) => (a.lastModified || 0) - (b.lastModified || 0));
      } else if (state.deviceLibrary.sortBy === 'name') {
        displayPhotos.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    DOM.uploadedCountBadge.textContent = `${state.userPhotos.length} Photos`;

    if (displayPhotos.length === 0) {
      DOM.trayEmptyState.style.display = 'block';
      if (state.userPhotos.length > 0 && state.deviceLibrary.searchQuery) {
        DOM.trayEmptyState.innerHTML = `No photos match "<strong>${state.deviceLibrary.searchQuery}</strong>".<br>Try clearing your search.`;
      } else {
        DOM.trayEmptyState.innerHTML = 'No photos uploaded yet.<br>Click "Access Device Photos" or upload photos above!';
      }
      return;
    }
    DOM.trayEmptyState.style.display = 'none';

    displayPhotos.forEach(photo => {
      const item = document.createElement('div');
      item.className = 'tray-photo-item';
      item.draggable = true;
      item.setAttribute('data-photo-id', photo.id);

      item.innerHTML = `
        <img src="${photo.url}" alt="${photo.name}" class="tray-photo-img" loading="lazy">
        ${photo.isDevice ? '<span class="tray-device-badge" title="Device photo library" style="position: absolute; bottom: 4px; left: 4px; font-size: 0.75rem; background: rgba(0,0,0,0.65); padding: 2px 4px; border-radius: 4px; line-height: 1;">📁</span>' : ''}
        <button class="tray-photo-delete-btn" title="Remove Photo">✕</button>
      `;

      // Drag events
      item.addEventListener('dragstart', (e) => {
        state.draggedPhoto = photo;
        state.draggedSourceSlotId = null;
        item.classList.add('is-dragging');
        e.dataTransfer.setData('text/plain', photo.id);
        e.dataTransfer.effectAllowed = 'copyMove';
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('is-dragging');
        state.draggedPhoto = null;
      });

      // Delete event
      item.querySelector('.tray-photo-delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        removePhotoFromTray(photo.id);
      });

      DOM.photosTrayGrid.appendChild(item);
    });
  }

  function removePhotoFromTray(photoId) {
    const photoToRemove = state.userPhotos.find(p => p.id === photoId);
    if (photoToRemove && photoToRemove.url && photoToRemove.url.startsWith('blob:')) {
      try { URL.revokeObjectURL(photoToRemove.url); } catch (e) {}
    }

    state.userPhotos = state.userPhotos.filter(p => p.id !== photoId);
    if (state.deviceLibrary && state.deviceLibrary.photos) {
      state.deviceLibrary.photos = state.deviceLibrary.photos.filter(p => p.id !== photoId);
    }

    Object.keys(state.slotAssignments).forEach(slotId => {
      if (state.slotAssignments[slotId]?.photo?.id === photoId) {
        delete state.slotAssignments[slotId];
      }
    });
    renderPhotoTray();
    renderArtboard();
    updateSlotsTracker();
  }

  function loadSamplePhotos(notify = true) {
    SAMPLE_PHOTOS.forEach(sp => {
      // Check if already in tray
      if (!state.userPhotos.some(p => p.id === sp.id)) {
        state.userPhotos.push({
          id: sp.id,
          name: sp.name,
          url: sp.url,
          lastModified: Date.now() - Math.floor(Math.random() * 1000000000),
          isDevice: false
        });
      }
    });
    renderPhotoTray();
    if (notify) {
      showToast(`Loaded ${SAMPLE_PHOTOS.length} curated sample photos!`, 'success');
      if (state.currentView === 'studio') {
        autoFillSlots(true);
      }
    }
  }

  /* ==========================================================================
     DEVICE PHOTOS FULL ACCESS ENGINE (File System Access API & Mobile Fallbacks)
     ========================================================================== */
  function openDevicePhotosModal() {
    if (DOM.devicePhotosModal) {
      DOM.devicePhotosModal.style.display = 'flex';
    }
  }

  function closeDevicePhotosModal() {
    if (DOM.devicePhotosModal) {
      DOM.devicePhotosModal.style.display = 'none';
    }
  }

  // 1. Request access to entire device photo folder (e.g. Pictures / DCIM / Albums)
  async function requestDeviceFolderAccess() {
    closeDevicePhotosModal();

    if ('showDirectoryPicker' in window) {
      try {
        showToast('Select your Pictures, DCIM, or photo album folder...', 'info');
        const dirHandle = await window.showDirectoryPicker({
          id: 'collage-photos-library',
          mode: 'read',
          startIn: 'pictures'
        });

        const folderName = dirHandle.name || 'Device Photos';
        showToast(`Scanning "${folderName}" for photos...`, 'info');

        const scannedFiles = await scanDirectoryEntries(dirHandle);
        if (scannedFiles.length === 0) {
          showToast(`No image files found inside "${folderName}". Try another folder!`, 'info');
          return;
        }

        processLoadedDevicePhotos(scannedFiles, folderName, dirHandle);
      } catch (err) {
        if (err.name === 'AbortError') {
          return; // User canceled dialog
        }
        console.warn('showDirectoryPicker error or blocked, falling back to input:', err);
        if (DOM.deviceFolderInput) {
          DOM.deviceFolderInput.click();
        }
      }
    } else {
      // Fallback for Safari / Firefox
      if (DOM.deviceFolderInput) {
        DOM.deviceFolderInput.click();
      }
    }
  }

  // Recursive directory scanner (supports nested albums up to 3 levels deep)
  async function scanDirectoryEntries(handle, path = '', depth = 2) {
    const results = [];
    const imageRegex = /\.(jpe?g|png|webp|avif|heic|gif|bmp|tiff)$/i;

    try {
      for await (const entry of handle.values()) {
        if (entry.kind === 'file') {
          if (imageRegex.test(entry.name)) {
            try {
              const file = await entry.getFile();
              results.push({
                file: file,
                name: entry.name,
                path: path || 'Root'
              });
            } catch (readErr) {
              console.warn('Skipping unreadable file:', entry.name, readErr);
            }
          }
        } else if (entry.kind === 'directory' && depth > 0) {
          const skipFolders = ['.', '$', 'node_modules', 'AppData', 'Windows', 'Program Files'];
          if (!skipFolders.some(s => entry.name.startsWith(s))) {
            const nested = await scanDirectoryEntries(entry, path ? `${path}/${entry.name}` : entry.name, depth - 1);
            results.push(...nested);
          }
        }
      }
    } catch (scanErr) {
      console.warn('Error scanning directory handle:', scanErr);
    }

    return results;
  }

  // 2. Request bulk photo access from device camera roll / library (Mobile & Quick Select)
  function requestDeviceBulkAccess() {
    closeDevicePhotosModal();
    if (DOM.deviceBulkInput) {
      DOM.deviceBulkInput.click();
    }
  }

  // 3. Process and index all device photos loaded
  function processLoadedDevicePhotos(items, folderName = 'Device Library', dirHandle = null) {
    if (!items || items.length === 0) return;

    // Revoke previous device object URLs if re-connecting
    if (state.deviceLibrary.photos && state.deviceLibrary.photos.length > 0) {
      state.deviceLibrary.photos.forEach(p => {
        if (p.url && p.url.startsWith('blob:')) {
          try { URL.revokeObjectURL(p.url); } catch (e) {}
        }
      });
    }

    const devicePhotos = items.map((item, idx) => {
      const file = item.file || item;
      const url = URL.createObjectURL(file);
      return {
        id: `dev-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 5)}`,
        name: item.name || file.name,
        file: file,
        url: url,
        lastModified: file.lastModified || Date.now(),
        size: file.size || 0,
        folder: item.path || 'Device Library',
        isDevice: true
      };
    });

    state.deviceLibrary.connected = true;
    state.deviceLibrary.folderName = folderName;
    state.deviceLibrary.dirHandle = dirHandle;
    state.deviceLibrary.photos = devicePhotos;

    // Filter out previous device photos and prepend new device photos
    state.userPhotos = state.userPhotos.filter(p => !p.isDevice);
    state.userPhotos.unshift(...devicePhotos);

    // Update UI elements
    if (DOM.deviceStatusBar) {
      DOM.deviceStatusBar.style.display = 'flex';
    }
    if (DOM.deviceFolderName) {
      DOM.deviceFolderName.textContent = `${folderName} (${devicePhotos.length} photos)`;
    }
    if (DOM.deviceConnectBanner) {
      DOM.deviceConnectBanner.style.display = 'none';
    }

    renderPhotoTray();

    showToast(`Access granted to "${folderName}"! ${devicePhotos.length} photos ready 🎉`, 'success');

    // Auto-fill template if in studio view and slots are empty
    if (state.currentView === 'studio' && Object.keys(state.slotAssignments).length === 0) {
      autoFillSlots(true);
    }
  }

  // 4. Rescan folder for new photos
  async function rescanDeviceFolder() {
    if (state.deviceLibrary.dirHandle) {
      showToast(`Rescanning "${state.deviceLibrary.folderName}" for newly added photos...`, 'info');
      try {
        const scannedFiles = await scanDirectoryEntries(state.deviceLibrary.dirHandle);
        if (scannedFiles.length > 0) {
          processLoadedDevicePhotos(scannedFiles, state.deviceLibrary.folderName, state.deviceLibrary.dirHandle);
          showToast(`Rescan complete! ${scannedFiles.length} photos found 🔄`, 'success');
        } else {
          showToast(`No photos found during rescan.`, 'info');
        }
      } catch (err) {
        showToast('Could not rescan folder. Please re-select the folder.', 'info');
        requestDeviceFolderAccess();
      }
    } else {
      requestDeviceFolderAccess();
    }
  }

  // 5. Disconnect device photo library
  function disconnectDevicePhotos() {
    if (state.deviceLibrary.photos) {
      state.deviceLibrary.photos.forEach(p => {
        if (p.url && p.url.startsWith('blob:')) {
          try { URL.revokeObjectURL(p.url); } catch (e) {}
        }
      });
    }

    // Remove device photos from tray
    state.userPhotos = state.userPhotos.filter(p => !p.isDevice);

    // Clear slot assignments that used disconnected photos
    Object.keys(state.slotAssignments).forEach(slotId => {
      if (state.slotAssignments[slotId]?.photo?.isDevice) {
        delete state.slotAssignments[slotId];
      }
    });

    state.deviceLibrary = {
      connected: false,
      folderName: '',
      dirHandle: null,
      photos: [],
      searchQuery: '',
      sortBy: 'newest'
    };

    if (DOM.deviceStatusBar) {
      DOM.deviceStatusBar.style.display = 'none';
    }
    if (DOM.deviceConnectBanner) {
      DOM.deviceConnectBanner.style.display = 'block';
    }
    if (DOM.devicePhotosSearch) {
      DOM.devicePhotosSearch.value = '';
    }

    renderPhotoTray();
    renderArtboard();
    updateSlotsTracker();

    showToast('Disconnected device photos library.', 'info');
  }

  // 6. Auto-fill specifically from connected device photos
  function autoFillFromDevicePhotos() {
    if (!state.currentTemplate) return;

    const devicePool = state.userPhotos.filter(p => p.isDevice);
    if (devicePool.length === 0) {
      showToast('No device photos connected yet. Connect your folder first!', 'info');
      openDevicePhotosModal();
      return;
    }

    const slots = state.currentTemplate.slots;
    const shuffled = [...devicePool].sort(() => 0.5 - Math.random());

    slots.forEach((slot, index) => {
      const assignedPhoto = shuffled[index % shuffled.length];
      state.slotAssignments[slot.id] = {
        photo: assignedPhoto,
        zoom: 100,
        rotation: 0,
        flipX: false,
        panX: 0,
        panY: 0
      };
    });

    renderArtboard(true);
    updateSlotsTracker();

    if (state.smartcropOnAutofill && smartCropEngine) {
      smartCropAllSlots(false);
    }

    showToast(`Collage auto-filled with ${slots.length} photos from your device library! ✨`, 'success');
  }

  /* ==========================================================================
     CORE FEATURE: 1-CLICK MAGIC AUTO-FILL & SHUFFLE
     ========================================================================== */
  function autoFillSlots(animate = true) {
    if (!state.currentTemplate) return;
    if (state.userPhotos.length === 0) {
      showToast('Please upload photos first or click "⚡ Demo Photos"', 'info');
      return;
    }

    const slots = state.currentTemplate.slots;
    const photos = state.userPhotos;

    slots.forEach((slot, index) => {
      const assignedPhoto = photos[index % photos.length];
      state.slotAssignments[slot.id] = {
        photo: assignedPhoto,
        zoom: 100,
        rotation: 0,
        flipX: false,
        panX: 0,
        panY: 0
      };
    });

    renderArtboard(animate);
    updateSlotsTracker();
    showToast(`⚡ Auto-Filled all ${slots.length} slots with your photos!`, 'success');

    if (state.smartcropOnAutofill && smartCropEngine) {
      smartCropAllSlots(false);
    }
  }

  function shuffleSlots() {
    if (!state.currentTemplate) return;
    const assignedKeys = Object.keys(state.slotAssignments);
    if (assignedKeys.length === 0) {
      autoFillSlots(true);
      return;
    }

    const photosList = assignedKeys.map(k => state.slotAssignments[k].photo).sort(() => Math.random() - 0.5);

    assignedKeys.forEach((slotId, idx) => {
      state.slotAssignments[slotId].photo = photosList[idx];
    });

    renderArtboard(true);
    showToast('Shuffled photos across all slots! 🔀', 'info');

    if (state.smartcropOnAutofill && smartCropEngine) {
      smartCropAllSlots(false);
    }
  }

  function clearAllSlots() {
    state.slotAssignments = {};
    renderArtboard();
    updateSlotsTracker();
    showToast('Cleared all slots.', 'info');
  }

  /* ==========================================================================
     AI SMARTCROP & COMPOSITIONAL FRAMING ENGINE
     ========================================================================== */
  async function smartCropSlot(slotId, notify = false) {
    if (!state.currentTemplate) return;
    const assigned = state.slotAssignments[slotId];
    if (!assigned || !assigned.photo) {
      if (notify) showToast('Please assign a photo to this slot first!', 'info');
      return;
    }
    if (!smartCropEngine) {
      if (notify) showToast('AI SmartCrop Engine is initializing...', 'info');
      return;
    }

    const slotDef = state.currentTemplate.slots.find(s => s.id === slotId) || { w: 50, h: 50 };
    const domArtboard = DOM.artboardInner;
    const domArtboardW = domArtboard ? domArtboard.clientWidth : 600;
    const domArtboardH = domArtboard ? domArtboard.clientHeight : 600;

    const slotEl = document.querySelector(`.collage-slot[data-slot-id="${slotId}"]`);
    const slotW = slotEl ? slotEl.clientWidth : (slotDef.w / 100) * domArtboardW;
    const slotH = slotEl ? slotEl.clientHeight : (slotDef.h / 100) * domArtboardH;

    try {
      const focal = await smartCropEngine.analyzePhoto(assigned.photo.url, {
        mode: state.smartcropMode || 'face'
      });

      const imgObj = new Image();
      imgObj.src = assigned.photo.url;
      if (!imgObj.complete) {
        await new Promise(res => { imgObj.onload = res; imgObj.onerror = res; });
      }
      const imgW = imgObj.naturalWidth || 600;
      const imgH = imgObj.naturalHeight || 600;

      const crop = smartCropEngine.calculateOptimalCrop(
        focal,
        imgW,
        imgH,
        slotW,
        slotH,
        assigned.zoom || 100
      );

      assigned.panX = crop.panX;
      assigned.panY = crop.panY;
      assigned.focalPoint = { x: crop.focalX, y: crop.focalY, type: focal.type };
      assigned.isSmartCropped = true;

      if (state.selectedSlotId === slotId && DOM.slotEditModal && DOM.slotEditModal.style.display !== 'none') {
        DOM.modalSliderPanX.value = crop.panX;
        DOM.modalPanXVal.textContent = `${crop.panX}px`;
        DOM.modalSliderPanY.value = crop.panY;
        DOM.modalPanYVal.textContent = `${crop.panY}px`;
      }

      renderArtboard();

      if (notify) {
        const typeLabel = focal.type === 'face' ? '👤 Face Centered' : (focal.type === 'saliency' ? '🌟 Subject Framed' : '📐 Balanced Framing');
        showToast(`🧠 Slot ${slotId} AI-Framed (${typeLabel})!`, 'success');
      }
    } catch (err) {
      console.warn('SmartCrop failed for slot', slotId, err);
    }
  }

  async function smartCropAllSlots(notify = true) {
    if (!state.currentTemplate) return;
    const slotIds = Object.keys(state.slotAssignments).filter(id => state.slotAssignments[id]?.photo);
    if (slotIds.length === 0) {
      if (notify) showToast('Assign or auto-fill photos before running AI SmartCrop! 💡', 'info');
      return;
    }

    if (DOM.aiSmartcropAllBtn) {
      DOM.aiSmartcropAllBtn.classList.add('loading-pulse');
    }

    try {
      await Promise.all(slotIds.map(id => smartCropSlot(id, false)));
      renderArtboard();
      if (notify) {
        showToast(`🧠 AI SmartCrop auto-framed all ${slotIds.length} photo slots!`, 'success');
      }
    } finally {
      if (DOM.aiSmartcropAllBtn) {
        DOM.aiSmartcropAllBtn.classList.remove('loading-pulse');
      }
    }
  }

  function resetAllCenterCrops() {
    const slotIds = Object.keys(state.slotAssignments);
    slotIds.forEach(id => {
      if (state.slotAssignments[id]) {
        state.slotAssignments[id].panX = 0;
        state.slotAssignments[id].panY = 0;
        state.slotAssignments[id].isSmartCropped = false;
      }
    });
    renderArtboard();
    showToast('Reset photo framing to center.', 'info');
  }

  function updateSlotsTracker() {
    if (!state.currentTemplate) return;
    const total = state.currentTemplate.slots.length;
    const filled = Object.keys(state.slotAssignments).length;
    DOM.trackerText.textContent = `${filled} of ${total} Slots Filled`;
    if (filled === total) {
      DOM.studioSlotsTracker.style.color = '#10b981';
      DOM.studioSlotsTracker.style.background = 'rgba(16, 185, 129, 0.15)';
    } else {
      DOM.studioSlotsTracker.style.color = '#f59e0b';
      DOM.studioSlotsTracker.style.background = 'rgba(245, 158, 11, 0.15)';
    }
  }

  /* ==========================================================================
     CANVAS ARTBOARD & SLOT RENDERING
     ========================================================================== */
  function setupArtboardDimensions() {
    if (!state.currentTemplate) return;
    const stageWidth = DOM.studioCenterStage.clientWidth - 80;
    const stageHeight = DOM.studioCenterStage.clientHeight - 80;

    let targetWidth = 850;
    let targetHeight = 850;

    if (state.aspectRatio === '1:1') {
      const size = Math.min(stageWidth, stageHeight, 800);
      targetWidth = size;
      targetHeight = size;
    } else if (state.aspectRatio === '4:5') {
      targetHeight = Math.min(stageHeight, 820);
      targetWidth = targetHeight * (4 / 5);
    } else if (state.aspectRatio === '9:16') {
      targetHeight = Math.min(stageHeight, 840);
      targetWidth = targetHeight * (9 / 16);
    } else if (state.aspectRatio === '3:4') {
      targetHeight = Math.min(stageHeight, 820);
      targetWidth = targetHeight * (3 / 4);
    } else if (state.aspectRatio === '16:9') {
      targetWidth = Math.min(stageWidth, 880);
      targetHeight = targetWidth * (9 / 16);
    }

    DOM.artboardContainer.style.width = `${Math.round(targetWidth)}px`;
    DOM.artboardContainer.style.height = `${Math.round(targetHeight)}px`;

    // Apply canvas background
    DOM.artboardContainer.className = `artboard-container bg-${state.canvasBg}`;
    if (state.canvasBg === 'custom') {
      DOM.artboardContainer.style.backgroundColor = state.customBgColor;
    } else {
      DOM.artboardContainer.style.backgroundColor = '';
    }
  }

  function renderArtboard(animate = false) {
    if (!state.currentTemplate) return;
    DOM.canvasSlotsContainer.innerHTML = '';
    DOM.canvasDecorationsContainer.innerHTML = '';

    const tpl = state.currentTemplate;

    // Apply Outer Mat Board Margin / Padding to Artboard Inner
    DOM.artboardInner.style.padding = `${state.outerMargin}px`;
    DOM.artboardInner.style.boxSizing = 'border-box';

    // Global Photo Color Filter
    const activeFilterObj = PHOTO_FILTERS.find(f => f.id === state.activeFilter);
    const filterCss = activeFilterObj ? activeFilterObj.css : 'none';

    // Title & Subtitle visibility
    DOM.artboardTextHeader.style.display = state.showTitles ? 'block' : 'none';
    DOM.canvasMainTitle.textContent = state.headingText;
    DOM.canvasSubtitle.textContent = state.subtitleText;
    DOM.canvasMainTitle.style.fontFamily = state.fontFamily;
    DOM.canvasMainTitle.style.color = state.textColor;
    DOM.canvasSubtitle.style.color = state.textColor;

    // Render Slots with Dynamic Gaps, Borders, and Corner Radius
    tpl.slots.forEach((slot, index) => {
      const slotEl = document.createElement('div');
      slotEl.className = `collage-slot shape-${slot.shape || 'rect'}`;
      slotEl.setAttribute('data-slot-id', slot.id);

      // Positioning
      slotEl.style.left = `${slot.x}%`;
      slotEl.style.top = `${slot.y}%`;
      slotEl.style.width = `${slot.w}%`;
      slotEl.style.height = `${slot.h}%`;
      slotEl.style.zIndex = slot.zIndex || 1;

      // Base rotation
      slotEl.style.transform = `translate(-50%, -50%) rotate(${slot.rotation || 0}deg)`;

      // Dynamic Photo Spacing / Gap: applied as internal padding
      slotEl.style.padding = `${state.photoGap / 2}px`;
      slotEl.style.boxSizing = 'border-box';

      // Inner Content Wrapper (Photos, Borders, Corner Rounding)
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'slot-content-wrapper';

      if (slot.shape !== 'hexagon') {
        contentWrapper.style.borderRadius = `${state.cornerRadius}px`;
      }

      // Border Styling
      if (state.borderWidth > 0 && slot.shape !== 'polaroid') {
        contentWrapper.style.border = `${state.borderWidth}px ${state.borderStyle} ${state.borderColor}`;
      } else {
        contentWrapper.style.border = 'none';
      }

      // Shadow Depth
      const shadows = [
        'none',
        '0 4px 14px rgba(0, 0, 0, 0.18)',
        '0 8px 24px rgba(0, 0, 0, 0.3)',
        '0 14px 36px rgba(0, 0, 0, 0.45)'
      ];
      contentWrapper.style.boxShadow = shadows[state.shadowDepth] || shadows[1];

      // Assigned Photo
      const assigned = state.slotAssignments[slot.id];

      if (assigned && assigned.photo) {
        const img = document.createElement('img');
        img.src = assigned.photo.url;
        img.alt = assigned.photo.name || 'Photo';
        img.className = 'slot-img';
        img.style.filter = filterCss;

        const scaleVal = (assigned.zoom || 100) / 100;
        const flipVal = assigned.flipX ? -1 : 1;
        const rotVal = assigned.rotation || 0;
        const panX = assigned.panX || 0;
        const panY = assigned.panY || 0;
        img.style.transform = `translate(${panX}px, ${panY}px) scale(${scaleVal * flipVal}, ${scaleVal}) rotate(${rotVal}deg)`;

        if (animate) {
          img.style.animation = `slotPop 0.35s ease ${index * 0.03}s both`;
        }

        contentWrapper.appendChild(img);

        // AI SmartCrop Indicators & Badge
        if (assigned.isSmartCropped) {
          const badge = document.createElement('div');
          badge.className = 'slot-ai-badge';
          badge.title = 'AI SmartCropped & Auto-Framed';
          badge.innerHTML = '<span class="badge-icon">🧠</span> AI Framed';
          contentWrapper.appendChild(badge);

          if (state.showFocalIndicators && assigned.focalPoint) {
            const indicator = document.createElement('div');
            indicator.className = 'focal-indicator-target';
            indicator.style.left = `${Math.round(assigned.focalPoint.x * 100)}%`;
            indicator.style.top = `${Math.round(assigned.focalPoint.y * 100)}%`;
            indicator.title = `AI Focal Target: (${Math.round(assigned.focalPoint.x * 100)}%, ${Math.round(assigned.focalPoint.y * 100)}%)`;
            contentWrapper.appendChild(indicator);
          }
        }
      } else {
        // Empty Placeholder
        contentWrapper.innerHTML = `
          <div class="slot-empty-placeholder">
            <span class="slot-empty-icon">➕</span>
            <span class="slot-empty-label">${slot.label || `Slot ${slot.id}`}</span>
          </div>
        `;
      }

      slotEl.appendChild(contentWrapper);

      // Polaroid Caption Tag
      if (slot.shape === 'polaroid') {
        const caption = document.createElement('div');
        caption.className = 'polaroid-caption-tag';
        caption.contentEditable = 'true';
        caption.spellcheck = false;
        caption.textContent = slot.polaroidCaption || 'Cozy Memories';
        caption.addEventListener('click', (e) => e.stopPropagation());
        slotEl.appendChild(caption);
      }

      // Attach Drag & Drop and Click Events
      attachSlotEvents(slotEl, slot);

      DOM.canvasSlotsContainer.appendChild(slotEl);
    });

    // Render Preset Template Bows & Hearts
    renderPresetDecorations();

    // Render User Stamped Draggable Stickers
    renderUserStickers();

    updateSlotsTracker();
  }

  /* ==========================================================================
     DAINTY BOWS & HEARTS VECTOR ENGINE
     ========================================================================== */
  function renderPresetDecorations() {
    DOM.canvasDecorationsContainer.innerHTML = '';
    if (!state.currentTemplate || !state.currentTemplate.decorations) return;

    state.currentTemplate.decorations.forEach(deco => {
      // Check toggles
      if (deco.type === 'bow' && !state.showPresetBows) return;
      if (deco.type === 'heart' && !state.showPresetHearts) return;

      const decoEl = document.createElement('div');
      decoEl.className = 'deco-item';
      decoEl.style.left = `${deco.x}%`;
      decoEl.style.top = `${deco.y}%`;

      const decoStyle = deco.type === 'bow' ? state.bowStyle : (deco.type === 'heart' ? state.heartStyle : deco.style);
      const svgString = getDecorationSvgString(deco.type, decoStyle, deco.size || 40);

      decoEl.innerHTML = svgString;
      DOM.canvasDecorationsContainer.appendChild(decoEl);
    });
  }

  function getDecorationSvgString(type, style, size = 40) {
    // Resolve Colors based on style
    let color = '#f472b6'; // default pink
    let knotColor = '#db2777';

    if (type === 'bow') {
      if (style === 'ruby-satin') { color = '#e11d48'; knotColor = '#be123c'; }
      else if (style === 'lavender-dream') { color = '#c084fc'; knotColor = '#a855f7'; }
      else if (style === 'gold-ribbon') { color = '#fbbf24'; knotColor = '#d97706'; }
      else if (style === 'butter-cream') { color = '#fde047'; knotColor = '#eab308'; }
      else if (style === 'pure-white') { color = '#ffffff'; knotColor = '#e2e8f0'; }
      else if (style === 'minimal-line') { color = '#334155'; knotColor = '#0f172a'; }

      return `
        <svg viewBox="0 0 100 80" width="${size * 1.25}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Left Loop -->
          <path d="M 50 40 C 32 18, 8 18, 12 42 C 16 56, 38 48, 50 42 Z" fill="${color}" opacity="0.95"/>
          <!-- Right Loop -->
          <path d="M 50 40 C 68 18, 92 18, 88 42 C 84 56, 62 48, 50 42 Z" fill="${color}" opacity="0.95"/>
          <!-- Left Ribbon Tail -->
          <path d="M 46 43 C 38 56, 22 66, 15 78 C 26 73, 33 76, 42 69 C 46 58, 48 48, 48 43 Z" fill="${color}" opacity="0.88"/>
          <!-- Right Ribbon Tail -->
          <path d="M 54 43 C 62 56, 78 66, 85 78 C 74 73, 67 76, 58 69 C 54 58, 52 48, 52 43 Z" fill="${color}" opacity="0.88"/>
          <!-- Center Knot -->
          <ellipse cx="50" cy="41" rx="7.5" ry="6.5" fill="${knotColor}"/>
          <!-- Highlights -->
          <path d="M 26 26 C 20 28, 18 34, 22 38" stroke="rgba(255,255,255,0.65)" stroke-width="2" stroke-linecap="round"/>
          <path d="M 74 26 C 80 28, 82 34, 78 38" stroke="rgba(255,255,255,0.65)" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    }

    if (type === 'heart') {
      if (style === 'crimson-red') color = '#e11d48';
      else if (style === 'lilac-heart') color = '#c084fc';
      else if (style === 'gold-heart') color = '#f59e0b';
      else if (style === 'line-heart') {
        return `
          <svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50 85 C 50 85, 12 60, 12 32 C 12 16, 25 8, 38 8 C 45 8, 48 12, 50 16 C 52 12, 55 8, 62 8 C 75 8, 88 16, 88 32 C 88 60, 50 85, 50 85 Z" stroke="#475569" stroke-width="6" stroke-linejoin="round"/>
          </svg>
        `;
      } else if (style === 'double-hearts') {
        return `
          <svg viewBox="0 0 120 100" width="${size * 1.2}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 75 75 C 75 75, 45 55, 45 34 C 45 22, 54 16, 64 16 C 70 16, 73 19, 75 22 C 77 19, 80 16, 86 16 C 96 16, 105 22, 105 34 C 105 55, 75 75, 75 75 Z" fill="#f43f5e" opacity="0.75"/>
            <path d="M 45 85 C 45 85, 12 62, 12 38 C 12 24, 23 17, 34 17 C 41 17, 44 20, 45 23 C 46 20, 49 17, 56 17 C 67 17, 78 24, 78 38 C 78 62, 45 85, 45 85 Z" fill="#fb7185"/>
            <path d="M 22 28 C 24 22, 30 20, 36 21" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        `;
      } else if (style === 'sparkle-heart') {
        return `
          <svg viewBox="0 0 110 100" width="${size * 1.1}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 52 86 C 52 86, 16 62, 16 34 C 16 18, 28 10, 41 10 C 47 10, 50 14, 52 18 C 54 14, 57 10, 63 10 C 76 10, 88 18, 88 34 C 88 62, 52 86, 52 86 Z" fill="#ec4899"/>
            <path d="M 26 24 C 28 18, 34 16, 40 17" stroke="rgba(255,255,255,0.75)" stroke-width="3" stroke-linecap="round"/>
            <path d="M 94 14 Q 94 22 102 22 Q 94 22 94 30 Q 94 22 86 22 Q 94 22 94 14 Z" fill="#fbbf24"/>
            <path d="M 12 55 Q 12 62 19 62 Q 12 62 12 69 Q 12 62 5 62 Q 12 62 12 55 Z" fill="#f472b6"/>
          </svg>
        `;
      }

      // Classic Blush Heart
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50 85 C 50 85, 12 60, 12 32 C 12 16, 25 8, 38 8 C 45 8, 48 12, 50 16 C 52 12, 55 8, 62 8 C 75 8, 88 16, 88 32 C 88 60, 50 85, 50 85 Z" fill="${color}"/>
          <path d="M 24 22 C 26 16, 32 14, 38 15" stroke="rgba(255,255,255,0.75)" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `;
    }

    if (type === 'sparkle') {
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50 10 Q 50 50 90 50 Q 50 50 50 90 Q 50 50 10 50 Q 50 50 50 10 Z" fill="#fbbf24"/>
          <circle cx="50" cy="50" r="5" fill="#ffffff"/>
        </svg>
      `;
    }

    if (type === 'star') {
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,10 63,38 93,42 70,62 77,91 50,75 23,91 30,62 7,42 37,38" fill="#f59e0b"/>
        </svg>
      `;
    }

    if (type === 'flower') {
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="30" r="18" fill="#fda4af"/>
          <circle cx="70" cy="45" r="18" fill="#fda4af"/>
          <circle cx="62" cy="70" r="18" fill="#fda4af"/>
          <circle cx="38" cy="70" r="18" fill="#fda4af"/>
          <circle cx="30" cy="45" r="18" fill="#fda4af"/>
          <circle cx="50" cy="50" r="12" fill="#fbbf24"/>
        </svg>
      `;
    }

    if (type === 'butterfly') {
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="36" cy="38" rx="20" ry="16" fill="#c084fc" opacity="0.9"/>
          <ellipse cx="64" cy="38" rx="20" ry="16" fill="#c084fc" opacity="0.9"/>
          <ellipse cx="40" cy="62" rx="14" ry="12" fill="#e879f9" opacity="0.85"/>
          <ellipse cx="60" cy="62" rx="14" ry="12" fill="#e879f9" opacity="0.85"/>
          <ellipse cx="50" cy="50" rx="4" ry="24" fill="#334155"/>
        </svg>
      `;
    }

    return '';
  }

  /* ==========================================================================
     USER STAMPED DRAGGABLE STICKERS
     ========================================================================== */
  function addStickerToCollage(stickerKey) {
    let type = 'bow';
    let style = 'coquette-pink';
    let size = 48;

    if (stickerKey === 'sticker-bow-pink') { type = 'bow'; style = 'coquette-pink'; size = 52; }
    else if (stickerKey === 'sticker-bow-ruby') { type = 'bow'; style = 'ruby-satin'; size = 52; }
    else if (stickerKey === 'sticker-bow-gold') { type = 'bow'; style = 'gold-ribbon'; size = 52; }
    else if (stickerKey === 'sticker-heart-blush') { type = 'heart'; style = 'blush-pink'; size = 42; }
    else if (stickerKey === 'sticker-heart-sparkle') { type = 'heart'; style = 'sparkle-heart'; size = 46; }
    else if (stickerKey === 'sticker-heart-double') { type = 'heart'; style = 'double-hearts'; size = 48; }
    else if (stickerKey === 'sticker-sparkle') { type = 'sparkle'; style = 'gold'; size = 36; }
    else if (stickerKey === 'sticker-star') { type = 'star'; style = 'gold'; size = 38; }
    else if (stickerKey === 'sticker-flower') { type = 'flower'; style = 'pink'; size = 40; }
    else if (stickerKey === 'sticker-butterfly') { type = 'butterfly'; style = 'lavender'; size = 44; }

    const newSticker = {
      id: `sticker-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      style,
      x: 50 + (Math.random() * 20 - 10),
      y: 50 + (Math.random() * 20 - 10),
      size,
      rotation: Math.round(Math.random() * 20 - 10)
    };

    state.stampedStickers.push(newSticker);
    renderUserStickers();
    showToast('Stamped cute sticker on collage! Drag it anywhere!', 'success');
  }

  function renderUserStickers() {
    DOM.canvasStickersContainer.innerHTML = '';

    state.stampedStickers.forEach(sticker => {
      const stickerEl = document.createElement('div');
      stickerEl.className = 'canvas-sticker';
      stickerEl.setAttribute('data-sticker-id', sticker.id);
      stickerEl.style.left = `${sticker.x}%`;
      stickerEl.style.top = `${sticker.y}%`;
      stickerEl.style.transform = `translate(-50%, -50%) rotate(${sticker.rotation}deg)`;

      const svgHtml = getDecorationSvgString(sticker.type, sticker.style, sticker.size);
      stickerEl.innerHTML = `
        ${svgHtml}
        <button class="canvas-sticker-delete-btn" title="Delete Sticker">✕</button>
      `;

      // Dragging Sticker
      attachStickerDragEvents(stickerEl, sticker);

      // Delete Sticker
      stickerEl.querySelector('.canvas-sticker-delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        state.stampedStickers = state.stampedStickers.filter(s => s.id !== sticker.id);
        renderUserStickers();
      });

      DOM.canvasStickersContainer.appendChild(stickerEl);
    });
  }

  function attachStickerDragEvents(stickerEl, sticker) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let startLeft = 0, startTop = 0;

    const onMouseDown = (e) => {
      if (e.target.classList.contains('canvas-sticker-delete-btn')) return;
      isDragging = true;
      stickerEl.classList.add('is-dragging');

      startX = e.clientX;
      startY = e.clientY;
      startLeft = sticker.x;
      startTop = sticker.y;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const rect = DOM.artboardInner.getBoundingClientRect();
      const dx = ((e.clientX - startX) / rect.width) * 100;
      const dy = ((e.clientY - startY) / rect.height) * 100;

      sticker.x = Math.max(5, Math.min(95, startLeft + dx));
      sticker.y = Math.max(5, Math.min(95, startTop + dy));

      stickerEl.style.left = `${sticker.x}%`;
      stickerEl.style.top = `${sticker.y}%`;
    };

    const onMouseUp = () => {
      isDragging = false;
      stickerEl.classList.remove('is-dragging');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    stickerEl.addEventListener('mousedown', onMouseDown);
  }

  /* ==========================================================================
     SLOT EVENTS: CLICK TO EDIT & DRAG-TO-SWAP
     ========================================================================== */
  function attachSlotEvents(slotEl, slot) {
    // Click to select / edit
    slotEl.addEventListener('click', (e) => {
      e.stopPropagation();
      selectSlot(slot.id);
    });

    // Drag & Drop
    slotEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      slotEl.classList.add('drag-target-hover');
    });

    slotEl.addEventListener('dragleave', () => {
      slotEl.classList.remove('drag-target-hover');
    });

    slotEl.addEventListener('drop', (e) => {
      e.preventDefault();
      slotEl.classList.remove('drag-target-hover');

      // Dragged from Tray
      if (state.draggedPhoto) {
        state.slotAssignments[slot.id] = {
          photo: state.draggedPhoto,
          zoom: 100,
          rotation: 0,
          flipX: false,
          panX: 0,
          panY: 0
        };
        renderArtboard();
        showToast(`Assigned photo to slot ${slot.id}!`, 'success');
        if (state.smartcropOnAutofill && smartCropEngine) {
          smartCropSlot(slot.id, false);
        }
        return;
      }

      // Dragged from another slot (Swap photos!)
      if (state.draggedSourceSlotId && state.draggedSourceSlotId !== slot.id) {
        const sourceData = state.slotAssignments[state.draggedSourceSlotId];
        const targetData = state.slotAssignments[slot.id];

        state.slotAssignments[slot.id] = sourceData;
        if (targetData) {
          state.slotAssignments[state.draggedSourceSlotId] = targetData;
        } else {
          delete state.slotAssignments[state.draggedSourceSlotId];
        }

        renderArtboard();
        showToast(`Swapped photos between slot ${state.draggedSourceSlotId} and slot ${slot.id}! 🔀`, 'info');

        if (state.smartcropOnAutofill && smartCropEngine) {
          smartCropSlot(slot.id, false);
          if (targetData) smartCropSlot(state.draggedSourceSlotId, false);
        }
      }
    });

    // Make filled slots draggable to allow slot-to-slot swap
    if (state.slotAssignments[slot.id]) {
      slotEl.draggable = true;
      slotEl.addEventListener('dragstart', (e) => {
        state.draggedSourceSlotId = slot.id;
        state.draggedPhoto = null;
        e.dataTransfer.setData('text/plain', 'slot-' + slot.id);
      });
      slotEl.addEventListener('dragend', () => {
        state.draggedSourceSlotId = null;
      });
    }
  }

  function selectSlot(slotId) {
    state.selectedSlotId = slotId;

    document.querySelectorAll('.collage-slot').forEach(el => {
      el.classList.remove('selected');
      const oldToolbar = el.querySelector('.slot-floating-toolbar');
      if (oldToolbar) oldToolbar.remove();
    });

    const targetEl = document.querySelector(`.collage-slot[data-slot-id="${slotId}"]`);
    if (!targetEl) return;

    targetEl.classList.add('selected');

    // Mini Quick Floating Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'slot-floating-toolbar';
    toolbar.innerHTML = `
      <button class="tool-mini-btn btn-quick-zoom-in" title="Zoom In">🔍+</button>
      <button class="tool-mini-btn btn-quick-zoom-out" title="Zoom Out">🔍−</button>
      <button class="tool-mini-btn btn-quick-rot" title="Rotate 90°">↻</button>
      <button class="tool-mini-btn btn-quick-smartcrop" title="AI Auto-Frame Subject">🧠</button>
      <button class="tool-mini-btn btn-quick-edit" title="Advanced Adjustments">✏️</button>
      <button class="tool-mini-btn danger btn-quick-remove" title="Remove Photo">✕</button>
    `;

    toolbar.querySelector('.btn-quick-zoom-in').addEventListener('click', (e) => {
      e.stopPropagation();
      adjustSlotZoom(slotId, 15);
    });
    toolbar.querySelector('.btn-quick-zoom-out').addEventListener('click', (e) => {
      e.stopPropagation();
      adjustSlotZoom(slotId, -15);
    });
    toolbar.querySelector('.btn-quick-rot').addEventListener('click', (e) => {
      e.stopPropagation();
      rotateSlot(slotId, 90);
    });
    toolbar.querySelector('.btn-quick-smartcrop').addEventListener('click', (e) => {
      e.stopPropagation();
      smartCropSlot(slotId, true);
    });
    toolbar.querySelector('.btn-quick-edit').addEventListener('click', (e) => {
      e.stopPropagation();
      openSlotEditModal(slotId);
    });
    toolbar.querySelector('.btn-quick-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      delete state.slotAssignments[slotId];
      renderArtboard();
      updateSlotsTracker();
    });

    targetEl.appendChild(toolbar);
  }

  function adjustSlotZoom(slotId, delta) {
    if (!state.slotAssignments[slotId]) return;
    const cur = state.slotAssignments[slotId].zoom || 100;
    state.slotAssignments[slotId].zoom = Math.max(100, Math.min(250, cur + delta));
    renderArtboard();
  }

  function rotateSlot(slotId, deg) {
    if (!state.slotAssignments[slotId]) return;
    const cur = state.slotAssignments[slotId].rotation || 0;
    state.slotAssignments[slotId].rotation = (cur + deg) % 360;
    renderArtboard();
  }

  /* ==========================================================================
     SLOT EDIT MODAL
     ========================================================================== */
  function openSlotEditModal(slotId) {
    const assigned = state.slotAssignments[slotId];
    if (!assigned || !assigned.photo) {
      showToast('Please assign a photo to this slot first!', 'info');
      return;
    }

    state.selectedSlotId = slotId;
    DOM.slotModalPreviewImg.src = assigned.photo.url;
    DOM.modalSliderZoom.value = assigned.zoom || 100;
    DOM.modalZoomVal.textContent = `${assigned.zoom || 100}%`;
    DOM.modalSliderPanX.value = assigned.panX || 0;
    DOM.modalPanXVal.textContent = `${assigned.panX || 0}px`;
    DOM.modalSliderPanY.value = assigned.panY || 0;
    DOM.modalPanYVal.textContent = `${assigned.panY || 0}px`;

    DOM.slotEditModal.style.display = 'flex';
  }

  function closeSlotEditModal() {
    DOM.slotEditModal.style.display = 'none';
  }

  /* ==========================================================================
     CUSTOMIZER PANELS: TEXTURES & FILTERS
     ========================================================================== */
  function renderTextureSwatches() {
    DOM.texturesPickerGrid.innerHTML = '';

    BACKGROUND_PRESETS.forEach(preset => {
      const swatch = document.createElement('div');
      swatch.className = `texture-swatch ${state.canvasBg === preset.id ? 'active' : ''}`;
      swatch.setAttribute('data-bg-id', preset.id);

      let previewBg = preset.color;
      if (preset.id === 'mini-hearts') {
        previewBg = 'linear-gradient(135deg, #fff1f2, #fecdd3)';
      } else if (preset.id === 'dainty-bows') {
        previewBg = 'linear-gradient(135deg, #fff0f7, #f5d0fe)';
      } else if (preset.id === 'gingham-check') {
        previewBg = 'repeating-linear-gradient(45deg, #fdfbf7, #fdfbf7 6px, #fbcfe8 6px, #fbcfe8 12px)';
      } else if (preset.id === 'cotton-candy') {
        previewBg = 'linear-gradient(135deg, #fbcfe8, #e9d5ff)';
      }

      swatch.innerHTML = `
        <div class="swatch-preview" style="background: ${previewBg}; border-color: ${preset.border};"></div>
        <span class="swatch-name">${preset.name}</span>
      `;

      swatch.addEventListener('click', () => {
        state.canvasBg = preset.id;
        DOM.texturesPickerGrid.querySelectorAll('.texture-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        setupArtboardDimensions();
      });

      DOM.texturesPickerGrid.appendChild(swatch);
    });
  }

  function renderFilterChips() {
    DOM.filtersChipsContainer.innerHTML = '';

    PHOTO_FILTERS.forEach(f => {
      const chip = document.createElement('button');
      chip.className = `filter-chip ${state.activeFilter === f.id ? 'active' : ''}`;
      chip.textContent = f.name;

      chip.addEventListener('click', () => {
        state.activeFilter = f.id;
        DOM.filtersChipsContainer.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderArtboard();
      });

      DOM.filtersChipsContainer.appendChild(chip);
    });
  }

  /* ==========================================================================
     HIGH RESOLUTION 300 DPI EXPORT ENGINE
     ========================================================================== */
  async function exportCollageCanvas(scaleFactor = 2) {
    if (!state.currentTemplate) return null;

    const tpl = state.currentTemplate;
    const baseW = 1200;
    let baseH = 1200;

    if (state.aspectRatio === '4:5') baseH = 1500;
    else if (state.aspectRatio === '9:16') baseH = 2133;
    else if (state.aspectRatio === '3:4') baseH = 1600;
    else if (state.aspectRatio === '16:9') baseH = 675;

    const width = Math.round(baseW * scaleFactor);
    const height = Math.round(baseH * scaleFactor);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 1. Draw Canvas Background
    if (state.canvasBg === 'custom') {
      ctx.fillStyle = state.customBgColor;
      ctx.fillRect(0, 0, width, height);
    } else {
      const preset = BACKGROUND_PRESETS.find(p => p.id === state.canvasBg);
      ctx.fillStyle = preset ? preset.color : '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Subtle pattern washes
      if (state.canvasBg === 'blush-pink' || state.canvasBg === 'cotton-candy') {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#fff0f5');
        grad.addColorStop(0.5, '#fce7f3');
        grad.addColorStop(1, '#fae8ff');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else if (state.canvasBg === 'sunset-blush') {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#fff7ed');
        grad.addColorStop(1, '#ffe4e6');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    }

    // 2. Compute Mat Board Padding Offset
    const margin = (state.outerMargin / 100) * (width * 0.1) * scaleFactor;
    const innerW = width - margin * 2;
    const innerH = height - margin * 2;
    const innerX = margin;
    const innerY = margin;

    // 3. Draw Titles & Subtitle if enabled
    if (state.showTitles && state.headingText) {
      ctx.save();
      ctx.textAlign = 'center';
      ctx.fillStyle = state.textColor;
      ctx.font = `bold ${Math.round(44 * scaleFactor)}px ${state.fontFamily}`;
      ctx.fillText(state.headingText, width / 2, innerY + 60 * scaleFactor);

      if (state.subtitleText) {
        ctx.font = `600 ${Math.round(18 * scaleFactor)}px 'Outfit', sans-serif`;
        ctx.fillStyle = state.textColor;
        ctx.globalAlpha = 0.75;
        ctx.fillText(state.subtitleText.toUpperCase(), width / 2, innerY + 95 * scaleFactor);
      }
      ctx.restore();
    }

    // 4. Draw Slots with exact gaps, rounded corners, and borders
    const gap = (state.photoGap / 2) * scaleFactor;
    const radius = state.cornerRadius * scaleFactor;

    for (const slot of tpl.slots) {
      const assigned = state.slotAssignments[slot.id];
      const slotCenterX = innerX + (slot.x / 100) * innerW;
      const slotCenterY = innerY + (slot.y / 100) * innerH;
      const slotW = (slot.w / 100) * innerW;
      const slotH = (slot.h / 100) * innerH;

      ctx.save();
      ctx.translate(slotCenterX, slotCenterY);
      ctx.rotate(((slot.rotation || 0) * Math.PI) / 180);

      const drawW = Math.max(10, slotW - gap * 2);
      const drawH = Math.max(10, slotH - gap * 2);
      const drawX = -drawW / 2;
      const drawY = -drawH / 2;

      // Shadow
      if (state.shadowDepth > 0) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
        ctx.shadowBlur = 16 * scaleFactor;
        ctx.shadowOffsetY = 6 * scaleFactor;
      }

      // Fill slot
      if (assigned && assigned.photo) {
        await drawClippedImage(ctx, assigned.photo.url, drawX, drawY, drawW, drawH, slot.shape, assigned, radius, scaleFactor);
      } else {
        ctx.fillStyle = '#e2e8f0';
        roundRect(ctx, drawX, drawY, drawW, drawH, radius);
        ctx.fill();
      }

      // Border
      if (state.borderWidth > 0) {
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = state.borderWidth * scaleFactor;
        ctx.strokeStyle = state.borderColor;
        if (state.borderStyle === 'dashed') ctx.setLineDash([8 * scaleFactor, 6 * scaleFactor]);
        else if (state.borderStyle === 'dotted') ctx.setLineDash([3 * scaleFactor, 4 * scaleFactor]);
        else ctx.setLineDash([]);
        roundRect(ctx, drawX, drawY, drawW, drawH, radius);
        ctx.stroke();
      }

      ctx.restore();
    }

    // 5. Draw Preset Bows & Hearts
    if (tpl.decorations) {
      for (const deco of tpl.decorations) {
        if (deco.type === 'bow' && !state.showPresetBows) continue;
        if (deco.type === 'heart' && !state.showPresetHearts) continue;

        const decoX = innerX + (deco.x / 100) * innerW;
        const decoY = innerY + (deco.y / 100) * innerH;
        const decoStyle = deco.type === 'bow' ? state.bowStyle : (deco.type === 'heart' ? state.heartStyle : deco.style);
        const size = (deco.size || 40) * scaleFactor;

        await drawSvgToCanvas(ctx, deco.type, decoStyle, decoX, decoY, size, deco.rotation || 0);
      }
    }

    // 6. Draw User Stamped Stickers
    for (const sticker of state.stampedStickers) {
      const stX = innerX + (sticker.x / 100) * innerW;
      const stY = innerY + (sticker.y / 100) * innerH;
      const size = sticker.size * scaleFactor;

      await drawSvgToCanvas(ctx, sticker.type, sticker.style, stX, stY, size, sticker.rotation || 0);
    }

    return canvas;
  }

  async function drawClippedImage(ctx, imgUrl, x, y, w, h, shape, assigned, radius, scale) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

    if (!img.complete || img.naturalWidth === 0) return;

    ctx.save();
    ctx.beginPath();

    if (shape === 'circle') {
      ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
    } else {
      roundRect(ctx, x, y, w, h, radius);
    }
    ctx.clip();

    // Color Filter
    const activeFilterObj = PHOTO_FILTERS.find(f => f.id === state.activeFilter);
    if (activeFilterObj && activeFilterObj.css !== 'none') {
      ctx.filter = activeFilterObj.css;
    }

    // Aspect cover computation
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const slotRatio = w / h;
    let drawW, drawH;
    if (imgRatio > slotRatio) {
      drawH = h;
      drawW = h * imgRatio;
    } else {
      drawW = w;
      drawH = w / imgRatio;
    }

    const zoomFactor = (assigned.zoom || 100) / 100;
    drawW *= zoomFactor;
    drawH *= zoomFactor;

    // Exact scale ratio between DOM artboard and export canvas
    const domArtboardW = DOM.artboardInner && DOM.artboardInner.clientWidth > 0 ? DOM.artboardInner.clientWidth : 600;
    const canvasScaleRatio = (ctx.canvas.width / domArtboardW) || scale;

    const drawX = x + (w - drawW) / 2 + (assigned.panX || 0) * canvasScaleRatio;
    const drawY = y + (h - drawH) / 2 + (assigned.panY || 0) * canvasScaleRatio;

    ctx.save();
    const imgCenterX = drawX + drawW / 2;
    const imgCenterY = drawY + drawH / 2;
    ctx.translate(imgCenterX, imgCenterY);

    if (assigned.flipX) {
      ctx.scale(-1, 1);
    }
    if (assigned.rotation) {
      ctx.rotate((assigned.rotation * Math.PI) / 180);
    }

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
    ctx.restore();
  }

  async function drawSvgToCanvas(ctx, type, style, x, y, size, rotation = 0) {
    const svgString = getDecorationSvgString(type, style, size);
    if (!svgString) return;

    const dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    const img = new Image();
    img.src = dataUri;

    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function roundRect(ctx, x, y, w, h, radius) {
    if (radius <= 0) {
      ctx.rect(x, y, w, h);
      return;
    }
    const r = Math.min(radius, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ==========================================================================
     EVENT LISTENERS ENGINE
     ========================================================================== */
  function setupEventListeners() {
    // 1. Navigation
    DOM.navCatalogBtn.addEventListener('click', () => switchView('catalog'));
    DOM.navStudioBtn.addEventListener('click', () => switchView('studio'));
    DOM.backToCatalogBtn.addEventListener('click', () => switchView('catalog'));
    DOM.brandLogoBtn.addEventListener('click', () => switchView('catalog'));

    // Theme toggle
    DOM.themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });

    // Quick Demo sample photos
    DOM.quickDemoPhotosBtn.addEventListener('click', () => loadSamplePhotos(true));
    DOM.trayLoadDemoBtn.addEventListener('click', () => loadSamplePhotos(true));

    // Device Photos Full Access Listeners
    if (DOM.headerDevicePhotosBtn) {
      DOM.headerDevicePhotosBtn.addEventListener('click', openDevicePhotosModal);
    }
    if (DOM.btnOpenDevicePhotosModal) {
      DOM.btnOpenDevicePhotosModal.addEventListener('click', openDevicePhotosModal);
    }
    if (DOM.dropzoneDeviceFolderLink) {
      DOM.dropzoneDeviceFolderLink.addEventListener('click', (e) => {
        e.stopPropagation();
        openDevicePhotosModal();
      });
    }
    if (DOM.closeDeviceModalBtn) {
      DOM.closeDeviceModalBtn.addEventListener('click', closeDevicePhotosModal);
    }
    if (DOM.btnCancelDeviceModal) {
      DOM.btnCancelDeviceModal.addEventListener('click', closeDevicePhotosModal);
    }
    if (DOM.devicePhotosModal) {
      DOM.devicePhotosModal.addEventListener('click', (e) => {
        if (e.target === DOM.devicePhotosModal) closeDevicePhotosModal();
      });
    }

    if (DOM.btnGrantFolderAccess) {
      DOM.btnGrantFolderAccess.addEventListener('click', requestDeviceFolderAccess);
    }
    if (DOM.btnGrantBulkAccess) {
      DOM.btnGrantBulkAccess.addEventListener('click', requestDeviceBulkAccess);
    }

    // Fallback directory file input (webkitdirectory)
    if (DOM.deviceFolderInput) {
      DOM.deviceFolderInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        const folderName = files[0].webkitRelativePath ? files[0].webkitRelativePath.split('/')[0] : 'Device Folder';
        const imageItems = files
          .filter(f => f.type.startsWith('image/') || /\.(jpe?g|png|webp|avif|heic|gif|bmp)$/i.test(f.name))
          .map(f => ({
            file: f,
            name: f.name,
            path: f.webkitRelativePath ? f.webkitRelativePath.substring(0, f.webkitRelativePath.lastIndexOf('/')) : folderName
          }));

        if (imageItems.length === 0) {
          showToast('No image files found in selected folder.', 'info');
          return;
        }
        processLoadedDevicePhotos(imageItems, folderName, null);
      });
    }

    // Bulk camera roll multi-select file input
    if (DOM.deviceBulkInput) {
      DOM.deviceBulkInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        const imageItems = files
          .filter(f => f.type.startsWith('image/') || /\.(jpe?g|png|webp|avif|heic|gif|bmp)$/i.test(f.name))
          .map(f => ({
            file: f,
            name: f.name,
            path: 'Camera Roll'
          }));

        if (imageItems.length === 0) {
          showToast('No image files selected.', 'info');
          return;
        }
        processLoadedDevicePhotos(imageItems, 'Camera Roll / Library', null);
      });
    }

    // Connected status bar actions
    if (DOM.btnDeviceDisconnect) {
      DOM.btnDeviceDisconnect.addEventListener('click', disconnectDevicePhotos);
    }
    if (DOM.btnDeviceRescan) {
      DOM.btnDeviceRescan.addEventListener('click', rescanDeviceFolder);
    }
    if (DOM.btnDeviceChangeFolder) {
      DOM.btnDeviceChangeFolder.addEventListener('click', requestDeviceFolderAccess);
    }
    if (DOM.btnDeviceAutofill) {
      DOM.btnDeviceAutofill.addEventListener('click', autoFillFromDevicePhotos);
    }

    // Real-time Tray Search & Sort
    if (DOM.devicePhotosSearch) {
      DOM.devicePhotosSearch.addEventListener('input', (e) => {
        state.deviceLibrary.searchQuery = e.target.value.trim();
        renderPhotoTray();
      });
    }
    if (DOM.devicePhotosSort) {
      DOM.devicePhotosSort.addEventListener('change', (e) => {
        state.deviceLibrary.sortBy = e.target.value;
        renderPhotoTray();
      });
    }

    // File Upload Drag & Drop Dropzone
    DOM.uploadDropzone.addEventListener('click', () => DOM.fileInput.click());
    DOM.fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    DOM.uploadDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      DOM.uploadDropzone.classList.add('drag-over');
    });
    DOM.uploadDropzone.addEventListener('dragleave', () => {
      DOM.uploadDropzone.classList.remove('drag-over');
    });
    DOM.uploadDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      DOM.uploadDropzone.classList.remove('drag-over');
      handleFiles(e.dataTransfer.files);
    });

    // 2. Photo Count Filter Pills (2 to 10 Photos)
    if (DOM.photoCountPillsContainer) {
      DOM.photoCountPillsContainer.querySelectorAll('.count-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          DOM.photoCountPillsContainer.querySelectorAll('.count-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.photoCountFilter = btn.dataset.count;
          renderCatalog();
        });
      });
    }

    // Category Filter Pills
    DOM.categoryPillsContainer.querySelectorAll('.category-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.categoryPillsContainer.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeCategory = btn.dataset.category;
        renderCatalog();
      });
    });

    // Search input
    DOM.catalogSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      DOM.searchClearBtn.style.display = e.target.value.length > 0 ? 'block' : 'none';
      renderCatalog();
    });
    DOM.searchClearBtn.addEventListener('click', () => {
      DOM.catalogSearchInput.value = '';
      state.searchQuery = '';
      DOM.searchClearBtn.style.display = 'none';
      renderCatalog();
    });

    // Aspect filter in catalog
    DOM.filterAspectRatio.addEventListener('change', (e) => {
      state.aspectRatioFilter = e.target.value;
      renderCatalog();
    });

    // Studio Quick Aspect Ratio Switcher
    if (DOM.studioAspectSwitcher) {
      DOM.studioAspectSwitcher.querySelectorAll('.aspect-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          DOM.studioAspectSwitcher.querySelectorAll('.aspect-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.aspectRatio = btn.dataset.ratio;
          setupArtboardDimensions();
          renderArtboard();
          updateStudioSpecs();
          showToast(`Switched aspect ratio to ${state.aspectRatio}!`, 'info');
        });
      });
    }

    // Core Actions: Auto-Fill, AI SmartCrop, Shuffle, Clear
    DOM.magicAutofillBtn.addEventListener('click', () => autoFillSlots(true));
    if (DOM.aiSmartcropAllBtn) {
      DOM.aiSmartcropAllBtn.addEventListener('click', () => smartCropAllSlots(true));
    }
    DOM.shuffleSlotsBtn.addEventListener('click', () => shuffleSlots());
    DOM.clearSlotsBtn.addEventListener('click', () => clearAllSlots());

    // AI SmartCrop & Framing Customizer Listeners
    if (DOM.toggleSmartcropAutofill) {
      DOM.toggleSmartcropAutofill.addEventListener('change', (e) => {
        state.smartcropOnAutofill = e.target.checked;
        showToast(state.smartcropOnAutofill ? 'AI Auto-SmartCrop on fill enabled 🧠' : 'AI Auto-SmartCrop disabled', 'info');
      });
    }

    if (DOM.toggleSmartcropIndicators) {
      DOM.toggleSmartcropIndicators.addEventListener('change', (e) => {
        state.showFocalIndicators = e.target.checked;
        renderArtboard();
      });
    }

    if (DOM.selectSmartcropMode) {
      DOM.selectSmartcropMode.addEventListener('change', (e) => {
        state.smartcropMode = e.target.value;
        smartCropAllSlots(true);
      });
    }

    if (DOM.btnRunSmartcropNow) {
      DOM.btnRunSmartcropNow.addEventListener('click', () => smartCropAllSlots(true));
    }

    if (DOM.btnResetCenterCrop) {
      DOM.btnResetCenterCrop.addEventListener('click', () => resetAllCenterCrops());
    }

    if (DOM.modalSmartcropSlotBtn) {
      DOM.modalSmartcropSlotBtn.addEventListener('click', () => {
        if (state.selectedSlotId) {
          smartCropSlot(state.selectedSlotId, true);
        }
      });
    }

    // 3. Customizer Sliders: Spacing, Borders, Margins
    DOM.sliderPhotoGap.addEventListener('input', (e) => {
      state.photoGap = parseInt(e.target.value, 10);
      DOM.valPhotoGap.textContent = `${state.photoGap}px`;
      renderArtboard();
    });

    DOM.sliderCornerRadius.addEventListener('input', (e) => {
      state.cornerRadius = parseInt(e.target.value, 10);
      DOM.valCornerRadius.textContent = `${state.cornerRadius}px`;
      renderArtboard();
    });

    DOM.sliderOuterMargin.addEventListener('input', (e) => {
      state.outerMargin = parseInt(e.target.value, 10);
      DOM.valOuterMargin.textContent = `${state.outerMargin}px`;
      renderArtboard();
    });

    DOM.sliderBorderWidth.addEventListener('input', (e) => {
      state.borderWidth = parseInt(e.target.value, 10);
      DOM.valBorderWidth.textContent = `${state.borderWidth}px`;
      renderArtboard();
    });

    DOM.selectBorderStyle.addEventListener('change', (e) => {
      state.borderStyle = e.target.value;
      renderArtboard();
    });

    DOM.pickerBorderColor.addEventListener('input', (e) => {
      state.borderColor = e.target.value;
      renderArtboard();
    });

    if (DOM.borderColorSwatches) {
      DOM.borderColorSwatches.querySelectorAll('.color-swatch-mini').forEach(swatch => {
        swatch.addEventListener('click', () => {
          state.borderColor = swatch.dataset.color;
          DOM.pickerBorderColor.value = state.borderColor;
          renderArtboard();
        });
      });
    }

    DOM.sliderShadowDepth.addEventListener('input', (e) => {
      state.shadowDepth = parseInt(e.target.value, 10);
      const labels = ['None', 'Soft Glow', 'Medium', 'Floating'];
      DOM.valShadowDepth.textContent = labels[state.shadowDepth];
      renderArtboard();
    });

    // 4. Bows & Hearts Customizer Controls
    DOM.togglePresetBows.addEventListener('change', (e) => {
      state.showPresetBows = e.target.checked;
      renderPresetDecorations();
    });

    DOM.togglePresetHearts.addEventListener('change', (e) => {
      state.showPresetHearts = e.target.checked;
      renderPresetDecorations();
    });

    DOM.selectBowStyle.addEventListener('change', (e) => {
      state.bowStyle = e.target.value;
      renderPresetDecorations();
    });

    DOM.selectHeartStyle.addEventListener('change', (e) => {
      state.heartStyle = e.target.value;
      renderPresetDecorations();
    });

    // Stamp Cute Stickers
    if (DOM.stickersStampPalette) {
      DOM.stickersStampPalette.querySelectorAll('.stamp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          addStickerToCollage(btn.dataset.sticker);
        });
      });
    }

    if (DOM.clearStickersBtn) {
      DOM.clearStickersBtn.addEventListener('click', () => {
        state.stampedStickers = [];
        renderUserStickers();
        showToast('Cleared all stamped stickers.', 'info');
      });
    }

    // Custom Background Color
    DOM.pickerCustomBg.addEventListener('input', (e) => {
      state.canvasBg = 'custom';
      state.customBgColor = e.target.value;
      setupArtboardDimensions();
    });

    // Typography
    DOM.toggleShowTitles.addEventListener('change', (e) => {
      state.showTitles = e.target.checked;
      renderArtboard();
    });

    DOM.inputHeadingText.addEventListener('input', (e) => {
      state.headingText = e.target.value;
      DOM.canvasMainTitle.textContent = e.target.value;
    });

    DOM.inputSubtitleText.addEventListener('input', (e) => {
      state.subtitleText = e.target.value;
      DOM.canvasSubtitle.textContent = e.target.value;
    });

    DOM.selectFontFamily.addEventListener('change', (e) => {
      state.fontFamily = e.target.value;
      DOM.canvasMainTitle.style.fontFamily = e.target.value;
    });

    DOM.pickerTextColor.addEventListener('input', (e) => {
      state.textColor = e.target.value;
      DOM.canvasMainTitle.style.color = e.target.value;
      DOM.canvasSubtitle.style.color = e.target.value;
    });

    // Accordions
    document.querySelectorAll('.accordion-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        const acc = hdr.closest('.customizer-accordion');
        acc.classList.toggle('open');
      });
    });

    // 5. Modals & Exporting
    DOM.headerExportBtn.addEventListener('click', () => {
      if (state.currentView !== 'studio') switchView('studio');
      DOM.exportModal.style.display = 'flex';
    });
    DOM.studioExportBtn.addEventListener('click', () => {
      DOM.exportModal.style.display = 'flex';
    });
    DOM.closeExportModalBtn.addEventListener('click', () => {
      DOM.exportModal.style.display = 'none';
    });

    // Export preset card selection
    document.querySelectorAll('.export-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.export-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.exportScale = parseFloat(card.dataset.scale);
      });
    });

    // Format selection
    document.querySelectorAll('input[name="export-format"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.exportFormat = e.target.value;
      });
    });

    // Download Button
    DOM.btnDownloadImage.addEventListener('click', async () => {
      showToast('Rendering high-resolution collage...', 'info');
      DOM.btnDownloadImage.textContent = 'Rendering...';
      const canvas = await exportCollageCanvas(state.exportScale);
      DOM.btnDownloadImage.textContent = '⬇️ Download Collage';

      if (!canvas) return;

      const mimeType = state.exportFormat === 'png' ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mimeType, 0.95);
      const link = document.createElement('a');
      link.download = `collagecraft-${state.currentTemplate.id}-${Date.now()}.${state.exportFormat}`;
      link.href = dataUrl;
      link.click();

      showToast('Downloaded high-resolution collage! 🎉', 'success');
      DOM.exportModal.style.display = 'none';
    });

    // Copy to Clipboard
    DOM.btnCopyClipboard.addEventListener('click', async () => {
      showToast('Rendering for clipboard...', 'info');
      const canvas = await exportCollageCanvas(2);
      if (!canvas) return;

      try {
        canvas.toBlob(async (blob) => {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          showToast('Collage copied to clipboard! 📋', 'success');
        });
      } catch (err) {
        showToast('Clipboard access unavailable in this environment', 'info');
      }
    });

    // Print Collage Direct
    DOM.btnPrintCollage.addEventListener('click', async () => {
      showToast('Preparing for print...', 'info');
      const canvas = await exportCollageCanvas(2);
      if (!canvas) return;

      const win = window.open('', '_blank');
      win.document.write(`
        <html>
          <head><title>Print Collage</title></head>
          <body style="margin:0;display:flex;align-items:center;justify-content:center;">
            <img src="${canvas.toDataURL()}" style="max-width:100%;height:auto;"/>
          </body>
        </html>
      `);
      win.document.close();
      win.focus();
      setTimeout(() => {
        win.print();
        win.close();
      }, 350);
    });

    // Slot Edit Modal Controls
    DOM.closeSlotModalBtn.addEventListener('click', closeSlotEditModal);
    DOM.modalSaveSlotBtn.addEventListener('click', () => {
      closeSlotEditModal();
      renderArtboard();
    });

    DOM.modalSliderZoom.addEventListener('input', (e) => {
      if (!state.selectedSlotId || !state.slotAssignments[state.selectedSlotId]) return;
      const val = parseInt(e.target.value, 10);
      state.slotAssignments[state.selectedSlotId].zoom = val;
      DOM.modalZoomVal.textContent = `${val}%`;
      renderArtboard();
    });

    DOM.modalSliderPanX.addEventListener('input', (e) => {
      if (!state.selectedSlotId || !state.slotAssignments[state.selectedSlotId]) return;
      const val = parseInt(e.target.value, 10);
      state.slotAssignments[state.selectedSlotId].panX = val;
      DOM.modalPanXVal.textContent = `${val}px`;
      renderArtboard();
    });

    DOM.modalSliderPanY.addEventListener('input', (e) => {
      if (!state.selectedSlotId || !state.slotAssignments[state.selectedSlotId]) return;
      const val = parseInt(e.target.value, 10);
      state.slotAssignments[state.selectedSlotId].panY = val;
      DOM.modalPanYVal.textContent = `${val}px`;
      renderArtboard();
    });

    DOM.modalRotateLeftBtn.addEventListener('click', () => {
      rotateSlot(state.selectedSlotId, -90);
    });
    DOM.modalRotateRightBtn.addEventListener('click', () => {
      rotateSlot(state.selectedSlotId, 90);
    });
    DOM.modalFlipBtn.addEventListener('click', () => {
      if (!state.selectedSlotId || !state.slotAssignments[state.selectedSlotId]) return;
      state.slotAssignments[state.selectedSlotId].flipX = !state.slotAssignments[state.selectedSlotId].flipX;
      renderArtboard();
    });

    DOM.modalReplacePhotoBtn.addEventListener('click', () => {
      if (state.userPhotos.length > 1) {
        const curPhotoId = state.slotAssignments[state.selectedSlotId]?.photo?.id;
        const available = state.userPhotos.filter(p => p.id !== curPhotoId);
        const randomPhoto = available[Math.floor(Math.random() * available.length)];
        state.slotAssignments[state.selectedSlotId].photo = randomPhoto;
        DOM.slotModalPreviewImg.src = randomPhoto.url;
        renderArtboard();
        showToast('Replaced with photo from tray!', 'info');
      } else {
        showToast('Upload more photos to replace!', 'info');
      }
    });

    DOM.modalRemovePhotoBtn.addEventListener('click', () => {
      if (state.selectedSlotId) {
        delete state.slotAssignments[state.selectedSlotId];
        closeSlotEditModal();
        renderArtboard();
        updateSlotsTracker();
      }
    });

    // Window resize: re-compute artboard viewport
    window.addEventListener('resize', () => {
      if (state.currentView === 'studio') {
        setupArtboardDimensions();
      }
    });
  }

  /* ==========================================================================
     TOAST NOTIFICATION HELPER
     ========================================================================== */
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✨' : 'ℹ️'}</span>
      <span>${message}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', init);

})();
