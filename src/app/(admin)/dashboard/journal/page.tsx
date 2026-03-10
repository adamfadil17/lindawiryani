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
  BookOpen,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import { articles as initialArticles } from "@/lib/data/article/article-data";
import { Article, articleCategories, ArticleCategory } from "@/lib/types/new-strucutre";

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteModal({
  article,
  onConfirm,
  onCancel,
}: {
  article: Article;
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
          Delete Article
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{article.title}&rdquo;
          </span>
          ? This action cannot be undone and will permanently remove this article
          from the journal.
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

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({
  article,
  onDelete,
}: {
  article: Article;
  onDelete: (article: Article) => void;
}) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <div className="bg-white border border-primary/20 group hover:border-primary/30 transition-all duration-300 hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={article.image || "https://placehold.net/default.svg"}
          alt={article.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase px-2.5 py-1 font-medium bg-primary text-white">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <div className="flex items-center gap-1.5 text-primary/50 text-sm mb-2">
            <CalendarDays className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          <h3 className="text-primary font-semibold text-base leading-snug">
            {article.title}
          </h3>
        </div>

        {/* Excerpt */}
        <p className="text-primary/80 text-sm leading-relaxed line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        {/* Divider */}
        <div className="border-t border-primary/20 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary/80 font-semibold tracking-wider truncate max-w-[140px]">
              /{article.slug}
            </span>

            <div className="flex items-center gap-1">
              <Link
                href={`/journal/${article.slug}`}
                target="_blank"
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="View Public Article"
              >
                <Eye className="w-4 h-4" />
              </Link>

              <Link
                href={`/dashboard/journal/${article.id}`}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-primary hover:bg-primary/10 transition-colors"
                title="Edit Article"
              >
                <Pencil className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onDelete(article)}
                className="w-8 h-8 flex items-center justify-center text-primary/50 hover:cursor-pointer hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete Article"
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

export default function DashboardJournalPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | ArticleCategory>("All");
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);

  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "All" || a.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleDelete = (article: Article) => setDeleteTarget(article);

  const confirmDelete = () => {
    if (deleteTarget) {
      setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  // Stats per category (excluding "All")
  const displayCategories = articleCategories.filter((c) => c !== "All") as Exclude<
    ArticleCategory,
    "All"
  >[];

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            Content Management
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            Journal
          </h1>
          <p className="text-primary/80 text-sm mt-1">
            {articles.length} total articles
          </p>
        </div>

        <Link
          href="/dashboard/journal/new"
          className="inline-flex items-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7 gap-3 mb-8">
        {/* Total */}
        <button
          onClick={() => setCategoryFilter("All")}
          className={`p-4 border text-left transition-all duration-200 hover:cursor-pointer ${
            categoryFilter === "All"
              ? "bg-primary text-white border-primary"
              : "bg-white border-primary/20 text-primary hover:border-primary/30"
          }`}
        >
          <p
            className={`text-xs tracking-[0.2em] uppercase mb-1.5 ${
              categoryFilter === "All" ? "text-white/80" : "text-primary/80"
            }`}
          >
            Total
          </p>
          <p className="text-2xl font-semibold">{articles.length}</p>
        </button>

        {displayCategories.map((cat) => {
          const count = articles.filter((a) => a.category === cat).length;
          const active = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`p-4 border text-left transition-all duration-200 hover:cursor-pointer ${
                active
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-primary/20 text-primary hover:border-primary/30"
              }`}
            >
              <p
                className={`text-xs tracking-[0.15em] uppercase mb-1.5 leading-tight ${
                  active ? "text-white/80" : "text-primary/80"
                }`}
              >
                {cat}
              </p>
              <p className="text-2xl font-semibold">{count}</p>
            </button>
          );
        })}
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border border-primary/20 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
          <input
            type="text"
            placeholder="Search articles..."
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as "All" | ArticleCategory)}
            className="w-full sm:w-40 appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer"
          >
            {(["All Categories", ...displayCategories] as const).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
        </div>
      </div>

      {/* ── Results Count ── */}
      {(search || categoryFilter !== "All") && (
        <p className="text-primary/50 text-xs tracking-wider mb-4">
          Showing {filtered.length} of {articles.length} articles
          {search && ` for "${search}"`}
        </p>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-primary/20 flex flex-col items-center justify-center py-24 text-center">
          <BookOpen className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            No Results
          </p>
          <p className="text-primary/80 text-sm">
            {search
              ? `No articles match "${search}"`
              : "No articles in this category yet"}
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
          {filtered.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <DeleteModal
          article={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}