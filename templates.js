// ==========================================================================
// CollageCraft Studio — Clear-Cut Collage Templates (2 to 10 Photos)
// Featuring curated grids, aesthetic layouts, and dainty bows & hearts
// ==========================================================================

const COLLAGE_TEMPLATES = [
  // ------------------------------------------------------------------------
  // 2 PHOTOS TEMPLATES
  // ------------------------------------------------------------------------
  {
    id: "duo-split-vertical",
    title: "Duo Side-by-Side with Satin Ribbon Bow",
    category: "duo",
    categoryLabel: "2 Photos",
    badge: "SWEET DUO",
    photoCount: 2,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Two clean vertical portrait panels side by side, accented with a delicate satin ribbon bow at the top center.",
    tags: ["2 Photos", "Duo", "Couple", "Best Friends", "Bow", "Minimal"],
    bgStyle: "pure-white",
    defaultText: {
      title: "Just The Two Of Us",
      subtitle: "CHAPTER ONE • FOREVER",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 28, y: 52, w: 40, h: 74, shape: "rect", rotation: 0, label: "Left Photo" },
      { id: 2, x: 72, y: 52, w: 40, h: 74, shape: "rect", rotation: 0, label: "Right Photo" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 14, size: 54, rotation: 0 },
      { type: "heart", style: "blush-pink", x: 50, y: 92, size: 26, rotation: 0 }
    ]
  },
  {
    id: "duo-split-horizontal",
    title: "Duo Landscape Horizon with Heart Pin",
    category: "duo",
    categoryLabel: "2 Photos",
    badge: "CLEAN SPLIT",
    photoCount: 2,
    aspectRatio: "4:5",
    width: 1200,
    height: 1500,
    description: "Two stacked panoramic photos crowned with sweet dainty heart badges and a delicate dividing ribbon.",
    tags: ["2 Photos", "Duo", "Landscape", "Travel", "Romantic"],
    bgStyle: "blush-pink",
    defaultText: {
      title: "Golden Days & Sweet Nights",
      subtitle: "MEMORIES TO CHERISH",
      fontFamily: "'Outfit', sans-serif"
    },
    slots: [
      { id: 1, x: 50, y: 32, w: 84, h: 42, shape: "rect", rotation: 0, label: "Top Photo" },
      { id: 2, x: 50, y: 74, w: 84, h: 42, shape: "rect", rotation: 0, label: "Bottom Photo" }
    ],
    decorations: [
      { type: "heart", style: "double-hearts", x: 50, y: 53, size: 36, rotation: 0 },
      { type: "sparkle", style: "gold", x: 88, y: 10, size: 28, rotation: 15 },
      { type: "sparkle", style: "gold", x: 12, y: 94, size: 24, rotation: -10 }
    ]
  },
  {
    id: "duo-polaroid-tilted",
    title: "Twin Polaroid Snaps with Ribbon Bows",
    category: "duo",
    categoryLabel: "2 Photos",
    badge: "COQUETTE",
    photoCount: 2,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Two playfully overlapping polaroid frames pinned with delicate ribbon bows and sweet handwritten captions.",
    tags: ["2 Photos", "Polaroid", "Coquette", "Aesthetic", "Bows"],
    bgStyle: "linen-canvas",
    defaultText: {
      title: "You & Me",
      subtitle: "ALWAYS & EVERYWHERE",
      fontFamily: "'Reenie Beanie', cursive"
    },
    slots: [
      { id: 1, x: 34, y: 52, w: 44, h: 58, shape: "polaroid", rotation: -4, polaroidCaption: "Sun kissed", zIndex: 1 },
      { id: 2, x: 67, y: 52, w: 44, h: 58, shape: "polaroid", rotation: 5, polaroidCaption: "Forever smiles", zIndex: 2 }
    ],
    decorations: [
      { type: "bow", style: "ruby-satin", x: 34, y: 22, size: 44, rotation: -5 },
      { type: "bow", style: "coquette-pink", x: 67, y: 22, size: 44, rotation: 6 },
      { type: "heart", style: "sparkle-heart", x: 50, y: 84, size: 32, rotation: 0 }
    ]
  },

  // ------------------------------------------------------------------------
  // 3 PHOTOS TEMPLATES
  // ------------------------------------------------------------------------
  {
    id: "trio-triptych",
    title: "Classic Triptych Trio with Ribbon Header",
    category: "trio",
    categoryLabel: "3 Photos",
    badge: "POPULAR",
    photoCount: 3,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Three clean vertical slices in perfect symmetry, adorned with a pastel ribbon bow and corner heart accents.",
    tags: ["3 Photos", "Triptych", "Symmetry", "Clean", "Minimal", "Bows"],
    bgStyle: "pure-white",
    defaultText: {
      title: "Three Little Moments",
      subtitle: "EVERY SECOND IS PRECIOUS",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 21, y: 54, w: 26, h: 74, shape: "rect", rotation: 0, label: "Left" },
      { id: 2, x: 50, y: 54, w: 26, h: 74, shape: "rect", rotation: 0, label: "Center" },
      { id: 3, x: 79, y: 54, w: 26, h: 74, shape: "rect", rotation: 0, label: "Right" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 15, size: 50, rotation: 0 },
      { type: "heart", style: "blush-pink", x: 21, y: 93, size: 22, rotation: -12 },
      { type: "heart", style: "blush-pink", x: 79, y: 93, size: 22, rotation: 12 }
    ]
  },
  {
    id: "trio-hero-left",
    title: "Hero Spotlight & Duo Stack with Bow Clip",
    category: "trio",
    categoryLabel: "3 Photos",
    badge: "EDITORIAL",
    photoCount: 3,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "One prominent square hero photo balanced by two stacked landscape shots and a romantic heart pin.",
    tags: ["3 Photos", "Hero", "Editorial", "Modern", "Hearts"],
    bgStyle: "cotton-candy",
    defaultText: {
      title: "Little Joys In Bloom",
      subtitle: "FAVORITE MEMORIES",
      fontFamily: "'Outfit', sans-serif"
    },
    slots: [
      { id: 1, x: 33, y: 52, w: 52, h: 76, shape: "rect", rotation: 0, label: "Hero Feature" },
      { id: 2, x: 76, y: 33, w: 34, h: 36, shape: "rect", rotation: 0, label: "Top Snap" },
      { id: 3, x: 76, y: 71, w: 34, h: 36, shape: "rect", rotation: 0, label: "Bottom Snap" }
    ],
    decorations: [
      { type: "bow", style: "gold-ribbon", x: 33, y: 13, size: 46, rotation: 0 },
      { type: "heart", style: "sparkle-heart", x: 60, y: 52, size: 30, rotation: 0 }
    ]
  },
  {
    id: "trio-stacked-rows",
    title: "Trio Story Strips with Floating Hearts",
    category: "trio",
    categoryLabel: "3 Photos",
    badge: "MINIMALIST",
    photoCount: 3,
    aspectRatio: "4:5",
    width: 1200,
    height: 1500,
    description: "Three widescreen letterbox photo bars with clean margins and delicate heart divider accents.",
    tags: ["3 Photos", "Horizontal", "Film", "Strips", "Hearts"],
    bgStyle: "soft-cream",
    defaultText: {
      title: "Moments In Time",
      subtitle: "PEACE • LOVE • SUNSHINE",
      fontFamily: "'Cinzel', serif"
    },
    slots: [
      { id: 1, x: 50, y: 25, w: 84, h: 26, shape: "rect", rotation: 0, label: "Scene 1" },
      { id: 2, x: 50, y: 53, w: 84, h: 26, shape: "rect", rotation: 0, label: "Scene 2" },
      { id: 3, x: 50, y: 81, w: 84, h: 26, shape: "rect", rotation: 0, label: "Scene 3" }
    ],
    decorations: [
      { type: "heart", style: "blush-pink", x: 12, y: 39, size: 24, rotation: -15 },
      { type: "heart", style: "blush-pink", x: 88, y: 67, size: 24, rotation: 15 },
      { type: "bow", style: "coquette-pink", x: 50, y: 11, size: 42, rotation: 0 }
    ]
  },

  // ------------------------------------------------------------------------
  // 4 PHOTOS TEMPLATES
  // ------------------------------------------------------------------------
  {
    id: "quad-classic-grid",
    title: "Classic 2×2 Quad with Centerpiece Heart",
    category: "quad",
    categoryLabel: "4 Photos",
    badge: "ESSENTIAL",
    photoCount: 4,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "The essential balanced 4-box collage grid with a sweet sparkling heart medallion in the center and corner bows.",
    tags: ["4 Photos", "2x2", "Grid", "Instagram", "Classic", "Heart"],
    bgStyle: "pure-white",
    defaultText: {
      title: "Forever In My Heart",
      subtitle: "COLLECTED MOMENTS",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 28, y: 31, w: 40, h: 40, shape: "rect", rotation: 0, label: "Top Left" },
      { id: 2, x: 72, y: 31, w: 40, h: 40, shape: "rect", rotation: 0, label: "Top Right" },
      { id: 3, x: 28, y: 73, w: 40, h: 40, shape: "rect", rotation: 0, label: "Bottom Left" },
      { id: 4, x: 72, y: 73, w: 40, h: 40, shape: "rect", rotation: 0, label: "Bottom Right" }
    ],
    decorations: [
      { type: "heart", style: "sparkle-heart", x: 50, y: 52, size: 40, rotation: 0 },
      { type: "bow", style: "coquette-pink", x: 12, y: 13, size: 36, rotation: -20 },
      { type: "bow", style: "coquette-pink", x: 88, y: 13, size: 36, rotation: 20 }
    ]
  },
  {
    id: "quad-hero-spotlight",
    title: "Hero Spotlight 1+3 with Coquette Bows",
    category: "quad",
    categoryLabel: "4 Photos",
    badge: "BESTSELLER",
    photoCount: 4,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "One large hero frame occupying the left side with three neat side square tiles and dainty ribbon bows.",
    tags: ["4 Photos", "Hero", "Spotlight", "Fashion", "Bows"],
    bgStyle: "blush-pink",
    defaultText: {
      title: "The Sweetest Story",
      subtitle: "MY WHOLE HEART",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 34, y: 52, w: 52, h: 76, shape: "rect", rotation: 0, label: "Hero Centerpiece" },
      { id: 2, x: 77, y: 25, w: 32, h: 23, shape: "rect", rotation: 0, label: "Snap 01" },
      { id: 3, x: 77, y: 52, w: 32, h: 23, shape: "rect", rotation: 0, label: "Snap 02" },
      { id: 4, x: 77, y: 79, w: 32, h: 23, shape: "rect", rotation: 0, label: "Snap 03" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 34, y: 13, size: 48, rotation: 0 },
      { type: "heart", style: "double-hearts", x: 77, y: 11, size: 28, rotation: 0 }
    ]
  },
  {
    id: "quad-polaroid-pins",
    title: "Quad Polaroid Flatlay with Ribbon Pins",
    category: "quad",
    categoryLabel: "4 Photos",
    badge: "CRAFT",
    photoCount: 4,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Four lightly tilted nostalgic polaroids with ribbon bows, heart stamps, and handwritten memory tags.",
    tags: ["4 Photos", "Polaroid", "Scrapbook", "Bows", "Hearts"],
    bgStyle: "linen-canvas",
    defaultText: {
      title: "Sweet Sunshine Days",
      subtitle: "MEMORIES IN POLAROID",
      fontFamily: "'Reenie Beanie', cursive"
    },
    slots: [
      { id: 1, x: 29, y: 31, w: 38, h: 46, shape: "polaroid", rotation: -3, polaroidCaption: "Morning glow", zIndex: 1 },
      { id: 2, x: 71, y: 31, w: 38, h: 46, shape: "polaroid", rotation: 3, polaroidCaption: "Sweet laughter", zIndex: 2 },
      { id: 3, x: 29, y: 73, w: 38, h: 46, shape: "polaroid", rotation: 2, polaroidCaption: "Golden hours", zIndex: 2 },
      { id: 4, x: 71, y: 73, w: 38, h: 46, shape: "polaroid", rotation: -4, polaroidCaption: "Best moments", zIndex: 1 }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 29, y: 10, size: 38, rotation: -3 },
      { type: "bow", style: "ruby-satin", x: 71, y: 10, size: 38, rotation: 3 },
      { type: "heart", style: "blush-pink", x: 50, y: 52, size: 32, rotation: 0 }
    ]
  },

  // ------------------------------------------------------------------------
  // 5 PHOTOS TEMPLATES
  // ------------------------------------------------------------------------
  {
    id: "coquette-cross-5",
    title: "Coquette Cross Centerpiece with Ribbon Bows",
    category: "coquette-bows",
    categoryLabel: "5 Photos",
    badge: "TRENDING",
    photoCount: 5,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "A prominent centerpiece photo crowned with a delicate ribbon bow, balanced by four symmetrical corner frames and hearts.",
    tags: ["5 Photos", "Coquette", "Cross", "Centerpiece", "Bows", "Love"],
    bgStyle: "blush-pink",
    defaultText: {
      title: "Beloved In Every Way",
      subtitle: "EST. 2026 • LOVE STORY",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 50, y: 52, w: 36, h: 36, shape: "rect", rotation: 0, label: "Centerpiece Hero" },
      { id: 2, x: 23, y: 26, w: 30, h: 30, shape: "rect", rotation: 0, label: "Top Left" },
      { id: 3, x: 77, y: 26, w: 30, h: 30, shape: "rect", rotation: 0, label: "Top Right" },
      { id: 4, x: 23, y: 78, w: 30, h: 30, shape: "rect", rotation: 0, label: "Bottom Left" },
      { id: 5, x: 77, y: 78, w: 30, h: 30, shape: "rect", rotation: 0, label: "Bottom Right" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 32, size: 50, rotation: 0 },
      { type: "heart", style: "blush-pink", x: 50, y: 72, size: 28, rotation: 0 },
      { type: "sparkle", style: "gold", x: 12, y: 12, size: 26, rotation: 10 },
      { type: "sparkle", style: "gold", x: 88, y: 12, size: 26, rotation: -10 }
    ]
  },
  {
    id: "hero-top-quad-bottom-5",
    title: "Panoramic Hero Banner + 4 Quad Snaps",
    category: "classic-grid",
    categoryLabel: "5 Photos",
    badge: "MODERN",
    photoCount: 5,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "One sweeping landscape panoramic photo on top with four clean square photos in a row beneath.",
    tags: ["5 Photos", "Panoramic", "Banner", "Vacation", "Family"],
    bgStyle: "pure-white",
    defaultText: {
      title: "Our Favorite Getaway",
      subtitle: "SUN, SURF & LAUGHTER",
      fontFamily: "'Outfit', sans-serif"
    },
    slots: [
      { id: 1, x: 50, y: 29, w: 86, h: 36, shape: "rect", rotation: 0, label: "Top Panorama" },
      { id: 2, x: 18, y: 72, w: 19, h: 38, shape: "rect", rotation: 0, label: "Snap 1" },
      { id: 3, x: 39, y: 72, w: 19, h: 38, shape: "rect", rotation: 0, label: "Snap 2" },
      { id: 4, x: 61, y: 72, w: 19, h: 38, shape: "rect", rotation: 0, label: "Snap 3" },
      { id: 5, x: 82, y: 72, w: 19, h: 38, shape: "rect", rotation: 0, label: "Snap 4" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 10, size: 44, rotation: 0 },
      { type: "heart", style: "double-hearts", x: 50, y: 50, size: 28, rotation: 0 }
    ]
  },
  {
    id: "editorial-magazine-5",
    title: "Editorial 2+3 Asymmetric Magazine",
    category: "minimal",
    categoryLabel: "5 Photos",
    badge: "LUXURY",
    photoCount: 5,
    aspectRatio: "4:5",
    width: 1200,
    height: 1500,
    description: "Fashion-forward layout with two tall portrait frames on the left and three stacked landscape shots on the right.",
    tags: ["5 Photos", "Editorial", "Magazine", "Aesthetic", "Bows"],
    bgStyle: "soft-cream",
    defaultText: {
      title: "Artistic Elegance",
      subtitle: "SPRING COLLECTION",
      fontFamily: "'Cinzel', serif"
    },
    slots: [
      { id: 1, x: 27, y: 31, w: 40, h: 42, shape: "rect", rotation: 0, label: "Portrait 1" },
      { id: 2, x: 27, y: 74, w: 40, h: 42, shape: "rect", rotation: 0, label: "Portrait 2" },
      { id: 3, x: 73, y: 21, w: 40, h: 24, shape: "rect", rotation: 0, label: "Snap A" },
      { id: 4, x: 73, y: 52, w: 40, h: 30, shape: "rect", rotation: 0, label: "Snap B" },
      { id: 5, x: 73, y: 83, w: 40, h: 24, shape: "rect", rotation: 0, label: "Snap C" }
    ],
    decorations: [
      { type: "bow", style: "gold-ribbon", x: 50, y: 8, size: 42, rotation: 0 },
      { type: "heart", style: "blush-pink", x: 73, y: 38, size: 22, rotation: 0 }
    ]
  },

  // ------------------------------------------------------------------------
  // 6 PHOTOS TEMPLATES
  // ------------------------------------------------------------------------
  {
    id: "grid-classic-6",
    title: "Classic 3×2 Clean Grid with Ribbon Header",
    category: "classic-grid",
    categoryLabel: "6 Photos",
    badge: "POPULAR",
    photoCount: 6,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Six neatly aligned photos in a balanced 3 columns by 2 rows grid, accented with a dainty top ribbon bow.",
    tags: ["6 Photos", "3x2", "Grid", "Family", "Memories", "Bow"],
    bgStyle: "pure-white",
    defaultText: {
      title: "Moments We Cherish",
      subtitle: "HAPPY MEMORIES",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 21, y: 32, w: 27, h: 36, shape: "rect", rotation: 0, label: "01" },
      { id: 2, x: 50, y: 32, w: 27, h: 36, shape: "rect", rotation: 0, label: "02" },
      { id: 3, x: 79, y: 32, w: 27, h: 36, shape: "rect", rotation: 0, label: "03" },
      { id: 4, x: 21, y: 72, w: 27, h: 36, shape: "rect", rotation: 0, label: "04" },
      { id: 5, x: 50, y: 72, w: 27, h: 36, shape: "rect", rotation: 0, label: "05" },
      { id: 6, x: 79, y: 72, w: 27, h: 36, shape: "rect", rotation: 0, label: "06" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 12, size: 48, rotation: 0 },
      { type: "heart", style: "sparkle-heart", x: 50, y: 52, size: 28, rotation: 0 }
    ]
  },
  {
    id: "double-hero-6",
    title: "Dual Top Heroes + 4 Bottom Story Snaps",
    category: "classic-grid",
    categoryLabel: "6 Photos",
    badge: "CLEAN",
    photoCount: 6,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Two prominent feature portraits crowned by a central ribbon bow, with four square detail snaps below.",
    tags: ["6 Photos", "Dual Hero", "Story", "Couple", "Wedding"],
    bgStyle: "blush-pink",
    defaultText: {
      title: "Better Together",
      subtitle: "FOREVER & ALWAYS",
      fontFamily: "'Outfit', sans-serif"
    },
    slots: [
      { id: 1, x: 28, y: 32, w: 42, h: 42, shape: "rect", rotation: 0, label: "Hero 1" },
      { id: 2, x: 72, y: 32, w: 42, h: 42, shape: "rect", rotation: 0, label: "Hero 2" },
      { id: 3, x: 17, y: 75, w: 19, h: 34, shape: "rect", rotation: 0, label: "Snap 1" },
      { id: 4, x: 39, y: 75, w: 19, h: 34, shape: "rect", rotation: 0, label: "Snap 2" },
      { id: 5, x: 61, y: 75, w: 19, h: 34, shape: "rect", rotation: 0, label: "Snap 3" },
      { id: 6, x: 83, y: 75, w: 19, h: 34, shape: "rect", rotation: 0, label: "Snap 4" }
    ],
    decorations: [
      { type: "bow", style: "ruby-satin", x: 50, y: 32, size: 42, rotation: 0 },
      { type: "heart", style: "blush-pink", x: 50, y: 10, size: 30, rotation: 0 }
    ]
  },
  {
    id: "coquette-honeycomb-6",
    title: "Coquette Hex Symmetry with Heart Accents",
    category: "coquette-bows",
    categoryLabel: "6 Photos",
    badge: "COQUETTE",
    photoCount: 6,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Six photos arranged in a sweet symmetrical circle cluster with delicate bows at the top and bottom.",
    tags: ["6 Photos", "Hex", "Circle", "Aesthetic", "Hearts"],
    bgStyle: "cotton-candy",
    defaultText: {
      title: "All Of My Favorites",
      subtitle: "BOUND BY LOVE",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 34, y: 26, w: 26, h: 26, shape: "rect", rotation: 0, label: "Top Left" },
      { id: 2, x: 66, y: 26, w: 26, h: 26, shape: "rect", rotation: 0, label: "Top Right" },
      { id: 3, x: 20, y: 52, w: 26, h: 26, shape: "rect", rotation: 0, label: "Mid Left" },
      { id: 4, x: 80, y: 52, w: 26, h: 26, shape: "rect", rotation: 0, label: "Mid Right" },
      { id: 5, x: 34, y: 78, w: 26, h: 26, shape: "rect", rotation: 0, label: "Bottom Left" },
      { id: 6, x: 66, y: 78, w: 26, h: 26, shape: "rect", rotation: 0, label: "Bottom Right" }
    ],
    decorations: [
      { type: "heart", style: "sparkle-heart", x: 50, y: 52, size: 46, rotation: 0 },
      { type: "bow", style: "coquette-pink", x: 50, y: 12, size: 46, rotation: 0 },
      { type: "bow", style: "coquette-pink", x: 50, y: 92, size: 42, rotation: 0 }
    ]
  },

  // ------------------------------------------------------------------------
  // 7 PHOTOS TEMPLATES
  // ------------------------------------------------------------------------
  {
    id: "pinwheel-gallery-7",
    title: "7-Photo Pinwheel Gallery with Bow Pins",
    category: "classic-grid",
    categoryLabel: "7 Photos",
    badge: "CREATIVE",
    photoCount: 7,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "One center focal photo encircled by six dynamic balanced companion frames with ribbon bow pins.",
    tags: ["7 Photos", "Pinwheel", "Gallery", "Center", "Bows"],
    bgStyle: "pure-white",
    defaultText: {
      title: "Surrounded By Love",
      subtitle: "FAMILY & FRIENDS",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 50, y: 52, w: 34, h: 34, shape: "rect", rotation: 0, label: "Centerpiece" },
      { id: 2, x: 22, y: 24, w: 28, h: 26, shape: "rect", rotation: 0, label: "Top Left" },
      { id: 3, x: 50, y: 19, w: 24, h: 18, shape: "rect", rotation: 0, label: "Top Center" },
      { id: 4, x: 78, y: 24, w: 28, h: 26, shape: "rect", rotation: 0, label: "Top Right" },
      { id: 5, x: 22, y: 78, w: 28, h: 26, shape: "rect", rotation: 0, label: "Bottom Left" },
      { id: 6, x: 50, y: 83, w: 24, h: 18, shape: "rect", rotation: 0, label: "Bottom Center" },
      { id: 7, x: 78, y: 78, w: 28, h: 26, shape: "rect", rotation: 0, label: "Bottom Right" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 34, size: 44, rotation: 0 },
      { type: "heart", style: "blush-pink", x: 50, y: 69, size: 24, rotation: 0 }
    ]
  },
  {
    id: "hero-banner-7",
    title: "Panoramic Top Banner + 6 Story Tiles",
    category: "classic-grid",
    categoryLabel: "7 Photos",
    badge: "CLEAN",
    photoCount: 7,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "One wide panoramic cover photo across the top with six neat grid photos in two rows of three.",
    tags: ["7 Photos", "Banner", "Grid", "Vacation", "Travel"],
    bgStyle: "soft-cream",
    defaultText: {
      title: "Unforgettable Moments",
      subtitle: "SUMMER ARCHIVES",
      fontFamily: "'Outfit', sans-serif"
    },
    slots: [
      { id: 1, x: 50, y: 25, w: 86, h: 32, shape: "rect", rotation: 0, label: "Hero Banner" },
      { id: 2, x: 21, y: 55, w: 27, h: 24, shape: "rect", rotation: 0, label: "A1" },
      { id: 3, x: 50, y: 55, w: 27, h: 24, shape: "rect", rotation: 0, label: "A2" },
      { id: 4, x: 79, y: 55, w: 27, h: 24, shape: "rect", rotation: 0, label: "A3" },
      { id: 5, x: 21, y: 80, w: 27, h: 24, shape: "rect", rotation: 0, label: "B1" },
      { id: 6, x: 50, y: 80, w: 27, h: 24, shape: "rect", rotation: 0, label: "B2" },
      { id: 7, x: 79, y: 80, w: 27, h: 24, shape: "rect", rotation: 0, label: "B3" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 9, size: 44, rotation: 0 },
      { type: "heart", style: "double-hearts", x: 50, y: 41, size: 26, rotation: 0 }
    ]
  },
  {
    id: "asymmetric-mosaic-7",
    title: "7-Photo Coquette Storyboard Mosaic",
    category: "coquette-bows",
    categoryLabel: "7 Photos",
    badge: "AESTHETIC",
    photoCount: 7,
    aspectRatio: "4:5",
    width: 1200,
    height: 1500,
    description: "Three staggered columns of varied photo heights adorned with dainty bows and subtle heart markers.",
    tags: ["7 Photos", "Mosaic", "Staggered", "Coquette", "Aesthetic"],
    bgStyle: "blush-pink",
    defaultText: {
      title: "Pages of Sunshine",
      subtitle: "EVERY SWEET DETAIL",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 20, y: 28, w: 26, h: 34, shape: "rect", rotation: 0 },
      { id: 2, x: 20, y: 68, w: 26, h: 42, shape: "rect", rotation: 0 },
      { id: 3, x: 50, y: 22, w: 28, h: 24, shape: "rect", rotation: 0 },
      { id: 4, x: 50, y: 52, w: 28, h: 32, shape: "rect", rotation: 0 },
      { id: 5, x: 50, y: 82, w: 28, h: 24, shape: "rect", rotation: 0 },
      { id: 6, x: 80, y: 34, w: 26, h: 44, shape: "rect", rotation: 0 },
      { id: 7, x: 80, y: 74, w: 26, h: 32, shape: "rect", rotation: 0 }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 9, size: 42, rotation: 0 },
      { type: "heart", style: "blush-pink", x: 50, y: 37, size: 22, rotation: 0 },
      { type: "heart", style: "blush-pink", x: 50, y: 68, size: 22, rotation: 0 }
    ]
  },

  // ------------------------------------------------------------------------
  // 8 PHOTOS TEMPLATES
  // ------------------------------------------------------------------------
  {
    id: "storyboard-8",
    title: "Classic 4×2 Storyboard Grid with Ribbon Header",
    category: "classic-grid",
    categoryLabel: "8 Photos",
    badge: "BESTSELLER",
    photoCount: 8,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Eight clean-cut photos arranged in two rows of four, perfect for documenting an event or trip.",
    tags: ["8 Photos", "4x2", "Grid", "Storyboard", "Travel", "Bow"],
    bgStyle: "pure-white",
    defaultText: {
      title: "Our Story In Eight Moments",
      subtitle: "COLLECTED TREASURES",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 16, y: 32, w: 20, h: 36, shape: "rect", rotation: 0, label: "01" },
      { id: 2, x: 38.5, y: 32, w: 20, h: 36, shape: "rect", rotation: 0, label: "02" },
      { id: 3, x: 61.5, y: 32, w: 20, h: 36, shape: "rect", rotation: 0, label: "03" },
      { id: 4, x: 84, y: 32, w: 20, h: 36, shape: "rect", rotation: 0, label: "04" },
      { id: 5, x: 16, y: 72, w: 20, h: 36, shape: "rect", rotation: 0, label: "05" },
      { id: 6, x: 38.5, y: 72, w: 20, h: 36, shape: "rect", rotation: 0, label: "06" },
      { id: 7, x: 61.5, y: 72, w: 20, h: 36, shape: "rect", rotation: 0, label: "07" },
      { id: 8, x: 84, y: 72, w: 20, h: 36, shape: "rect", rotation: 0, label: "08" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 12, size: 48, rotation: 0 },
      { type: "heart", style: "sparkle-heart", x: 50, y: 52, size: 30, rotation: 0 }
    ]
  },
  {
    id: "dual-centerpiece-8",
    title: "Dual Centerpiece + 6 Border Snaps with Bows",
    category: "coquette-bows",
    categoryLabel: "8 Photos",
    badge: "COQUETTE",
    photoCount: 8,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Two prominent feature portraits centered inside a frame of six cute square moments with dainty bows.",
    tags: ["8 Photos", "Dual Center", "Frame", "Bows", "Love"],
    bgStyle: "blush-pink",
    defaultText: {
      title: "Forever Love Story",
      subtitle: "ESTABLISHED WITH JOY",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 34, y: 52, w: 28, h: 38, shape: "rect", rotation: 0, label: "Center 1" },
      { id: 2, x: 66, y: 52, w: 28, h: 38, shape: "rect", rotation: 0, label: "Center 2" },
      { id: 3, x: 20, y: 22, w: 24, h: 22, shape: "rect", rotation: 0, label: "Top Left" },
      { id: 4, x: 50, y: 22, w: 30, h: 22, shape: "rect", rotation: 0, label: "Top Mid" },
      { id: 5, x: 80, y: 22, w: 24, h: 22, shape: "rect", rotation: 0, label: "Top Right" },
      { id: 6, x: 20, y: 80, w: 24, h: 22, shape: "rect", rotation: 0, label: "Bot Left" },
      { id: 7, x: 50, y: 80, w: 30, h: 22, shape: "rect", rotation: 0, label: "Bot Mid" },
      { id: 8, x: 80, y: 80, w: 24, h: 22, shape: "rect", rotation: 0, label: "Bot Right" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 32, size: 40, rotation: 0 },
      { type: "heart", style: "double-hearts", x: 50, y: 70, size: 28, rotation: 0 }
    ]
  },
  {
    id: "twin-filmstrips-8",
    title: "Twin Filmstrip Columns with Heart Markers",
    category: "minimal",
    categoryLabel: "8 Photos",
    badge: "RETRO CHIC",
    photoCount: 8,
    aspectRatio: "4:5",
    width: 1200,
    height: 1500,
    description: "Two 4-photo vertical filmstrip reels running side-by-side with heart pins and retro frame borders.",
    tags: ["8 Photos", "Filmstrip", "Twin", "Retro", "Hearts"],
    bgStyle: "soft-cream",
    defaultText: {
      title: "Reels Of Gold",
      subtitle: "35MM KODAK MEMORIES",
      fontFamily: "'Outfit', sans-serif"
    },
    slots: [
      { id: 1, x: 30, y: 20, w: 32, h: 20, shape: "rect", rotation: 0 },
      { id: 2, x: 30, y: 42, w: 32, h: 20, shape: "rect", rotation: 0 },
      { id: 3, x: 30, y: 64, w: 32, h: 20, shape: "rect", rotation: 0 },
      { id: 4, x: 30, y: 86, w: 32, h: 20, shape: "rect", rotation: 0 },
      { id: 5, x: 70, y: 20, w: 32, h: 20, shape: "rect", rotation: 0 },
      { id: 6, x: 70, y: 42, w: 32, h: 20, shape: "rect", rotation: 0 },
      { id: 7, x: 70, y: 64, w: 32, h: 20, shape: "rect", rotation: 0 },
      { id: 8, x: 70, y: 86, w: 32, h: 20, shape: "rect", rotation: 0 }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 30, y: 9, size: 36, rotation: 0 },
      { type: "bow", style: "coquette-pink", x: 70, y: 9, size: 36, rotation: 0 },
      { type: "heart", style: "blush-pink", x: 50, y: 53, size: 32, rotation: 0 }
    ]
  },

  // ------------------------------------------------------------------------
  // 9 PHOTOS TEMPLATES
  // ------------------------------------------------------------------------
  {
    id: "insta-grid-9",
    title: "The Iconic 3×3 Instagram Grid with Center Heart",
    category: "classic-grid",
    categoryLabel: "9 Photos",
    badge: "INSTA ICON",
    photoCount: 9,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "The classic nine-square Instagram grid with clean borders, corner ribbon bows, and sweet heart accents.",
    tags: ["9 Photos", "3x3", "Insta Grid", "Square", "Classic", "Heart"],
    bgStyle: "pure-white",
    defaultText: {
      title: "Nine Sweet Chapters",
      subtitle: "EVERY PHOTO A TREASURE",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 21, y: 23, w: 26, h: 26, shape: "rect", rotation: 0, label: "01" },
      { id: 2, x: 50, y: 23, w: 26, h: 26, shape: "rect", rotation: 0, label: "02" },
      { id: 3, x: 79, y: 23, w: 26, h: 26, shape: "rect", rotation: 0, label: "03" },
      { id: 4, x: 21, y: 52, w: 26, h: 26, shape: "rect", rotation: 0, label: "04" },
      { id: 5, x: 50, y: 52, w: 26, h: 26, shape: "rect", rotation: 0, label: "Center" },
      { id: 6, x: 79, y: 52, w: 26, h: 26, shape: "rect", rotation: 0, label: "06" },
      { id: 7, x: 21, y: 81, w: 26, h: 26, shape: "rect", rotation: 0, label: "07" },
      { id: 8, x: 50, y: 81, w: 26, h: 26, shape: "rect", rotation: 0, label: "08" },
      { id: 9, x: 79, y: 81, w: 26, h: 26, shape: "rect", rotation: 0, label: "09" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 8, size: 44, rotation: 0 },
      { type: "heart", style: "sparkle-heart", x: 50, y: 52, size: 36, rotation: 0 }
    ]
  },
  {
    id: "center-feature-9",
    title: "Center Spotlight 9-Photo Mosaic with Bows",
    category: "coquette-bows",
    categoryLabel: "9 Photos",
    badge: "FAVORITE",
    photoCount: 9,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "One large centerpiece hero photo framed by eight perimeter square snapshots with ribbon bow corners.",
    tags: ["9 Photos", "Centerpiece", "Mosaic", "Bows", "Love"],
    bgStyle: "blush-pink",
    defaultText: {
      title: "You Are My Sunshine",
      subtitle: "ALL MY DAYS WITH YOU",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 50, y: 52, w: 42, h: 42, shape: "rect", rotation: 0, label: "Centerpiece Hero" },
      { id: 2, x: 20, y: 18, w: 22, h: 22, shape: "rect", rotation: 0, label: "Top Left" },
      { id: 3, x: 50, y: 18, w: 32, h: 22, shape: "rect", rotation: 0, label: "Top Mid" },
      { id: 4, x: 80, y: 18, w: 22, h: 22, shape: "rect", rotation: 0, label: "Top Right" },
      { id: 5, x: 16, y: 52, w: 22, h: 38, shape: "rect", rotation: 0, label: "Mid Left" },
      { id: 6, x: 84, y: 52, w: 22, h: 38, shape: "rect", rotation: 0, label: "Mid Right" },
      { id: 7, x: 20, y: 84, w: 22, h: 22, shape: "rect", rotation: 0, label: "Bot Left" },
      { id: 8, x: 50, y: 84, w: 32, h: 22, shape: "rect", rotation: 0, label: "Bot Mid" },
      { id: 9, x: 80, y: 84, w: 22, h: 22, shape: "rect", rotation: 0, label: "Bot Right" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 30, size: 46, rotation: 0 },
      { type: "heart", style: "double-hearts", x: 50, y: 72, size: 28, rotation: 0 }
    ]
  },
  {
    id: "coquette-scrapbook-9",
    title: "9-Photo Coquette Polaroid Scrapbook",
    category: "coquette-bows",
    categoryLabel: "9 Photos",
    badge: "SCRAPBOOK",
    photoCount: 9,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Nine cute polaroid cards arranged with delicate washi tape, ribbon clips, and handwritten date stamps.",
    tags: ["9 Photos", "Polaroid", "Scrapbook", "Coquette", "Bows", "Hearts"],
    bgStyle: "linen-canvas",
    defaultText: {
      title: "Collected Sunshine",
      subtitle: "A BEAUTIFUL LIFE",
      fontFamily: "'Reenie Beanie', cursive"
    },
    slots: [
      { id: 1, x: 21, y: 23, w: 26, h: 30, shape: "polaroid", rotation: -3, polaroidCaption: "Bliss", zIndex: 1 },
      { id: 2, x: 50, y: 23, w: 26, h: 30, shape: "polaroid", rotation: 2, polaroidCaption: "Love", zIndex: 2 },
      { id: 3, x: 79, y: 23, w: 26, h: 30, shape: "polaroid", rotation: -2, polaroidCaption: "Smile", zIndex: 1 },
      { id: 4, x: 21, y: 52, w: 26, h: 30, shape: "polaroid", rotation: 3, polaroidCaption: "Pure", zIndex: 2 },
      { id: 5, x: 50, y: 52, w: 26, h: 30, shape: "polaroid", rotation: -1, polaroidCaption: "Sweet", zIndex: 3 },
      { id: 6, x: 79, y: 52, w: 26, h: 30, shape: "polaroid", rotation: 2, polaroidCaption: "Glow", zIndex: 2 },
      { id: 7, x: 21, y: 81, w: 26, h: 30, shape: "polaroid", rotation: -2, polaroidCaption: "Warm", zIndex: 1 },
      { id: 8, x: 50, y: 81, w: 26, h: 30, shape: "polaroid", rotation: 3, polaroidCaption: "Joy", zIndex: 2 },
      { id: 9, x: 79, y: 81, w: 26, h: 30, shape: "polaroid", rotation: -3, polaroidCaption: "Forever", zIndex: 1 }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 21, y: 8, size: 36, rotation: -4 },
      { type: "bow", style: "ruby-satin", x: 79, y: 8, size: 36, rotation: 4 },
      { type: "heart", style: "blush-pink", x: 50, y: 8, size: 28, rotation: 0 }
    ]
  },

  // ------------------------------------------------------------------------
  // 10 PHOTOS TEMPLATES
  // ------------------------------------------------------------------------
  {
    id: "memory-wall-10",
    title: "10-Photo Complete Memory Wall (5×2 Grid)",
    category: "classic-grid",
    categoryLabel: "10 Photos",
    badge: "MAX CAPACITY",
    photoCount: 10,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Ten crisp rectangular photos in two balanced rows of five, topped with a delicate ribbon bow emblem.",
    tags: ["10 Photos", "5x2", "Memory Wall", "Family", "Year in Review"],
    bgStyle: "pure-white",
    defaultText: {
      title: "Our Year In Ten Moments",
      subtitle: "CHERISHED MEMORIES • 2026",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 13, y: 32, w: 16.5, h: 36, shape: "rect", rotation: 0, label: "01" },
      { id: 2, x: 31.5, y: 32, w: 16.5, h: 36, shape: "rect", rotation: 0, label: "02" },
      { id: 3, x: 50, y: 32, w: 16.5, h: 36, shape: "rect", rotation: 0, label: "03" },
      { id: 4, x: 68.5, y: 32, w: 16.5, h: 36, shape: "rect", rotation: 0, label: "04" },
      { id: 5, x: 87, y: 32, w: 16.5, h: 36, shape: "rect", rotation: 0, label: "05" },
      { id: 6, x: 13, y: 72, w: 16.5, h: 36, shape: "rect", rotation: 0, label: "06" },
      { id: 7, x: 31.5, y: 72, w: 16.5, h: 36, shape: "rect", rotation: 0, label: "07" },
      { id: 8, x: 50, y: 72, w: 16.5, h: 36, shape: "rect", rotation: 0, label: "08" },
      { id: 9, x: 68.5, y: 72, w: 16.5, h: 36, shape: "rect", rotation: 0, label: "09" },
      { id: 10, x: 87, y: 72, w: 16.5, h: 36, shape: "rect", rotation: 0, label: "10" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 12, size: 48, rotation: 0 },
      { type: "heart", style: "sparkle-heart", x: 50, y: 52, size: 28, rotation: 0 }
    ]
  },
  {
    id: "dual-heroes-10",
    title: "Dual Top Heroes + 8 Bottom Story Tiles",
    category: "classic-grid",
    categoryLabel: "10 Photos",
    badge: "STORYBOARD",
    photoCount: 10,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Two prominent feature portraits crowned with a ribbon bow, followed by eight neat story squares in two rows of four.",
    tags: ["10 Photos", "Dual Hero", "Story", "Wedding", "Baby", "Love"],
    bgStyle: "blush-pink",
    defaultText: {
      title: "Ten Chapters Of Love",
      subtitle: "MEMORIES TO LAST FOREVER",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      { id: 1, x: 30, y: 28, w: 38, h: 36, shape: "rect", rotation: 0, label: "Hero A" },
      { id: 2, x: 70, y: 28, w: 38, h: 36, shape: "rect", rotation: 0, label: "Hero B" },
      { id: 3, x: 16, y: 59, w: 19, h: 20, shape: "rect", rotation: 0, label: "03" },
      { id: 4, x: 38.5, y: 59, w: 19, h: 20, shape: "rect", rotation: 0, label: "04" },
      { id: 5, x: 61.5, y: 59, w: 19, h: 20, shape: "rect", rotation: 0, label: "05" },
      { id: 6, x: 84, y: 59, w: 19, h: 20, shape: "rect", rotation: 0, label: "06" },
      { id: 7, x: 16, y: 82, w: 19, h: 20, shape: "rect", rotation: 0, label: "07" },
      { id: 8, x: 38.5, y: 82, w: 19, h: 20, shape: "rect", rotation: 0, label: "08" },
      { id: 9, x: 61.5, y: 82, w: 19, h: 20, shape: "rect", rotation: 0, label: "09" },
      { id: 10, x: 84, y: 82, w: 19, h: 20, shape: "rect", rotation: 0, label: "10" }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 28, size: 44, rotation: 0 },
      { type: "heart", style: "blush-pink", x: 50, y: 9, size: 28, rotation: 0 }
    ]
  },
  {
    id: "heart-arch-10",
    title: "Romantic 10-Photo Heart Arch & Bows",
    category: "coquette-bows",
    categoryLabel: "10 Photos",
    badge: "ROMANTIC",
    photoCount: 10,
    aspectRatio: "1:1",
    width: 1200,
    height: 1200,
    description: "Ten photos arranged in a sweet symmetrical romantic heart arch, accented with dainty pink bows and floating hearts.",
    tags: ["10 Photos", "Heart Arch", "Romantic", "Coquette", "Bows", "Hearts"],
    bgStyle: "cotton-candy",
    defaultText: {
      title: "Forever In My Heart",
      subtitle: "A DECADE OF SWEET MOMENTS",
      fontFamily: "'Playfair Display', serif"
    },
    slots: [
      // Top curve lobes
      { id: 1, x: 34, y: 19, w: 16, h: 16, shape: "rect", rotation: 0 },
      { id: 2, x: 66, y: 19, w: 16, h: 16, shape: "rect", rotation: 0 },
      // Upper outer
      { id: 3, x: 18, y: 34, w: 18, h: 18, shape: "rect", rotation: 0 },
      { id: 4, x: 82, y: 34, w: 18, h: 18, shape: "rect", rotation: 0 },
      // Center heroes
      { id: 5, x: 36, y: 44, w: 22, h: 26, shape: "rect", rotation: 0, label: "Hero Left" },
      { id: 6, x: 64, y: 44, w: 22, h: 26, shape: "rect", rotation: 0, label: "Hero Right" },
      // Lower outer
      { id: 7, x: 23, y: 65, w: 18, h: 18, shape: "rect", rotation: 0 },
      { id: 8, x: 77, y: 65, w: 18, h: 18, shape: "rect", rotation: 0 },
      // Tapering bottom
      { id: 9, x: 38, y: 79, w: 16, h: 16, shape: "rect", rotation: 0 },
      { id: 10, x: 62, y: 79, w: 16, h: 16, shape: "rect", rotation: 0 }
    ],
    decorations: [
      { type: "bow", style: "coquette-pink", x: 50, y: 12, size: 48, rotation: 0 },
      { type: "heart", style: "sparkle-heart", x: 50, y: 44, size: 36, rotation: 0 },
      { type: "bow", style: "coquette-pink", x: 50, y: 88, size: 38, rotation: 0 }
    ]
  }
];

// Available canvas background presets
const BACKGROUND_PRESETS = [
  { id: "pure-white", name: "Clean Pure White", type: "color", color: "#ffffff", border: "#e2e8f0" },
  { id: "blush-pink", name: "Coquette Blush Pink", type: "color", color: "#fff0f3", border: "#ffd1dc" },
  { id: "soft-cream", name: "Artisan Butter Cream", type: "color", color: "#fdfbf7", border: "#f3e8d8" },
  { id: "cotton-candy", name: "Cotton Candy Gradient", type: "gradient", color: "#fff0f5", border: "#fbcfe8" },
  { id: "sunset-blush", name: "Sunset Peach Gradient", type: "gradient", color: "#fff7ed", border: "#fed7aa" },
  { id: "champagne", name: "Champagne Shimmer", type: "gradient", color: "#fefce8", border: "#fef08a" },
  { id: "lavender-mist", name: "Lavender Dream", type: "color", color: "#fbf7ff", border: "#e9d5ff" },
  { id: "mint-frost", name: "Matcha & Mint", type: "color", color: "#f0fdf4", border: "#bbf7d0" },
  { id: "cloud-sky", name: "Powder Sky Blue", type: "color", color: "#f0f9ff", border: "#bae6fd" },
  { id: "mini-hearts", name: "Mini Hearts Pattern", type: "pattern", color: "#fff1f2", border: "#fecdd3" },
  { id: "dainty-bows", name: "Dainty Bows Pattern", type: "pattern", color: "#fff0f7", border: "#f5d0fe" },
  { id: "gingham-check", name: "Pastel Gingham", type: "pattern", color: "#f8fafc", border: "#cbd5e1" },
  { id: "polka-dots", name: "Soft Polka Dots", type: "pattern", color: "#fdfbf7", border: "#e2e8f0" },
  { id: "linen-canvas", name: "Textured Linen", type: "texture", color: "#f8f6f0", border: "#e5e0d4" },
  { id: "dark-slate", name: "Velvet Charcoal Noir", type: "color", color: "#131722", border: "#2d3748" }
];

// Available photo color filters
const PHOTO_FILTERS = [
  { id: "normal", name: "Original Vibrant", css: "none" },
  { id: "coquette-pink", name: "Coquette Pink", css: "sepia(0.18) saturate(1.25) hue-rotate(-8deg) contrast(1.04) brightness(1.05)" },
  { id: "soft-glow", name: "Soft Luminous Glow", css: "contrast(0.95) brightness(1.12) saturate(1.1)" },
  { id: "warm-vintage", name: "Warm Vintage", css: "sepia(0.28) contrast(1.08) brightness(1.04) saturate(1.18)" },
  { id: "golden-hour", name: "Golden Glow", css: "sepia(0.35) saturate(1.3) hue-rotate(-12deg) brightness(1.05)" },
  { id: "black-white", name: "Silver B&W", css: "grayscale(1) contrast(1.2) brightness(1.02)" },
  { id: "pastel-dream", name: "Pastel Dream", css: "contrast(0.92) brightness(1.1) saturate(0.9) hue-rotate(4deg)" }
];

// Available Bow & Heart Accent Styles & Stickers
const DECORATION_ASSETS = {
  bows: [
    { id: "coquette-pink", name: "Coquette Pink Bow", color: "#f472b6" },
    { id: "ruby-satin", name: "Ruby Satin Bow", color: "#e11d48" },
    { id: "lavender-dream", name: "Lavender Bow", color: "#c084fc" },
    { id: "gold-ribbon", name: "Champagne Gold Bow", color: "#fbbf24" },
    { id: "butter-cream", name: "Buttercream Bow", color: "#fde047" },
    { id: "pure-white", name: "Pearl White Bow", color: "#ffffff" },
    { id: "minimal-line", name: "Dainty Line Bow", color: "#334155" }
  ],
  hearts: [
    { id: "blush-pink", name: "Blush Pink Heart", color: "#fb7185" },
    { id: "crimson-red", name: "Crimson Red Heart", color: "#e11d48" },
    { id: "double-hearts", name: "Double Love Hearts", color: "#f43f5e" },
    { id: "sparkle-heart", name: "Sparkling Heart", color: "#ec4899" },
    { id: "lilac-heart", name: "Lilac Heart", color: "#c084fc" },
    { id: "gold-heart", name: "Gold Heart", color: "#f59e0b" },
    { id: "line-heart", name: "Dainty Outline Heart", color: "#475569" }
  ],
  stickers: [
    { id: "sticker-bow-pink", type: "bow", style: "coquette-pink", label: "🎀 Pink Ribbon Bow" },
    { id: "sticker-bow-ruby", type: "bow", style: "ruby-satin", label: "🎀 Ruby Satin Bow" },
    { id: "sticker-bow-gold", type: "bow", style: "gold-ribbon", label: "🎀 Golden Ribbon Bow" },
    { id: "sticker-heart-blush", type: "heart", style: "blush-pink", label: "❤️ Blush Heart" },
    { id: "sticker-heart-sparkle", type: "heart", style: "sparkle-heart", label: "💖 Sparkle Heart" },
    { id: "sticker-heart-double", type: "heart", style: "double-hearts", label: "💕 Double Hearts" },
    { id: "sticker-sparkle", type: "sparkle", style: "gold", label: "✨ Magic Sparkles" },
    { id: "sticker-star", type: "star", style: "gold", label: "⭐ Dainty Star" },
    { id: "sticker-flower", type: "flower", style: "pink", label: "🌸 Cherry Blossom" },
    { id: "sticker-butterfly", type: "butterfly", style: "lavender", label: "🦋 Pastel Butterfly" }
  ]
};

if (typeof module !== "undefined") {
  module.exports = { COLLAGE_TEMPLATES, BACKGROUND_PRESETS, PHOTO_FILTERS, DECORATION_ASSETS };
}
