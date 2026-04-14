"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import type { Portfolio } from "@/types";



export interface ReviewItem {
  couple: string;
  origin: string;
  review: string;
}

export function useReviews(initialReviews?: ReviewItem[]) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews ?? []);
  const [isLoading, setIsLoading] = useState(!initialReviews);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    if (initialReviews) return;

    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setIsError(false);

        const { data } = await axios.get<{ data: Portfolio[] }>(
          "/api/portfolios",
          { params: { limit: 100 } },
        );

        if (cancelled) return;

        const normalized: ReviewItem[] = (data.data ?? [])
          .filter((p) => Boolean(p.review))
          .map((p) => ({
            couple: p.couple,
            origin: p.origin ?? "",
            review: p.review as string,
          }));

        setReviews(normalized);
      } catch {
        if (!cancelled) setIsError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { reviews, isLoading, isError };
}

