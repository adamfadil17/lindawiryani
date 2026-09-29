import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware drop-in replacements for next/link, next/navigation's
 * useRouter/usePathname/redirect. Always import these (not the
 * next/* originals) inside src/app/[locale]/(public)/** and shared
 * components used there, so links automatically keep/add the correct
 * locale prefix.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
