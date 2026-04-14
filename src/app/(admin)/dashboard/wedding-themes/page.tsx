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
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { WeddingTheme } from "@/types";
import DeleteModal from "@/components/shared/delete-modal";
import type { PaginationMeta } from "@/lib/api-response";
import { toast } from "sonner";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

const LIMIT = 6;

interface ExperienceFilterOption {
  id: string;
  name: string;
  category: string;
}

interface ThemeFilters {
  experiences: ExperienceFilterOption[];
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-primary/20 animate-pulse">
      <div className="aspect-[16/9] bg-primary/10" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-primary/10 w-1/3 rounded" />
        <div className="h-4 bg-primary/10 w-2/3 rounded" />
        <div className="h-3 bg-primary/10 w-full rounded" />
        <div className="h-3 bg-primary/10 w-5/6 rounded" />
        <div className="flex gap-2 pt-1">
          <div className="h-3 bg-primary/10 w-16 rounded" />
          <div className="h-3 bg-primary/10 w-12 rounded" />
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

function WeddingThemeCard({
  theme,
  onDelete,
}: {
  theme: WeddingTheme;
  onDelete: (theme: WeddingTheme) => void;
}) {
  const galleryCount = theme.gallery?.length ?? 0;

  return (
    <div className="bg-white border border-primary/20 group hover:border-primary/30 transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={theme.image || "https://placehold.net/default.svg"}
          alt={theme.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {theme.experience && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center text-xs tracking-widest uppercase px-2.5 py-1 font-medium bg-primary/80 text-white">
              {theme.experience.name}
            </span>
          </div>
        )}

        {galleryCount > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs tracking-widest uppercase px-2 py-1">
            +{galleryCount - 1} photos
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <p className="text-primary/60 text-xs tracking-widest uppercase mb-1">
            {theme.slug}
          </p>
          <h3 className="text-primary font-semibold text-base leading-snug">
            {theme.title}
          </h3>
        </div>

        <p className="text-primary/80 text-sm leading-relaxed line-clamp-2 mb-4">
          {theme.description}
        </p>

        <div className="flex items-center gap-3 mb-5 text-xs text-primary/80">
          <span>{theme.inclusions?.length ?? 0} inclusions</span>
          {theme.venue && (
            <>
              <span className="text-primary/20">·</span>
              <span>{theme.venue.name}</span>
            </>
          )}
          {galleryCount > 0 && (
            <>
              <span className="text-primary/20">·</span>
              <span>{galleryCount} photos</span>
            </>
          )}
        </div>

        <div className="border-t border-primary/20 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary/80 font-semibold tracking-wider truncate max-w-[140px]">
              {theme.slug}
            </span>
            <div className="flex items-center gap-1">
              <Link
                href={`/wedding-themes/${theme.slug}`}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="View Public Page"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <Link
                href={`/dashboard/wedding-themes/${theme.id}`}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="Edit Wedding Theme"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <button
                onClick={() => onDelete(theme)}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete Wedding Theme"
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
        of <span className="text-primary font-medium">{meta.total}</span>{" "}
        wedding themes
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
  themes: WeddingTheme[];
  paginationMeta: PaginationMeta | null;
  isLoading: boolean;

  searchTerm: string;
  debouncedSearch: string;
  experienceFilter: string;
  currentPage: number;

  deleteStatus: "idle" | "confirm" | "deleting";
  deleteTarget: WeddingTheme | null;

  filters: ThemeFilters;
  isFiltersLoading: boolean;

  experienceCounts: Record<string, number>;
}

type PageAction =
  | { type: "FETCH_THEMES_START" }
  | {
      type: "FETCH_THEMES_SUCCESS";
      themes: WeddingTheme[];
      meta: PaginationMeta | null;
      experienceFilter: string;
    }
  | { type: "FETCH_THEMES_ERROR" }
  | { type: "SET_FILTERS"; filters: ThemeFilters }
  | { type: "FILTERS_LOADED" }
  | { type: "EXPERIENCE_COUNTS"; counts: Record<string, number> }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_DEBOUNCED_SEARCH"; value: string }
  | { type: "SET_EXPERIENCE"; id: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "CLEAR_FILTERS" }
  | { type: "OPEN_DELETE"; theme: WeddingTheme }
  | { type: "CLOSE_DELETE" }
  | { type: "DELETE_START" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_ERROR" };

const initialState: PageState = {
  themes: [],
  paginationMeta: null,
  isLoading: true,
  searchTerm: "",
  debouncedSearch: "",
  experienceFilter: "all",
  currentPage: 1,
  deleteStatus: "idle",
  deleteTarget: null,
  filters: { experiences: [] },
  isFiltersLoading: true,
  experienceCounts: {},
};

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "FETCH_THEMES_START":
      return { ...state, isLoading: true };
    case "FETCH_THEMES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        themes: action.themes,
        paginationMeta: action.meta,

        experienceCounts: {
          ...state.experienceCounts,
          [action.experienceFilter]: action.meta?.total ?? 0,
        },
      };
    case "FETCH_THEMES_ERROR":
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
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "CLEAR_FILTERS":
      return {
        ...state,
        searchTerm: "",
        experienceFilter: "all",
        currentPage: 1,
      };
    case "OPEN_DELETE":
      return { ...state, deleteTarget: action.theme, deleteStatus: "confirm" };
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

export default function DashboardWeddingThemesPage() {
  const [state, dispatch] = useReducer(pageReducer, initialState);

  const {
    themes,
    paginationMeta,
    isLoading,
    searchTerm,
    debouncedSearch,
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
        const { data } = await axios.get<{ data: ThemeFilters }>(
          "/api/wedding-themes/filters",
        );
        const themeFilters = data.data;
        dispatch({ type: "SET_FILTERS", filters: themeFilters });

        if (themeFilters.experiences.length > 0) {
          const countResults = await Promise.allSettled(
            themeFilters.experiences.map((exp) =>
              axios
                .get<{ meta: PaginationMeta }>("/api/wedding-themes", {
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

  const getThemes = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    dispatch({ type: "FETCH_THEMES_START" });
    try {
      const params: Record<string, unknown> = {
        page: currentPage,
        limit: LIMIT,
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (experienceFilter !== "all") params.experienceId = experienceFilter;

      const response = await axios.get("/api/wedding-themes", {
        params,
        signal: abortRef.current.signal,
      });

      dispatch({
        type: "FETCH_THEMES_SUCCESS",
        themes: response.data.data ?? [],
        meta: response.data.meta ?? null,
        experienceFilter,
      });
    } catch (err) {
      if (axios.isCancel(err)) return;
      const errorMsg = axios.isAxiosError(err)
        ? `Error: ${err.response?.status ?? "Unknown"} ${err.message}`
        : err instanceof Error
          ? err.message
          : "Failed to load wedding themes";
      toast.error("Failed to load wedding themes", { description: errorMsg });
      dispatch({ type: "FETCH_THEMES_ERROR" });
    }
  }, [currentPage, debouncedSearch, experienceFilter]);

  useEffect(() => {
    getThemes();
  }, [getThemes]);

  const handleExperienceChange = useCallback(
    (id: string) => dispatch({ type: "SET_EXPERIENCE", id }),
    [],
  );

  const clearAllFilters = useCallback(
    () => dispatch({ type: "CLEAR_FILTERS" }),
    [],
  );

  const openDeleteModal = useCallback(
    (theme: WeddingTheme) => dispatch({ type: "OPEN_DELETE", theme }),
    [],
  );

  const closeDeleteModal = useCallback(
    () => dispatch({ type: "CLOSE_DELETE" }),
    [],
  );

  const deleteThemeById = useCallback(async () => {
    if (!deleteTarget) return;
    dispatch({ type: "DELETE_START" });
    try {
      await axios.delete(`/api/wedding-themes/${deleteTarget.id}`, {
        headers: getAuthHeaders(),
      });
      const isLastOnPage = themes.length === 1 && currentPage > 1;
      dispatch({ type: "DELETE_SUCCESS" });
      if (isLastOnPage) {
        dispatch({ type: "SET_PAGE", page: currentPage - 1 });
      } else {
        getThemes();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      dispatch({ type: "DELETE_ERROR" });
    }
  }, [deleteTarget, themes.length, currentPage, getThemes]);

  const totalCount = useMemo(
    () => paginationMeta?.total ?? 0,
    [paginationMeta],
  );

  const hasActiveFilters = useMemo(
    () => !!debouncedSearch || experienceFilter !== "all",
    [debouncedSearch, experienceFilter],
  );

  const statCards = useMemo(
    () => [
      { id: "all", label: "Total" },
      ...filters.experiences.map((e) => ({ id: e.id, label: e.name })),
    ],
    [filters.experiences],
  );

  const experienceOptions = useMemo(
    () => [
      { id: "all", label: "All Experiences" },
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
            Wedding Themes
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {isLoading ? (
              <span className="inline-block w-24 h-3 bg-primary/10 animate-pulse rounded" />
            ) : (
              `${totalCount} total wedding themes`
            )}
          </p>
        </div>

        <Link
          href="/dashboard/wedding-themes/new"
          className="inline-flex items-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Theme
        </Link>
      </div>

      {isFiltersLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
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

      <div className="bg-white border border-primary/20 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search wedding themes..."
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

        <div className="relative shrink-0">
          <select
            value={experienceFilter}
            onChange={(e) => handleExperienceChange(e.target.value)}
            disabled={isFiltersLoading}
            className="w-full sm:w-52 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer hover:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {experienceOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40 rotate-90" />
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
          Showing {paginationMeta.total} wedding theme
          {paginationMeta.total !== 1 ? "s" : ""}
          {experienceFilter !== "all" &&
            ` in ${experienceOptions.find((e) => e.id === experienceFilter)?.label ?? ""}`}
          {debouncedSearch && ` for "${debouncedSearch}"`}
        </p>
      )}

      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : themes.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <Layers className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {debouncedSearch
              ? `No wedding themes match "${debouncedSearch}"`
              : "No wedding themes found"}
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
          {themes.map((theme) => (
            <WeddingThemeCard
              key={theme.id}
              theme={theme}
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
            name={deleteTarget.title}
            onConfirm={deleteThemeById}
            onCancel={closeDeleteModal}
            isLoading={deleteStatus === "deleting"}
          />
        )}
    </div>
  );
}
