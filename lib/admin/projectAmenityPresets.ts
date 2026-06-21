/**
 * Standard project amenity presets — labels + icons under `/public/images/projects_amenities/`.
 */

export type ProjectAmenityPreset = {
  key: string;
  name: string;
  imageFileName: string;
};

const AMENITY_IMAGE_DIR = "/images/projects_amenities";

/** All selectable amenity presets for the admin project wizard. */
export const PROJECT_AMENITY_PRESETS: readonly ProjectAmenityPreset[] = [
  { key: "preset-cctv", name: "24×7 CCTV Surveillance", imageFileName: "cctv 1.png" },
  { key: "preset-water-supply", name: "24×7 Water Supply", imageFileName: "water-supply 1.png" },
  { key: "preset-office", name: "Boutique Office Spaces", imageFileName: "office 1.png" },
  { key: "preset-box-cricket", name: "Box Cricket", imageFileName: "sports-cricket 1.png" },
  {
    key: "preset-retail-branded",
    name: "Branded Retail & Dining Experience",
    imageFileName: "retail-branded 1.png",
  },
  { key: "preset-business-centre", name: "Business Centre", imageFileName: "business-centre 1.png" },
  { key: "preset-cafe", name: "Café", imageFileName: "cafe 1.png" },
  { key: "preset-cafe-restaurant", name: "Café & Restaurant", imageFileName: "restaurant 1.png" },
  { key: "preset-clubhouse", name: "Clubhouse", imageFileName: "clubhouse 1.png" },
  { key: "preset-pantry", name: "Dedicated Pantry Area", imageFileName: "pantry 1.png" },
  {
    key: "preset-waste-management",
    name: "Efficient Waste Management System",
    imageFileName: "waste-management 1.png",
  },
  {
    key: "preset-lounge",
    name: "Elegant Waiting Lounge & Reception",
    imageFileName: "lounge 1.png",
  },
  { key: "preset-fitness", name: "Fitness Centre", imageFileName: "fitness 1.png" },
  { key: "preset-football-turf", name: "Football Turf", imageFileName: "sports-football 1.png" },
  {
    key: "preset-parking-auto",
    name: "Fully Automated Multi-Level Parking System",
    imageFileName: "parking-auto 1.png",
  },
  { key: "preset-games-zone", name: "Games Zone", imageFileName: "games-zone 1.png" },
  { key: "preset-gazebo", name: "Gazebo", imageFileName: "gazebo 1.png" },
  { key: "preset-clubhouse-grand", name: "Grand Clubhouse", imageFileName: "clubhouse-grand 1.png" },
  { key: "preset-lobby-entrance", name: "Grand Entrance Lobby", imageFileName: "lobby-entrance 1.png" },
  { key: "preset-gymnasium", name: "Gymnasium", imageFileName: "gym 1.png" },
  {
    key: "preset-half-basketball",
    name: "Half Basketball Court",
    imageFileName: "sports-basketball 1.png",
  },
  {
    key: "preset-facade",
    name: "High-Performance Glass Facade",
    imageFileName: "facade 1.png",
  },
  { key: "preset-retail-high", name: "High Retail", imageFileName: "retail-high 1.png" },
  { key: "preset-shopping", name: "High Street Shopping", imageFileName: "shopping 1.png" },
  { key: "preset-elevator", name: "High-Speed Elevators", imageFileName: "elevator 1.png" },
  {
    key: "preset-lobby-lit",
    name: "Illuminated Lobbies & Common Areas",
    imageFileName: "lobby-lit 1.png",
  },
  { key: "preset-indoor-games", name: "Indoor Games", imageFileName: "indoor-games 1.png" },
  { key: "preset-infinity-pool", name: "Infinity Pool", imageFileName: "pool-infinity 1.png" },
  { key: "preset-jodi-options", name: "Jodi Options Available", imageFileName: "jodi-options 1.png" },
  { key: "preset-jogging", name: "Jogging Track", imageFileName: "jogging 1.png" },
  { key: "preset-kids-play", name: "Kids' Play Area", imageFileName: "kids-play 1.png" },
  { key: "preset-kids-pool", name: "Kids' Pool", imageFileName: "pool-kids 1.png" },
  { key: "preset-kids-rock-climbing", name: "Kids' Rock Climbing", imageFileName: "rock-climbing 1.png" },
  {
    key: "preset-retail-large",
    name: "Large Format Retail Frontage",
    imageFileName: "retail-large 1.png",
  },
  { key: "preset-lap-pool", name: "Lap Pool", imageFileName: "pool-lap 1.png" },
  { key: "preset-lobby", name: "Lobby", imageFileName: "lobby 1.png" },
  { key: "preset-badminton", name: "Mini Badminton Court", imageFileName: "sports-badminton 1.png" },
  { key: "preset-mini-theatre", name: "Mini Theatre", imageFileName: "theatre 1.png" },
  { key: "preset-cafeteria", name: "Modern Cafeteria", imageFileName: "cafeteria 1.png" },
  { key: "preset-multipurpose-court", name: "Multipurpose Court", imageFileName: "sports-court 1.png" },
  { key: "preset-multipurpose-hall", name: "Multipurpose Hall", imageFileName: "multipurpose-hall 1.png" },
  { key: "preset-multipurpose-turf", name: "Multipurpose Turf", imageFileName: "sports-turf 1.png" },
  { key: "preset-open-air-theatre", name: "Open Air Theatre", imageFileName: "theatre-outdoor 1.png" },
  { key: "preset-party-hall", name: "Party Hall", imageFileName: "party-hall 1.png" },
  { key: "preset-party-lawn", name: "Party Lawn", imageFileName: "party-lawn 1.png" },
  { key: "preset-pickleball", name: "Pickleball Court", imageFileName: "sports-pickleball 1.png" },
  { key: "preset-pool-deck", name: "Pool Deck", imageFileName: "pool-deck 1.png" },
  { key: "preset-prayer-hall", name: "Prayer Hall", imageFileName: "prayer-hall 1.png" },
  {
    key: "preset-property-management",
    name: "Professional Property Management",
    imageFileName: "property-management 1.png",
  },
  { key: "preset-rock-climbing", name: "Rock Climbing", imageFileName: "rock-climbing 1.png" },
  { key: "preset-rooftop", name: "Rooftop Amenities", imageFileName: "rooftop 1.png" },
  { key: "preset-drive-in", name: "Separate Drive-in & Drop-off", imageFileName: "drive-in 1.png" },
  { key: "preset-seating", name: "Senior Citizen Sit-outs", imageFileName: "seating 1.png" },
  { key: "preset-skating", name: "Skating Rink", imageFileName: "skating 1.png" },
  { key: "preset-sky-lounge", name: "Sky Lounge", imageFileName: "sky-lounge 1.png" },
  { key: "preset-spa", name: "Spa & Sauna", imageFileName: "spa 1.png" },
  {
    key: "preset-parking-stack",
    name: "Stack & Surface Parking",
    imageFileName: "parking-stack 1.png",
  },
  {
    key: "preset-elevator-modern",
    name: "State-of-the-art Elevators",
    imageFileName: "elevator-modern 1.png",
  },
  { key: "preset-swimming-pool", name: "Swimming Pool", imageFileName: "pool-swim 1.png" },
  { key: "preset-terrace-garden", name: "Terrace Garden", imageFileName: "garden-terrace 1.png" },
  {
    key: "preset-water-tank",
    name: "Underground & Overhead Water Tanks",
    imageFileName: "water-tank 1.png",
  },
  { key: "preset-washroom", name: "Washroom Facilities", imageFileName: "washroom 1.png" },
  { key: "preset-yoga-area", name: "Yoga & Meditation Area", imageFileName: "yoga-area 1.png" },
  { key: "preset-yoga-lawn", name: "Yoga Lawn", imageFileName: "yoga-lawn 1.png" },
  { key: "preset-yoga-room", name: "Yoga Room", imageFileName: "yoga-room 1.png" },
] as const;

const PRESET_BY_KEY = new Map(
  PROJECT_AMENITY_PRESETS.map((preset) => [preset.key, preset]),
);

const PRESET_BY_NORMALIZED_NAME = new Map(
  PROJECT_AMENITY_PRESETS.map((preset) => [normalizeAmenityName(preset.name), preset]),
);

/** Normalize amenity labels for fuzzy matching (paste, API load, legacy names). */
export function normalizeAmenityName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(/[''`]/g, "")
    .replace(/\s*&\s*/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isPresetAmenityKey(key: string): boolean {
  return key.startsWith("preset-");
}

export function presetImageSrc(preset: ProjectAmenityPreset): string {
  return `${AMENITY_IMAGE_DIR}/${encodeURIComponent(preset.imageFileName)}`;
}

export function findPresetByKey(key: string): ProjectAmenityPreset | undefined {
  return PRESET_BY_KEY.get(key);
}

export function findPresetByName(name: string): ProjectAmenityPreset | undefined {
  return PRESET_BY_NORMALIZED_NAME.get(normalizeAmenityName(name));
}

export function isPresetLocalImageSrc(src: string | null | undefined): boolean {
  return Boolean(src?.startsWith(`${AMENITY_IMAGE_DIR}/`));
}
