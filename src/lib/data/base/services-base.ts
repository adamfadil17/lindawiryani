/**
 * Language-neutral services fields. Shared by every locale — edit once here.
 * Copy lives in translate/<locale>/services-text.<locale>.ts.
 */
export interface ServiceBase {
  id: string;
  image: string;
}

export interface ServiceText {
  name: string;
  tag: string;
  intro: string;
  includes: { title: string; items: string[] };
  bestFor: { title: string; desc: string };
}

export interface ServicesContent {
  /** Dikunci per service id */
  services: Record<string, ServiceText>;
  /** Dikunci per nomor ("01".."05") */
  whyChooseReasons: Record<string, { title: string; desc: string }>;
  serviceDestinations: string[];
}

export const serviceBase: ServiceBase[] = [
  {
    id: "full-wedding-planning",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156578/wedding_planning_and_coordination_image_xyk5vc.jpg",
  },
  {
    id: "wedding-styling",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156589/wedding_styling_and_creative_direction_uumx9i.jpg",
  },
  {
    id: "private-villa-weddings",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156579/private_villa_wedding_ilxyat.jpg",
  },
  {
    id: "intimate-elopements",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156578/intimate_wedding_image_pymvex.jpg",
  },
  {
    id: "concept-consultation",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156578/wedding_concept_and_design_consultation_f9bkii.jpg",
  },
  {
    id: "event-table-styling",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156579/table_styling_bh7pkk.jpg",
  },
  {
    id: "guest-management",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156589/destination_guest_management_vf4ir2.jpg",
  },
];

/** Urutan kartu "Why choose us"; teksnya dikunci per nomor. */
export const whyChooseNumbers: string[] = ["01","02","03","04","05"];
