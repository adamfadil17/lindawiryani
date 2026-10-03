/**
 * Language-neutral our-approach fields. Shared by every locale — edit once here.
 * Copy lives in translate/<locale>/our-approach-text.<locale>.ts.
 */
export interface OurApproachContent {
  /** Dikunci per nomor fase ("01".."04") */
  phases: Record<string, { title: string; desc: string }>;
  pillars: string[];
  specializations: string[];
  designQualities: string[];
}

/** Urutan fase; teksnya dikunci per nomor. */
export const phaseNumbers: string[] = ["01","02","03","04"];
