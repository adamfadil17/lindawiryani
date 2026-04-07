"use client";

import { useEffect, useCallback, useReducer, useRef, useMemo } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Plus,
  Search,
  FolderOpen,
  Pencil,
  Trash2,
  X,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import { DestinationCategory } from "@/types";
import {
  destinationCategoryFormSchema,
  type DestinationCategoryFormData,
} from "@/utils/form-validators";
import { CreateModal } from "@/components/shared/create-modal";
import DeleteModal from "@/components/shared/delete-modal";
import type { PaginationMeta } from "@/lib/api-response";
import { toast } from "sonner";
import { toSlug } from "@/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const LIMIT = 20;

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageState {
  // data
  categories: DestinationCategory[];
  paginationMeta: PaginationMeta | null;
  isLoading: boolean;
  // search & pagination
  searchTerm: string;
  debouncedSearch: string;
  currentPage: number;
  // delete state machine
  deleteStatus: "idle" | "confirm" | "deleting";
  deleteTarget: DestinationCategory | null;
  // create modal
  createStatus: "idle" | "open" | "creating";
}

type PageAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; categories: DestinationCategory[]; meta: PaginationMeta | null }
  | { type: "FETCH_ERROR" }
  | { type: "SET_SEARCH"; value: string }
  | { type: "SET_DEBOUNCED_SEARCH"; value: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "OPEN_DELETE"; category: DestinationCategory }
  | { type: "CLOSE_DELETE" }
  | { type: "DELETE_START" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_ERROR" }
  | { type: "OPEN_CREATE" }
  | { type: "CLOSE_CREATE" }
  | { type: "CREATE_START" }
  | { type: "CREATE_SUCCESS" }
  | { type: "CREATE_ERROR" };

const initialState: PageState = {
  categories: [],
  paginationMeta: null,
  isLoading: true,
  searchTerm: "",
  debouncedSearch: "",
  currentPage: 1,
  deleteStatus: "idle",
  deleteTarget: null,
  createStatus: "idle",
};

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        categories: action.categories,
        paginationMeta: action.meta,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false };

    case "SET_SEARCH":
      return { ...state, searchTerm: action.value };
    case "SET_DEBOUNCED_SEARCH":
      return { ...state, debouncedSearch: action.value, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };

    case "OPEN_DELETE":
      return { ...state, deleteTarget: action.category, deleteStatus: "confirm" };
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

    case "OPEN_CREATE":
      return { ...state, createStatus: "open" };
    case "CLOSE_CREATE":
      return state.createStatus === "creating"
        ? state
        : { ...state, createStatus: "idle" };
    case "CREATE_START":
      return { ...state, createStatus: "creating" };
    case "CREATE_SUCCESS":
      return { ...state, createStatus: "idle" };
    case "CREATE_ERROR":
      return { ...state, createStatus: "open" };

    default:
      return state;
  }
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="hidden sm:flex items-center gap-4 px-6 py-4 border-b border-primary/10 animate-pulse">
      <div className="w-8 h-3 bg-primary/10 rounded" />
      <div className="w-9 h-9 bg-primary/10 rounded shrink-0" />
      <div className="flex-1 h-3 bg-primary/10 rounded" />
      <div className="w-24 h-3 bg-primary/10 rounded" />
      <div className="w-20 h-3 bg-primary/10 rounded" />
    </div>
  );
}

function SkeletonRowMobile() {
  return (
    <div className="flex sm:hidden items-center gap-3 px-4 py-3.5 border-b border-primary/10 animate-pulse">
      <div className="w-9 h-9 bg-primary/10 rounded shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-primary/10 rounded w-2/3" />
        <div className="h-2.5 bg-primary/10 rounded w-1/3" />
      </div>
      <div className="w-20 h-3 bg-primary/10 rounded" />
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
      range.push(1, "...", meta.page - 1, meta.page, meta.page + 1, "...", meta.totalPages);
    }
    return range;
  };

  if (meta.total === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-primary/20">
      <p className="text-primary/60 text-xs tracking-wider order-2 sm:order-1">
        Showing{" "}
        <span className="text-primary font-medium">
          {(meta.page - 1) * meta.limit + 1}–{Math.min(meta.page * meta.limit, meta.total)}
        </span>{" "}
        of <span className="text-primary font-medium">{meta.total}</span>
      </p>

      <div className="flex items-center gap-1 order-1 sm:order-2 flex-wrap justify-center">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!meta.hasPrev}
          className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center border border-primary/50 text-primary/50 hover:text-primary hover:border-primary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getVisiblePages().map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-primary/40 text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-xs tracking-wider transition-colors hover:cursor-pointer ${
                meta.page === p
                  ? "bg-primary text-white border border-primary"
                  : "border border-primary/20 text-primary/70 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={!meta.hasNext}
          className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center border border-primary/50 text-primary/50 hover:text-primary hover:border-primary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Category Row ─────────────────────────────────────────────────────────────

function CategoryRow({
  category,
  index,
  onDeleteClick,
}: {
  category: DestinationCategory;
  index: number;
  onDeleteClick: (category: DestinationCategory) => void;
}) {
  const locationCount = category.locations?.length ?? 0;

  return (
    <>
      {/* ── Mobile ── */}
      <div className="flex sm:hidden items-center gap-3 px-4 py-3.5 border-b border-primary/10 active:bg-primary/5 transition-colors">
        <div className="w-9 h-9 bg-primary/5 flex items-center justify-center shrink-0">
          <FolderOpen className="w-4 h-4 text-primary/40" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-primary font-medium text-sm truncate">{category.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-primary/30 shrink-0" />
            <span className="text-xs text-primary/50">
              {locationCount} {locationCount === 1 ? "location" : "locations"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <Link
            href={`/dashboard/destination-categories/${category.id}`}
            className="w-9 h-9 flex items-center justify-center text-primary/40 hover:text-primary active:text-primary active:bg-primary/10 transition-colors"
            title="Edit Category"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDeleteClick(category)}
            className="w-9 h-9 flex items-center justify-center text-primary/40 hover:text-red-500 active:text-red-500 active:bg-red-50 transition-colors hover:cursor-pointer"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <Link
            href={`/dashboard/destination-categories/${category.id}`}
            className="w-9 h-9 flex items-center justify-center text-primary/40 hover:text-primary active:text-primary active:bg-primary/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden sm:flex items-center gap-4 px-6 py-4 border-b border-primary/10 hover:bg-primary/2 transition-colors group">
        <span className="w-8 text-xs text-primary/30 font-mono shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="w-9 h-9 bg-primary/5 flex items-center justify-center shrink-0">
          <FolderOpen className="w-4 h-4 text-primary/40" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-primary font-medium text-sm">{category.name}</p>
          <p className="text-primary/40 text-xs font-mono mt-0.5">{category.slug}</p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <MapPin className="w-3 h-3 text-primary/30" />
          <span className="text-xs text-primary/50">
            {locationCount} {locationCount === 1 ? "location" : "locations"}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Link
            href={`/dashboard/destination-categories/${category.id}`}
            className="w-8 h-8 flex items-center justify-center text-primary/50 hover:text-primary hover:bg-primary/10 transition-colors"
            title="Edit Category"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDeleteClick(category)}
            className="w-8 h-8 flex items-center justify-center text-primary/50 hover:text-red-500 hover:bg-red-50 transition-colors hover:cursor-pointer"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <Link
            href={`/dashboard/destination-categories/${category.id}`}
            className="w-8 h-8 flex items-center justify-center text-primary/50 hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardDestinationCategoriesPage() {
  const [state, dispatch] = useReducer(pageReducer, initialState);

  const {
    categories,
    paginationMeta,
    isLoading,
    searchTerm,
    debouncedSearch,
    currentPage,
    deleteStatus,
    deleteTarget,
    createStatus,
  } = state;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // ── Debounce search ──
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: "SET_DEBOUNCED_SEARCH", value: searchTerm });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm]);

  // ── Fetch categories ──
  const getCategories = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    dispatch({ type: "FETCH_START" });
    try {
      const params: Record<string, unknown> = { page: currentPage, limit: LIMIT };
      if (debouncedSearch) params.search = debouncedSearch;

      const response = await axios.get("/api/destination-categories", {
        params,
        signal: abortRef.current.signal,
      });

      dispatch({
        type: "FETCH_SUCCESS",
        categories: response.data.data ?? [],
        meta: response.data.meta ?? null,
      });
    } catch (err) {
      if (axios.isCancel(err)) return;
      const errorMsg = axios.isAxiosError(err)
        ? `Error ${err.response?.status ?? "Unknown"}: ${err.message}`
        : err instanceof Error
          ? err.message
          : "Failed to load categories";
      toast.error("Failed to load categories", { description: errorMsg });
      dispatch({ type: "FETCH_ERROR" });
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // ── Create ──
  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    formState: { errors: createErrors },
    reset: resetCreate,
    watch: watchCreate,
    setValue: setValueCreate,
  } = useForm<DestinationCategoryFormData>({
    resolver: zodResolver(destinationCategoryFormSchema),
    defaultValues: { name: "", slug: "" },
  });

  // Auto-generate slug dari name
  const createName = watchCreate("name");
  useEffect(() => {
    setValueCreate("slug", toSlug(createName), { shouldValidate: false });
  }, [createName, setValueCreate]);

  const handleCreateCategory = useCallback(
    async (data: DestinationCategoryFormData) => {
      dispatch({ type: "CREATE_START" });
      try {
        await axios.post("/api/destination-categories", data, {
          headers: getAuthHeaders(true),
        });
        toast.success("Category created successfully");
        dispatch({ type: "CREATE_SUCCESS" });
        resetCreate();
        getCategories();
      } catch (err) {
        const errorMsg = axios.isAxiosError(err)
          ? `Error ${err.response?.status ?? "Unknown"}: ${err.message}`
          : "Failed to create category";
        toast.error("Failed to create category", { description: errorMsg });
        dispatch({ type: "CREATE_ERROR" });
      }
    },
    [getCategories, resetCreate]
  );

  const openCreateModal = useCallback(() => dispatch({ type: "OPEN_CREATE" }), []);
  const closeCreateModal = useCallback(() => {
    dispatch({ type: "CLOSE_CREATE" });
    resetCreate();
  }, [resetCreate]);

  // ── Delete ──
  const openDeleteModal = useCallback(
    (category: DestinationCategory) => dispatch({ type: "OPEN_DELETE", category }),
    []
  );
  const closeDeleteModal = useCallback(() => dispatch({ type: "CLOSE_DELETE" }), []);

  const deleteCategory = useCallback(async () => {
    if (!deleteTarget) return;
    dispatch({ type: "DELETE_START" });
    try {
      await axios.delete(`/api/destination-categories/${deleteTarget.id}`, {
        headers: getAuthHeaders(),
      });
      toast.success(`"${deleteTarget.name}" deleted`);
      dispatch({ type: "DELETE_SUCCESS" });
      const isLastOnPage = categories.length === 1 && currentPage > 1;
      if (isLastOnPage) {
        dispatch({ type: "SET_PAGE", page: currentPage - 1 });
      } else {
        getCategories();
      }
    } catch (err) {
      const errorMsg = axios.isAxiosError(err)
        ? `Error ${err.response?.status ?? "Unknown"}: ${err.message}`
        : "Failed to delete category";
      toast.error("Failed to delete category", { description: errorMsg });
      dispatch({ type: "DELETE_ERROR" });
    }
  }, [deleteTarget, categories.length, currentPage, getCategories]);

  // ── Derived values ──
  const totalCategories = useMemo(() => paginationMeta?.total ?? 0, [paginationMeta]);
  const totalLocations = useMemo(
    () => categories.reduce((acc, c) => acc + (c.locations?.length ?? 0), 0),
    [categories]
  );
  const hasActiveSearch = useMemo(() => !!debouncedSearch, [debouncedSearch]);
  const handlePageChange = useCallback(
    (page: number) => dispatch({ type: "SET_PAGE", page }),
    []
  );

  // ── Stable submit handler for CreateModal ──
  const onConfirmCreate = useMemo(
    () => handleCreateSubmit(handleCreateCategory),
    [handleCreateSubmit, handleCreateCategory]
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Destination Categories
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {isLoading ? (
              <span className="inline-block w-24 h-3 bg-primary/10 animate-pulse rounded" />
            ) : (
              `${totalCategories} total categories`
            )}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 active:bg-primary/80 transition-colors hover:cursor-pointer w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* ── Stats Cards ── */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white border border-primary/20 p-4 sm:p-5 animate-pulse">
              <div className="h-3 bg-primary/10 w-2/3 rounded mb-3" />
              <div className="h-7 bg-primary/10 w-10 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-primary text-white p-4 sm:p-5 border border-primary">
            <p className="text-xs tracking-[0.2em] uppercase text-white/70 mb-1.5">
              Total Categories
            </p>
            <p className="text-2xl font-semibold">{totalCategories}</p>
          </div>
          <div className="bg-white border border-primary/20 p-4 sm:p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/60 mb-1.5">
              Total Locations
            </p>
            <p className="text-2xl font-semibold text-primary">{totalLocations}</p>
          </div>
        </div>
      )}

      {/* ── Search Bar ── */}
      <div className="bg-white border border-primary/20 p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => dispatch({ type: "SET_SEARCH", value: e.target.value })}
            className="w-full pl-9 pr-8 py-2.5 text-sm text-primary placeholder:text-primary/50 bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => dispatch({ type: "SET_SEARCH", value: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary/80 active:text-primary/80 hover:cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Results info ── */}
      {hasActiveSearch && !isLoading && paginationMeta && (
        <p className="text-primary/80 text-sm tracking-wider mb-4">
          Showing {paginationMeta.total} categor
          {paginationMeta.total !== 1 ? "ies" : "y"} for &ldquo;{debouncedSearch}&rdquo;
        </p>
      )}

      {/* ── List / Table ── */}
      <div className="bg-white border border-primary/20 overflow-hidden">
        {/* Desktop header */}
        <div className="hidden sm:flex items-center gap-4 px-6 py-3 bg-primary/3 border-b border-primary/10">
          <span className="w-8 text-xs tracking-widest uppercase text-primary/40">#</span>
          <span className="w-9 shrink-0" />
          <span className="flex-1 text-xs tracking-widest uppercase text-primary/40">Name</span>
          <span className="shrink-0 text-xs tracking-widest uppercase text-primary/40">Locations</span>
          <span className="w-24 shrink-0 text-xs tracking-widest uppercase text-primary/40 text-right">Actions</span>
        </div>

        {/* Mobile header */}
        <div className="flex sm:hidden items-center px-4 py-2.5 bg-primary/3 border-b border-primary/10">
          <span className="text-xs tracking-widest uppercase text-primary/40">Categories</span>
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <>
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div key={i}>
                <SkeletonRow />
                <SkeletonRowMobile />
              </div>
            ))}
          </>
        )}

        {/* Empty state */}
        {!isLoading && categories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 sm:py-24 text-center px-4">
            <FolderOpen className="w-8 h-8 text-primary/20 mb-4" />
            <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">No Results</p>
            <p className="text-primary/60 text-sm">
              {debouncedSearch
                ? `No categories match "${debouncedSearch}"`
                : "No destination categories yet"}
            </p>
            {hasActiveSearch && (
              <button
                onClick={() => dispatch({ type: "SET_SEARCH", value: "" })}
                className="mt-4 text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors hover:cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Rows */}
        {!isLoading &&
          categories.map((category, index) => (
            <CategoryRow
              key={category.id}
              category={category}
              index={(currentPage - 1) * LIMIT + index}
              onDeleteClick={openDeleteModal}
            />
          ))}
      </div>

      {/* ── Pagination ── */}
      {paginationMeta && !isLoading && (
        <Pagination meta={paginationMeta} onPageChange={handlePageChange} />
      )}

      {/* ── Create Modal ── */}
      {(createStatus === "open" || createStatus === "creating") && (
        <CreateModal
          onSubmit={onConfirmCreate}
          onCancel={closeCreateModal}
          isLoading={createStatus === "creating"}
          register={registerCreate}
          errors={createErrors}
        />
      )}

      {/* ── Delete Modal ── */}
      {(deleteStatus === "confirm" || deleteStatus === "deleting") && deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          onConfirm={deleteCategory}
          onCancel={closeDeleteModal}
          isLoading={deleteStatus === "deleting"}
        />
      )}
    </div>
  );
}