export const locations = [
  "All",
  "Uluwatu",
  "Ubud",
  "Sanur",
  "Canggu",
  "Seminyak",
];

export const weddingConceptVenues = [
  {
    id: 1,
    name: "",
    slogan: "",
    city: "",
    province: "",
    capacity: 0,
    startingPrice: 0,

    classifications: {
      signature: false,
      privateVilla: true,
    },

    weddingConcept: {
      type: "elopement" as "elopement" | "intimate" | null,
      theme: "private_villa",
    },

    images: {
      hero: "https://placehold.net/default.svg",
      gallery: ["https://placehold.net/default.svg"],
    },

    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 2,
    name: "",
    slogan: "",
    city: "",
    province: "",
    capacity: 0,
    startingPrice: 0,

    classifications: {
      signature: true,
      privateVilla: false,
    },

    weddingConcept: {
      type: "intimate" as "elopement" | "intimate" | null,
      theme: "beachfront",
    },

    images: {
      hero: "https://placehold.net/default.svg",
      gallery: ["https://placehold.net/default.svg"],
    },

    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 3,
    name: "",
    slogan: "",
    city: "",
    province: "",
    capacity: 0,
    startingPrice: 0,

    classifications: {
      signature: true,
      privateVilla: false,
    },

    weddingConcept: {
      type: "intimate" as "elopement" | "intimate" | null,
      theme: "garden",
    },

    images: {
      hero: "https://placehold.net/default.svg",
      gallery: ["https://placehold.net/default.svg"],
    },

    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];
