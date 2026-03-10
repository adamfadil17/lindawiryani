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
  MapPin,
  Building2,
  Users,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { venueList } from "@/lib/data/new-data/venue-data";
import { destinationList } from "@/lib/data/new-data/destination-data";
import { Venue } from "@/lib/types/new-strucutre";

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteModal({
  venue,
  onConfirm,
  onCancel,
}: {
  venue: Venue;
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
          Delete Venue
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{venue.name}&rdquo;
          </span>
          ? This action cannot be undone and will permanently remove this venue
          from the system.
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

// ─── Venue Card ───────────────────────────────────────────────────────────────

function VenueCard({
  venue,
  onDelete,
}: {
  venue: Venue;
  onDelete: (venue: Venue) => void;
}) {
  const destination = destinationList.find((d) => d.id === venue.destinationId);
  const heroImage = venue.images.find((img) => img.type === "HERO");
  const galleryImages = venue.images.filter((img) => img.type === "GALLERY");

  return (
    <div className="bg-white border border-primary/20 group hover:border-primary/30 transition-all duration-300 hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={heroImage?.url || "https://placehold.net/default.svg"}
          alt={venue.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Experience badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs tracking-widest uppercase px-2.5 py-1 font-medium ${
              venue.experienceId === "luxury-weddings"
                ? "bg-amber-500 text-white"
                : venue.experienceId === "private-villa-weddings"
                  ? "bg-teal-500 text-white"
                  : venue.experienceId === "intimate-weddings"
                    ? "bg-violet-500 text-white"
                    : "bg-rose-500 text-white"
            }`}
          >
            <Building2 className="w-3 h-3" />
            {venue.experienceId === "luxury-weddings"
              ? "Luxury"
              : venue.experienceId === "private-villa-weddings"
                ? "Private Villa"
                : venue.experienceId === "intimate-weddings"
                  ? "Intimate"
                  : "Elopement"}
          </span>
        </div>

        {/* Gallery count */}
        {galleryImages.length > 0 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs tracking-widest uppercase px-2 py-1">
            +{galleryImages.length} photos
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <div className="flex items-center gap-1 text-primary/60 text-xs tracking-widest uppercase mb-1">
            <MapPin className="w-3 h-3" />
            {destination?.name ?? venue.destinationId}
          </div>
          <h3 className="text-primary font-semibold text-base leading-snug">
            {venue.name}
          </h3>
          {venue.slogan && (
            <p className="text-primary/50 text-xs italic mt-0.5">
              {venue.slogan}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-primary/80 text-sm leading-relaxed line-clamp-2 mb-4">
          {venue.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-5 text-xs text-primary/80">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {venue.capacity} guests
          </span>
          <span className="text-primary/20">·</span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            from ${venue.startingPrice.toLocaleString()}
          </span>
        </div>

        {/* Experience badge */}
        <div className="flex gap-2 mb-5">
          <span className="text-xs tracking-widest uppercase px-2 py-0.5 bg-primary/5 text-primary/60 border border-primary/20">
            {venue.experience?.name ?? venue.experienceId}
          </span>
          {venue.destination && (
            <span className="text-xs tracking-widest uppercase px-2 py-0.5 bg-primary/10 text-primary/80 border border-primary/20">
              {venue.destination.type}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-primary/20 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary/80 font-semibold tracking-wider">
              #{venue.id}
            </span>

            <div className="flex items-center gap-1">
              <Link
                href={`/venues/${venue.id}`}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="View Public Page"
              >
                <Eye className="w-4 h-4" />
              </Link>

              <Link
                href={`/dashboard/venues/${venue.id}`}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="Edit Venue"
              >
                <Pencil className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onDelete(venue)}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete Venue"
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

// ─── Experience filter types ──────────────────────────────────────────────────

type ExperienceFilterType =
  | "all"
  | "luxury-weddings"
  | "private-villa-weddings"
  | "intimate-weddings"
  | "elopement-weddings";

// ─── Dropdown ─────────────────────────────────────────────────────────────────

function FilterDropdown<T extends string>({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
  placeholder: string;
}) {
  const selected = options.find((o) => o.id === value);
  const isActive = value !== "all";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={`appearance-none h-full pl-3 pr-8 py-2.5 text-sm tracking-widest border focus:outline-none focus:border-primary/50 transition-colors cursor-pointer ${
          isActive
            ? "bg-primary text-white border-primary"
            : "bg-white text-primary/60 border-primary/20 hover:border-primary/40 hover:text-primary/80"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id} className="bg-white text-primary normal-case font-normal tracking-normal">
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardVenuesPage() {
  const [venues, setVenues] = useState<Venue[]>(venueList);
  const [search, setSearch] = useState("");
  const [destinationFilter, setDestinationFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] =
    useState<ExperienceFilterType>("all");
  const [deleteTarget, setDeleteTarget] = useState<Venue | null>(null);

  const filtered = venues.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.slogan?.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase()) ||
      v.destinationId.toLowerCase().includes(search.toLowerCase());
    const matchDestination =
      destinationFilter === "all" || v.destinationId === destinationFilter;
    const matchExperience =
      experienceFilter === "all" || v.experienceId === experienceFilter;
    return matchSearch && matchDestination && matchExperience;
  });

  const handleDelete = (venue: Venue) => setDeleteTarget(venue);

  const confirmDelete = () => {
    if (deleteTarget) {
      setVenues((prev) => prev.filter((v) => v.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const luxuryCount = venues.filter((v) => v.experienceId === "luxury-weddings").length;
  const villaCount = venues.filter((v) => v.experienceId === "private-villa-weddings").length;
  const intimateCount = venues.filter((v) => v.experienceId === "intimate-weddings").length;
  const elopementCount = venues.filter((v) => v.experienceId === "elopement-weddings").length;

  const experienceOptions: { id: ExperienceFilterType; label: string }[] = [
    { id: "all", label: "All Experiences" },
    { id: "luxury-weddings", label: "Luxury" },
    { id: "private-villa-weddings", label: "Private Villa" },
    { id: "intimate-weddings", label: "Intimate" },
    { id: "elopement-weddings", label: "Elopement" },
  ];

  const destinationOptions: { id: string; label: string }[] = [
    { id: "all", label: "All Destinations" },
    ...destinationList.map((d) => ({ id: d.id, label: d.name })),
  ];

  const hasActiveFilters =
    search || destinationFilter !== "all" || experienceFilter !== "all";

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Venues
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {venues.length} total venues
          </p>
        </div>

        <Link
          href="/dashboard/venues/new"
          className="inline-flex items-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Venue
        </Link>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total",
            value: venues.length,
            active: experienceFilter === "all",
            onClick: () => setExperienceFilter("all"),
          },
          {
            label: "Luxury",
            value: luxuryCount,
            active: experienceFilter === "luxury-weddings",
            onClick: () => setExperienceFilter("luxury-weddings"),
          },
          {
            label: "Private Villa",
            value: villaCount,
            active: experienceFilter === "private-villa-weddings",
            onClick: () => setExperienceFilter("private-villa-weddings"),
          },
          {
            label: "Intimate",
            value: intimateCount,
            active: experienceFilter === "intimate-weddings",
            onClick: () => setExperienceFilter("intimate-weddings"),
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
      <div className="bg-white border border-primary/20 p-3 mb-6 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search venues..."
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

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-primary/15 self-center" />

        {/* Dropdowns */}
        <div className="flex gap-2 items-stretch h-[42px]">
          <FilterDropdown
            value={experienceFilter}
            onChange={setExperienceFilter}
            options={experienceOptions}
            placeholder="Experience"
          />
          <FilterDropdown
            value={destinationFilter}
            onChange={setDestinationFilter}
            options={destinationOptions}
            placeholder="Destination"
          />
        </div>

        {/* Clear all — only when filters active */}
        {hasActiveFilters && (
          <>
            <div className="hidden sm:block w-px h-8 bg-primary/20 self-center" />
            <button
              onClick={() => {
                setSearch("");
                setDestinationFilter("all");
                setExperienceFilter("all");
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-sm tracking-widest uppercase text-primary/50 hover:text-primary transition-colors whitespace-nowrap hover:cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          </>
        )}
      </div>

      {/* ── Results Count ── */}
      {hasActiveFilters && (
        <p className="text-primary/50 text-xs tracking-wider mb-4">
          Showing {filtered.length} of {venues.length} venues
          {search && ` for "${search}"`}
        </p>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <Building2 className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {search
              ? `No venues match "${search}"`
              : "No venues in this filter yet"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearch("");
                setDestinationFilter("all");
                setExperienceFilter("all");
              }}
              className="mt-4 text-xs tracking-widest uppercase text-primary border-b hover:cursor-pointer border-primary/30 hover:border-primary transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((venue) => (
            <VenueCard key={venue.id} venue={venue} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <DeleteModal
          venue={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}