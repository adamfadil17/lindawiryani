export interface Destination {
  id: string;
  name: string;
  slug: string;
  category: "Bali" | "Indonesia";
  type: string;
  description: string;
  longDescription: string;
  location: string;
  highlights: string[];
  atmosphere: string;
  bestFor: string[];
  accessibilityNotes: string;
  seasonalConsiderations: string;
  imageUrl: string;
  guestCapacity: string;
  ceremonyOptions: string[];
  receptionOptions: string[];
  accommodationNearby: string[];
  diningExperiences: string[];
  uniqueFeatures: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface DestinationType {
  name: string;
  description: string;
}
