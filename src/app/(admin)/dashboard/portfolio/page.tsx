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
  X,
  Images,
  MapPin,
  Users,
  Tag,
  ChevronDown,
} from "lucide-react";
import { portfolioItems as initialPortfolios } from "@/lib/data/new-data/portfolio-data";
import { destinationList } from "@/lib/data/new-data/destination-data";
import { venueList } from "@/lib/data/new-data/venue-data";
import { weddingExperienceList } from "@/lib/data/new-data/wedding-experience-data";
import { Portfolio } from "@/lib/types/new-strucutre";

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteModal({
  portfolio,
  onConfirm,
  onCancel,
}: {
  portfolio: Portfolio;
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

        <p className="text-primary/60 tracking-[0.2em] uppercase text-[10px] mb-2">
          Confirm Delete
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          Delete Portfolio
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{portfolio.couple}&rdquo;
          </span>
          ? This action cannot be undone and will permanently remove this
          portfolio from the collection.
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
          src={portfolio.heroImage || "https://placehold.net/default.svg"}
          alt={portfolio.couple}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gallery count badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium bg-black/60 text-white backdrop-blur-sm">
            <Images className="w-3 h-3" />
            {portfolio.galleryImages?.length ?? 0}
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

        {/* Divider */}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(initialPortfolios);
  const [search, setSearch] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  const [filterVenue, setFilterVenue] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Portfolio | null>(null);

  // ── Filter options from imported data lists ──
  const destinationOptions = [{ id: "", name: "All Destinations" }, ...destinationList];
  const venueOptions = [{ id: "", name: "All Venues" }, ...venueList];
  const experienceOptions = [{ id: "", name: "All Experiences" }, ...weddingExperienceList];

  const hasActiveFilters =
    filterDestination !== "" || filterVenue !== "" || filterExperience !== "";

  const clearFilters = () => {
    setFilterDestination("");
    setFilterVenue("");
    setFilterExperience("");
  };

  const filtered = portfolios.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.couple.toLowerCase().includes(q) ||
      (p.subtitle ?? "").toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      (p.destination?.name ?? "").toLowerCase().includes(q) ||
      (p.venue?.name ?? "").toLowerCase().includes(q) ||
      (p.tags ?? []).some((t) => t.toLowerCase().includes(q));

    const matchesDestination = !filterDestination || p.destinationId === filterDestination;
    const matchesVenue = !filterVenue || p.venueId === filterVenue;
    const matchesExperience = !filterExperience || p.experienceId === filterExperience;

    return matchesSearch && matchesDestination && matchesVenue && matchesExperience;
  });

  const handleDelete = (portfolio: Portfolio) => setDeleteTarget(portfolio);

  const confirmDelete = () => {
    if (deleteTarget) {
      setPortfolios((prev) => prev.filter((p) => p.id !== deleteTarget.id));
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
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Portfolio
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {portfolios.length} total portfolios
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

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border border-primary/20 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search by couple, venue, destination, or tag…"
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

        {/* Destination Dropdown */}
        <div className="relative shrink-0">
          <select
            value={filterDestination}
            onChange={(e) => setFilterDestination(e.target.value)}
            className="w-full sm:w-44 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer hover:border-primary/40 hover:text-primary/80"
          >
            {destinationOptions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
        </div>

        {/* Venue Dropdown */}
        <div className="relative shrink-0">
          <select
            value={filterVenue}
            onChange={(e) => setFilterVenue(e.target.value)}
            className="w-full sm:w-44 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer hover:border-primary/40 hover:text-primary/80"
          >
            {venueOptions.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
        </div>

        {/* Experience Dropdown */}
        <div className="relative shrink-0">
          <select
            value={filterExperience}
            onChange={(e) => setFilterExperience(e.target.value)}
            className="w-full sm:w-44 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer hover:border-primary/40 hover:text-primary/80"
          >
            {experienceOptions.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center justify-center gap-1.5 shrink-0 px-3 py-2.5 text-xs tracking-widest uppercase text-primary/50 border border-primary/20 hover:text-primary hover:border-primary/40 hover:cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* ── Results Count ── */}
      {(search || hasActiveFilters) && (
        <p className="text-primary/50 text-xs tracking-wider mb-4">
          Showing {filtered.length} of {portfolios.length} portfolios
          {search && <> for &ldquo;{search}&rdquo;</>}
        </p>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <Images className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {search || hasActiveFilters
              ? "No portfolios match the current filters"
              : "No portfolios have been added yet"}
          </p>
          {(search || hasActiveFilters) && (
            <div className="flex items-center gap-3 mt-4">
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-xs tracking-widest uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
                >
                  Clear Search
                </button>
              )}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs tracking-widest uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <DeleteModal
          portfolio={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}