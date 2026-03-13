"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  MapPin,
  Pencil,
  Trash2,
  Eye,
  ChevronDown,
  X,
} from "lucide-react";
import { Destination } from "@/lib/types/new-strucutre";
import { destinationList } from "@/lib/data/new-data/destination-data";

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteModal({
  destination,
  onConfirm,
  onCancel,
}: {
  destination: Destination;
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
          Delete Destination
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{destination.name}&rdquo;
          </span>
          ? This action cannot be undone and will permanently remove this
          destination from the system.
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
              {destination.guestCapacity}
            </span>
            <div className="flex items-center gap-1">
              <Link
                href={`/destinations/${destination.id}`}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardDestinationsPage() {
  const [destinations, setDestinations] =
    useState<Destination[]>(destinationList);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [deleteTarget, setDeleteTarget] = useState<Destination | null>(null);

  const categories = [
    { id: "All", name: "All Categories" },
    ...Array.from(
      new Map(destinations.map((d) => [d.category.id, d.category])).values()
    ),
  ];

  const filtered = destinations.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "All" || d.categoryId === categoryFilter;
    return matchSearch && matchCategory;
  });

  const confirmDelete = () => {
    if (deleteTarget) {
      setDestinations((prev) => prev.filter((d) => d.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const countByCategory = (categoryId: string) =>
    destinations.filter((d) => d.categoryId === categoryId).length;

  const selectedCategoryName =
    categories.find((c) => c.id === categoryFilter)?.name ?? "All Categories";

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
            {destinations.length} total destinations
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
      <div
        className="grid gap-4 mb-8"
        style={{
          gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))`,
        }}
      >
        {categories.map((cat) => {
          const isActive = categoryFilter === cat.id;
          const value =
            cat.id === "All" ? destinations.length : countByCategory(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`p-5 border text-left transition-all duration-200 hover:cursor-pointer ${
                isActive
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-primary/20 text-primary hover:border-primary/30"
              }`}
            >
              <p
                className={`text-sm tracking-[0.2em] uppercase mb-1.5 ${
                  isActive ? "text-white/80" : "text-primary/80"
                }`}
              >
                {cat.name}
              </p>
              <p className="text-2xl font-semibold">{value}</p>
            </button>
          );
        })}
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border border-primary/20 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search destinations..."
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

        {/* Category Dropdown */}
        <div className="relative shrink-0">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-48 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer hover:border-primary/40 hover:text-primary/80"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
        </div>
      </div>

      {/* ── Results Count ── */}
      {(search || categoryFilter !== "All") && (
        <p className="text-primary/80 text-sm tracking-wider mb-4">
          Showing {filtered.length} of {destinations.length} destinations
          {categoryFilter !== "All" && ` in ${selectedCategoryName}`}
          {search && ` for "${search}"`}
        </p>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <MapPin className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {search
              ? `No destinations match "${search}"`
              : "No destinations in this category yet"}
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
          {filtered.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onDelete={(d) => setDeleteTarget(d)}
            />
          ))}
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <DeleteModal
          destination={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}