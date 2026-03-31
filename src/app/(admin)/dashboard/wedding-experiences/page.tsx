"use client";

import { useEffect, useCallback, useReducer, useRef, useMemo } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { WeddingExperience } from "@/types";
import DeleteModal from "@/components/shared/delete-modal";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import type { PaginationMeta } from "@/lib/api-response";

// ─── Constants ────────────────────────────────────────────────────────────────

const LIMIT = 6;

const STAT_CATEGORIES = [
  { id: "luxury_weddings",        label: "Luxury",       color: "border-l-amber-400"  },
  { id: "private_villa_weddings", label: "Private Villa", color: "border-l-teal-400"   },
  { id: "intimate_weddings",      label: "Intimate",     color: "border-l-violet-400" },
  { id: "elopement_weddings",     label: "Elopement",    color: "border-l-rose-400"   },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const categoryColor: Record<string, { badge: string; dot: string }> = {
  luxury_weddings:        { badge: "bg-amber-500 text-white",  dot: "bg-amber-400"  },
  private_villa_weddings: { badge: "bg-teal-500 text-white",   dot: "bg-teal-400"   },
  intimate_weddings:      { badge: "bg-violet-500 text-white", dot: "bg-violet-400" },
  elopement_weddings:     { badge: "bg-rose-500 text-white",   dot: "bg-rose-400"   },
};

function categoryLabel(id: string) {
  return (
    {
      luxury_weddings:        "Luxury",
      private_villa_weddings: "Private Villa",
      intimate_weddings:      "Intimate",
      elopement_weddings:     "Elopement",
    }[id] ?? id
  );
}

// ─── Experience Card ──────────────────────────────────────────────────────────

function ExperienceCard({
  exp,
  onDelete,
}: {
  exp: WeddingExperience;
  onDelete: (exp: WeddingExperience) => void;
}) {
  const venueCount = exp.venues?.length ?? 0;
  const themeCount = exp.themes?.length ?? 0;
  const faqCount   = exp.faqs?.length   ?? 0;

  const colors = categoryColor[exp.category] ?? {
    badge: "bg-primary text-white",
    dot:   "bg-primary",
  };

  return (
    <div className="bg-white border border-primary/20 group hover:border-primary/30 transition-all duration-300 hover:shadow-md">
      {/* Top color bar */}
      <div className={`h-1 w-full ${colors.dot}`} />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 font-medium mb-2 ${colors.badge}`}
            >
              <Sparkles className="w-3 h-3" />
              {categoryLabel(exp.category)}
            </span>
            <h3 className="text-primary font-semibold text-sm leading-snug tracking-wide">
              {exp.name}
            </h3>
          </div>
        </div>

        {/* Hero desc */}
        <p className="text-primary/80 text-sm leading-relaxed line-clamp-2 mb-5">
          {exp.hero_desc}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Venues", value: venueCount },
            { label: "Themes", value: themeCount },
            { label: "FAQs",   value: faqCount   },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-primary/5 border border-primary/10 p-3 text-center"
            >
              <p className="text-2xl font-semibold text-primary">{stat.value}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-primary/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Sections preview */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {["Hero", "Intro", "Approach", "Services", "Closing", "FAQs"].map((s) => (
            <span
              key={s}
              className="text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 bg-primary/5 text-primary/40 border border-primary/15"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Divider + actions */}
        <div className="border-t border-primary/20 pt-4 flex items-center justify-between">
          <span className="text-[10px] text-primary/40 tracking-wider font-mono truncate max-w-[120px]">
            {exp.slug}
          </span>
          <div className="flex items-center gap-1">
            <Link
              href={`/wedding-experiences/${exp.category}`}
              target="_blank"
              className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
              title="View Public Page"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <Link
              href={`/dashboard/wedding-experiences/${exp.id}`}
              className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
              title="Edit Experience"
            >
              <Pencil className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onDelete(exp)}
              className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Delete Experience"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white border border-primary/20 animate-pulse">
      <div className="h-1 w-full bg-primary/10" />
      <div className="p-6 space-y-4">
        <div className="h-4 w-1/3 bg-primary/10 rounded" />
        <div className="h-5 w-2/3 bg-primary/10 rounded" />
        <div className="h-10 w-full bg-primary/10 rounded" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((j) => (
            <div key={j} className="h-14 bg-primary/10 rounded" />
          ))}
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
        1, "...",
        meta.page - 1, meta.page, meta.page + 1,
        "...", meta.totalPages,
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
        experiences
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!meta.hasPrev}
          className="w-8 h-8 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
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
          className="w-8 h-8 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Page State (useReducer) ──────────────────────────────────────────────────

interface PageState {
  experiences: WeddingExperience[];
  paginationMeta: PaginationMeta | null;
  isLoading: boolean;
  search: string;
  debouncedSearch: string;
  currentPage: number;
  deleteStatus: "idle" | "confirm" | "deleting";
  deleteTarget: WeddingExperience | null;
}

type PageAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; experiences: WeddingExperience[]; meta: PaginationMeta | null }
  | { type: "FETCH_ERROR" }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_DEBOUNCED_SEARCH"; value: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "OPEN_DELETE"; exp: WeddingExperience }
  | { type: "CLOSE_DELETE" }
  | { type: "DELETE_START" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_ERROR" };

const initialState: PageState = {
  experiences: [],
  paginationMeta: null,
  isLoading: true,
  search: "",
  debouncedSearch: "",
  currentPage: 1,
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
        experiences: action.experiences,
        paginationMeta: action.meta,
      };

    case "FETCH_ERROR":
      return { ...state, isLoading: false };

    case "SET_SEARCH":
      return { ...state, search: action.value };

    case "SET_DEBOUNCED_SEARCH":
      // Search baru selalu kembali ke halaman 1
      return { ...state, debouncedSearch: action.value, currentPage: 1 };

    case "SET_PAGE":
      return { ...state, currentPage: action.page };

    case "OPEN_DELETE":
      return { ...state, deleteTarget: action.exp, deleteStatus: "confirm" };

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

export default function DashboardExperiencesPage() {
  const [state, dispatch] = useReducer(pageReducer, initialState);

  const {
    experiences, paginationMeta, isLoading,
    search, debouncedSearch, currentPage,
    deleteStatus, deleteTarget,
  } = state;

  // ── useRef: debounce timer — mutasi ref tidak memicu re-render ──
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── useRef: AbortController — batalkan fetch lama saat deps berubah ──
  const abortRef = useRef<AbortController | null>(null);

  // ── Debounce search: dispatch SET_DEBOUNCED_SEARCH 400ms setelah berhenti mengetik ──
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: "SET_DEBOUNCED_SEARCH", value: search });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  // ── Fetch experiences ──
  // useCallback memastikan fungsi hanya dibuat ulang saat deps benar-benar berubah,
  // sehingga useEffect di bawah tidak loop tanpa sebab.
  const getExperiences = useCallback(async () => {
    // Batalkan request sebelumnya untuk mencegah race condition
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    dispatch({ type: "FETCH_START" });
    try {
      const params: Record<string, unknown> = { page: currentPage, limit: LIMIT };
      if (debouncedSearch) params.search = debouncedSearch;

      const response = await axios.get("/api/wedding-experiences", {
        params,
        signal: abortRef.current.signal,
      });

      dispatch({
        type: "FETCH_SUCCESS",
        experiences: response.data.data ?? [],
        meta: response.data.meta ?? null,
      });
    } catch (err) {
      // Abort yang disengaja tidak dianggap error — langsung return
      if (axios.isCancel(err)) return;
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : "Failed to load experiences.";
      toast.error("Failed to load experiences", { description: errorMsg });
      dispatch({ type: "FETCH_ERROR" });
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    getExperiences();
  }, [getExperiences]);

  // ── Delete flow ──
  // useCallback dengan deps [] karena hanya memanggil dispatch (referensi stabil)
  const openDeleteModal = useCallback(
    (exp: WeddingExperience) => dispatch({ type: "OPEN_DELETE", exp }),
    [],
  );

  const closeDeleteModal = useCallback(
    () => dispatch({ type: "CLOSE_DELETE" }),
    [],
  );

  const deleteExperienceById = useCallback(async () => {
    if (!deleteTarget) return;
    dispatch({ type: "DELETE_START" });
    try {
      await axios.delete(`/api/wedding-experiences/${deleteTarget.id}`, {
        headers: getAuthHeaders(),
      });
      const isLastOnPage = experiences.length === 1 && currentPage > 1;
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Experience deleted!", {
        description: "The experience has been removed from the system.",
      });
      if (isLastOnPage) {
        // Mundur satu halaman agar tidak landing di halaman kosong
        dispatch({ type: "SET_PAGE", page: currentPage - 1 });
      } else {
        getExperiences();
      }
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : "Failed to delete experience.";
      toast.error("Failed to delete", { description: errorMsg });
      dispatch({ type: "DELETE_ERROR" });
    }
  }, [deleteTarget, experiences.length, currentPage, getExperiences]);

  // ── useMemo: derived values ──

  const totalCount = useMemo(
    () => paginationMeta?.total ?? 0,
    [paginationMeta],
  );

  // Dipakai untuk kondisi "X results" di search bar dan empty state
  const hasActiveSearch = useMemo(
    () => !!debouncedSearch,
    [debouncedSearch],
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl font-semibold tracking-wide">
            Wedding Experiences
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {isLoading ? (
              <span className="inline-block w-24 h-3 bg-primary/10 animate-pulse rounded" />
            ) : (
              `${totalCount} total experience categories`
            )}
          </p>
        </div>
        <Link
          href="/dashboard/wedding-experiences/new"
          className="inline-flex items-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Link>
      </div>

      {/* ── Stats Row ── */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {STAT_CATEGORIES.map((stat) => (
            <div
              key={stat.id}
              className={`p-5 bg-white border border-primary/20 border-l-4 ${stat.color} animate-pulse`}
            >
              <div className="h-3 bg-primary/10 w-2/3 rounded mb-3" />
              <div className="h-7 bg-primary/10 w-10 rounded mb-1.5" />
              <div className="h-2.5 bg-primary/10 w-1/3 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {STAT_CATEGORIES.map((stat) => {
            const exp = experiences.find((e) => e.category === stat.id);
            const venueCount = exp?.venues?.length ?? 0;
            return (
              <Link
                key={stat.id}
                href={`/dashboard/wedding-experiences/${exp?.id ?? stat.id}`}
                className={`p-5 bg-white border border-primary/20 border-l-4 ${stat.color} hover:border-primary/30 hover:shadow-sm transition-all duration-200`}
              >
                <p className="text-xs tracking-[0.2em] uppercase text-primary/60 mb-1.5">
                  {stat.label}
                </p>
                <p className="text-2xl font-semibold text-primary">{venueCount}</p>
                <p className="text-[10px] text-primary/40 tracking-wider mt-0.5">
                  venues
                </p>
              </Link>
            );
          })}
        </div>
      )}

      {/* ── Search Bar ── */}
      <div className="bg-white border border-primary/20 p-3 mb-6 flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search experiences…"
            value={search}
            onChange={(e) => dispatch({ type: "SET_SEARCH", value: e.target.value })}
            className="w-full pl-9 pr-8 py-2.5 text-sm text-primary placeholder:text-primary/40 bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => dispatch({ type: "SET_SEARCH", value: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary/60 transition-colors hover:cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {hasActiveSearch && !isLoading && (
          <p className="text-primary/40 text-xs tracking-wider whitespace-nowrap">
            {totalCount} results
          </p>
        )}
      </div>

      {/* ── Grid ── */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : experiences.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <Sparkles className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-[0.2em] uppercase mb-2">
            {debouncedSearch ? "No Results" : "No Experiences Yet"}
          </p>
          {debouncedSearch ? (
            <>
              <p className="text-primary/80 text-sm">
                No experiences match &ldquo;{debouncedSearch}&rdquo;
              </p>
              <button
                onClick={() => dispatch({ type: "SET_SEARCH", value: "" })}
                className="mt-4 text-xs tracking-[0.2em] uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
              >
                Clear Search
              </button>
            </>
          ) : (
            <p className="text-primary/80 text-sm">
              Get started by adding your first experience.
            </p>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} onDelete={openDeleteModal} />
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
            isLoading={deleteStatus === "deleting"}
            onConfirm={deleteExperienceById}
            onCancel={closeDeleteModal}
          />
        )}
    </div>
  );
}