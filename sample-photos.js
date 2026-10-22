// Curated high quality demo photos for instant 1-click test
// These cover families, couples, babies, puppies, kittens, travel, nature, weddings
const SAMPLE_PHOTOS = [
  {
    id: "sample-1",
    name: "Golden Hour Couple",
    category: "love",
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#e6b89c"
  },
  {
    id: "sample-2",
    name: "Joyful Family Beach",
    category: "family",
    url: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#9ec5db"
  },
  {
    id: "sample-3",
    name: "Playful Golden Retriever",
    category: "pets",
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#dfbc82"
  },
  {
    id: "sample-4",
    name: "Warm Autumn Leaves",
    category: "travel",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#d97443"
  },
  {
    id: "sample-5",
    name: "Sweet Sleeping Baby",
    category: "baby",
    url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#f3c1b6"
  },
  {
    id: "sample-6",
    name: "Cute Tabby Kitten",
    category: "pets",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#c2a68c"
  },
  {
    id: "sample-7",
    name: "Wedding Vows Hug",
    category: "love",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#d2c2b6"
  },
  {
    id: "sample-8",
    name: "Kids Laughing in Meadow",
    category: "family",
    url: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#a3c9a8"
  },
  {
    id: "sample-9",
    name: "Alpine Mountain Hike",
    category: "travel",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#7ea0b7"
  },
  {
    id: "sample-10",
    name: "Cozy Coffee & Notebook",
    category: "scrapbook",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#bfa588"
  },
  {
    id: "sample-11",
    name: "Mother and Daughter Smile",
    category: "family",
    url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#e5b382"
  },
  {
    id: "sample-12",
    name: "Sunset Road Trip Van",
    category: "travel",
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#f4a261"
  },
  {
    id: "sample-13",
    name: "Grandparents Anniversary",
    category: "family",
    url: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#b2abb0"
  },
  {
    id: "sample-14",
    name: "Puppy in Flower Garden",
    category: "pets",
    url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#c7b198"
  },
  {
    id: "sample-15",
    name: "Lavender Fields Sunset",
    category: "travel",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#9b89b3"
  },
  {
    id: "sample-16",
    name: "Sparklers Celebration",
    category: "love",
    url: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#f39c12"
  },
  {
    id: "sample-17",
    name: "Baby First Birthday Cake",
    category: "baby",
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#ffccd5"
  },
  {
    id: "sample-18",
    name: "Vintage Camera & Books",
    category: "scrapbook",
    url: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#a68a73"
  },
  {
    id: "sample-19",
    name: "Father and Son Laughter",
    category: "family",
    url: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#457b9d"
  },
  {
    id: "sample-20",
    name: "Forest Sunlight Canopy",
    category: "travel",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#588157"
  },
  {
    id: "sample-21",
    name: "Charming European Cafe",
    category: "travel",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    fallbackColor: "#d4a373"
  }
];

// Helper to generate a colored SVG placeholder data URL if network is offline
function generatePlaceholderDataUrl(text, color = "#6366f1") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#g)"/>
    <circle cx="300" cy="250" r="80" fill="rgba(255,255,255,0.15)"/>
    <path d="M220 380 Q300 300 380 380 Z" fill="rgba(255,255,255,0.2)"/>
    <text x="300" y="470" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="28" text-anchor="middle" letter-spacing="1">${text}</text>
    <text x="300" y="510" fill="rgba(255,255,255,0.7)" font-family="sans-serif" font-size="16" text-anchor="middle">Ready for your photo</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
