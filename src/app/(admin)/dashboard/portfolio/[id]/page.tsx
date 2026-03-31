"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  X,
  ImageIcon,
  Plus,
  GripVertical,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import FormField from "@/components/shared/from-field";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import ImageUpload from "@/components/shared/image-upload";
import SaveModal from "@/components/shared/save-modal";
import DeleteModal from "@/components/shared/delete-modal";
import UnsavedChangesModal from "@/components/shared/unsaved-changes-modal";
import TagsInput from "@/components/shared/tags-input";
import TipTapEditor from "@/components/shared/tiptap-editor";
import { toSlug } from "@/utils";
import {
  portfolioFormSchema,
  PortfolioFormData,
} from "@/utils/form-validators";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import { PortfolioStory } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SelectOption {
  id: string;
  name: string;
}

// GalleryImage mengikuti pola VenueDetailPage:
// - id "temp-*" = belum tersimpan di server (create mode atau queue)
// - id UUID = sudah tersimpan di server (edit mode)
type GalleryImage = { id: string; url: string; sort_order: number };

// ─── GalleryManager ───────────────────────────────────────────────────────────
// Mengikuti persis pola dari VenueDetailPage:
// - Edit mode (portfolioId ada): setiap add/remove langsung hit API
// - Create mode (portfolioId null): tambah ke array lokal, flush setelah POST portfolio

type GalleryManagerProps = {
  portfolioId: string | null;
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
};

function GalleryManager({ portfolioId, images, onChange }: GalleryManagerProps) {
  const [pendingUrl, setPendingUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!pendingUrl) return;

    if (portfolioId) {
      // Edit mode — persists immediately ke API
      setIsAdding(true);
      try {
        const response = await axios.post(
          `/api/portfolios/${portfolioId}/gallery`,
          { url: pendingUrl, sort_order: images.length },
          { headers: getAuthHeaders(true) },
        );
        onChange([...images, response.data.data ?? response.data]);
        setPendingUrl("");
        toast.success("Gallery image added");
      } catch (err) {
        const msg =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Failed to add gallery image";
        toast.error(msg);
      } finally {
        setIsAdding(false);
      }
    } else {
      // Create mode — antre secara lokal, flush setelah portfolio di-POST
      const tempImage: GalleryImage = {
        id: `temp-${Date.now()}`,
        url: pendingUrl,
        sort_order: images.length,
      };
      onChange([...images, tempImage]);
      setPendingUrl("");
    }
  };

  const handleRemove = async (image: GalleryImage) => {
    if (portfolioId && !image.id.startsWith("temp-")) {
      // Edit mode — hapus langsung dari API
      try {
        await axios.delete(
          `/api/portfolios/${portfolioId}/gallery/${image.id}`,
          { headers: getAuthHeaders() },
        );
      } catch (err) {
        const msg =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Failed to remove gallery image";
        toast.error(msg);
        return; // Jangan update state kalau API gagal
      }
    }
    // Baik create mode (temp) maupun edit mode setelah API berhasil
    onChange(images.filter((img) => img.id !== image.id));
  };

  return (
    <div className="space-y-4">
      {/* Preview grid — tampilkan semua gambar yang sudah ada */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="relative aspect-square group overflow-hidden border border-primary/20"
            >
              <Image
                src={img.url}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 15vw"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <button
                type="button"
                onClick={() => handleRemove(img)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:cursor-pointer"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
              {/* Badge: nomor urut — konsisten dengan VenueDetailPage */}
              <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1.5 py-0.5">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {images.length === 0 && (
        <div className="border border-dashed border-primary/20 py-8 flex flex-col items-center justify-center gap-2">
          <ImageIcon className="w-6 h-6 text-primary/20" />
          <p className="text-primary/30 text-xs tracking-wider">
            No gallery images added
          </p>
        </div>
      )}

      {/* Input untuk menambah gambar baru */}
      <div className="space-y-2">
        <ImageUpload
          value={pendingUrl}
          onChange={setPendingUrl}
          inputId="gallery-add-upload"
        />
        {pendingUrl && (
          <>
            {/* Preview sebelum dikonfirmasi */}
            <div className="relative w-full aspect-[4/3] overflow-hidden border border-primary/20 bg-primary/5">
              <Image
                src={pendingUrl}
                alt="Gallery preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={isAdding}
              className="w-full flex items-center justify-center gap-2 border border-primary/30 text-primary text-xs tracking-widest uppercase py-2.5 hover:cursor-pointer hover:bg-primary/5 transition-colors disabled:opacity-50"
            >
              {isAdding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add to Gallery
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Story Sections Editor ────────────────────────────────────────────────────

function StorySectionsEditor({
  value,
  onChange,
}: {
  value: PortfolioStory[];
  onChange: (sections: PortfolioStory[]) => void;
}) {
  const addSection = () => onChange([...value, { heading: "", body: [""] }]);

  const removeSection = (idx: number) =>
    onChange(value.filter((_, i) => i !== idx));

  const updateHeading = (idx: number, heading: string) => {
    const updated = [...value];
    updated[idx] = { ...updated[idx], heading };
    onChange(updated);
  };

  const updateBody = (sectionIdx: number, bodyIdx: number, text: string) => {
    const updated = [...value];
    const bodies = [...updated[sectionIdx].body];
    bodies[bodyIdx] = text;
    updated[sectionIdx] = { ...updated[sectionIdx], body: bodies };
    onChange(updated);
  };

  const addBodyParagraph = (sectionIdx: number) => {
    const updated = [...value];
    updated[sectionIdx] = {
      ...updated[sectionIdx],
      body: [...updated[sectionIdx].body, ""],
    };
    onChange(updated);
  };

  const removeBodyParagraph = (sectionIdx: number, bodyIdx: number) => {
    const updated = [...value];
    const bodies = updated[sectionIdx].body.filter((_, i) => i !== bodyIdx);
    updated[sectionIdx] = { ...updated[sectionIdx], body: bodies };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {value.map((section, sIdx) => (
        <div
          key={sIdx}
          className="border border-primary/20 bg-primary/3 p-4 space-y-3"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-primary/30" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-primary/50 font-medium">
                Section {sIdx + 1}
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeSection(sIdx)}
              className="w-6 h-6 flex items-center justify-center text-primary/40 hover:text-red-500 hover:cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Section Heading (optional) */}
          <div>
            <label className="text-[10px] tracking-widest uppercase text-primary/60 font-medium block mb-1.5">
              Heading <span className="normal-case opacity-60">(optional)</span>
            </label>
            <input
              type="text"
              value={section.heading ?? ""}
              onChange={(e) => updateHeading(sIdx, e.target.value)}
              placeholder="Section heading…"
              className="w-full px-3 py-2.5 text-sm text-primary placeholder:text-primary/40 bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Paragraphs */}
          <div className="space-y-2">
            <label className="text-[10px] tracking-widest uppercase text-primary/60 font-medium block">
              Paragraphs
            </label>
            {section.body.map((para, bIdx) => (
              <div key={bIdx} className="flex gap-2">
                <textarea
                  value={para}
                  onChange={(e) => updateBody(sIdx, bIdx, e.target.value)}
                  placeholder={`Paragraph ${bIdx + 1}…`}
                  rows={3}
                  className="flex-1 px-3 py-2.5 text-sm text-primary placeholder:text-primary/40 bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
                {section.body.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBodyParagraph(sIdx, bIdx)}
                    className="w-8 shrink-0 flex items-center justify-center text-primary/30 hover:text-red-500 hover:cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addBodyParagraph(sIdx)}
              className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-primary/60 hover:text-primary hover:cursor-pointer transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Paragraph
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSection}
        className="w-full border border-dashed border-primary/30 text-primary/60 text-xs tracking-widest uppercase py-3 hover:border-primary/50 hover:text-primary hover:cursor-pointer transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Story Section
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PortfolioDetailPage() {
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
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      couple: "",
      slug: "",
      subtitle: "",
      destination_id: undefined,
      venue_id: undefined,
      experience_id: undefined,
      image: "",
      tags: [],
      excerpt: "",
      origin: "",
      review: "",
      content: "",
      story_sections: [],
      credit_role: "",
      credit_planner: "",
      credit_location_detail: "",
      credit_couple_origin: "",
    },
  });

  // setField helper — validasi + touch langsung saat tiap perubahan field
  const setField = <K extends keyof PortfolioFormData>(
    key: K,
    value: PortfolioFormData[K],
  ) =>
    setValue(key, value as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  // watch() — subscribe ke semua nilai form untuk preview/summary di sidebar
  const formData = watch();

  // ── Gallery state (pola VenueDetailPage) ─────────────────────────────────────
  // Terpisah dari RHF karena gallery tidak ada di portfolioFormSchema.
  // GalleryManager mengelola logika dual-mode (create vs edit) secara internal.
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  // ── Page state ───────────────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(!isNew);
  const [notFound, setNotFound] = useState(false);

  // ── Select options state ──────────────────────────────────────────────────────
  const [destinationOptions, setDestinationOptions] = useState<SelectOption[]>([]);
  const [venueOptions, setVenueOptions] = useState<SelectOption[]>([]);
  const [experienceOptions, setExperienceOptions] = useState<SelectOption[]>([]);
  const [isDestinationsLoading, setIsDestinationsLoading] = useState(true);
  const [isVenuesLoading, setIsVenuesLoading] = useState(true);
  const [isExperiencesLoading, setIsExperiencesLoading] = useState(true);

  // ── Save state machine: idle | confirm | saving | saved ──────────────────────
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "confirm" | "saving" | "saved"
  >("idle");

  // ── Delete state machine: idle | confirm | deleting ──────────────────────────
  const [deleteStatus, setDeleteStatus] = useState<
    "idle" | "confirm" | "deleting"
  >("idle");

  // ── Unsaved changes guard ──────────────────────────────────────────────────────
  // Create mode: any non-empty field counts as "dirty"
  // Edit mode: react-hook-form's isDirty tracks real changes vs. loaded data
  const [unsavedModal, setUnsavedModal] = useState<{ open: boolean; pendingHref?: string }>({ open: false });

  const hasUnsavedChanges = isNew
    ? Boolean(
        formData.couple ||
        formData.subtitle ||
        formData.excerpt ||
        formData.image ||
        formData.content ||
        (formData.tags && formData.tags.length > 0) ||
        galleryImages.length > 0
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

  // ── Fetch destinations dari /api/destinations (route.ts yang disertakan) ──────
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get("/api/destinations", {
          params: { limit: 100 },
        });
        // Response: paginated → { data: Destination[], meta: {...} }
        setDestinationOptions(res.data.data ?? []);
      } catch {
        console.warn("Failed to load destinations");
      } finally {
        setIsDestinationsLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  // ── Fetch venues dari /api/venues (route.ts yang disertakan) ─────────────────
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get("/api/venues", {
          params: { limit: 100 },
        });
        // Response: paginated → { data: Venue[], meta: {...} }
        setVenueOptions(res.data.data ?? []);
      } catch {
        console.warn("Failed to load venues");
      } finally {
        setIsVenuesLoading(false);
      }
    };
    fetchVenues();
  }, []);

  // ── Fetch wedding experiences dari /api/wedding-experiences (route.ts yang disertakan)
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("/api/wedding-experiences", {
          params: { limit: 100 },
        });
        // Response: paginated → { data: WeddingExperience[], meta: {...} }
        setExperienceOptions(res.data.data ?? []);
      } catch {
        console.warn("Failed to load experiences");
      } finally {
        setIsExperiencesLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // ── Fetch portfolio (edit mode) ───────────────────────────────────────────────
  const fetchPortfolio = useCallback(async () => {
    if (isNew) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/portfolios/${id}`);
      const data = response.data.data ?? response.data;

      reset({
        couple: String(data.couple ?? ""),
        slug: String(data.slug ?? ""),
        subtitle: String(data.subtitle ?? ""),
        destination_id: data.destination_id ?? undefined,
        venue_id: data.venue_id ?? undefined,
        experience_id: data.experience_id ?? undefined,
        image: String(data.image ?? ""),
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: String(data.excerpt ?? ""),
        origin: data.origin ?? undefined,
        review: data.review ?? undefined,
        content: data.content ?? undefined,
        story_sections: Array.isArray(data.story_sections)
          ? data.story_sections
          : [],
        credit_role: String(data.credit_role ?? ""),
        credit_planner: String(data.credit_planner ?? ""),
        credit_location_detail: String(data.credit_location_detail ?? ""),
        credit_couple_origin: String(data.credit_couple_origin ?? ""),
      });

      // Populate galleryImages dari data.gallery (PortfolioImage[] dari PORTFOLIO_INCLUDE)
      // Mengikuti pola VenueDetailPage: map ke GalleryImage { id, url, sort_order }
      const gallery: GalleryImage[] = Array.isArray(data.gallery)
        ? data.gallery.map((g: { id: string; url: string; sort_order: number }) => ({
            id: g.id,
            url: g.url,
            sort_order: g.sort_order,
          }))
        : [];
      setGalleryImages(gallery);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setNotFound(true);
      } else {
        const errorMsg =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Failed to load portfolio";
        toast.error(errorMsg, {
          description: err instanceof Error ? err.message : "Unknown error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, isNew, reset]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  // ── Slug: auto-generate dari couple name ─────────────────────────────────────
  const handleCoupleChange = (v: string) => {
    setField("couple", v);
    if (isNew) {
      setField("slug", toSlug(v));
    }
  };

  // ── Save flow ─────────────────────────────────────────────────────────────────
  const onSubmitForm = async () => {
    setSaveStatus("confirm");
  };

  const onSubmitError = async () => {
    await trigger();
    toast.error("Please fix the errors before saving");
  };

  const confirmSave = async () => {
    setSaveStatus("saving");
    try {
      const slugValue = toSlug(formData.couple);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { slug: _slug, ...restFormData } = formData;
      const payload = {
        ...restFormData,
        slug: slugValue,
        destination_id: formData.destination_id || null,
        venue_id: formData.venue_id || null,
        experience_id: formData.experience_id || null,
        origin: formData.origin || null,
        review: formData.review || null,
        content: formData.content || null,
      };

      if (isNew) {
        // POST /api/portfolios → created(portfolio)
        const res = await axios.post("/api/portfolios", payload, {
          headers: getAuthHeaders(true),
        });
        const newPortfolioId: string = res.data.data?.id ?? res.data.id;

        // Flush gallery queue — mengikuti persis pola VenueDetailPage
        // Semua gambar temp di galleryImages di-POST ke API satu per satu
        for (const img of galleryImages) {
          try {
            await axios.post(
              `/api/portfolios/${newPortfolioId}/gallery`,
              { url: img.url, sort_order: img.sort_order },
              { headers: getAuthHeaders(true) },
            );
          } catch {
            // Non-blocking — lanjutkan meski satu gambar gagal
          }
        }

        setSaveStatus("idle");
        toast.success("Portfolio published!", {
          description: "Your new portfolio has been added to the collection.",
        });
        reset(); // clear dirty state before navigating
        router.push("/dashboard/portfolio");
      } else {
        // PATCH /api/portfolios/:id → ok(portfolio)
        await axios.patch(`/api/portfolios/${id}`, payload, {
          headers: getAuthHeaders(true),
        });
        // Gallery sudah di-sync real-time oleh GalleryManager di edit mode
        setSaveStatus("saved");
        toast.success("Changes saved!", {
          description: "Your portfolio has been updated.",
        });
        // Re-sync RHF baseline so isDirty becomes false
        reset({ ...formData, slug: toSlug(formData.couple) });
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
      setSaveStatus("confirm"); // Biarkan modal terbuka agar user bisa coba lagi
    }
  };

  // ── Delete flow ───────────────────────────────────────────────────────────────
  const deletePortfolio = async () => {
    setDeleteStatus("deleting");
    try {
      await axios.delete(`/api/portfolios/${id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteStatus("idle");
      toast.success("Portfolio deleted!", {
        description: "The portfolio has been removed from the collection.",
      });
      router.push("/dashboard/portfolio");
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

  // ── Derived values ────────────────────────────────────────────────────────────
  const slugPreview = formData.couple ? toSlug(formData.couple) : "";

  const wordCount = formData.content
    ? formData.content
        .replace(/<[^>]*>/g, "")
        .split(/\s+/)
        .filter(Boolean).length
    : 0;

  // ── Not found ─────────────────────────────────────────────────────────────────
  if (notFound) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-10 h-10 text-primary/20 mb-4" />
        <p className="text-primary/50 text-xs tracking-widest uppercase mb-2">
          Not Found
        </p>
        <p className="text-primary/80 text-sm mb-6">
          This portfolio does not exist.
        </p>
        <Link
          href="/dashboard/portfolio"
          className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
        >
          Back to Portfolio
        </Link>
      </div>
    );
  }

  // ── Skeleton loading ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto animate-pulse">
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-primary/10 rounded" />
            <div className="space-y-2">
              <div className="h-3 w-24 bg-primary/10 rounded" />
              <div className="h-7 w-64 bg-primary/10 rounded" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-primary/10 rounded" />
            <div className="h-10 w-20 bg-primary/10 rounded" />
            <div className="h-10 w-36 bg-primary/10 rounded" />
          </div>
        </div>
        <div className="grid xl:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-6">
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-4 w-36 bg-primary/10 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
              <div className="h-20 bg-primary/5 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
            </div>
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-4 w-40 bg-primary/10 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
            </div>
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-4 w-40 bg-primary/10 rounded" />
              <div className="h-64 bg-primary/5 rounded" />
            </div>
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-4 w-32 bg-primary/10 rounded" />
              <div className="h-28 bg-primary/5 rounded" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white border border-primary/20 p-6">
              <div className="aspect-[3/2] bg-primary/10 mb-4 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
            </div>
            <div className="bg-white border border-primary/20 p-6 space-y-3">
              <div className="h-4 w-28 bg-primary/10 rounded" />
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-primary/10 rounded" />
                ))}
              </div>
              <div className="h-10 bg-primary/5 rounded" />
            </div>
            <div className="bg-primary/5 border border-primary/20 p-5 space-y-3">
              <div className="h-3 w-16 bg-primary/10 rounded" />
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 w-14 bg-primary/10 rounded" />
                  <div className="h-4 w-12 bg-primary/10 rounded" />
                </div>
              ))}
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
            onClick={() => guardedNavigate("/dashboard/portfolio")}
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              {isNew ? "Create Portfolio" : "Edit Portfolio"}
            </p>
            <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
              {isNew ? "New Portfolio" : formData.couple || "Untitled"}
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

          {/* View Live — gunakan slug yang sudah tersimpan di DB */}
          {!isNew && (
            <Link
              href={`/portfolio/${formData.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 border border-primary/30 text-primary text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-primary/5 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              View Live
            </Link>
          )}

          {/* Delete button — hanya di edit mode */}
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

          {/* Save button */}
          <button
            type="button"
            onClick={() => handleSubmit(onSubmitForm, onSubmitError)()}
            disabled={
              saveStatus === "saving" ||
              isDestinationsLoading ||
              isVenuesLoading ||
              isExperiencesLoading
            }
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-5 py-2.5 hover:cursor-pointer hover:bg-primary/80 transition-colors disabled:opacity-60"
          >
            {saveStatus === "saving" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isNew ? "Publish Portfolio" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ── Two Column Layout ── */}
      <form
        onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
        className="grid xl:grid-cols-[1fr_340px] gap-6"
      >
        {/* ── Left Column ── */}
        <div className="space-y-6">
          {/* ── Basic Information ── */}
          <Section
            title="Basic Information"
            subtitle="Core couple and page details"
          >
            <div className="space-y-4">
              {/* Couple Names */}
              <FormField label="Couple Names" required>
                <TextInput
                  value={formData.couple}
                  onChange={handleCoupleChange}
                  placeholder="e.g. Sarah & James"
                  error={
                    formErrors.couple
                      ? String(formErrors.couple.message)
                      : undefined
                  }
                />
              </FormField>

              {/* Subtitle */}
              <FormField label="Subtitle" required>
                <TextInput
                  value={formData.subtitle ?? ""}
                  onChange={(v) => setField("subtitle", v)}
                  placeholder="e.g. A Clifftop Ceremony at Uluwatu"
                  error={
                    formErrors.subtitle
                      ? String(formErrors.subtitle.message)
                      : undefined
                  }
                />
              </FormField>

              {/* Excerpt */}
              <FormField label="Excerpt" required>
                <TextareaInput
                  value={formData.excerpt ?? ""}
                  onChange={(v) => setField("excerpt", v)}
                  placeholder="A short description shown in portfolio cards and SEO…"
                  rows={3}
                  error={
                    formErrors.excerpt
                      ? String(formErrors.excerpt.message)
                      : undefined
                  }
                />
                <p className="text-primary/40 text-xs mt-1.5">
                  {(formData.excerpt ?? "").length} / 200 characters recommended
                </p>
              </FormField>

              {/* Origin — optional */}
              <FormField label="Couple Origin">
                <TextInput
                  value={formData.origin ?? ""}
                  onChange={(v) => setField("origin", v || undefined)}
                  placeholder="e.g. Sydney, Australia"
                />
              </FormField>
            </div>
          </Section>

          {/* ── Venue & Location ── */}
          <Section
            title="Venue & Location"
            subtitle="Where the wedding took place"
          >
            <div className="space-y-4">
              {/* Destination — dari GET /api/destinations */}
              <FormField label="Destination">
                <div className="relative">
                  <select
                    value={formData.destination_id ?? ""}
                    onChange={(e) =>
                      setField(
                        "destination_id",
                        (e.target.value as PortfolioFormData["destination_id"]) || undefined,
                      )
                    }
                    disabled={isDestinationsLoading}
                    className="w-full appearance-none px-3 py-2.5 pr-9 text-sm text-primary bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDestinationsLoading ? (
                      <option value="" disabled>Loading destinations…</option>
                    ) : (
                      <>
                        <option value="">Select a destination…</option>
                        {destinationOptions.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                </div>
                {formErrors.destination_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.destination_id.message)}
                  </p>
                )}
              </FormField>

              {/* Venue — dari GET /api/venues */}
              <FormField label="Venue">
                <div className="relative">
                  <select
                    value={formData.venue_id ?? ""}
                    onChange={(e) =>
                      setField(
                        "venue_id",
                        (e.target.value as PortfolioFormData["venue_id"]) || undefined,
                      )
                    }
                    disabled={isVenuesLoading}
                    className="w-full appearance-none px-3 py-2.5 pr-9 text-sm text-primary bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVenuesLoading ? (
                      <option value="" disabled>Loading venues…</option>
                    ) : (
                      <>
                        <option value="">Select a venue…</option>
                        {venueOptions.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                </div>
                {formErrors.venue_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.venue_id.message)}
                  </p>
                )}
              </FormField>

              {/* Experience — dari GET /api/wedding-experiences */}
              <FormField label="Experience">
                <div className="relative">
                  <select
                    value={formData.experience_id ?? ""}
                    onChange={(e) =>
                      setField(
                        "experience_id",
                        (e.target.value as PortfolioFormData["experience_id"]) || undefined,
                      )
                    }
                    disabled={isExperiencesLoading}
                    className="w-full appearance-none px-3 py-2.5 pr-9 text-sm text-primary bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExperiencesLoading ? (
                      <option value="" disabled>Loading experiences…</option>
                    ) : (
                      <>
                        <option value="">Select an experience…</option>
                        {experienceOptions.map((ex) => (
                          <option key={ex.id} value={ex.id}>
                            {ex.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                </div>
                {formErrors.experience_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.experience_id.message)}
                  </p>
                )}
              </FormField>
            </div>
          </Section>

          {/* ── Portfolio Content (TipTap) ── */}
          <Section
            title="Portfolio Content"
            subtitle="Full narrative body in rich text"
          >
            <TipTapEditor
              value={formData.content ?? ""}
              onChange={(v) => setField("content", v || undefined)}
              error={
                formErrors.content
                  ? String(formErrors.content.message)
                  : undefined
              }
              placeholder="Write the portfolio story here…"
            />
          </Section>

          {/* ── Story Sections ── */}
          <Section
            title="Story Sections"
            subtitle="Narrative paragraphs displayed on the portfolio page"
          >
            <StorySectionsEditor
              value={(formData.story_sections as PortfolioStory[]) ?? []}
              onChange={(v) =>
                setField(
                  "story_sections",
                  v as PortfolioFormData["story_sections"],
                )
              }
            />
          </Section>

          {/* ── Couple Review ── */}
          <Section
            title="Couple Review"
            subtitle="Quote or testimonial from the couple"
          >
            <TextareaInput
              value={formData.review ?? ""}
              onChange={(v) => setField("review", v || undefined)}
              placeholder="&ldquo;Working with the team was an absolute dream…&rdquo;"
              rows={4}
            />
          </Section>

          {/* ── Credits ── */}
          <Section title="Credits" subtitle="Team and attribution details">
            <div className="space-y-4">
              {[
                {
                  key: "credit_role" as const,
                  label: "Role / Service Type",
                  placeholder: "e.g. Full Wedding Planning & Design",
                },
                {
                  key: "credit_planner" as const,
                  label: "Planner / Coordinator",
                  placeholder: "e.g. Raisa Dewi",
                },
                {
                  key: "credit_location_detail" as const,
                  label: "Location Detail",
                  placeholder: "e.g. Uluwatu Cliff, Bali",
                },
                {
                  key: "credit_couple_origin" as const,
                  label: "Couple Origin",
                  placeholder: "e.g. Sydney, Australia",
                },
              ].map(({ key, label, placeholder }) => (
                <FormField key={key} label={label} required>
                  <TextInput
                    value={formData[key] ?? ""}
                    onChange={(v) => setField(key, v)}
                    placeholder={placeholder}
                    error={
                      formErrors[key]
                        ? String(formErrors[key]?.message)
                        : undefined
                    }
                  />
                </FormField>
              ))}
            </div>
          </Section>

          {/* ── Tags ── */}
          <Section title="Tags" subtitle="Keywords for filtering and discovery">
            <TagsInput
              values={formData.tags ?? []}
              onChange={(v) => setField("tags", v)}
              placeholder="Type a tag and press Enter…"
            />
            {formErrors.tags && (
              <p className="text-red-500 text-xs mt-1">
                {String(formErrors.tags.message)}
              </p>
            )}
          </Section>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Hero Image */}
          <Section title="Hero Image">
            <div className="space-y-4">
              <div className="relative aspect-[3/2] bg-primary/5 border border-primary/20 overflow-hidden">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Hero preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
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
              <FormField label="Hero Image URL" required>
                <ImageUpload
                  value={formData.image}
                  onChange={(v) => setField("image", v)}
                  inputId="hero-upload"
                />
              </FormField>
              {formErrors.image && (
                <p className="text-red-500 text-xs mt-1">
                  {String(formErrors.image.message)}
                </p>
              )}
            </div>
          </Section>

          {/* Gallery Images — menggunakan GalleryManager pola VenueDetailPage */}
          <Section
            title="Gallery Images"
            subtitle={`${galleryImages.length} image${galleryImages.length !== 1 ? "s" : ""}`}
          >
            <GalleryManager
              portfolioId={isNew ? null : id}
              images={galleryImages}
              onChange={setGalleryImages}
            />
          </Section>

          {/* URL & SEO */}
          <Section title="URL & SEO">
            <div className="space-y-2">
              <p className="text-primary/80 text-xs tracking-widest uppercase mb-1">
                URL Slug
              </p>
              <p className="text-sm text-primary bg-primary/5 px-3 py-2 border border-primary/20">
                {slugPreview || "—"}
              </p>
              <p className="text-primary/50 text-xs">
                Auto-generated from couple names
              </p>
            </div>
          </Section>

          {/* Quick Summary */}
          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Summary
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "Couple",
                  value: formData.couple || "—",
                },
                {
                  label: "Slug",
                  value: slugPreview ? `/${slugPreview}` : "—",
                },
                {
                  label: "Destination",
                  value:
                    destinationOptions.find(
                      (d) => d.id === formData.destination_id,
                    )?.name ?? (formData.destination_id ? "—" : "Not set"),
                },
                {
                  label: "Venue",
                  value:
                    venueOptions.find((v) => v.id === formData.venue_id)
                      ?.name ?? (formData.venue_id ? "—" : "Not set"),
                },
                {
                  label: "Experience",
                  value:
                    experienceOptions.find(
                      (e) => e.id === formData.experience_id,
                    )?.name ?? (formData.experience_id ? "—" : "Not set"),
                },
                {
                  label: "Gallery",
                  value: `${galleryImages.length} images`,
                },
                {
                  label: "Tags",
                  value: (formData.tags ?? []).length
                    ? `${formData.tags!.length} tags`
                    : "—",
                },
                {
                  label: "Story",
                  value: (formData.story_sections ?? []).length
                    ? `${formData.story_sections!.length} sections`
                    : "—",
                },
                {
                  label: "Content",
                  value: wordCount > 0 ? `~${wordCount} words` : "—",
                },
                {
                  label: "Review",
                  value: formData.review ? "Added" : "—",
                },
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
          entityName="Portfolio"
          itemName={formData.couple || undefined}
          onConfirm={confirmSave}
          onCancel={() => saveStatus !== "saving" && setSaveStatus("idle")}
          isLoading={saveStatus === "saving"}
        />
      )}

      {/* ── Delete Modal ── */}
      {(deleteStatus === "confirm" || deleteStatus === "deleting") && (
        <DeleteModal
          name={formData.couple}
          onConfirm={deletePortfolio}
          onCancel={() =>
            deleteStatus !== "deleting" && setDeleteStatus("idle")
          }
          isLoading={deleteStatus === "deleting"}
        />
      )}
    </div>
  );
}