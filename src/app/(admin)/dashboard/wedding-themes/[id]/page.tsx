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
  Plus,
  X,
  ImageIcon,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import FormField from "@/components/shared/from-field";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import TagsInput from "@/components/shared/tags-input";
import ImageUpload from "@/components/shared/image-upload";
import SaveModal from "@/components/shared/save-modal";
import DeleteModal from "@/components/shared/delete-modal";
import UnsavedChangesModal from "@/components/shared/unsaved-changes-modal";
import TipTapEditor from "@/components/shared/tiptap-editor";
import { toSlug } from "@/utils";
import {
  weddingThemeFormSchema,
  WeddingThemeFormData,
} from "@/utils/form-validators";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import { Venue, WeddingExperience } from "@/types";

type GalleryImage = { id: string; url: string; sort_order: number };

type GalleryManagerProps = {
  themeId: string | null;
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
};

function GalleryManager({ themeId, images, onChange }: GalleryManagerProps) {
  const [pendingUrl, setPendingUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleCancelPending = async (url: string) => {
    if (!url) return;
    try {
      await axios.delete("/api/files/delete", {
        data: { url },
        headers: getAuthHeaders(),
      });
    } catch {}
  };

  const handleAdd = async () => {
    if (!pendingUrl) return;

    if (themeId) {
      setIsAdding(true);
      try {
        const response = await axios.post(
          `/api/wedding-themes/${themeId}/gallery`,
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
      onChange([
        ...images,
        {
          id: `temp-${Date.now()}`,
          url: pendingUrl,
          sort_order: images.length,
        },
      ]);
      setPendingUrl("");
    }
  };

  const handleRemove = async (image: GalleryImage) => {
    if (themeId && !image.id.startsWith("temp-")) {
      try {
        await axios.delete(
          `/api/wedding-themes/${themeId}/gallery/${image.id}`,
          { headers: getAuthHeaders() },
        );
      } catch (err) {
        const msg =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Failed to remove gallery image";
        toast.error(msg);
        return;
      }
    } else if (image.id.startsWith("temp-")) {
      try {
        await axios.delete("/api/files/delete", {
          data: { url: image.url },
          headers: getAuthHeaders(),
        });
      } catch {}
    }

    onChange(images.filter((img) => img.id !== image.id));
  };

  return (
    <div className="space-y-4">
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
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1.5 py-0.5">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <ImageUpload
          value={pendingUrl}
          onChange={(v) => {
            if (v === "") {
              handleCancelPending(pendingUrl);
            }
            setPendingUrl(v);
          }}
          inputId="gallery-add-upload"
        />
        {pendingUrl && (
          <>
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

export default function WeddingThemeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const {
    watch,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors: formErrors, isDirty },
  } = useForm<WeddingThemeFormData>({
    resolver: zodResolver(weddingThemeFormSchema),
    defaultValues: {
      slug: "",
      title: "",
      description: "",
      image: "",
      venue_id: undefined,
      experience_id: "",
    },
  });

  const setField = (key: keyof WeddingThemeFormData, value: unknown) =>
    setValue(key as keyof WeddingThemeFormData, value as never, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  const formData = watch();

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const [isLoading, setIsLoading] = useState(!isNew);
  const [notFound, setNotFound] = useState(false);

  const [saveStatus, setSaveStatus] = useState<
    "idle" | "confirm" | "saving" | "saved"
  >("idle");

  const [deleteStatus, setDeleteStatus] = useState<
    "idle" | "confirm" | "deleting"
  >("idle");

  const [unsavedModal, setUnsavedModal] = useState<{
    open: boolean;
    pendingHref?: string;
  }>({ open: false });

  const hasUnsavedChanges = isNew
    ? Boolean(
        formData.title ||
        formData.description ||
        formData.image ||
        galleryImages.length > 0,
      )
    : isDirty;

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

  const guardedNavigate = useCallback(
    (href: string) => {
      if (
        hasUnsavedChanges &&
        saveStatus !== "saving" &&
        saveStatus !== "saved"
      ) {
        setUnsavedModal({ open: true, pendingHref: href });
      } else {
        router.push(href);
      }
    },
    [hasUnsavedChanges, saveStatus, router],
  );

  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [allExperiences, setAllExperiences] = useState<WeddingExperience[]>([]);
  const [isVenuesLoading, setIsVenuesLoading] = useState(true);
  const [isExperiencesLoading, setIsExperiencesLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("/api/venues", {
          params: { limit: 100 },
        });
        setAllVenues(response.data.data ?? []);
      } catch (err) {
        console.error("Failed to load venues:", err);
      } finally {
        setIsVenuesLoading(false);
      }
    };
    fetchVenues();
  }, []);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get("/api/wedding-experiences", {
          params: { limit: 100 },
        });
        const data: WeddingExperience[] = response.data.data ?? [];
        setAllExperiences(data);
        if (isNew && data.length > 0) {
          setValue("experience_id", data[0].id, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }
      } catch (err) {
        console.error("Failed to load experiences:", err);
      } finally {
        setIsExperiencesLoading(false);
      }
    };
    fetchExperiences();
  }, [isNew, setValue]);

  const fetchTheme = useCallback(async () => {
    if (isNew) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/wedding-themes/${id}`);
      const data = response.data.data ?? response.data;

      reset({
        slug: String(data.slug ?? ""),
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        image: String(data.image ?? ""),
        venue_id: data.venue_id ?? undefined,
        experience_id: String(data.experience_id ?? ""),
      });

      const gallery: GalleryImage[] = Array.isArray(data.gallery)
        ? data.gallery.map(
            (g: { id: string; url: string; sort_order: number }) => ({
              id: g.id,
              url: g.url,
              sort_order: g.sort_order,
            }),
          )
        : [];
      setGalleryImages(gallery);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setNotFound(true);
      } else {
        const errorMsg =
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Failed to load wedding theme";
        toast.error(errorMsg, {
          description: err instanceof Error ? err.message : "Unknown error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, isNew, reset]);

  useEffect(() => {
    fetchTheme();
  }, [fetchTheme]);

  const onSubmitForm = async (_data: WeddingThemeFormData) => {
    setSaveStatus("confirm");
  };

  const onSubmitError = async () => {
    await trigger();
  };

  const confirmSave = async () => {
    setSaveStatus("saving");
    try {
      const slugValue = toSlug(formData.title);
      const payload = { ...formData, slug: slugValue };

      if (isNew) {
        const response = await axios.post("/api/wedding-themes", payload, {
          headers: getAuthHeaders(true),
        });
        const createdTheme = response.data.data ?? response.data;
        const newThemeId: string = createdTheme.id;

        for (const img of galleryImages) {
          try {
            await axios.post(
              `/api/wedding-themes/${newThemeId}/gallery`,
              { url: img.url, sort_order: img.sort_order },
              { headers: getAuthHeaders(true) },
            );
          } catch {}
        }

        setSaveStatus("idle");
        toast.success("Wedding theme created!", {
          description: "Your new wedding theme has been added to the system.",
        });
        reset();
        router.push("/dashboard/wedding-themes");
      } else {
        await axios.patch(`/api/wedding-themes/${id}`, payload, {
          headers: getAuthHeaders(true),
        });
        setSaveStatus("saved");
        toast.success("Changes saved!", {
          description: "Your wedding theme has been updated.",
        });

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
      setSaveStatus("confirm");
    }
  };

  const deleteThemeById = async () => {
    setDeleteStatus("deleting");
    try {
      await axios.delete(`/api/wedding-themes/${id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteStatus("idle");
      toast.success("Wedding theme deleted!", {
        description: "The wedding theme has been removed from the system.",
      });
      router.push("/dashboard/wedding-themes");
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

  useEffect(() => {
    if (formData.title) {
      setValue("slug", toSlug(formData.title), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [formData.title, setValue]);

  const slugPreview = formData.title ? toSlug(formData.title) : "";
  const selectedVenue = allVenues.find((v) => v.id === formData.venue_id);
  const selectedExperience = allExperiences.find(
    (e) => e.id === formData.experience_id,
  );

  if (notFound) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-10 h-10 text-primary/20 mb-4" />
        <p className="text-primary/50 text-xs tracking-widest uppercase mb-2">
          Not Found
        </p>
        <p className="text-primary/80 text-sm mb-6">
          This wedding theme does not exist.
        </p>
        <Link
          href="/dashboard/wedding-themes"
          className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
        >
          Back to Wedding Themes
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto animate-pulse">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-9 h-9 bg-primary/10 border border-primary/20" />
          <div className="space-y-2">
            <div className="h-3 w-16 bg-primary/10 rounded" />
            <div className="h-6 w-52 bg-primary/10 rounded" />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-primary/20 p-6 space-y-4"
              >
                <div className="h-4 w-36 bg-primary/10 rounded" />
                <div className="h-10 bg-primary/5 rounded" />
                <div className="h-10 bg-primary/5 rounded" />
                <div className="h-20 bg-primary/5 rounded" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="bg-white border border-primary/20 p-6">
              <div className="aspect-[4/3] bg-primary/10 mb-4" />
              <div className="h-10 bg-primary/5 rounded" />
            </div>
            <div className="bg-white border border-primary/20 p-6">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-primary/10" />
                ))}
              </div>
              <div className="h-10 bg-primary/5 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => guardedNavigate("/dashboard/wedding-themes")}
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              {isNew ? "Create New" : "Edit"}
            </p>
            <h1 className="text-primary text-2xl font-semibold tracking-wide">
              {isNew ? "New Wedding Theme" : formData.title || "Wedding Theme"}
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
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest hover:cursor-pointer uppercase px-5 py-2.5 hover:bg-primary/80 transition-colors disabled:opacity-60"
          >
            {saveStatus === "saving" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isNew ? "Create" : "Save Changes"}
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
        className="grid lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <Section
            title="Basic Information"
            subtitle="Core details about this wedding theme"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Title" required>
                  <TextInput
                    value={formData.title}
                    onChange={(v) => setField("title", v)}
                    placeholder="e.g. Sunset Elopement at the Cliffs"
                    error={
                      formErrors.title
                        ? String(formErrors.title.message)
                        : undefined
                    }
                  />
                </FormField>
              </div>

              <FormField
                label="Description"
                required
                hint="Describe the atmosphere, style, and experience couples can expect"
              >
                <TipTapEditor
                  value={formData.description}
                  onChange={(v) => setField("description", v)}
                  placeholder="Describe this wedding theme — the atmosphere, style, and experience couples can expect..."
                  error={
                    formErrors.description
                      ? String(formErrors.description.message)
                      : undefined
                  }
                />
              </FormField>
            </div>
          </Section>

          <Section
            title="Venue & Experience Assignment"
            subtitle="Optionally link this theme to a specific venue and wedding experience"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField
                label="Venue"
                hint="Optional — You can set the venue later"
              >
                <div className="relative">
                  <select
                    value={formData.venue_id ?? ""}
                    onChange={(e) =>
                      setField("venue_id", e.target.value || undefined)
                    }
                    disabled={isVenuesLoading}
                    className="w-full pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVenuesLoading ? (
                      <option value="" disabled>
                        Loading venues…
                      </option>
                    ) : (
                      <>
                        <option value="">— To Be Confirmed —</option>
                        {allVenues.map((venue) => (
                          <option key={venue.id} value={venue.id}>
                            {venue.name}
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

              <FormField label="Wedding Experience" required>
                <div className="relative">
                  <select
                    value={formData.experience_id}
                    onChange={(e) => setField("experience_id", e.target.value)}
                    disabled={isExperiencesLoading}
                    className="w-full pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExperiencesLoading ? (
                      <option value="" disabled>
                        Loading experiences…
                      </option>
                    ) : (
                      <>
                        <option value="">— Select an experience —</option>
                        {allExperiences.map((exp) => (
                          <option key={exp.id} value={exp.id}>
                            {exp.name}
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
        </div>

        <div className="space-y-6">
          <Section title="Cover Image">
            <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden border border-primary/20 bg-primary/5">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt={formData.title || "Theme preview"}
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
            <FormField label="Cover Image URL" required>
              <ImageUpload
                value={formData.image}
                onChange={(v) => setField("image", v)}
                inputId="cover-upload"
              />
            </FormField>
            {formErrors.image && (
              <p className="text-red-500 text-xs mt-2">
                {String(formErrors.image.message)}
              </p>
            )}
          </Section>

          <Section
            title="Gallery"
            subtitle={`${galleryImages.length} image${galleryImages.length !== 1 ? "s" : ""}`}
          >
            <GalleryManager
              themeId={isNew ? null : id}
              images={galleryImages}
              onChange={setGalleryImages}
            />
          </Section>

          <Section title="URL & SEO">
            <div className="space-y-2">
              <p className="text-primary/80 text-xs tracking-widest uppercase mb-1">
                URL Slug
              </p>
              <p className="text-sm text-primary bg-primary/5 px-3 py-2 border border-primary/20">
                {slugPreview || "—"}
              </p>
              <p className="text-primary/50 text-xs">
                Auto-generated from title
              </p>
            </div>
          </Section>

          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Summary
            </p>
            <div className="space-y-3">
              {[
                { label: "Slug", value: slugPreview || "—" },
                { label: "Gallery", value: `${galleryImages.length} photos` },
                {
                  label: "Venue",
                  value: selectedVenue?.name ?? "To Be Confirmed",
                },
                {
                  label: "Experience",
                  value:
                    selectedExperience?.name ??
                    (formData.experience_id ? "—" : "None"),
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

      {(saveStatus === "confirm" || saveStatus === "saving") && (
        <SaveModal
          mode={isNew ? "create" : "update"}
          entityName="Wedding Theme"
          itemName={formData.title || undefined}
          onConfirm={confirmSave}
          onCancel={() => saveStatus !== "saving" && setSaveStatus("idle")}
          isLoading={saveStatus === "saving"}
        />
      )}

      {(deleteStatus === "confirm" || deleteStatus === "deleting") && (
        <DeleteModal
          name={formData.title}
          onConfirm={deleteThemeById}
          onCancel={() =>
            deleteStatus !== "deleting" && setDeleteStatus("idle")
          }
          isLoading={deleteStatus === "deleting"}
        />
      )}
    </div>
  );
}
