"use client";

import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import type { WeddingExperience, WeddingTheme } from "@/types";
import type { PaginatedResult } from "@/utils/pagination";

export interface ThemeExperienceOption {
  id: string;
  slug: string;
  name: string;
  /** hero_desc dipakai sebagai deskripsi kategori di filter section */
  description: string;
}

export interface UseWeddingThemesReturn {
  experienceOptions: ThemeExperienceOption[];
  themes: WeddingTheme[];

  selectedExperienceId: string;
  setSelectedExperienceId: (id: string) => void;

  selectedExperience: ThemeExperienceOption | undefined;

  isLoadingExperiences: boolean;
  isLoadingThemes: boolean;
  experiencesError: string | null;
  themesError: string | null;
}

export function useWeddingThemes(): UseWeddingThemesReturn {
  const [experienceOptions, setExperienceOptions] = useState<
    ThemeExperienceOption[]
  >([]);
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);
  const [experiencesError, setExperiencesError] = useState<string | null>(null);

  const [themes, setThemes] = useState<WeddingTheme[]>([]);
  const [isLoadingThemes, setIsLoadingThemes] = useState(false);
  const [themesError, setThemesError] = useState<string | null>(null);

  const [selectedExperienceId, setSelectedExperienceId] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchExperiences() {
      setIsLoadingExperiences(true);
      setExperiencesError(null);

      try {
        const { data: json } = await axios.get<
          PaginatedResult<WeddingExperience>
        >("/api/wedding-experiences", { params: { limit: 100 } });
        if (cancelled) return;

        const options: ThemeExperienceOption[] = json.data.map((exp) => ({
          id: exp.id,
          slug: exp.slug,
          name: exp.name,
          description: exp.hero_desc,
        }));

        setExperienceOptions(options);

        if (options.length > 0) {
          setSelectedExperienceId(options[0].id);
        }
      } catch (err) {
        if (!cancelled) {
          const axiosErr = err as AxiosError<{ message?: string }>;
          setExperiencesError(
            axiosErr.response?.data?.message ??
              axiosErr.message ??
              "Something went wrong",
          );
        }
      } finally {
        if (!cancelled) setIsLoadingExperiences(false);
      }
    }

    fetchExperiences();
    return () => {
      cancelled = true;
    };
  }, []);

  const fetchThemes = useCallback(async (experienceId: string) => {
    setIsLoadingThemes(true);
    setThemesError(null);

    try {
      const { data: json } = await axios.get<PaginatedResult<WeddingTheme>>(
        "/api/wedding-themes",
        { params: { experienceId, limit: 100 } },
      );
      setThemes(json.data);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setThemesError(
        axiosErr.response?.data?.message ??
          axiosErr.message ??
          "Something went wrong",
      );
    } finally {
      setIsLoadingThemes(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedExperienceId) return;
    fetchThemes(selectedExperienceId);
  }, [selectedExperienceId, fetchThemes]);

  const selectedExperience = experienceOptions.find(
    (e) => e.id === selectedExperienceId,
  );

  return {
    experienceOptions,
    themes,
    selectedExperienceId,
    setSelectedExperienceId,
    selectedExperience,
    isLoadingExperiences,
    isLoadingThemes,
    experiencesError,
    themesError,
  };
}
