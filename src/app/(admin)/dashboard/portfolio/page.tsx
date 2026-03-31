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
  Images,
  MapPin,
  Users,
  Tag,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Portfolio } from "@/types";
import DeleteModal from "@/components/shared/delete-modal";
import type { PaginationMeta } from "@/lib/api-response";
import { toast } from "sonner";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

// ─── Constants ────────────────────────────────────────────────────────────────

const LIMIT = 6;

// ─── Types ────────────────────────────────────────────────────────────────────

interface FilterOption {
  id: string;
  name: string;
}

interface ExperienceFilterOption extends FilterOption {
  category: string;
}

interface PortfolioFilters {
  destinations: FilterOption[];
  venues: FilterOption[];
  experiences: ExperienceFilterOption[];
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white border border-primary/20 animate-pulse">
      <div className="aspect-[3/2] bg-primary/10" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-primary/10 w-2/3 rounded" />
        <div className="h-3 bg-primary/10 w-1/2 rounded" />
        <div className="space-y-1.5">
          <div className="h-3 bg-primary/10 w-3/4 rounded" />
          <div className="h-3 bg-primary/10 w-1/2 rounded" />
        </div>
        <div className="h-3 bg-primary/10 w-full rounded" />
        <div className="h-3 bg-primary/10 w-5/6 rounded" />
      </div>
    </div>
  );
}

// ─── Skeleton Stat Card ───────────────────────────────────────────────────────

function SkeletonStatCard() {
  return (
    <div className="p-5 border border-primary/20 bg-white animate-pulse">
      <div className="h-3 bg-primary/10 w-2/3 rounded mb-3" />
      <div className="h-7 bg-primary/10 w-10 rounded" />
    </div>
  );
}

// ─── Portfolio Card ───────────────────────────────────────────────────────────

function PortfolioCard({
  portfolio,
  onDelete,
}: {
  portfolio: Portfolio;
  onDelete: (portfolio: Portfolio) => void;
}) {
  return (
    <div className="bg-white border border-primary/20 group hover:border-primary/30 transition-all duration-300 hover:shadow-md">
      {/* Hero Image */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={portfolio.image || "https://placehold.net/default.svg"}
          alt={portfolio.couple}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gallery count badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium bg-black/60 text-white backdrop-blur-sm">
            <Images className="w-3 h-3" />
            {portfolio.gallery?.length ?? 0}
          </span>
        </div>
        {/* Tags */}
        {portfolio.tags && portfolio.tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {portfolio.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-widest uppercase px-2 py-0.5 font-medium bg-primary text-white"
              >
                {tag}
              </span>
            ))}
            {portfolio.tags.length > 2 && (
              <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 font-medium bg-primary/80 text-white">
                +{portfolio.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-primary font-semibold text-base leading-snug">
            {portfolio.couple}
          </h3>
          {portfolio.subtitle && (
            <p className="text-primary/60 text-xs mt-0.5 tracking-wide">
              {portfolio.subtitle}
            </p>
          )}
        </div>

        {/* Meta info */}
        <div className="space-y-1.5 mb-4">
          {portfolio.destination?.name && (
            <div className="flex items-center gap-1.5 text-primary/60 text-xs">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{portfolio.destination.name}</span>
            </div>
          )}
          {portfolio.venue?.name && (
            <div className="flex items-center gap-1.5 text-primary/60 text-xs">
              <Users className="w-3 h-3 shrink-0" />
              <span className="truncate">{portfolio.venue.name}</span>
            </div>
          )}
          {portfolio.origin && (
            <div className="flex items-center gap-1.5 text-primary/60 text-xs">
              <Tag className="w-3 h-3 shrink-0" />
              <span className="truncate">{portfolio.origin}</span>
            </div>
          )}
        </div>

        {/* Excerpt */}
        {portfolio.excerpt && (
          <p className="text-primary/70 text-sm leading-relaxed line-clamp-2 mb-4">
            {portfolio.excerpt}
          </p>
        )}

        {/* Divider + Actions */}
        <div className="border-t border-primary/20 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary/80 font-semibold tracking-wider truncate max-w-[140px]">
              /{portfolio.slug}
            </span>

            <div className="flex items-center gap-1">
              <Link
                href={`/portfolio/${portfolio.slug}`}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="View Public Portfolio"
              >
                <Eye className="w-4 h-4" />
              </Link>

              <Link
                href={`/dashboard/portfolio/${portfolio.id}`}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="Edit Portfolio"
              >
                <Pencil className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onDelete(portfolio)}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete Portfolio"
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

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

function FilterDropdown({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
}) {
  const isActive = value !== "";

  return (
    <div className="relative shrink-0 h-[42px]">
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
        <option value="" className="bg-white text-primary normal-case font-normal tracking-normal">
          {placeholder}
        </option>
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

// ─── Pagination ───────────────────────────────────────────────────────────────

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
        portfolios
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

// ─── Page State (useReducer) ──────────────────────────────────────────────────

interface PageState {
  // data
  portfolios: Portfolio[];
  paginationMeta: PaginationMeta | null;
  isLoading: boolean;
  // filters
  searchTerm: string;
  debouncedSearch: string;
  filterDestination: string;
  filterVenue: string;
  filterExperience: string;
  currentPage: number;
  // delete state machine
  deleteStatus: "idle" | "confirm" | "deleting";
  deleteTarget: Portfolio | null;
  // faceted filter options (satu request, bukan tiga)
  filters: PortfolioFilters;
  isFiltersLoading: boolean;
  // cached counts per experience untuk stat cards
  experienceCounts: Record<string, number>;
}

type PageAction =
  | { type: "FETCH_PORTFOLIOS_START" }
  | { type: "FETCH_PORTFOLIOS_SUCCESS"; portfolios: Portfolio[]; meta: PaginationMeta | null; experienceFilter: string }
  | { type: "FETCH_PORTFOLIOS_ERROR" }
  | { type: "SET_FILTERS"; filters: PortfolioFilters }
  | { type: "FILTERS_LOADED" }
  | { type: "EXPERIENCE_COUNTS"; counts: Record<string, number> }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_DEBOUNCED_SEARCH"; value: string }
  | { type: "SET_DESTINATION"; id: string }
  | { type: "SET_VENUE"; id: string }
  | { type: "SET_EXPERIENCE"; id: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "CLEAR_FILTERS" }
  | { type: "OPEN_DELETE"; portfolio: Portfolio }
  | { type: "CLOSE_DELETE" }
  | { type: "DELETE_START" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_ERROR" };

const initialState: PageState = {
  portfolios: [],
  paginationMeta: null,
  isLoading: true,
  searchTerm: "",
  debouncedSearch: "",
  filterDestination: "",
  filterVenue: "",
  filterExperience: "",
  currentPage: 1,
  deleteStatus: "idle",
  deleteTarget: null,
  filters: { destinations: [], venues: [], experiences: [] },
  isFiltersLoading: true,
  experienceCounts: {},
};

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "FETCH_PORTFOLIOS_START":
      return { ...state, isLoading: true };

    case "FETCH_PORTFOLIOS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        portfolios: action.portfolios,
        paginationMeta: action.meta,
        // Cache total untuk filter experience yang sedang aktif.
        // Dipakai di stat cards tanpa perlu refetch.
        experienceCounts: {
          ...state.experienceCounts,
          [action.experienceFilter]: action.meta?.total ?? 0,
        },
      };

    case "FETCH_PORTFOLIOS_ERROR":
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
      // Search baru → selalu kembali ke halaman 1
      return { ...state, debouncedSearch: action.value, currentPage: 1 };

    case "SET_DESTINATION":
      return { ...state, filterDestination: action.id, currentPage: 1 };

    case "SET_VENUE":
      return { ...state, filterVenue: action.id, currentPage: 1 };

    case "SET_EXPERIENCE":
      return { ...state, filterExperience: action.id, currentPage: 1 };

    case "SET_PAGE":
      return { ...state, currentPage: action.page };

    case "CLEAR_FILTERS":
      return {
        ...state,
        searchTerm: "",
        filterDestination: "",
        filterVenue: "",
        filterExperience: "",
        currentPage: 1,
      };

    case "OPEN_DELETE":
      return { ...state, deleteTarget: action.portfolio, deleteStatus: "confirm" };

    case "CLOSE_DELETE":
      // Blokir close saat delete sedang berjalan
      return state.deleteStatus === "deleting"
        ? state
        : { ...state, deleteTarget: null, deleteStatus: "idle" };

    case "DELETE_START":
      return { ...state, deleteStatus: "deleting" };

    case "DELETE_SUCCESS":
      return { ...state, deleteTarget: null, deleteStatus: "idle" };

    case "DELETE_ERROR":
      // Kembalikan ke confirm agar user bisa retry atau cancel
      return { ...state, deleteStatus: "confirm" };

    default:
      return state;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPortfolioPage() {
  const [state, dispatch] = useReducer(pageReducer, initialState);

  const {
    portfolios, paginationMeta, isLoading,
    searchTerm, debouncedSearch,
    filterDestination, filterVenue, filterExperience,
    currentPage,
    deleteStatus, deleteTarget,
    filters, isFiltersLoading,
    experienceCounts,
  } = state;

  // ── useRef: timer debounce — mutasi ref tidak memicu re-render ──
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── useRef: AbortController — batalkan fetch lama saat deps berubah ──
  const abortRef = useRef<AbortController | null>(null);

  // ── Debounce search: dispatch SET_DEBOUNCED_SEARCH 400ms setelah berhenti mengetik ──
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: "SET_DEBOUNCED_SEARCH", value: searchTerm });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm]);

  // ── Fetch semua filter options sekaligus (satu request, bukan tiga) ──
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await axios.get<{ data: PortfolioFilters }>(
          "/api/portfolios/filters",
        );
        const portfolioFilters = data.data;
        dispatch({ type: "SET_FILTERS", filters: portfolioFilters });

        // Pre-fetch count per experience secara paralel agar stat cards
        // langsung menampilkan angka real tanpa user harus klik satu per satu.
        if (portfolioFilters.experiences.length > 0) {
          const countResults = await Promise.allSettled(
            portfolioFilters.experiences.map((exp) =>
              axios
                .get<{ meta: PaginationMeta }>("/api/portfolios", {
                  params: { page: 1, limit: 1, experienceId: exp.id },
                })
                .then((res) => ({ id: exp.id, total: res.data.meta?.total ?? 0 })),
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

  // ── Fetch portfolios (paginated, searched, filtered) ──
  // useCallback memastikan getPortfolios hanya dibuat ulang saat deps benar-benar berubah,
  // sehingga useEffect di bawah tidak loop tanpa sebab.
  const getPortfolios = useCallback(async () => {
    // Batalkan request sebelumnya untuk mencegah race condition
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    dispatch({ type: "FETCH_PORTFOLIOS_START" });
    try {
      const params: Record<string, unknown> = { page: currentPage, limit: LIMIT };
      if (debouncedSearch)   params.search        = debouncedSearch;
      if (filterDestination) params.destinationId = filterDestination;
      if (filterVenue)       params.venueId       = filterVenue;
      if (filterExperience)  params.experienceId  = filterExperience;

      const response = await axios.get("/api/portfolios", {
        params,
        signal: abortRef.current.signal,
      });

      dispatch({
        type: "FETCH_PORTFOLIOS_SUCCESS",
        portfolios: response.data.data ?? [],
        meta: response.data.meta ?? null,
        experienceFilter: filterExperience,
      });
    } catch (err) {
      // Abort yang disengaja tidak dianggap error — langsung return
      if (axios.isCancel(err)) return;
      const errorMsg = axios.isAxiosError(err)
        ? `Error: ${err.response?.status ?? "Unknown"} ${err.message}`
        : err instanceof Error
          ? err.message
          : "Failed to load portfolios";
      toast.error("Failed to load portfolios", { description: errorMsg });
      dispatch({ type: "FETCH_PORTFOLIOS_ERROR" });
    }
  }, [currentPage, debouncedSearch, filterDestination, filterVenue, filterExperience]);

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]);

  // ── Filter change handlers ──
  // useCallback dengan deps [] karena hanya memanggil dispatch (referensi stabil)
  const handleDestinationChange = useCallback(
    (id: string) => dispatch({ type: "SET_DESTINATION", id }),
    [],
  );

  const handleVenueChange = useCallback(
    (id: string) => dispatch({ type: "SET_VENUE", id }),
    [],
  );

  const handleExperienceChange = useCallback(
    (id: string) => dispatch({ type: "SET_EXPERIENCE", id }),
    [],
  );

  const clearAllFilters = useCallback(
    () => dispatch({ type: "CLEAR_FILTERS" }),
    [],
  );

  // ── Delete flow ──
  const openDeleteModal = useCallback(
    (portfolio: Portfolio) => dispatch({ type: "OPEN_DELETE", portfolio }),
    [],
  );

  const closeDeleteModal = useCallback(
    () => dispatch({ type: "CLOSE_DELETE" }),
    [],
  );

  const deletePortfolioById = useCallback(async () => {
    if (!deleteTarget) return;
    dispatch({ type: "DELETE_START" });
    try {
      await axios.delete(`/api/portfolios/${deleteTarget.id}`, {
        headers: getAuthHeaders(),
      });
      const isLastOnPage = portfolios.length === 1 && currentPage > 1;
      dispatch({ type: "DELETE_SUCCESS" });
      if (isLastOnPage) {
        // Mundur satu halaman agar tidak landing di halaman kosong
        dispatch({ type: "SET_PAGE", page: currentPage - 1 });
      } else {
        getPortfolios();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete portfolio");
      dispatch({ type: "DELETE_ERROR" });
    }
  }, [deleteTarget, portfolios.length, currentPage, getPortfolios]);

  // ── useMemo: derived values & dropdown options ──
  // Hanya dihitung ulang saat deps spesifiknya berubah, bukan setiap render

  const totalCount = useMemo(
    () => paginationMeta?.total ?? 0,
    [paginationMeta],
  );

  const hasActiveFilters = useMemo(
    () =>
      !!debouncedSearch ||
      filterDestination !== "" ||
      filterVenue !== "" ||
      filterExperience !== "",
    [debouncedSearch, filterDestination, filterVenue, filterExperience],
  );

  const destinationOptions = useMemo(
    () => filters.destinations.map((d) => ({ id: d.id, label: d.name })),
    [filters.destinations],
  );

  const venueOptions = useMemo(
    () => filters.venues.map((v) => ({ id: v.id, label: v.name })),
    [filters.venues],
  );

  const experienceOptions = useMemo(
    () => filters.experiences.map((e) => ({ id: e.id, label: e.name })),
    [filters.experiences],
  );

  // Stat cards: "Total" + satu kartu per experience
  const statCards = useMemo(
    () => [
      { id: "", label: "Total" },
      ...filters.experiences.map((e) => ({ id: e.id, label: e.name })),
    ],
    [filters.experiences],
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Portfolio
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {isLoading ? (
              <span className="inline-block w-28 h-3 bg-primary/10 animate-pulse rounded" />
            ) : (
              `${totalCount} total portfolios`
            )}
          </p>
        </div>

        <Link
          href="/dashboard/portfolio/new"
          className="inline-flex items-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Portfolio
        </Link>
      </div>

      {/* ── Stats Row ── */}
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
              const isActive = filterExperience === stat.id;
              const displayValue =
                stat.id === ""
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
                  {isLoading && stat.id === "" ? (
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

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border border-primary/20 p-3 mb-6 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search by couple, venue, destination, or tag…"
            value={searchTerm}
            onChange={(e) => dispatch({ type: "SET_SEARCH", value: e.target.value })}
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

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-primary/15 self-center" />

        {/* Filter Dropdowns */}
        <div className="flex gap-2 items-stretch h-[42px]">
          <FilterDropdown
            value={filterDestination}
            onChange={handleDestinationChange}
            options={destinationOptions}
            placeholder="All Destinations"
            disabled={isFiltersLoading}
          />
          <FilterDropdown
            value={filterVenue}
            onChange={handleVenueChange}
            options={venueOptions}
            placeholder="All Venues"
            disabled={isFiltersLoading}
          />
          <FilterDropdown
            value={filterExperience}
            onChange={handleExperienceChange}
            options={experienceOptions}
            placeholder="All Experiences"
            disabled={isFiltersLoading}
          />
        </div>

        {/* Clear all */}
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

      {/* ── Results Info ── */}
      {hasActiveFilters && !isLoading && paginationMeta && (
        <p className="text-primary/80 text-sm tracking-wider mb-4">
          Showing {paginationMeta.total} portfolio
          {paginationMeta.total !== 1 ? "s" : ""}
          {filterDestination &&
            ` in ${destinationOptions.find((d) => d.id === filterDestination)?.label ?? ""}`}
          {filterVenue &&
            ` at ${venueOptions.find((v) => v.id === filterVenue)?.label ?? ""}`}
          {filterExperience &&
            ` for ${experienceOptions.find((e) => e.id === filterExperience)?.label ?? ""}`}
          {debouncedSearch && ` matching "${debouncedSearch}"`}
        </p>
      )}

      {/* ── Grid ── */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : portfolios.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <Images className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {debouncedSearch
              ? `No portfolios match "${debouncedSearch}"`
              : hasActiveFilters
                ? "No portfolios match the current filters"
                : "No portfolios have been added yet"}
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
          {portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {paginationMeta && !isLoading && (
        <Pagination
          meta={paginationMeta}
          onPageChange={(page) => dispatch({ type: "SET_PAGE", page })}
        />
      )}

      {/* ── Delete Modal ── */}
      {(deleteStatus === "confirm" || deleteStatus === "deleting") &&
        deleteTarget && (
          <DeleteModal
            name={deleteTarget.couple}
            onConfirm={deletePortfolioById}
            onCancel={closeDeleteModal}
            isLoading={deleteStatus === "deleting"}
          />
        )}
    </div>
  );
}