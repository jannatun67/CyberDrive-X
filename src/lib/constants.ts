import { FeatureItem, CarSpec, GalleryItem, NavLink } from "@/types";

/* ══════════════════════════════════════════════
   APPLICATION CONSTANTS
   ══════════════════════════════════════════════ */

/** Video background URL for Hero section */
export const HERO_VIDEO_URL =
  "https://assets.mixkit.co/videos/preview/mixkit-abstract-fast-motion-lights-in-a-futuristic-tunnel-34446-large.mp4";

/** 3D Car Model URL (GLB format) */
export const CAR_MODEL_URL =
  "https://market.pmnd.rs/model/low-poly-race-car";

// Fallback: a simple box placeholder if the model fails to load
export const USE_PLACEHOLDER_CAR = true;

/** Navigation Links */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Dashboard", href: "#hud" },
  { label: "Gallery", href: "#gallery" },
  { label: "Specs", href: "#specs" },
  { label: "Contact", href: "#footer" },
];

/** Feature Items */
export const FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: "Real-Time 3D",
    description:
      "Experience photorealistic 3D car models rendered in real-time using WebGL and Three.js technology.",
    image: "/Real-Time-3D.gif",
    gradient: "from-neon-blue to-neon-purple",
  },
  {
    id: 2,
    title: "Physics Engine",
    description:
      "Advanced physics simulation for realistic car handling, drift mechanics, and collision detection.",
    image: "/Physics-Engine.gif",
    gradient: "from-neon-purple to-neon-pink",
  },
  {
    id: 3,
    title: "Custom Controls",
    description:
      "Fully remappable WASD/Arrow key controls with gamepad support for the ultimate driving experience.",
    image: "/Custom-Controls.gif",
    gradient: "from-neon-pink to-neon-orange",
  },
  {
    id: 4,
    title: "Nitro Boost",
    description:
      "Activate nitro for an adrenaline rush of speed with stunning visual effects and screen shake.",
    image: "/Nitro-Boost.gif",
    gradient: "from-neon-orange to-neon-green",
  },
  {
    id: 5,
    title: "Multi-Track",
    description:
      "Race through 12+ unique tracks from neon cityscapes to mountain roads and desert highways.",
    image: "/Multi-Track.gif",
    gradient: "from-neon-green to-neon-blue",
  },
  {
    id: 6,
    title: "Leaderboards",
    description:
      "Compete globally with real-time leaderboards and ghost race replays from top players.",
    image: "/Leaderboards.gif",
    gradient: "from-neon-blue to-neon-pink",
  },
];

/** Car Specifications */
export const CAR_SPECS: CarSpec[] = [
  { label: "Top Speed", value: "320", unit: "km/h", barPercent: 90 },
  { label: "Acceleration", value: "2.8", unit: "0-100", barPercent: 95 },
  { label: "Horsepower", value: "720", unit: "HP", barPercent: 80 },
  { label: "Torque", value: "650", unit: "Nm", barPercent: 75 },
  { label: "Weight", value: "1,450", unit: "kg", barPercent: 60 },
  { label: "Downforce", value: "850", unit: "N", barPercent: 85 },
];

/** Gallery Items */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Neon City Sprint",
    subtitle: "Downtown Circuit",
    image: "🌃",
    tag: "Circuit",
  },
  {
    id: 2,
    title: "Desert Storm",
    subtitle: "Sahara Speedway",
    image: "🏜️",
    tag: "Rally",
  },
  {
    id: 3,
    title: "Arctic Drift",
    subtitle: "Frozen Lake Track",
    image: "🏔️",
    tag: "Drift",
  },
  {
    id: 4,
    title: "Coastal Rush",
    subtitle: "Ocean Highway",
    image: "🌊",
    tag: "Sprint",
  },
  {
    id: 5,
    title: "Tunnel Vision",
    subtitle: "Underground Run",
    image: "🚇",
    tag: "Night",
  },
  {
    id: 6,
    title: "Sky Circuit",
    subtitle: "Elevated Raceway",
    image: "☁️",
    tag: "Extreme",
  },
];

/** Gear Ratios for simulation */
export const GEAR_THRESHOLDS = [0, 40, 80, 130, 180, 240, 320];