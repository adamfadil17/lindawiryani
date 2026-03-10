"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  Trash2,
  X,
  ImageIcon,
  BookOpen,
  ChevronDown,
  CalendarDays,
} from "lucide-react";
import { articles } from "@/lib/data/article/article-data";
import FormField from "@/components/shared/from-field";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import ImageUpload from "@/components/shared/image-upload";
import SaveModal from "@/components/shared/save-modal";
import TipTapEditor from "@/components/shared/tiptap-editor"; // ← adjust path as needed
import { Article, articleCategories, ArticleCategory } from "@/lib/types/new-strucutre";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = Omit<Article, "id">;

const defaultForm: FormData = {
  slug: "",
  category: "Guides",
  title: "",
  excerpt: "",
  publishedAt: new Date().toISOString().split("T")[0],
  image: "",
  content: "",
};

// ─── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteModal({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
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
        <p className="text-primary/80 tracking-[0.2em] uppercase text-[10px] mb-2">
          Confirm Delete
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          Delete Article
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{title}&rdquo;
          </span>
          ? This action cannot be undone and will permanently remove this
          article from the journal.
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JournalArticleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isNew) {
      const existing = articles.find((a) => a.id === id);
      if (existing) {
        const { id: _id, ...rest } = existing;
        setForm(rest);
      } else {
        toast.error("Article not found");
        router.push("/dashboard/journal");
      }
    }
    setIsLoaded(true);
  }, [id, isNew, router]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.slug.trim()) newErrors.slug = "Slug is required";
    if (!form.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!form.image) newErrors.image = "Cover image is required";
    if (!form.content.trim() || form.content === "<p></p>")
      newErrors.content = "Content is required";
    if (!form.publishedAt) newErrors.publishedAt = "Published date is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before saving");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validate()) setShowSaveModal(true);
  };

  const confirmSave = () => {
    // TODO: replace with actual API call
    console.log("Saving article:", form);
    setShowSaveModal(false);
    setSaved(true);
    toast.success(isNew ? "Article created!" : "Article updated!");
    if (isNew) router.push("/dashboard/journal");
  };

  const confirmDelete = () => {
    // TODO: replace with actual API call
    console.log("Deleting article id:", id);
    setShowDeleteModal(false);
    toast.success("Article deleted");
    router.push("/dashboard/journal");
  };

  // Auto-generate slug from title
  const handleTitleChange = (v: string) => {
    set("title", v);
    if (isNew) {
      const slug = v
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      set("slug", slug);
    }
  };

  if (!isLoaded) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Strip HTML tags for word count display in sidebar
  const wordCount = form.content
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <Link
            href="/dashboard/journal"
            className="inline-flex items-center gap-2 text-primary/50 hover:text-primary text-xs tracking-widest uppercase mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Journal
          </Link>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            {isNew ? "Create Article" : "Edit Article"}
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            {isNew ? "New Article" : form.title || "Untitled"}
          </h1>
        </div>

        {!isNew && (
          <Link
            href={`/journal/${form.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2.5 border border-primary/30 text-primary text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/5 transition-colors self-start sm:self-auto"
          >
            <BookOpen className="w-4 h-4" />
            View Public
          </Link>
        )}
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left Column (wider) ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Section
            title="Article Details"
            subtitle="Core information about this journal entry"
          >
            <div className="space-y-5">
              {/* Category */}
              <FormField label="Category" required>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) =>
                      set("category", e.target.value as ArticleCategory)
                    }
                    className="w-full px-3 py-2.5 pr-10 text-sm text-primary bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    {articleCategories
                      .filter((c) => c !== "All")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-primary/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </FormField>

              {/* Title */}
              <FormField label="Title" required>
                <TextInput
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. How to Plan Your Dream Bali Elopement"
                  error={errors.title}
                />
              </FormField>

              {/* Slug */}
              <FormField label="Slug" required>
                <div className="relative">
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) =>
                      set(
                        "slug",
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "-")
                          .replace(/-+/g, "-")
                      )
                    }
                    placeholder="article-url-slug"
                    className={`w-full pl-4 pr-4 py-2.5 text-sm text-primary placeholder:text-primary/40 bg-primary/3 border focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.slug ? "border-red-400" : "border-primary/20"
                    }`}
                  />
                </div>
                {errors.slug && (
                  <p className="text-red-500 text-xs mt-1">{errors.slug}</p>
                )}
              </FormField>

              {/* Excerpt */}
              <FormField label="Excerpt" required>
                <TextareaInput
                  value={form.excerpt}
                  onChange={(v) => set("excerpt", v)}
                  placeholder="A brief summary shown in article cards and SEO descriptions…"
                  rows={3}
                  error={errors.excerpt}
                />
                <p className="text-primary/40 text-xs mt-1.5">
                  {form.excerpt.length} / 200 characters recommended
                </p>
              </FormField>
            </div>
          </Section>

          {/* ── Article Content — TipTap Editor ── */}
          <Section
            title="Article Content"
            subtitle="Full body of the article in rich text"
          >
            <TipTapEditor
              value={form.content}
              onChange={(v) => set("content", v)}
              error={errors.content}
              placeholder="Start writing your article… Use the toolbar above or type '/' for quick formatting."
            />
          </Section>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Cover Image */}
          <Section title="Cover Image">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-primary/5 border border-primary/20 overflow-hidden">
                {form.image ? (
                  <Image
                    src={form.image}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="w-8 h-8 text-primary/20" />
                    <p className="text-primary/30 text-xs tracking-wider">
                      No image set
                    </p>
                  </div>
                )}
              </div>

              <FormField label="Cover Image" required>
                <ImageUpload
                  value={form.image}
                  onChange={(v) => set("image", v)}
                  error={errors.image}
                  inputId="cover-upload"
                />
              </FormField>
            </div>
          </Section>

          {/* Publication Settings */}
          <Section title="Publication" subtitle="Scheduling and metadata">
            <div className="space-y-4">
              <FormField label="Published Date" required>
                <div className="relative">
                  <CalendarDays className="w-4 h-4 text-primary/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={form.publishedAt}
                    onChange={(e) => set("publishedAt", e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 text-sm text-primary bg-primary/3 border focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.publishedAt ? "border-red-400" : "border-primary/20"
                    }`}
                  />
                </div>
                {errors.publishedAt && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.publishedAt}
                  </p>
                )}
              </FormField>
            </div>
          </Section>

          {/* Quick Summary */}
          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Summary
            </p>
            <div className="space-y-3">
              {[
                { label: "Category", value: form.category || "—" },
                {
                  label: "Excerpt",
                  value: form.excerpt ? `${form.excerpt.length} chars` : "—",
                },
                {
                  label: "Content",
                  value: wordCount > 0 ? `~${wordCount} words` : "—",
                },
                { label: "Published", value: form.publishedAt || "—" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-primary/80 font-semibold text-xs">
                    {item.label}
                  </span>
                  <span className="text-xs font-medium bg-primary text-white px-2 py-0.5">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-6 lg:static space-y-2">
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/90 transition-colors shadow-lg lg:shadow-none"
            >
              <Save className="w-4 h-4" />
              {isNew ? "Publish Article" : "Save Changes"}
            </button>

            {!isNew && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Article
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {showSaveModal && (
        <SaveModal
          onConfirm={confirmSave}
          onCancel={() => setShowSaveModal(false)}
          isNew={isNew}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          title={form.title}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}