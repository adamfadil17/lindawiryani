"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Filter,
  X,
  Heart,
  Sparkles,
} from "lucide-react";
import { ThemeType, WeddingTheme } from "@/lib/types/new-strucutre";
import { weddingThemeList } from "@/lib/data/new-data/wedding-theme-data";

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteModal({
  theme,
  onConfirm,
  onCancel,
}: {
  theme: WeddingTheme;
  onConfirm: () => void;
  onCancel: () => void;
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
          Delete Wedding Theme
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{theme.title}&rdquo;
          </span>
          ? This action cannot be undone and will permanently remove this
          wedding theme from the system.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-primary/30 text-primary text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Wedding Theme Card ───────────────────────────────────────────────────────

function WeddingThemeCard({
  theme,
  onDelete,
}: {
  theme: WeddingTheme;
  onDelete: (theme: WeddingTheme) => void;
}) {
  return (
    <div className="bg-white border border-primary/20 group hover:border-primary/30 transition-all duration-300 hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={theme.image || "https://placehold.net/default.svg"}
          alt={theme.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs tracking-widest uppercase px-2.5 py-1 font-medium ${
              theme.type === "ELOPEMENT"
                ? "bg-rose-500 text-white"
                : "bg-violet-500 text-white"
            }`}
          >
            {theme.type === "ELOPEMENT" ? (
              <Heart className="w-3 h-3" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
            {theme.type.toLowerCase()}
          </span>
        </div>
        {/* Gallery count */}
        {theme.gallery && theme.gallery.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs not-first:tracking-widest uppercase px-2 py-1">
            +{theme.gallery.length - 1} photos
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <p className="text-primary/60 text-xs tracking-widest uppercase mb-1">
            {theme.themeName.replace(/_/g, " ")}
          </p>
          <h3 className="text-primary font-semibold text-base leading-snug">
            {theme.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-primary/80 text-sm leading-relaxed line-clamp-2 mb-4">
          {theme.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-5 text-xs text-primary/80">
          <span>{theme.inclusions?.length ?? 0} inclusions</span>
          {theme.venueId && (
            <>
              <span className="text-primary/20">·</span>
              <span>Venue #{theme.venueId}</span>
            </>
          )}
          {theme.gallery && theme.gallery.length > 0 && (
            <>
              <span className="text-primary/20">·</span>
              <span>{theme.gallery.length} photos</span>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-primary/20 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary/80 font-semibold tracking-wider truncate max-w-[140px]">
              {theme.id}
            </span>

            <div className="flex items-center gap-1">
              <Link
                href={`/wedding-themes/${theme.id}`}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

const allThemes: WeddingTheme[] = weddingThemeList;

export default function DashboardWeddingThemesPage() {
  const [themes, setThemes] = useState<WeddingTheme[]>(allThemes);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | ThemeType>("all");
  const [deleteTarget, setDeleteTarget] = useState<WeddingTheme | null>(null);

  const filtered = themes.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.themeName.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || t.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleDelete = (theme: WeddingTheme) => setDeleteTarget(theme);

  const confirmDelete = () => {
    if (deleteTarget) {
      setThemes((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const elopementCount = themes.filter((t) => t.type === "ELOPEMENT").length;
  const intimateCount = themes.filter((t) => t.type === "INTIMATE").length;

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Wedding Themes
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {themes.length} total wedding themes
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

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total",
            value: themes.length,
            active: typeFilter === "all",
            onClick: () => setTypeFilter("all"),
          },
          {
            label: "Elopement",
            value: elopementCount,
            active: typeFilter === "ELOPEMENT",
            onClick: () => setTypeFilter("ELOPEMENT"),
          },
          {
            label: "Intimate",
            value: intimateCount,
            active: typeFilter === "INTIMATE",
            onClick: () => setTypeFilter("INTIMATE"),
          },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={stat.onClick}
            className={`p-5 border text-left transition-all duration-200 hover:cursor-pointer ${
              stat.active
                ? "bg-primary text-white border-primary"
                : "bg-white border-primary/20 text-primary hover:border-primary/30"
            }`}
          >
            <p
              className={`text-sm tracking-[0.2em] uppercase mb-1.5 ${
                stat.active ? "text-white/80" : "text-primary/80"
              }`}
            >
              {stat.label}
            </p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </button>
        ))}
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border border-primary/20 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search wedding themes..."
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

        <div className="relative shrink-0">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as "all" | ThemeType)}
            className="w-full sm:w-48 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer hover:border-primary/40 hover:text-primary/80"
          >
            <option value="all">All Types</option>
            <option value="ELOPEMENT">Elopement</option>
            <option value="INTIMATE">Intimate</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
            <svg
              className="w-3 h-3 text-primary/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Results Count ── */}
      {(search || typeFilter !== "all") && (
        <p className="text-primary/80 text-sm tracking-wider mb-4">
          Showing {filtered.length} of {themes.length} wedding themes
          {search && ` for "${search}"`}
        </p>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <Heart className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {search
              ? `No wedding themes match "${search}"`
              : "No wedding themes in this category yet"}
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-xs tracking-widest uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((theme) => (
            <WeddingThemeCard
              key={theme.id}
              theme={theme}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <DeleteModal
          theme={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
