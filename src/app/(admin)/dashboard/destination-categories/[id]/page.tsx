"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  FolderOpen,
  Pencil,
  Check,
  X,
  MapPin,
  Loader2,
  Eye,
  Trash2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Destination {
  id: string;
  name: string;
  slug: string;
  type: string;
  location: string;
  image: string;
  guest_capacity: string;
}

interface DestinationCategory {
  id: string;
  name: string;
  destinations: Destination[];
}

// ─── Destination Mini Card ────────────────────────────────────────────────────

function DestinationMiniCard({ destination }: { destination: Destination }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-primary/20 hover:border-primary/30 hover:shadow-sm transition-all group">
      <div className="relative w-16 h-12 shrink-0 overflow-hidden">
        <Image
          src={destination.image || "https://placehold.net/default.svg"}
          alt={destination.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-primary/60 text-xs tracking-widest uppercase mb-0.5">
          {destination.type}
        </p>
        <p className="text-primary font-medium text-sm truncate">
          {destination.name}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3 text-primary/30 shrink-0" />
          <p className="text-primary/50 text-xs truncate">{destination.location}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link
          href={`/destinations/${destination.slug}`}
          target="_blank"
          className="w-7 h-7 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-primary/10 transition-colors"
          title="View public page"
        >
          <Eye className="w-3.5 h-3.5" />
        </Link>
        <Link
          href={`/dashboard/destinations/${destination.id}`}
          className="w-7 h-7 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-primary/10 transition-colors"
          title="Edit destination"
        >
          <Pencil className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardDestinationCategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [category, setCategory] = useState<DestinationCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inline edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Delete state
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/destination-categories/${id}`);
      if (res.status === 404) {
        setError("Category not found.");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setCategory(json.data);
      setEditName(json.data.name);
    } catch {
      setError("Failed to load category. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleSave = async () => {
    if (!editName.trim() || editName === category?.name) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await fetch(`/api/destination-categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const json = await res.json();
      setCategory(json.data);
      setEditName(json.data.name);
      setIsEditing(false);
    } catch {
      setSaveError("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/destination-categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/dashboard/destination-categories");
    } catch {
      setError("Failed to delete category.");
      setIsDeleting(false);
      setShowDelete(false);
    }
  };

  // ── Loading ────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 className="w-6 h-6 text-primary/30 animate-spin mb-3" />
          <p className="text-primary/40 text-xs tracking-widest uppercase">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────

  if (error && !category) {
    return (
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <FolderOpen className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            Error
          </p>
          <p className="text-primary/60 text-sm mb-6">{error}</p>
          <Link
            href="/dashboard/destination-categories"
            className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  if (!category) return null;

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 mb-8">
        <Link
          href="/dashboard/destination-categories"
          className="flex items-center gap-1.5 text-primary/50 hover:text-primary transition-colors text-xs tracking-widest uppercase"
        >
          <ChevronLeft className="w-3 h-3" />
          Categories
        </Link>
        <span className="text-primary/20 text-xs">/</span>
        <span className="text-primary/80 text-xs tracking-widest uppercase truncate max-w-[200px]">
          {category.name}
        </span>
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left: Category Details ── */}
        <div className="lg:col-span-1 space-y-5">
          {/* Category Info Card */}
          <div className="bg-white border border-primary/20 p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-primary/60 tracking-[0.25em] uppercase text-xs mb-1">
                  Category
                </p>
                <p className="text-primary/40 text-xs font-mono">{category.id.slice(0, 8)}…</p>
              </div>
              <div className="w-10 h-10 bg-primary/5 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-primary/40" />
              </div>
            </div>

            {/* Inline Name Editor */}
            <div className="mb-5">
              <label className="block text-xs tracking-widest uppercase text-primary/40 mb-2">
                Category Name
              </label>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave();
                      if (e.key === "Escape") {
                        setEditName(category.name);
                        setIsEditing(false);
                        setSaveError(null);
                      }
                    }}
                    autoFocus
                    className="w-full px-3 py-2.5 text-sm text-primary border border-primary/30 focus:outline-none focus:border-primary/60 transition-colors"
                  />
                  {saveError && (
                    <p className="text-red-500 text-xs">{saveError}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving || !editName.trim()}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white text-xs tracking-widest uppercase py-2 hover:bg-primary/90 transition-colors disabled:opacity-50 hover:cursor-pointer"
                    >
                      {isSaving ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditName(category.name);
                        setIsEditing(false);
                        setSaveError(null);
                      }}
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-primary/20 text-primary text-xs tracking-widest uppercase py-2 hover:bg-primary/5 transition-colors hover:cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between group">
                  <p className="text-primary font-semibold text-lg">
                    {category.name}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-7 h-7 flex items-center justify-center text-primary/30 hover:text-primary hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100 hover:cursor-pointer"
                    title="Edit name"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="border-t border-primary/10 pt-4">
              <div className="flex items-center justify-between py-2 border-b border-primary/10">
                <span className="text-xs text-primary/50 tracking-wider">
                  Destinations
                </span>
                <span className="text-sm font-semibold text-primary">
                  {category.destinations.length}
                </span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border border-red-100 p-6">
            <p className="text-xs tracking-widest uppercase text-red-400 mb-3">
              Danger Zone
            </p>
            <p className="text-primary/60 text-xs leading-relaxed mb-4">
              Deleting this category will permanently remove it. Destinations
              linked to this category will need to be reassigned.
            </p>
            <button
              onClick={() => setShowDelete(true)}
              className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-red-50 transition-colors hover:cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Category
            </button>
          </div>
        </div>

        {/* ── Right: Destinations in this Category ── */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-primary/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10">
              <div>
                <p className="text-primary font-medium text-sm">
                  Destinations in this Category
                </p>
                <p className="text-primary/50 text-xs mt-0.5">
                  {category.destinations.length}{" "}
                  {category.destinations.length === 1
                    ? "destination"
                    : "destinations"}
                </p>
              </div>
              <Link
                href={`/dashboard/destinations?category=${category.id}`}
                className="text-xs tracking-widest uppercase text-primary/50 hover:text-primary transition-colors border-b border-primary/20 hover:border-primary"
              >
                View All
              </Link>
            </div>

            {/* Destination List */}
            {category.destinations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <MapPin className="w-7 h-7 text-primary/15 mb-3" />
                <p className="text-primary/60 text-xs tracking-widest uppercase mb-1.5">
                  No Destinations
                </p>
                <p className="text-primary/40 text-sm">
                  No destinations linked to this category yet.
                </p>
                <Link
                  href="/dashboard/destinations/new"
                  className="mt-4 text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
                >
                  Add Destination
                </Link>
              </div>
            ) : (
              <div className="p-4 grid sm:grid-cols-2 gap-3">
                {category.destinations.map((destination) => (
                  <DestinationMiniCard
                    key={destination.id}
                    destination={destination}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isDeleting && setShowDelete(false)}
          />
          <div className="relative bg-white w-full max-w-md mx-4 p-8 shadow-2xl">
            <button
              onClick={() => setShowDelete(false)}
              disabled={isDeleting}
              className="absolute top-4 right-4 text-primary/50 hover:cursor-pointer hover:text-primary transition-colors disabled:opacity-40"
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
                  This category has {category.destinations.length} destination(s) linked to it.
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                disabled={isDeleting}
                className="flex-1 border border-primary/30 text-primary text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/10 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-500 text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}