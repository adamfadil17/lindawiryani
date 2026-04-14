"use client";

import { useEffect, useCallback, useReducer, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  MapPin,
  Building2,
  Users,
  DollarSign,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Venue } from "@/types";
import DeleteModal from "@/components/shared/delete-modal";
import type { PaginationMeta } from "@/lib/api-response";
import { toast } from "sonner";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

const LIMIT = 6;

interface FilterOption {
  id: string;
  name: string;
}

interface ExperienceFilterOption extends FilterOption {
  category: string;
}

interface VenueFilters {
  destinations: FilterOption[];
  experiences: ExperienceFilterOption[];
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-primary/20 animate-pulse">
      <div className="aspect-[16/9] bg-primary/10" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-primary/10 w-1/3 rounded" />
        <div className="h-4 bg-primary/10 w-2/3 rounded" />
        <div className="h-3 bg-primary/10 w-1/4 rounded" />
        <div className="h-3 bg-primary/10 w-full rounded" />
        <div className="h-3 bg-primary/10 w-5/6 rounded" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 bg-primary/10 w-16 rounded" />
          <div className="h-5 bg-primary/10 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}

function SkeletonStatCard() {
  return (
    <div className="p-5 border border-primary/20 bg-white animate-pulse">
      <div className="h-3 bg-primary/10 w-2/3 rounded mb-3" />
      <div className="h-7 bg-primary/10 w-10 rounded" />
    </div>
  );
}

function VenueCard({
  venue,
  onDelete,
}: {
  venue: Venue;
  onDelete: (venue: Venue) => void;
}) {
  const galleryCount = venue.gallery?.length ?? 0;

  const experienceBadgeClass: Record<string, string> = {
    luxury_weddings: "bg-amber-500 text-white",
    private_villa_weddings: "bg-teal-500 text-white",
    intimate_weddings: "bg-violet-500 text-white",
    elopement_weddings: "bg-rose-500 text-white",
  };

  const badgeClass =
    experienceBadgeClass[venue.experience?.category ?? ""] ??
    "bg-primary text-white";

  return (
    <div className="bg-white border border-primary/20 group hover:border-primary/30 transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={venue.image || "https://placehold.net/default.svg"}
          alt={venue.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {venue.experience && (
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1.5 text-xs tracking-widest uppercase px-2.5 py-1 font-medium ${badgeClass}`}
            >
              <Building2 className="w-3 h-3" />
              {venue.experience.name}
            </span>
          </div>
        )}

        {galleryCount > 0 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs tracking-widest uppercase px-2 py-1">
            +{galleryCount} photos
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <div className="flex items-center gap-1 text-primary/60 text-xs tracking-widest uppercase mb-1">
            <MapPin className="w-3 h-3" />
            {venue.destination?.name ?? venue.destination_id}
          </div>
          <h3 className="text-primary font-semibold text-base leading-snug">
            {venue.name}
          </h3>
          {venue.slogan && (
            <p className="text-primary/50 text-xs italic mt-0.5">
              {venue.slogan}
            </p>
          )}
        </div>

        <p className="text-primary/80 text-sm leading-relaxed line-clamp-2 mb-4">
          {venue.description}
        </p>

        <div className="flex items-center gap-3 mb-5 text-xs text-primary/80">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {venue.capacity} guests
          </span>
          <span className="text-primary/20">·</span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            from IDR{Number(venue.starting_price).toLocaleString()}
          </span>
        </div>

        <div className="flex gap-2 mb-5">
          {venue.experience && (
            <span className="text-xs tracking-widest uppercase px-2 py-0.5 bg-primary/5 text-primary/60 border border-primary/20">
              {venue.experience.name}
            </span>
          )}
          {venue.destination && (
            <span className="text-xs tracking-widest uppercase px-2 py-0.5 bg-primary/10 text-primary/80 border border-primary/20">
              {venue.destination.type}
            </span>
          )}
        </div>

        <div className="border-t border-primary/20 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary/80 font-semibold tracking-wider">
              {venue.slug}
            </span>
            <div className="flex items-center gap-1">
              <Link
                href={`/venues/${venue.slug}`}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="View Public Page"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <Link
                href={`/dashboard/venues/${venue.id}`}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="Edit Venue"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <button
                onClick={() => onDelete(venue)}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete Venue"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({
  value,
  onChange,
  options,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
  disabled?: boolean;
}) {
  const isActive = value !== "all";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`appearance-none h-full pl-3 pr-8 py-2.5 text-sm tracking-widest border focus:outline-none focus:border-primary/50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          isActive
            ? "bg-primary text-white border-primary"
            : "bg-white text-primary/60 border-primary/20 hover:border-primary/40 hover:text-primary/80"
        }`}
      >
        {options.map((opt) => (
          <option
            key={opt.id}
            value={opt.id}
            className="bg-white text-primary normal-case font-normal tracking-normal"
          >
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className={`w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${
          isActive ? "text-white/70" : "text-primary/40"
        }`}
      />
    </div>
  );
}

function Pagination({
  meta,
  onPageChange,
}: {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1);

  const getVisiblePages = (): (number | "...")[] => {
    if (meta.totalPages <= 7) return pages;
    const range: (number | "...")[] = [];
    if (meta.page <= 4) {
      range.push(...pages.slice(0, 5), "...", meta.totalPages);
    } else if (meta.page >= meta.totalPages - 3) {
      range.push(1, "...", ...pages.slice(meta.totalPages - 5));
    } else {
      range.push(
        1,
        "...",
        meta.page - 1,
        meta.page,
        meta.page + 1,
        "...",
        meta.totalPages,
      );
    }
    return range;
  };

  if (meta.total === 0) return null;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary/20">
      <p className="text-primary/60 text-xs tracking-wider">
        Showing{" "}
        <span className="text-primary font-medium">
          {(meta.page - 1) * meta.limit + 1}–
          {Math.min(meta.page * meta.limit, meta.total)}
        </span>{" "}
        of <span className="text-primary font-medium">{meta.total}</span> venues
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!meta.hasPrev}
          className="w-8 h-8 flex items-center justify-center border border-primary/50 text-primary/50 hover:text-primary hover:border-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getVisiblePages().map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="w-8 h-8 flex items-center justify-center text-primary/40 text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`w-8 h-8 flex items-center justify-center text-xs tracking-wider transition-colors hover:cursor-pointer ${
                meta.page === p
                  ? "bg-primary text-white border border-primary"
                  : "border border-primary/20 text-primary/70 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={!meta.hasNext}
          className="w-8 h-8 flex items-center justify-center border border-primary/50 text-primary/50 hover:text-primary hover:border-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface PageState {
  venues: Venue[];
  paginationMeta: PaginationMeta | null;
  isLoading: boolean;

  searchTerm: string;
  debouncedSearch: string;
  destinationFilter: string;
  experienceFilter: string;
  currentPage: number;

  deleteStatus: "idle" | "confirm" | "deleting";
  deleteTarget: Venue | null;

  filters: VenueFilters;
  isFiltersLoading: boolean;

  experienceCounts: Record<string, number>;
}

type PageAction =
  | { type: "FETCH_VENUES_START" }
  | {
      type: "FETCH_VENUES_SUCCESS";
      venues: Venue[];
      meta: PaginationMeta | null;
      experienceFilter: string;
    }
  | { type: "FETCH_VENUES_ERROR" }
  | { type: "SET_FILTERS"; filters: VenueFilters }
  | { type: "FILTERS_LOADED" }
  | { type: "EXPERIENCE_COUNTS"; counts: Record<string, number> }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_DEBOUNCED_SEARCH"; value: string }
  | { type: "SET_EXPERIENCE"; id: string }
  | { type: "SET_DESTINATION"; id: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "CLEAR_FILTERS" }
  | { type: "OPEN_DELETE"; venue: Venue }
  | { type: "CLOSE_DELETE" }
  | { type: "DELETE_START" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_ERROR" };

const initialState: PageState = {
  venues: [],
  paginationMeta: null,
  isLoading: true,
  searchTerm: "",
  debouncedSearch: "",
  destinationFilter: "all",
  experienceFilter: "all",
  currentPage: 1,
  deleteStatus: "idle",
  deleteTarget: null,
  filters: { destinations: [], experiences: [] },
  isFiltersLoading: true,
  experienceCounts: {},
};

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "FETCH_VENUES_START":
      return { ...state, isLoading: true };
    case "FETCH_VENUES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        venues: action.venues,
        paginationMeta: action.meta,
        experienceCounts: {
          ...state.experienceCounts,
          [action.experienceFilter]: action.meta?.total ?? 0,
        },
      };
    case "FETCH_VENUES_ERROR":
      return { ...state, isLoading: false };
    case "SET_FILTERS":
      return { ...state, filters: action.filters };
    case "FILTERS_LOADED":
      return { ...state, isFiltersLoading: false };
    case "EXPERIENCE_COUNTS":
      return {
        ...state,
        experienceCounts: { ...state.experienceCounts, ...action.counts },
      };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.value };
    case "SET_DEBOUNCED_SEARCH":
      return { ...state, debouncedSearch: action.value, currentPage: 1 };
    case "SET_EXPERIENCE":
      return { ...state, experienceFilter: action.id, currentPage: 1 };
    case "SET_DESTINATION":
      return { ...state, destinationFilter: action.id, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "CLEAR_FILTERS":
      return {
        ...state,
        searchTerm: "",
        destinationFilter: "all",
        experienceFilter: "all",
        currentPage: 1,
      };
    case "OPEN_DELETE":
      return { ...state, deleteTarget: action.venue, deleteStatus: "confirm" };
    case "CLOSE_DELETE":
      return state.deleteStatus === "deleting"
        ? state
        : { ...state, deleteTarget: null, deleteStatus: "idle" };
    case "DELETE_START":
      return { ...state, deleteStatus: "deleting" };
    case "DELETE_SUCCESS":
      return { ...state, deleteTarget: null, deleteStatus: "idle" };
    case "DELETE_ERROR":
      return { ...state, deleteStatus: "confirm" };
    default:
      return state;
  }
}

export default function DashboardVenuesPage() {
  const [state, dispatch] = useReducer(pageReducer, initialState);

  const {
    venues,
    paginationMeta,
    isLoading,
    searchTerm,
    debouncedSearch,
    destinationFilter,
    experienceFilter,
    currentPage,
    deleteStatus,
    deleteTarget,
    filters,
    isFiltersLoading,
    experienceCounts,
  } = state;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: "SET_DEBOUNCED_SEARCH", value: searchTerm });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await axios.get<{ data: VenueFilters }>(
          "/api/venues/filters",
        );
        const venueFilters = data.data;
        dispatch({ type: "SET_FILTERS", filters: venueFilters });

        if (venueFilters.experiences.length > 0) {
          const countResults = await Promise.allSettled(
            venueFilters.experiences.map((exp) =>
              axios
                .get<{ meta: PaginationMeta }>("/api/venues", {
                  params: { page: 1, limit: 1, experienceId: exp.id },
                })
                .then((res) => ({
                  id: exp.id,
                  total: res.data.meta?.total ?? 0,
                })),
            ),
          );

          const counts: Record<string, number> = {};
          for (const result of countResults) {
            if (result.status === "fulfilled") {
              counts[result.value.id] = result.value.total;
            }
          }
          dispatch({ type: "EXPERIENCE_COUNTS", counts });
        }
      } catch (err) {
        console.error("Failed to load filters:", err);
      } finally {
        dispatch({ type: "FILTERS_LOADED" });
      }
    };
    fetchFilters();
  }, []);

  const getVenues = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    dispatch({ type: "FETCH_VENUES_START" });
    try {
      const params: Record<string, unknown> = {
        page: currentPage,
        limit: LIMIT,
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (destinationFilter !== "all") params.destinationId = destinationFilter;
      if (experienceFilter !== "all") params.experienceId = experienceFilter;

      const response = await axios.get("/api/venues", {
        params,
        signal: abortRef.current.signal,
      });
      dispatch({
        type: "FETCH_VENUES_SUCCESS",
        venues: response.data.data ?? [],
        meta: response.data.meta ?? null,
        experienceFilter,
      });
    } catch (err) {
      if (axios.isCancel(err)) return;
      const errorMsg = axios.isAxiosError(err)
        ? `Error: ${err.response?.status ?? "Unknown"} ${err.message}`
        : err instanceof Error
          ? err.message
          : "Failed to load venues";
      toast.error("Failed to load venues", { description: errorMsg });
      dispatch({ type: "FETCH_VENUES_ERROR" });
    }
  }, [currentPage, debouncedSearch, destinationFilter, experienceFilter]);

  useEffect(() => {
    getVenues();
  }, [getVenues]);

  const handleExperienceChange = useCallback(
    (id: string) => dispatch({ type: "SET_EXPERIENCE", id }),
    [],
  );
  const handleDestinationChange = useCallback(
    (id: string) => dispatch({ type: "SET_DESTINATION", id }),
    [],
  );
  const clearAllFilters = useCallback(
    () => dispatch({ type: "CLEAR_FILTERS" }),
    [],
  );

  const openDeleteModal = useCallback(
    (venue: Venue) => dispatch({ type: "OPEN_DELETE", venue }),
    [],
  );
  const closeDeleteModal = useCallback(
    () => dispatch({ type: "CLOSE_DELETE" }),
    [],
  );

  const deleteVenueById = useCallback(async () => {
    if (!deleteTarget) return;
    dispatch({ type: "DELETE_START" });
    try {
      await axios.delete(`/api/venues/${deleteTarget.id}`, {
        headers: getAuthHeaders(),
      });
      const isLastOnPage = venues.length === 1 && currentPage > 1;
      dispatch({ type: "DELETE_SUCCESS" });
      if (isLastOnPage) {
        dispatch({ type: "SET_PAGE", page: currentPage - 1 });
      } else {
        getVenues();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      dispatch({ type: "DELETE_ERROR" });
    }
  }, [deleteTarget, venues.length, currentPage, getVenues]);

  const totalCount = useMemo(
    () => paginationMeta?.total ?? 0,
    [paginationMeta],
  );

  const hasActiveFilters = useMemo(
    () =>
      !!debouncedSearch ||
      destinationFilter !== "all" ||
      experienceFilter !== "all",
    [debouncedSearch, destinationFilter, experienceFilter],
  );

  const experienceOptions = useMemo(
    () => [
      { id: "all", label: "All Experiences" },
      ...filters.experiences.map((e) => ({ id: e.id, label: e.name })),
    ],
    [filters.experiences],
  );

  const destinationOptions = useMemo(
    () => [
      { id: "all", label: "All Destinations" },
      ...filters.destinations.map((d) => ({ id: d.id, label: d.name })),
    ],
    [filters.destinations],
  );

  const statCards = useMemo(
    () => [
      { id: "all", label: "Total" },
      ...filters.experiences.map((e) => ({ id: e.id, label: e.name })),
    ],
    [filters.experiences],
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Venues
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {isLoading ? (
              <span className="inline-block w-24 h-3 bg-primary/10 animate-pulse rounded" />
            ) : (
              `${totalCount} total venues`
            )}
          </p>
        </div>

        <Link
          href="/dashboard/venues/new"
          className="inline-flex items-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Venue
        </Link>
      </div>

      {isFiltersLoading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
      ) : (
        statCards.length > 1 && (
          <div
            className="grid gap-4 mb-8"
            style={{
              gridTemplateColumns: `repeat(${Math.min(statCards.length, 6)}, minmax(0, 1fr))`,
            }}
          >
            {statCards.map((stat) => {
              const isActive = experienceFilter === stat.id;
              const displayValue =
                stat.id === "all"
                  ? totalCount
                  : (experienceCounts[stat.id] ?? "—");

              return (
                <button
                  key={stat.id}
                  onClick={() => handleExperienceChange(stat.id)}
                  className={`p-5 border text-left transition-all duration-200 hover:cursor-pointer ${
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "bg-white border-primary/20 text-primary hover:border-primary/30"
                  }`}
                >
                  <p
                    className={`text-sm tracking-[0.2em] uppercase mb-1.5 truncate ${
                      isActive ? "text-white/80" : "text-primary/80"
                    }`}
                  >
                    {stat.label}
                  </p>
                  {isLoading && stat.id === "all" ? (
                    <div className="h-7 w-10 bg-current opacity-10 animate-pulse rounded" />
                  ) : (
                    <p className="text-2xl font-semibold">{displayValue}</p>
                  )}
                </button>
              );
            })}
          </div>
        )
      )}

      <div className="bg-white border border-primary/20 p-3 mb-6 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH", value: e.target.value })
            }
            className="w-full pl-9 pr-8 py-2.5 text-sm text-primary placeholder:text-primary/40 bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => dispatch({ type: "SET_SEARCH", value: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary/60 transition-colors hover:cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="hidden sm:block w-px h-8 bg-primary/15 self-center" />

        <div className="flex gap-2 items-stretch h-[42px]">
          <FilterDropdown
            value={experienceFilter}
            onChange={handleExperienceChange}
            options={experienceOptions}
            disabled={isFiltersLoading}
          />
          <FilterDropdown
            value={destinationFilter}
            onChange={handleDestinationChange}
            options={destinationOptions}
            disabled={isFiltersLoading}
          />
        </div>

        {hasActiveFilters && (
          <>
            <div className="hidden sm:block w-px h-8 bg-primary/20 self-center" />
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-sm tracking-widest uppercase text-primary/50 hover:text-primary transition-colors whitespace-nowrap hover:cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          </>
        )}
      </div>

      {hasActiveFilters && !isLoading && paginationMeta && (
        <p className="text-primary/80 text-sm tracking-wider mb-4">
          Showing {paginationMeta.total} venue
          {paginationMeta.total !== 1 ? "s" : ""}
          {experienceFilter !== "all" &&
            ` in ${experienceOptions.find((e) => e.id === experienceFilter)?.label ?? ""}`}
          {destinationFilter !== "all" &&
            ` at ${destinationOptions.find((d) => d.id === destinationFilter)?.label ?? ""}`}
          {debouncedSearch && ` for "${debouncedSearch}"`}
        </p>
      )}

      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : venues.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <Building2 className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {debouncedSearch
              ? `No venues match "${debouncedSearch}"`
              : "No venues in this filter yet"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="mt-4 text-xs tracking-widest uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      )}

      {paginationMeta && !isLoading && (
        <Pagination
          meta={paginationMeta}
          onPageChange={(page) => dispatch({ type: "SET_PAGE", page })}
        />
      )}

      {(deleteStatus === "confirm" || deleteStatus === "deleting") &&
        deleteTarget && (
          <DeleteModal
            name={deleteTarget.name}
            onConfirm={deleteVenueById}
            onCancel={closeDeleteModal}
            isLoading={deleteStatus === "deleting"}
          />
        )}
    </div>
  );
}
