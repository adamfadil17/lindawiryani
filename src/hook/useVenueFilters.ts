"use client";

import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import type { WeddingExperience, Venue } from "@/types";
import { PaginatedResult } from "@/utils";

export interface UseVenueFiltersReturn {

  experiences: WeddingExperience[];
  venues: Venue[];
  locations: string[];


  selectedExperienceSlug: string;
  selectedLocation: string;
  setSelectedExperienceSlug: (slug: string) => void;
  setSelectedLocation: (location: string) => void;


  selectedExperience: WeddingExperience | undefined;
  totalVenuesCount: number;


  isLoadingExperiences: boolean;
  isLoadingVenues: boolean;
  experiencesError: string | null;
  venuesError: string | null;
}



export function useVenueFilters(): UseVenueFiltersReturn {

  const [experiences, setExperiences] = useState<WeddingExperience[]>([]);
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);
  const [experiencesError, setExperiencesError] = useState<string | null>(null);


  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoadingVenues, setIsLoadingVenues] = useState(false);
  const [venuesError, setVenuesError] = useState<string | null>(null);


  const [selectedExperienceSlug, setSelectedExperienceSlug] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");


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

        setExperiences(json.data);


        if (json.data.length > 0) {
          setSelectedExperienceSlug(json.data[0].slug);
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


  const fetchVenues = useCallback(async (experienceId: string) => {
    setIsLoadingVenues(true);
    setVenuesError(null);

    try {
      const { data: json } = await axios.get<PaginatedResult<Venue>>(
        "/api/venues",
        { params: { experienceId, limit: 100 } },
      );
      setVenues(json.data);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setVenuesError(
        axiosErr.response?.data?.message ??
          axiosErr.message ??
          "Something went wrong",
      );
    } finally {
      setIsLoadingVenues(false);
    }
  }, []);

  const selectedExperience = experiences.find(
    (e) => e.slug === selectedExperienceSlug,
  );

  useEffect(() => {
    if (!selectedExperience) return;


    setSelectedLocation("All");
    fetchVenues(selectedExperience.id);
  }, [selectedExperience?.id, fetchVenues]);


  const locations = [
    "All",
    ...Array.from(
      new Set(
        venues.map((v) => v.destination?.name).filter(Boolean) as string[],
      ),
    ),
  ];


  const filteredVenues =
    selectedLocation === "All"
      ? venues
      : venues.filter((v) => v.destination?.name === selectedLocation);

  return {

    experiences,
    venues: filteredVenues,
    locations,


    selectedExperienceSlug,
    selectedLocation,
    setSelectedExperienceSlug,
    setSelectedLocation,


    selectedExperience,
    totalVenuesCount: filteredVenues.length,


    isLoadingExperiences,
    isLoadingVenues,
    experiencesError,
    venuesError,
  };
}
