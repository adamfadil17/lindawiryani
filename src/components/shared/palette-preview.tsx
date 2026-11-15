"use client";

import { useEffect } from "react";

/**
 * Palette mockup switcher (design review only).
 *
 * Open any page with ?palette=rosewood-mauve | deep-plum | cocoa-taupe to
 * compare the three candidate primary colours on the exact same layout and
 * photos. The choice is remembered for the browser session.
 *
 * Disabled unless NEXT_PUBLIC_PALETTE_PREVIEW=1, so production is untouched.
 * Remove this file (and its usage in app/[locale]/layout.tsx) once a palette
 * has been chosen.
 */
const PALETTES = ["rosewood-mauve", "deep-plum", "cocoa-taupe"];

export default function PalettePreview() {
  useEffect(() => {
    const root = document.documentElement;
    const fromUrl = new URLSearchParams(window.location.search).get("palette");
    let chosen: string | null = null;
    try {
      if (fromUrl && PALETTES.includes(fromUrl)) {
        sessionStorage.setItem("palette", fromUrl);
      }
      chosen = sessionStorage.getItem("palette");
    } catch {
      chosen = fromUrl && PALETTES.includes(fromUrl) ? fromUrl : null;
    }
    if (chosen && PALETTES.includes(chosen)) {
      root.setAttribute("data-palette", chosen);
    }
  }, []);

  return null;
}
