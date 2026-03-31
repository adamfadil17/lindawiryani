"use client";

import { useEffect, useCallback, useReducer, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  Plus,
  Search,
  MapPin,
  Pencil,
  Trash2,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Destination } from "@/types";
import DeleteModal from "@/components/shared/delete-modal";
import type { PaginationMeta } from "@/lib/api-response";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const LIMIT = 6;

// ─── Types ────────────────────────────────────────────────────────────────────

interface CategoryOption {
  id: string;
  name: string;
  count: number;
}

interface PageState {
  // data
  destinations: Destination[];
  paginationMeta: PaginationMeta | null;
  isLoading: boolean;
  // filters
  searchTerm: string;
  debouncedSearch: string;
  categoryFilter: string; // "all" | category uuid
  currentPage: number;
  // filter options + counts (dari /api/destinations/filters)
  categories: CategoryOption[];
  isFiltersLoading: boolean;
  // delete state machine: idle → confirm → deleting → idle
  deleteStatus: "idle" | "confirm" | "deleting";
  deleteTarget: Destination | null;
}

type PageAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; destinations: Destination[]; meta: PaginationMeta | null }
  | { type: "FETCH_ERROR" }
  | { type: "SET_FILTERS"; categories: CategoryOption[] }
  | { type: "FILTERS_LOADED" }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_DEBOUNCED_SEARCH"; value: string }
  | { type: "SET_CATEGORY"; id: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "CLEAR_FILTERS" }
  | { type: "OPEN_DELETE"; destination: Destination }
  | { type: "CLOSE_DELETE" }
  | { type: "DELETE_START" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_ERROR" };

const initialState: PageState = {
  destinations: [],
  paginationMeta: null,
  isLoading: true,
  searchTerm: "",
  debouncedSearch: "",
  categoryFilter: "all",
  currentPage: 1,
  categories: [],
  isFiltersLoading: true,
  deleteStatus: "idle",
  deleteTarget: null,
};

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        destinations: action.destinations,
        paginationMeta: action.meta,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false };

    case "SET_FILTERS":
      return { ...state, categories: action.categories };
    case "FILTERS_LOADED":
      return { ...state, isFiltersLoading: false };

    case "SET_SEARCH":
      return { ...state, searchTerm: action.value };
    case "SET_DEBOUNCED_SEARCH":
      // Reset ke halaman 1 setiap kali search term berubah
      return { ...state, debouncedSearch: action.value, currentPage: 1 };

    case "SET_CATEGORY":
      return { ...state, categoryFilter: action.id, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "CLEAR_FILTERS":
      return {
        ...state,
        searchTerm: "",
        debouncedSearch: "",
        categoryFilter: "all",
        currentPage: 1,
      };

    case "OPEN_DELETE":
      return { ...state, deleteTarget: action.destination, deleteStatus: "confirm" };
    case "CLOSE_DELETE":
      // Guard: tidak bisa close saat sedang proses delete
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

// ─── Skeleton Stat Card ───────────────────────────────────────────────────────

function SkeletonStatCard() {
  return (
    <div className="p-5 border border-primary/20 bg-white animate-pulse">
      <div className="h-3 bg-primary/10 w-2/3 rounded mb-3" />
      <div className="h-7 bg-primary/10 w-10 rounded" />
    </div>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white border border-primary/20 animate-pulse">
      <div className="aspect-[16/9] bg-primary/10" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-primary/10 w-1/4 rounded" />
        <div className="h-4 bg-primary/10 w-3/4 rounded" />
        <div className="h-3 bg-primary/10 w-1/2 rounded" />
        <div className="h-3 bg-primary/10 w-full rounded" />
        <div className="h-3 bg-primary/10 w-5/6 rounded" />
      </div>
    </div>
  );
}

// ─── Destination Card ─────────────────────────────────────────────────────────

function DestinationCard({
  destination,
  onDelete,
}: {
  destination: Destination;
  onDelete: (destination: Destination) => void;
}) {
  return (
    <div className="bg-white border border-primary/20 group hover:border-primary/30 transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={destination.image || "https://placehold.net/default.svg"}
          alt={destination.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs tracking-widest uppercase px-2.5 py-1 font-medium ${
              destination.category.name === "Bali"
                ? "bg-primary text-white"
                : "bg-white text-primary"
            }`}
          >
            {destination.category.name}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <p className="text-primary/80 text-xs tracking-widest uppercase mb-1">
              {destination.type}
            </p>
            <h3 className="text-primary font-semibold text-base leading-snug truncate">
              {destination.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <MapPin className="w-3 h-3 text-primary/50 flex-shrink-0" />
          <span className="text-primary/80 text-sm truncate">
            {destination.location}
          </span>
        </div>

        <p className="text-primary/80 text-sm leading-relaxed line-clamp-2 mb-5">
          {destination.description}
        </p>

        <div className="border-t border-primary/20 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary/80 font-semibold tracking-wider uppercase">
              {destination.guest_capacity ?? "—"}
            </span>
            <div className="flex items-center gap-1">
              <Link
                href={`/destinations/${destination.slug}`}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="View Public Page"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <Link
                href={`/dashboard/destinations/${destination.id}`}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="Edit Destination"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <button
                onClick={() => onDelete(destination)}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete Destination"
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
        destinations
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardDestinationsPage() {
  const [state, dispatch] = useReducer(pageReducer, initialState);

  const {
    destinations,
    paginationMeta,
    isLoading,
    searchTerm,
    debouncedSearch,
    categoryFilter,
    currentPage,
    categories,
    isFiltersLoading,
    deleteStatus,
    deleteTarget,
  } = state;

  // ── useRef: debounce timer — tidak perlu trigger re-render ──
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── useRef: AbortController — cancel request lama saat params berubah ──
  const abortRef = useRef<AbortController | null>(null);

  // ── Debounce search input ──
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: "SET_DEBOUNCED_SEARCH", value: searchTerm });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm]);

  // ── Fetch filter options (sekali saat mount) ──
  // /api/destinations/filters mengembalikan categories beserta count
  // destinasi per category — stat card langsung terisi tanpa extra request
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const { data } = await axios.get<{
          data: { categories: CategoryOption[] };
        }>("/api/destinations/filters");
        dispatch({ type: "SET_FILTERS", categories: data.data.categories });
      } catch (err) {
        console.error("Failed to load filters:", err);
      } finally {
        dispatch({ type: "FILTERS_LOADED" });
      }
    };
    fetchFilters();
  }, []);

  // ── Fetch destinations ──
  const getDestinations = useCallback(async () => {
    // Cancel in-flight request sebelumnya agar tidak ada race condition
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    dispatch({ type: "FETCH_START" });
    try {
      const params: Record<string, unknown> = {
        page: currentPage,
        limit: LIMIT,
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (categoryFilter !== "all") params.categoryId = categoryFilter;

      const response = await axios.get("/api/destinations", {
        params,
        signal: abortRef.current.signal,
      });

      dispatch({
        type: "FETCH_SUCCESS",
        destinations: response.data.data ?? [],
        meta: response.data.meta ?? null,
      });
    } catch (err) {
      // Abaikan error dari request yang sengaja di-cancel
      if (axios.isCancel(err)) return;
      const errorMsg = axios.isAxiosError(err)
        ? `Error: ${err.response?.status ?? "Unknown"} ${err.message}`
        : err instanceof Error
          ? err.message
          : "Failed to load destinations";
      toast.error("Failed to load destinations", { description: errorMsg });
      dispatch({ type: "FETCH_ERROR" });
    }
  }, [currentPage, debouncedSearch, categoryFilter]);

  // getDestinations dipanggil ulang setiap kali fungsinya berubah
  // (yaitu saat currentPage / debouncedSearch / categoryFilter berubah)
  useEffect(() => {
    getDestinations();
  }, [getDestinations]);

  // ── Filter & action helpers — stable reference dengan useCallback ──
  const handleCategoryChange = useCallback(
    (id: string) => dispatch({ type: "SET_CATEGORY", id }),
    [],
  );

  const clearAllFilters = useCallback(
    () => dispatch({ type: "CLEAR_FILTERS" }),
    [],
  );

  const openDeleteModal = useCallback(
    (destination: Destination) =>
      dispatch({ type: "OPEN_DELETE", destination }),
    [],
  );

  const closeDeleteModal = useCallback(
    () => dispatch({ type: "CLOSE_DELETE" }),
    [],
  );

  const deleteDestinationById = useCallback(async () => {
    if (!deleteTarget) return;
    dispatch({ type: "DELETE_START" });
    try {
      await axios.delete(`/api/destinations/${deleteTarget.id}`);
      // Jika destination yang dihapus adalah satu-satunya di halaman terakhir,
      // mundur satu halaman agar tidak stuck di halaman kosong
      const isLastOnPage = destinations.length === 1 && currentPage > 1;
      dispatch({ type: "DELETE_SUCCESS" });
      if (isLastOnPage) {
        dispatch({ type: "SET_PAGE", page: currentPage - 1 });
      } else {
        getDestinations();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete destination");
      dispatch({ type: "DELETE_ERROR" });
    }
  }, [deleteTarget, destinations.length, currentPage, getDestinations]);

  // ── useMemo: derived values & options ──

  const totalCount = useMemo(
    () => paginationMeta?.total ?? 0,
    [paginationMeta],
  );

  const hasActiveFilters = useMemo(
    () => !!debouncedSearch || categoryFilter !== "all",
    [debouncedSearch, categoryFilter],
  );

  // Stat cards: ["All", ...categories] — rebuild hanya saat categories/totalCount berubah
  const statCards = useMemo(
    () => [{ id: "all", name: "All", count: totalCount }, ...categories],
    [categories, totalCount],
  );

  // Dropdown options
  const categoryOptions = useMemo(
    () => [
      { id: "all", name: "All Categories" },
      ...categories.map((c) => ({ id: c.id, name: c.name })),
    ],
    [categories],
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
            Destinations
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {isLoading ? (
              <span className="inline-block w-24 h-3 bg-primary/10 animate-pulse rounded" />
            ) : (
              `${totalCount} total destinations`
            )}
          </p>
        </div>

        <Link
          href="/dashboard/destinations/new"
          className="inline-flex items-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Destination
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
              const isActive = categoryFilter === stat.id;
              const displayValue =
                stat.id === "all" ? totalCount : stat.count > 0 ? stat.count : "—";

              return (
                <button
                  key={stat.id}
                  onClick={() => handleCategoryChange(stat.id)}
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
                    {stat.name}
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

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border border-primary/20 p-3 mb-6 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search destinations..."
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

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-primary/15 self-center" />

        {/* Category dropdown */}
        <div className="relative shrink-0 h-[42px]">
          <select
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
            disabled={isFiltersLoading}
            className={`appearance-none h-full pl-3 pr-8 py-2.5 text-sm tracking-widest border focus:outline-none focus:border-primary/50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              categoryFilter !== "all"
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary/60 border-primary/20 hover:border-primary/40 hover:text-primary/80"
            }`}
          >
            {categoryOptions.map((opt) => (
              <option
                key={opt.id}
                value={opt.id}
                className="bg-white text-primary normal-case font-normal tracking-normal"
              >
                {opt.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${
              categoryFilter !== "all" ? "text-white/70" : "text-primary/40"
            }`}
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
          Showing {paginationMeta.total} destination
          {paginationMeta.total !== 1 ? "s" : ""}
          {categoryFilter !== "all" &&
            ` in ${categoryOptions.find((c) => c.id === categoryFilter)?.name ?? ""}`}
          {debouncedSearch && ` for "${debouncedSearch}"`}
        </p>
      )}

      {/* ── Grid ── */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : destinations.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <MapPin className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {debouncedSearch
              ? `No destinations match "${debouncedSearch}"`
              : "No destinations in this category yet"}
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
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
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
            name={deleteTarget.name}
            onConfirm={deleteDestinationById}
            onCancel={closeDeleteModal}
            isLoading={deleteStatus === "deleting"}
          />
        )}
    </div>
  );
}