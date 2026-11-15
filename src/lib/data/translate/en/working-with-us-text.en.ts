import type { WorkingWithUsContent } from "@/lib/data/base/working-with-us-base";

// Teks working-with-us (en). Dikunci per key; urutan ada di base/.
export const content: WorkingWithUsContent = {
  vendorCategories: {
    photography: "Photography",
    videography: "Videography",
    "floral-decor": "Floral & Décor",
    "catering-fb": "Catering & F&B",
    "live-music-entertainment": "Live Music & Entertainment",
    "hair-makeup": "Hair & Makeup",
    "lighting-av": "Lighting & AV",
    transportation: "Transportation",
    "stationery-printing": "Stationery & Printing",
    venue: "Venue",
    other: "Other",
  },
  openPositions: {
    "wedding-planner-coordinator": {
      title: "Wedding Planner & Coordinator",
      type: "Full-time",
      level: "Mid–Senior",
      desc: "Lead end-to-end planning and on-site execution of luxury destination weddings in Bali.",
    },
    "creative-design-consultant": {
      title: "Creative Design Consultant",
      type: "Full-time",
      level: "Senior",
      desc: "Conceptualise and deliver bespoke aesthetic narratives, mood boards, and design proposals for couples.",
    },
    "client-relations-executive": {
      title: "Client Relations Executive",
      type: "Full-time",
      level: "Mid-level",
      desc: "Be the first point of contact for international couples, managing inquiries, consultations, and ongoing communication.",
    },
    "social-media-content-creator": {
      title: "Social Media & Content Creator",
      type: "Part-time / Freelance",
      level: "All levels",
      desc: "Capture and craft compelling content from our events for Instagram, Pinterest, and beyond.",
    },
  },
  vendorValues: {
    "01": {
      title: "Aesthetic Alignment",
      desc: "We partner only with vendors whose work reflects our standard of beauty and intentionality.",
    },
    "02": {
      title: "Reliability & Craft",
      desc: "Consistency in quality and professionalism across every event we produce together.",
    },
    "03": {
      title: "Collaborative Spirit",
      desc: "We believe great weddings are co-created — not just coordinated.",
    },
    "04": {
      title: "Cultural Sensitivity",
      desc: "A deep respect for the traditions and meanings embedded in each ceremony.",
    },
  },
};
