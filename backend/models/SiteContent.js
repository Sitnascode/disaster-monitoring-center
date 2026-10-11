/**
 * models/SiteContent.js
 *
 * Mongoose schema for Dynamic Content Management System (CMS).
 * Stores configurable homepage statistics, hazard descriptions,
 * page hero contents, and footer contact/data source information.
 */
const mongoose = require("mongoose");

const DEFAULT_CONTENT = {
  stats: [
    { num: "6", label: "Hazards Monitored", order: 1, is_active: true },
    { num: "25+", label: "Ethiopian Volcanoes", order: 2, is_active: true },
    {
      num: "Near Real-Time",
      label: "FIRMS Fire Hotspots",
      order: 3,
      is_active: true,
    },
    {
      num: "InSAR+GPS",
      label: "Deformation Tracking",
      order: 4,
      is_active: true,
    },
  ],
  hazards: [
    {
      id: "earthquake",
      title: "Earthquake",
      path: "/hazards/earthquake",
      badge: "Monitor →",
      desc: "We monitor seismic activity to provide early warnings and assess structural vulnerabilities in high-risk zones.",
      is_active: true,
    },
    {
      id: "landslide",
      title: "Landslide",
      path: "/hazards/landslide",
      badge: "Monitor →",
      desc: "Slope stability analysis and identification of areas prone to landslides during heavy rainfall events.",
      is_active: true,
    },
    {
      id: "flood",
      title: "Flood",
      path: "/hazards/flood",
      badge: "Monitor →",
      desc: "Satellite-based flood inundation mapping and river basin monitoring for disaster preparedness and relief coordination.",
      is_active: true,
    },
    {
      id: "volcano",
      title: "Volcano",
      path: "/hazards/volcano",
      badge: "Monitor →",
      desc: "InSAR ground deformation tracking and thermal anomaly detection across the Main Ethiopian Rift volcanic provinces.",
      is_active: true,
    },
    {
      id: "fire",
      title: "Fire",
      path: "/hazards/fire",
      badge: "Monitor →",
      desc: "Near real-time wildfire detection using NASA FIRMS active fire data, burn scar analysis, and vegetation dryness indices.",
      is_active: true,
    },
    {
      id: "drought",
      title: "Drought",
      path: "/hazards/drought",
      badge: "Monitor →",
      desc: "Vegetation health index, precipitation anomalies, and soil moisture monitoring to assess agricultural drought severity.",
      is_active: true,
    },
  ],
  hero: {
    badge: "Geodesy & Geodynamics Department",
    title: "Geodesy and Geodynamics Information Management System",
    subtitle:
      "The centralized digital platform for the Ethiopian Space Science and Geospatial Institute (SSGI), Geodesy and Geodynamics Department. Seamlessly access geodesy and geodynamics services, explore geospatial data products, and collaborate through shared local research.",
    tagline:
      "Centralized Geodesy & Geodynamics Services and Geospatial Intelligence",
    mission:
      "Improving accessibility, efficiency, transparency, and communication across departmental resources and services.",
    aboutSummary:
      "The Geodesy and Geodynamics Information Management System (GGIMS) is a web-based platform developed for the Geodesy and Geodynamics Department of the Ethiopian Space Science and Geospatial Institute (SSGI), Geodesy and Geodynamics Department. Its purpose is to provide a centralized digital platform for accessing the department’s services, information, and geospatial data products and the sharing of research and locally collected data.",
  },
  footer: {
    address:
      "Addis Ababa, Ethiopia\nEthiopian Space Science & Geospatial Institute",
    phone: "+251 (0) 11 XXX XXXX",
    email: "geodesy@ssgi.gov.et",
    emergencyPhone: "8335",
    copyright:
      "Ethiopian Space Science & Geospatial Institute (SSGI). All rights reserved.",
    dataSources: [
      {
        label: "NASA FIRMS (Fire)",
        href: "https://firms.modaps.eosdis.nasa.gov",
        is_active: true,
      },
      {
        label: "USGS Earthquakes",
        href: "https://earthquake.usgs.gov",
        is_active: true,
      },
      {
        label: "NASA GIBS (Imagery)",
        href: "https://earthdata.nasa.gov",
        is_active: true,
      },
      {
        label: "COMET Volcanoes",
        href: "https://cometarchive.leeds.ac.uk/comet-volcano-portal/",
        is_active: true,
      },
      {
        label: "Sentinel-1 / ESA",
        href: "https://sentinels.copernicus.eu",
        is_active: true,
      },
      {
        label: "FloodScan / Aeris",
        href: "https://www.floodscan.com",
        is_active: true,
      },
    ],
  },
};

const siteContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "main_content",
      unique: true,
    },
    stats: [
      {
        num: { type: String, required: true },
        label: { type: String, required: true },
        order: { type: Number, default: 0 },
        is_active: { type: Boolean, default: true },
      },
    ],
    hazards: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        path: { type: String, default: "" },
        badge: { type: String, default: "Monitor →" },
        desc: { type: String, default: "" },
        is_active: { type: Boolean, default: true },
      },
    ],
    hero: {
      badge: { type: String, default: DEFAULT_CONTENT.hero.badge },
      title: { type: String, default: DEFAULT_CONTENT.hero.title },
      subtitle: { type: String, default: DEFAULT_CONTENT.hero.subtitle },
      tagline: { type: String, default: DEFAULT_CONTENT.hero.tagline },
      mission: { type: String, default: DEFAULT_CONTENT.hero.mission },
      aboutSummary: {
        type: String,
        default: DEFAULT_CONTENT.hero.aboutSummary,
      },
    },
    footer: {
      address: { type: String, default: DEFAULT_CONTENT.footer.address },
      phone: { type: String, default: DEFAULT_CONTENT.footer.phone },
      email: { type: String, default: DEFAULT_CONTENT.footer.email },
      emergencyPhone: {
        type: String,
        default: DEFAULT_CONTENT.footer.emergencyPhone,
      },
      copyright: { type: String, default: DEFAULT_CONTENT.footer.copyright },
      dataSources: [
        {
          label: { type: String, required: true },
          href: { type: String, required: true },
          is_active: { type: Boolean, default: true },
        },
      ],
    },
    lastUpdatedBy: {
      type: String,
      default: "System Admin",
    },
  },
  { timestamps: true },
);

siteContentSchema.statics.getDefaultContent = function () {
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
};

module.exports = mongoose.model("SiteContent", siteContentSchema);
