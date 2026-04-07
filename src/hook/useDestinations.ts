"use client";

import { useState, useEffect } from "react";

import type { ApiResponse, PaginationMeta } from "@/lib/api-response";
import { Destination, DestinationCategory } from "@/types";

// ─── CategoryId → nama kategori di DB ─────────────────────────────────────────
// Key harus cocok persis dengan field `name` di tabel destination_categories.
// Jika nama di DB berubah, cukup update mapping ini.
const CATEGORY_NAME_MAP: Record<string, string> = {
  "cat-bali": "Bali",
  "cat-themes": "Themes",
  "cat-islands": "Islands",
  "cat-outsite-bali": "Outside Bali",
};

export type CategoryIdMap = Record<string, string>; // categoryKey → DB uuid

export interface UseDestinationsReturn {
  destinations: Destination[];
  categoryIdMap: CategoryIdMap; // { "cat-bali": "uuid-dari-db", ... }
  isLoading: boolean;
  error: string | null;
}

export function useDestinations(): UseDestinationsReturn {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categoryIdMap, setCategoryIdMap] = useState<CategoryIdMap>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        // ── 1. Fetch semua kategori untuk build id-map ──────────────────────
        const catRes = await fetch("/api/destination-categories?limit=100");
        if (!catRes.ok) throw new Error("Failed to fetch categories");

        const catJson: ApiResponse<DestinationCategory[]> & {
          meta?: PaginationMeta;
        } = await catRes.json();

        if (!catJson.success || !catJson.data) {
          throw new Error(catJson.error ?? "Failed to fetch categories");
        }

        // Build map: categoryKey ("cat-bali") → uuid DB
        const idMap: CategoryIdMap = {};
        for (const [key, name] of Object.entries(CATEGORY_NAME_MAP)) {
          const found = catJson.data.find(
            (c) => c.name.toLowerCase() === name.toLowerCase(),
          );
          if (found) idMap[key] = found.id;
        }

        // ── 2. Fetch semua destinations (semua page) ────────────────────────
        // Pertama ambil page 1 untuk tahu total, lalu ambil sisanya paralel
        const firstRes = await fetch("/api/destinations?limit=100&page=1");
        if (!firstRes.ok) throw new Error("Failed to fetch destinations");

        const firstJson: ApiResponse<Destination[]> & {
          meta?: PaginationMeta;
        } = await firstRes.json();

        if (!firstJson.success || !firstJson.data) {
          throw new Error(firstJson.error ?? "Failed to fetch destinations");
        }

        let all = firstJson.data;
        const totalPages = firstJson.meta?.totalPages ?? 1;

        if (totalPages > 1) {
          const pagePromises = Array.from(
            { length: totalPages - 1 },
            (_, i) =>
              fetch(`/api/destinations?limit=100&page=${i + 2}`).then(
                (r) =>
                  r.json() as Promise<
                    ApiResponse<Destination[]> & { meta?: PaginationMeta }
                  >,
              ),
          );
          const rest = await Promise.all(pagePromises);
          all = [
            ...all,
            ...rest.flatMap((r) => (r.success && r.data ? r.data : [])),
          ];
        }

        if (!cancelled) {
          setDestinations(all);
          setCategoryIdMap(idMap);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { destinations, categoryIdMap, isLoading, error };
}