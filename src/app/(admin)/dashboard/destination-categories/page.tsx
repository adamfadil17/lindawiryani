"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  FolderOpen,
  Pencil,
  Trash2,
  X,
  MapPin,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Destination {
  id: string;
  name: string;
}

interface DestinationCategory {
  id: string;
  name: string;
  destinations: Destination[];
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteModal({
  category,
  onConfirm,
  onCancel,
  isLoading,
}: {
  category: DestinationCategory;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white w-full max-w-md mx-4 p-8 shadow-2xl">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-primary/50 hover:cursor-pointer hover:text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 bg-red-50 flex items-center justify-center mb-6">
          <Trash2 className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-primary/60 tracking-[0.2em] uppercase text-xs mb-2">
          Confirm Delete
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          Delete Category
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{category.name}&rdquo;
          </span>
          ? This action cannot be undone.{" "}
          {category.destinations.length > 0 && (
            <span className="text-red-500 font-medium">
              This category has {category.destinations.length} destination(s)
              linked to it.
            </span>
          )}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 border border-primary/30 text-primary text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/10 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-500 text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Create Modal ─────────────────────────────────────────────────────────────

function CreateModal({
  onConfirm,
  onCancel,
  isLoading,
}: {
  onConfirm: (name: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white w-full max-w-md mx-4 p-8 shadow-2xl">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-primary/50 hover:cursor-pointer hover:text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 bg-primary/5 flex items-center justify-center mb-6">
          <FolderOpen className="w-5 h-5 text-primary" />
        </div>
        <p className="text-primary/60 tracking-[0.2em] uppercase text-xs mb-2">
          New Category
        </p>
        <h2 className="text-primary text-xl font-semibold mb-6">
          Add Destination Category
        </h2>

        <div className="mb-6">
          <label className="block text-xs tracking-widest uppercase text-primary/60 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && name.trim() && onConfirm(name.trim())}
            placeholder="e.g. Bali, Lombok, Java..."
            autoFocus
            className="w-full px-4 py-3 text-sm text-primary placeholder:text-primary/40 border border-primary/20 focus:outline-none focus:border-primary/60 transition-colors"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 border border-primary/30 text-primary text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/10 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => name.trim() && onConfirm(name.trim())}
            disabled={isLoading || !name.trim()}
            className="flex-1 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Category Row ─────────────────────────────────────────────────────────────

function CategoryRow({
  category,
  index,
  onDelete,
}: {
  category: DestinationCategory;
  index: number;
  onDelete: (category: DestinationCategory) => void;
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-primary/10 hover:bg-primary/2 transition-colors group">
      {/* Index */}
      <span className="w-8 text-xs text-primary/30 font-mono shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div className="w-9 h-9 bg-primary/5 flex items-center justify-center shrink-0">
        <FolderOpen className="w-4 h-4 text-primary/40" />
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="text-primary font-medium text-sm">{category.name}</p>
      </div>

      {/* Destination Count */}
      <div className="flex items-center gap-1.5 shrink-0">
        <MapPin className="w-3 h-3 text-primary/30" />
        <span className="text-xs text-primary/50">
          {category.destinations.length}{" "}
          {category.destinations.length === 1 ? "destination" : "destinations"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link
          href={`/dashboard/destination-categories/${category.id}`}
          className="w-8 h-8 flex items-center justify-center text-primary/50 hover:text-primary hover:bg-primary/10 transition-colors"
          title="Edit Category"
        >
          <Pencil className="w-4 h-4" />
        </Link>
        <button
          onClick={() => onDelete(category)}
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
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardDestinationCategoriesPage() {
  const [categories, setCategories] = useState<DestinationCategory[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<DestinationCategory | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        ...(search && { search }),
      });
      const res = await fetch(`/api/destination-categories?${params}`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const json = await res.json();
      setCategories(json.data);
      setMeta(json.meta);
    } catch {
      setError("Failed to load categories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchCategories();
    }, search ? 400 : 0);
    return () => clearTimeout(debounce);
  }, [fetchCategories, search]);

  // Reset page on search change
  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleCreate = async (name: string) => {
    setIsCreating(true);
    try {
      const res = await fetch("/api/destination-categories", {
        method: "POST",
        headers: getAuthHeaders(true),
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Failed to create");
      setShowCreate(false);
      fetchCategories();
    } catch {
      setError("Failed to create category.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/destination-categories/${deleteTarget.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setDeleteTarget(null);
      fetchCategories();
    } catch {
      setError("Failed to delete category.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Destination Categories
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {meta ? `${meta.total} total categories` : "Loading..."}
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 transition-colors self-start sm:self-auto hover:cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="hover:cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-primary text-white p-5 border border-primary">
          <p className="text-xs tracking-[0.2em] uppercase text-white/70 mb-1.5">
            Total Categories
          </p>
          <p className="text-2xl font-semibold">{meta?.total ?? "—"}</p>
        </div>
        <div className="bg-white border border-primary/20 p-5">
          <p className="text-xs tracking-[0.2em] uppercase text-primary/60 mb-1.5">
            Total Destinations
          </p>
          <p className="text-2xl font-semibold text-primary">
            {categories.reduce((acc, c) => acc + c.destinations.length, 0)}
          </p>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="bg-white border border-primary/20 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm text-primary placeholder:text-primary/50 bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary/80 hover:cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-primary/20 overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center gap-4 px-6 py-3 bg-primary/3 border-b border-primary/10">
          <span className="w-8 text-xs tracking-widest uppercase text-primary/40">#</span>
          <span className="w-9 shrink-0" />
          <span className="flex-1 text-xs tracking-widest uppercase text-primary/40">Name</span>
          <span className="shrink-0 text-xs tracking-widest uppercase text-primary/40">
            Destinations
          </span>
          <span className="w-24 shrink-0 text-xs tracking-widest uppercase text-primary/40 text-right">
            Actions
          </span>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-6 h-6 text-primary/30 animate-spin mb-3" />
            <p className="text-primary/40 text-xs tracking-widest uppercase">
              Loading...
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && categories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FolderOpen className="w-8 h-8 text-primary/20 mb-4" />
            <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
              No Results
            </p>
            <p className="text-primary/60 text-sm">
              {search
                ? `No categories match "${search}"`
                : "No destination categories yet"}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
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
              index={(page - 1) * 20 + index}
              onDelete={(c) => setDeleteTarget(c)}
            />
          ))}
      </div>

      {/* ── Pagination ── */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-xs text-primary/50">
            Showing {(page - 1) * 20 + 1}–
            {Math.min(page * 20, meta.total)} of {meta.total}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs border border-primary/20 text-primary disabled:opacity-30 hover:bg-primary/5 transition-colors hover:cursor-pointer"
            >
              Prev
            </button>
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-xs transition-colors hover:cursor-pointer ${
                  p === page
                    ? "bg-primary text-white"
                    : "border border-primary/20 text-primary hover:bg-primary/5"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages}
              className="px-3 py-1.5 text-xs border border-primary/20 text-primary disabled:opacity-30 hover:bg-primary/5 transition-colors hover:cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {showCreate && (
        <CreateModal
          onConfirm={handleCreate}
          onCancel={() => setShowCreate(false)}
          isLoading={isCreating}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          category={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}