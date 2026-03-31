"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  Trash2,
  ImageIcon,
  BookOpen,
  ChevronDown,
  CalendarDays,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import FormField from "@/components/shared/from-field";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import ImageUpload from "@/components/shared/image-upload";
import SaveModal from "@/components/shared/save-modal";
import DeleteModal from "@/components/shared/delete-modal";
import UnsavedChangesModal from "@/components/shared/unsaved-changes-modal";
import TipTapEditor from "@/components/shared/tiptap-editor";
import { toSlug } from "@/utils";
import {
  articleFormSchema,
  ArticleFormData,
  // ── Ambil enum dari form-validators, bukan dari @/types,
  //    agar nilai yang dikirim ke API selalu konsisten dengan schema backend
  articleCategoryEnum,
} from "@/utils/form-validators";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

// ─── Derive category list dari enum schema ─────────────────────────────────────
// articleCategoryEnum.options → ["Guides", "Planning_Advice", "Destination_Knowledge", ...]
// Dengan ini daftar di UI otomatis sinkron dengan schema — tidak perlu maintain array terpisah.
const ARTICLE_CATEGORIES = articleCategoryEnum.options;

// Helper: format label kategori untuk tampilan (ganti underscore dengan spasi)
// "Planning_Advice" → "Planning Advice"
const formatCategoryLabel = (cat: string) => cat.replace(/_/g, " ");

// ─── Helper konversi date string ───────────────────────────────────────────────
// published_at di articleFormSchema divalidasi dengan z.string().datetime()
// yang mengharuskan ISO 8601 penuh, contoh: "2025-03-24T00:00:00.000Z"
//
// Namun input[type=date] di browser hanya menghasilkan "YYYY-MM-DD",
// sehingga perlu konversi dua arah:
//   dateToISO  → simpan ke form state (untuk lolos validasi .datetime())
//   isoToDateInput → tampilkan di input[type=date] (hanya YYYY-MM-DD)

/** "2025-03-24" → "2025-03-24T00:00:00.000Z" */
const dateToISO = (dateStr: string): string => {
  if (!dateStr) return "";
  if (dateStr.includes("T")) return dateStr; // sudah ISO, kembalikan langsung
  return new Date(dateStr + "T00:00:00.000Z").toISOString();
};

/** "2025-03-24T00:00:00.000Z" → "2025-03-24" */
const isoToDateInput = (iso: string): string => {
  if (!iso) return "";
  return iso.split("T")[0];
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function JournalArticleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  // ── React Hook Form ──────────────────────────────────────────────────────────
  const {
    watch,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors: formErrors, isDirty },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      // slugSchema: min 2, max 255, regex /^[a-z0-9]+(?:-[a-z0-9]+)*$/
      slug: "",
      // Pakai nilai pertama dari enum agar defaultValues langsung valid
      category: ARTICLE_CATEGORIES[0],
      excerpt: "",
      // Wajib ISO 8601 penuh — bukan "YYYY-MM-DD"
      published_at: new Date().toISOString(),
      // image: z.string().url() — tidak boleh string kosong saat submit
      image: "",
      content: "",
    },
  });

  // setField helper — validasi + touch langsung saat tiap perubahan field
  const setField = (key: keyof ArticleFormData, value: unknown) =>
    setValue(key as keyof ArticleFormData, value as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  const formData = watch();

  // ── Page state ───────────────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(!isNew);
  const [notFound, setNotFound] = useState(false);

  // ── Save state machine: idle | confirm | saving | saved ──────────────────────
  const [saveStatus, setSaveStatus] = useState<"idle" | "confirm" | "saving" | "saved">("idle");

  // ── Delete state machine: idle | confirm | deleting ──────────────────────────
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "confirm" | "deleting">("idle");

  // ── Unsaved changes guard ──────────────────────────────────────────────────────
  // Create mode: any non-empty field counts as "dirty"
  // Edit mode: react-hook-form's isDirty tracks real changes vs. loaded data
  const [unsavedModal, setUnsavedModal] = useState<{ open: boolean; pendingHref?: string }>({ open: false });

  const hasUnsavedChanges = isNew
    ? Boolean(
        formData.title ||
        formData.excerpt ||
        formData.content ||
        formData.image
      )
    : isDirty;

  // Block browser close / refresh when there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && saveStatus !== "saving") {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, saveStatus]);

  // Helper: navigate with guard check
  const guardedNavigate = useCallback(
    (href: string) => {
      if (hasUnsavedChanges && saveStatus !== "saving" && saveStatus !== "saved") {
        setUnsavedModal({ open: true, pendingHref: href });
      } else {
        router.push(href);
      }
    },
    [hasUnsavedChanges, saveStatus, router]
  );

  // ── Fetch article (edit mode) ─────────────────────────────────────────────────
  const fetchArticle = useCallback(async () => {
    if (isNew) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/articles/${id}`);
      const data = response.data.data ?? response.data;

      // published_at dari API mungkin berupa "YYYY-MM-DD" atau ISO penuh —
      // pastikan selalu disimpan sebagai ISO penuh agar lolos validasi .datetime()
      const publishedAt = data.published_at
        ? dateToISO(String(data.published_at))
        : new Date().toISOString();

      reset({
        title: String(data.title ?? ""),
        slug: String(data.slug ?? ""),
        // Validasi category dari API terhadap enum — fallback ke nilai pertama jika tidak valid
        category: ARTICLE_CATEGORIES.includes(data.category)
          ? (data.category as ArticleFormData["category"])
          : ARTICLE_CATEGORIES[0],
        excerpt: String(data.excerpt ?? ""),
        published_at: publishedAt,
        image: String(data.image ?? ""),
        content: String(data.content ?? ""),
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setNotFound(true);
      } else {
        const errorMsg =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Failed to load article";
        toast.error(errorMsg, {
          description: err instanceof Error ? err.message : "Unknown error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, isNew, reset]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  // ── Save flow ─────────────────────────────────────────────────────────────────
  // handleSubmit memanggil onSubmitForm hanya jika zodResolver tidak menemukan error
  const onSubmitForm = async () => {
    setSaveStatus("confirm");
  };

  // Jika validasi gagal, paksa semua error tampil sekaligus
  const onSubmitError = async () => {
    await trigger();
    toast.error("Please fix the errors before saving");
  };

  const confirmSave = async () => {
    setSaveStatus("saving");
    try {
      // Regenerasi slug dari title sebelum kirim — konsisten dengan ensureUniqueSlug di route.ts
      const slugValue = toSlug(formData.title);

      // Payload sesuai ArticleFormData:
      // - slug        : lowercase-kebab-case
      // - category    : raw enum value (misal "Planning_Advice"), bukan label
      // - published_at: ISO 8601 full string
      // - image       : URL valid (tidak kosong)
      const payload: ArticleFormData = { ...formData, slug: slugValue };

      if (isNew) {
        // POST /api/articles
        await axios.post("/api/articles", payload, {
          headers: getAuthHeaders(true),
        });
        setSaveStatus("idle");
        toast.success("Article published!", {
          description: "Your new article has been added to the journal.",
        });
        reset(); // clear dirty state before navigating
        router.push("/dashboard/journal");
      } else {
        // PATCH /api/articles/:id
        await axios.patch(`/api/articles/${id}`, payload, {
          headers: getAuthHeaders(true),
        });
        setSaveStatus("saved");
        toast.success("Changes saved!", {
          description: "Your article has been updated.",
        });
        // Re-sync RHF baseline so isDirty becomes false
        reset({ ...formData, slug: toSlug(formData.title) });
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : "Unknown error";
      toast.error("Failed to save", { description: errorMsg });
      // Modal tetap terbuka agar user bisa coba lagi
      setSaveStatus("confirm");
    }
  };

  // ── Delete flow ───────────────────────────────────────────────────────────────
  const deleteArticle = async () => {
    setDeleteStatus("deleting");
    try {
      // DELETE /api/articles/:id
      await axios.delete(`/api/articles/${id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteStatus("idle");
      toast.success("Article deleted!", {
        description: "The article has been removed from the journal.",
      });
      router.push("/dashboard/journal");
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : "Unknown error";
      toast.error("Failed to delete", { description: errorMsg });
      setDeleteStatus("confirm");
    }
  };

  // ── Slug: auto-generate dari title ───────────────────────────────────────────
  // toSlug() menghasilkan lowercase-kebab-case sesuai slugSchema
  // Hanya auto-generate di create mode; edit mode biarkan slug yang sudah ada
  const handleTitleChange = (v: string) => {
    setField("title", v);
    if (isNew) {
      setField("slug", toSlug(v));
    }
  };

  // ── Derived values ────────────────────────────────────────────────────────────
  // Slug preview — selalu di-generate ulang dari title saat save
  const slugPreview = formData.title ? toSlug(formData.title) : "";

  // Word count — strip HTML tags dari konten TipTap terlebih dahulu
  const wordCount = formData.content
    ? formData.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length
    : 0;

  // Nilai untuk input[type=date] — perlu "YYYY-MM-DD", bukan ISO penuh
  const dateInputValue = isoToDateInput(formData.published_at ?? "");

  // ── Not found ─────────────────────────────────────────────────────────────────
  if (notFound) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-10 h-10 text-primary/20 mb-4" />
        <p className="text-primary/50 text-xs tracking-widest uppercase mb-2">Not Found</p>
        <p className="text-primary/80 text-sm mb-6">This article does not exist.</p>
        <Link
          href="/dashboard/journal"
          className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
        >
          Back to Journal
        </Link>
      </div>
    );
  }

  // ── Skeleton loading ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto animate-pulse">
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-primary/10 rounded" />
            <div className="h-7 w-56 bg-primary/10 rounded" />
          </div>
          <div className="h-10 w-28 bg-primary/10 rounded" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-4 w-32 bg-primary/10 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
              <div className="h-20 bg-primary/5 rounded" />
            </div>
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-4 w-36 bg-primary/10 rounded" />
              <div className="h-64 bg-primary/5 rounded" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white border border-primary/20 p-6">
              <div className="aspect-[4/3] bg-primary/10 mb-4 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
            </div>
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-4 w-28 bg-primary/10 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────────
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => guardedNavigate("/dashboard/journal")}
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              {isNew ? "Create Article" : "Edit Article"}
            </p>
            <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
              {isNew ? "New Article" : formData.title || "Untitled"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {saveStatus === "saved" && (
            <div className="flex items-center gap-1.5 text-green-600 text-xs tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved</span>
            </div>
          )}

          {!isNew && (
            <Link
              href={`/journal/${formData.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 border border-primary/30 text-primary text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-primary/5 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              View Public
            </Link>
          )}

          {!isNew && (
            <button
              type="button"
              onClick={() => setDeleteStatus("confirm")}
              disabled={deleteStatus === "deleting" || saveStatus === "saving"}
              className="inline-flex items-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-4 py-2.5 hover:cursor-pointer hover:bg-red-50 transition-colors disabled:opacity-40"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSubmit(onSubmitForm, onSubmitError)()}
            disabled={saveStatus === "saving"}
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-5 py-2.5 hover:cursor-pointer hover:bg-primary/80 transition-colors disabled:opacity-60"
          >
            {saveStatus === "saving" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isNew ? "Publish Article" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ── Two-column form layout ── */}
      <form
        onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
        className="grid lg:grid-cols-3 gap-6"
      >
        {/* ── Left Column ── */}
        <div className="lg:col-span-2 space-y-6">

          <Section title="Article Details" subtitle="Core information about this journal entry">
            <div className="space-y-5">

              {/* Category — dari articleCategoryEnum.options */}
              <FormField label="Category" required>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setField("category", e.target.value as ArticleFormData["category"])
                    }
                    className="w-full px-3 py-2.5 pr-10 text-sm text-primary bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    {ARTICLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {/* Tampilkan label rapi; value tetap raw enum ("Planning_Advice") */}
                        {formatCategoryLabel(cat)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-primary/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {formErrors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.category.message)}
                  </p>
                )}
              </FormField>

              {/* Title */}
              <FormField label="Title" required>
                <TextInput
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. How to Plan Your Dream Bali Elopement"
                  error={formErrors.title ? String(formErrors.title.message) : undefined}
                />
              </FormField>

              {/* Excerpt */}
              <FormField label="Excerpt" required>
                <TextareaInput
                  value={formData.excerpt}
                  onChange={(v) => setField("excerpt", v)}
                  placeholder="A brief summary shown in article cards and SEO descriptions…"
                  rows={3}
                  error={formErrors.excerpt ? String(formErrors.excerpt.message) : undefined}
                />
                <p className="text-primary/40 text-xs mt-1.5">
                  {formData.excerpt.length} / 200 characters recommended
                </p>
              </FormField>
            </div>
          </Section>

          {/* Article Content */}
          <Section title="Article Content" subtitle="Full body of the article in rich text">
            <TipTapEditor
              value={formData.content}
              onChange={(v) => setField("content", v)}
              error={formErrors.content ? String(formErrors.content.message) : undefined}
              placeholder="Write your article content here…"
            />
          </Section>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">

          {/* Cover Image — image: z.string().url(), tidak boleh kosong saat submit */}
          <Section title="Cover Image">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-primary/5 border border-primary/20 overflow-hidden">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="w-8 h-8 text-primary/20" />
                    <p className="text-primary/30 text-xs tracking-wider">No image set</p>
                  </div>
                )}
              </div>
              <FormField label="Cover Image URL" required>
                <ImageUpload
                  value={formData.image}
                  onChange={(v) => setField("image", v)}
                  inputId="cover-upload"
                />
              </FormField>
              {formErrors.image && (
                <p className="text-red-500 text-xs mt-1">{String(formErrors.image.message)}</p>
              )}
            </div>
          </Section>

          {/* URL & SEO — slug preview read-only, persis seperti venue detail page */}
          <Section title="URL & SEO">
            <div className="space-y-2">
              <p className="text-primary/80 text-xs tracking-widest uppercase mb-1">URL Slug</p>
              <p className="text-sm text-primary bg-primary/5 px-3 py-2 border border-primary/20">
                {slugPreview || "—"}
              </p>
              <p className="text-primary/50 text-xs">Auto-generated from article title</p>
            </div>
          </Section>

          {/* Publication — published_at: z.string().datetime() */}
          <Section title="Publication" subtitle="Scheduling and metadata">
            <FormField label="Published Date" required>
              <div className="relative">
                <CalendarDays className="w-4 h-4 text-primary/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  // input[type=date] hanya menerima "YYYY-MM-DD"
                  value={dateInputValue}
                  onChange={(e) => {
                    // Konversi ke ISO 8601 penuh sebelum disimpan ke form state
                    // agar lolos validasi z.string().datetime()
                    setField("published_at", dateToISO(e.target.value));
                  }}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm text-primary bg-primary/3 border focus:outline-none focus:border-primary/50 transition-colors ${
                    formErrors.published_at ? "border-red-400" : "border-primary/20"
                  }`}
                />
              </div>
              {formErrors.published_at && (
                <p className="text-red-500 text-xs mt-1">
                  {String(formErrors.published_at.message)}
                </p>
              )}
            </FormField>
          </Section>

          {/* Quick Summary */}
          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">Summary</p>
            <div className="space-y-3">
              {[
                {
                  label: "Category",
                  // Tampilkan label rapi, bukan raw enum value
                  value: formData.category ? formatCategoryLabel(formData.category) : "—",
                },
                {
                  label: "Excerpt",
                  value: formData.excerpt ? `${formData.excerpt.length} chars` : "—",
                },
                {
                  label: "Content",
                  value: wordCount > 0 ? `~${wordCount} words` : "—",
                },
                {
                  label: "Published",
                  // Tampilkan tanggal yang terbaca, bukan ISO string mentah
                  value: formData.published_at
                    ? new Date(formData.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-primary/80 font-semibold text-xs">{item.label}</span>
                  <span className="text-xs font-medium bg-primary text-white px-2 py-0.5">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* ── Unsaved Changes Modal ── */}
      {unsavedModal.open && (
        <UnsavedChangesModal
          mode={isNew ? "create" : "update"}
          onConfirmLeave={() => {
            setUnsavedModal({ open: false });
            if (unsavedModal.pendingHref) router.push(unsavedModal.pendingHref);
          }}
          onCancel={() => setUnsavedModal({ open: false })}
        />
      )}

      {/* ── Save Modal ── */}
      {(saveStatus === "confirm" || saveStatus === "saving") && (
        <SaveModal
          mode={isNew ? "create" : "update"}
          entityName="Article"
          itemName={formData.title || undefined}
          onConfirm={confirmSave}
          onCancel={() => saveStatus !== "saving" && setSaveStatus("idle")}
          isLoading={saveStatus === "saving"}
        />
      )}

      {/* ── Delete Modal ── */}
      {(deleteStatus === "confirm" || deleteStatus === "deleting") && (
        <DeleteModal
          name={formData.title}
          onConfirm={deleteArticle}
          onCancel={() => deleteStatus !== "deleting" && setDeleteStatus("idle")}
          isLoading={deleteStatus === "deleting"}
        />
      )}
    </div>
  );
}