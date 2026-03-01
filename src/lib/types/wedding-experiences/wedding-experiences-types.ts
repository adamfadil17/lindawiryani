// ─── Wedding Experiences Types ────────────────────────────────────────────

export type SlugKey =
  | "private-villa-weddings"
  | "intimate-weddings"
  | "elopement-weddings"
  | "luxury-weddings";
// | "bali-destination-wedding";

export type ExperienceData = {
  meta: { breadcrumb: string; eyebrow: string; slug: string };
  hero: {
    style: "split" | "centered" | "editorial" | "bottom";
    image: string;
    title: string;
    subtitle: string;
    desc: string;
    cta: string;
  };
  intro: {
    label: string;
    heading: string[];
    body: string;
    listLabel: string | null;
    list: string[];
    footnote: string | null;
  };
  approach: {
    label: string;
    heading: string[];
    body: string;
    listLabel: string | null;
    list: string[];
    image: string;
  };
  services: {
    label: string;
    heading: string[];
    list: string[];
    footnote: string;
    darkPanel: {
      label: string;
      heading: string[];
      body: string;
      list: string[];
      cta: string;
    };
  };
  closing: {
    label: string;
    heading: string[];
    body: string;
    image: string;
    coupleLabel: string | null;
    coupleValues: string[];
  };
  faqs: { q: string; a: string }[];
};
