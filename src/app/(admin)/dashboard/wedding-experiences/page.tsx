"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Eye, X, Sparkles } from "lucide-react";
import { weddingExperienceList } from "@/lib/data/new-data/wedding-experience-data";
import {
  getVenuesForExperience,
  getThemesForExperience,
} from "@/lib/data/new-data/resolvers";
import { WeddingExperience } from "@/lib/types/new-strucutre";

// ─── Category color map ───────────────────────────────────────────────────────

const categoryColor: Record<string, { badge: string; dot: string }> = {
  "luxury-weddings": { badge: "bg-amber-500 text-white", dot: "bg-amber-400" },
  "private-villa-weddings": {
    badge: "bg-teal-500 text-white",
    dot: "bg-teal-400",
  },
  "intimate-weddings": {
    badge: "bg-violet-500 text-white",
    dot: "bg-violet-400",
  },
  "elopement-weddings": { badge: "bg-rose-500 text-white", dot: "bg-rose-400" },
};

function categoryLabel(id: string) {
  return (
    {
      "luxury-weddings": "Luxury",
      "private-villa-weddings": "Private Villa",
      "intimate-weddings": "Intimate",
      "elopement-weddings": "Elopement",
    }[id] ?? id
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteModal({
  name,
  onConfirm,
  onCancel,
}: {
  name: string;
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
        <p className="text-primary/80 tracking-[0.2em] uppercase text-xs mb-2">
          Confirm Delete
        </p>
        <h2 className="text-primary text-xl font-semibold tracking-wide mb-3">
          Delete Experience
        </h2>
        <p className="text-primary/80 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{name}&rdquo;
          </span>
          ? This action cannot be undone.
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

// ─── Experience Card ──────────────────────────────────────────────────────────

function ExperienceCard({
  exp,
  onDelete,
}: {
  exp: WeddingExperience;
  onDelete: (exp: WeddingExperience) => void;
}) {
  const venues = getVenuesForExperience(exp.id);
  const themes = getThemesForExperience(exp.id);
  const colors = categoryColor[exp.category] ?? {
    badge: "bg-primary text-white",
    dot: "bg-primary",
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
          {exp.hero.desc}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Venues", value: venues.length },
            { label: "Themes", value: themes.length },
            { label: "FAQs", value: exp.faqs.length },
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
          {["Hero", "Intro", "Approach", "Services", "Closing", "FAQs"].map(
            (s) => (
              <span
                key={s}
                className="text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 bg-primary/5 text-primary/40 border border-primary/15"
              >
                {s}
              </span>
            ),
          )}
        </div>

        {/* Divider + actions */}
        <div className="border-t border-primary/20 pt-4 flex items-center justify-between">
          <span className="text-[10px] text-primary/40 tracking-wider font-mono">{exp.id}</span>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardExperiencesPage() {
  const [experiences, setExperiences] = useState<WeddingExperience[]>(
    weddingExperienceList,
  );
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<WeddingExperience | null>(
    null,
  );

  const filtered = experiences.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.hero.desc.toLowerCase().includes(q)
    );
  });

  const confirmDelete = () => {
    if (deleteTarget) {
      setExperiences((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      setDeleteTarget(null);
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
          <h1 className="text-primary text-2xl font-semibold tracking-wide">
            Wedding Experiences
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {experiences.length} experience categories
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            id: "luxury-weddings",
            label: "Luxury",
            color: "border-l-amber-400",
          },
          {
            id: "private-villa-weddings",
            label: "Private Villa",
            color: "border-l-teal-400",
          },
          {
            id: "intimate-weddings",
            label: "Intimate",
            color: "border-l-violet-400",
          },
          {
            id: "elopement-weddings",
            label: "Elopement",
            color: "border-l-rose-400",
          },
        ].map((stat) => {
          const exp = experiences.find((e) => e.id === stat.id);
          const venueCount = exp ? getVenuesForExperience(stat.id).length : 0;
          return (
            <Link
              key={stat.id}
              href={`/dashboard/wedding-experiences/${stat.id}`}
              className={`p-5 bg-white border border-primary/20 border-l-4 ${stat.color} hover:border-primary/30 hover:shadow-sm transition-all duration-200`}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-primary/60 mb-1.5">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-primary">
                {venueCount}
              </p>
              <p className="text-[10px] text-primary/40 tracking-wider mt-0.5">
                venues
              </p>            </Link>
          );
        })}
      </div>

      {/* ── Search Bar ── */}
      <div className="bg-white border border-primary/20 p-3 mb-6 flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search experiences..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-sm text-primary placeholder:text-primary/40 bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {search && (
          <p className="text-primary/40 text-xs tracking-wider whitespace-nowrap">
            {filtered.length} of {experiences.length}
          </p>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <Sparkles className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-[0.2em] uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            No experiences match &ldquo;{search}&rdquo;
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-4 text-xs tracking-[0.2em] uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {filtered.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} onDelete={setDeleteTarget} />
          ))}
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}