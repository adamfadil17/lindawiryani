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
  Building2,
  ChevronDown,
  MapPin,
  Users,
  DollarSign,
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
import { toSlug } from "@/utils";
import { venueFormSchema, VenueFormData } from "@/utils/form-validators";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import { Destination, WeddingExperience } from "@/types";

// ─── Types ──────────────────────────────────────────────────────────
type GalleryImage = { id: string; url: string; sort_order: number };

type GalleryManagerProps = {
  venueId: string | null; // null = new venue (not yet created)
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
};

function GalleryManager({ venueId, images, onChange }: GalleryManagerProps) {
  const [pendingUrl, setPendingUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!pendingUrl) return;

    if (venueId) {
      // Edit mode — persist immediately
      setIsAdding(true);
      try {
        const response = await axios.post(
          `/api/venues/${venueId}/gallery`,
          { url: pendingUrl, sort_order: images.length },
          { headers: getAuthHeaders(true) },
        );
        onChange([...images, response.data.data ?? response.data]);
        setPendingUrl("");
        toast.success("Gallery image added");
      } catch (err) {
        const msg = axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to add gallery image";
        toast.error(msg);
      } finally {
        setIsAdding(false);
      }
    } else {
      // Create mode — queue locally, flush after venue creation
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
    if (venueId && !image.id.startsWith("temp-")) {
      try {
        await axios.delete(`/api/venues/${venueId}/gallery/${image.id}`, {
          headers: getAuthHeaders(),
        });
      } catch (err) {
        const msg = axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to remove gallery image";
        toast.error(msg);
        return;
      }
    }
    onChange(images.filter((img) => img.id !== image.id));
  };

  return (
    <div className="space-y-4">
      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <div key={img.id} className="relative aspect-square group overflow-hidden border border-primary/20">
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

      {/* Add new gallery image */}
      <div className="space-y-2">
        <ImageUpload
          value={pendingUrl}
          onChange={setPendingUrl}
          inputId="gallery-add-upload"
        />
        {pendingUrl && (
          <>
            {/* Preview sebelum add */}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VenueDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  // ── React Hook Form ──
  const {
    watch,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors: formErrors, isDirty },
  } = useForm<VenueFormData>({
    resolver: zodResolver(venueFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      slogan: "",
      description: "",
      image: "",
      capacity: 0,
      starting_price: 0,
      destination_id: "",
      experience_id: "",
    },
  });

  // setField helper — always triggers validation + touch so errors show immediately
  const setField = (key: keyof VenueFormData, value: unknown) =>
    setValue(key as keyof VenueFormData, value as never, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  const formData = watch();

  // ── Gallery state (managed separately from main form) ──
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  // ── Page state ──
  const [isLoading, setIsLoading] = useState(!isNew);
  const [notFound, setNotFound] = useState(false);

  // ── Save state machine: idle | confirm | saving | saved ──
  const [saveStatus, setSaveStatus] = useState<"idle" | "confirm" | "saving" | "saved">("idle");

  // ── Delete state machine: idle | confirm | deleting ──
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "confirm" | "deleting">("idle");

  // ── Unsaved changes guard ──
  // For create mode: any non-empty field counts as "dirty"
  // For edit mode: react-hook-form's isDirty tracks real changes vs. loaded data
  const [unsavedModal, setUnsavedModal] = useState<{ open: boolean; pendingHref?: string }>({ open: false });

  const hasUnsavedChanges = isNew
    ? Boolean(
        formData.name ||
        formData.slogan ||
        formData.description ||
        formData.image ||
        formData.capacity ||
        formData.starting_price ||
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

  // ── Reference data for dropdowns ──
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [allExperiences, setAllExperiences] = useState<WeddingExperience[]>([]);
  const [isDestinationsLoading, setIsDestinationsLoading] = useState(true);
  const [isExperiencesLoading, setIsExperiencesLoading] = useState(true);

  // ── Fetch destinations ──
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("/api/destinations", { params: { limit: 100 } });
        const data: Destination[] = response.data.data ?? [];
        setAllDestinations(data);
        if (isNew && data.length > 0) {
          setValue("destination_id", data[0].id, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }
      } catch (err) {
        console.error("Failed to load destinations:", err);
      } finally {
        setIsDestinationsLoading(false);
      }
    };
    fetchDestinations();
  }, [isNew, setValue]);

  // ── Fetch wedding experiences ──
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get("/api/wedding-experiences", { params: { limit: 100 } });
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

  // ── Load venue data (edit mode only) ──
  const fetchVenue = useCallback(async () => {
    if (isNew) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/venues/${id}`);
      const data = response.data.data ?? response.data;

      reset({
        name: String(data.name ?? ""),
        slug: String(data.slug ?? ""),
        slogan: String(data.slogan ?? ""),
        description: String(data.description ?? ""),
        image: String(data.image ?? ""),
        capacity: Number(data.capacity ?? 0),
        starting_price: Number(data.starting_price ?? 0),
        destination_id: String(data.destination_id ?? ""),
        experience_id: String(data.experience_id ?? ""),
      });

      // Load gallery from nested include
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
            : "Failed to load venue";
        toast.error(errorMsg, {
          description: err instanceof Error ? err.message : "Unknown error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, isNew, reset]);

  useEffect(() => {
    fetchVenue();
  }, [fetchVenue]);

  // ── Save flow ──
  const onSubmitForm = async (_data: VenueFormData) => {
    setSaveStatus("confirm");
  };

  // Called when handleSubmit validation fails — force all errors visible
  const onSubmitError = async () => {
    await trigger();
  };

  const confirmSave = async () => {
    setSaveStatus("saving");
    try {
      const slugValue = toSlug(formData.name);
      const payload = { ...formData, slug: slugValue };

      if (isNew) {
        const response = await axios.post("/api/venues", payload, {
          headers: getAuthHeaders(true),
        });
        const createdVenue = response.data.data ?? response.data;
        const newVenueId: string = createdVenue.id;

        // Flush queued gallery images
        for (const img of galleryImages) {
          try {
            await axios.post(
              `/api/venues/${newVenueId}/gallery`,
              { url: img.url, sort_order: img.sort_order },
              { headers: getAuthHeaders(true) },
            );
          } catch {
            // Non-blocking — toast per image is too noisy
          }
        }

        setSaveStatus("idle");
        toast.success("Venue created!", {
          description: "Your new venue has been added to the system.",
        });
        reset(); // clear dirty state before navigating
        router.push("/dashboard/venues");
      } else {
        await axios.patch(`/api/venues/${id}`, payload, {
          headers: getAuthHeaders(true),
        });
        setSaveStatus("saved");
        toast.success("Changes saved!", {
          description: "Your venue has been updated.",
        });
        // Re-sync RHF baseline so isDirty becomes false
        reset({ ...formData, slug: toSlug(formData.name) });
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
      setSaveStatus("confirm"); // keep modal open on error
    }
  };

  // ── Delete flow ──
  const deleteVenueById = async () => {
    setDeleteStatus("deleting");
    try {
      await axios.delete(`/api/venues/${id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteStatus("idle");
      toast.success("Venue deleted!", {
        description: "The venue has been removed from the system.",
      });
      router.push("/dashboard/venues");
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : "Unknown error";
      toast.error("Failed to delete", { description: errorMsg });
      setDeleteStatus("confirm"); // keep modal open on error
    }
  };

  // ── Derived values ──
  const slugPreview = formData.name ? toSlug(formData.name) : "";
  const selectedDestination = allDestinations.find((d) => d.id === formData.destination_id);
  const selectedExperience = allExperiences.find((e) => e.id === formData.experience_id);

  // ── Not found ──
  if (notFound) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-10 h-10 text-primary/20 mb-4" />
        <p className="text-primary/50 text-xs tracking-widest uppercase mb-2">Not Found</p>
        <p className="text-primary/80 text-sm mb-6">This venue does not exist.</p>
        <Link
          href="/dashboard/venues"
          className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
        >
          Back to Venues
        </Link>
      </div>
    );
  }

  // ── Loading skeleton ──
  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-[1200px] mx-auto animate-pulse">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-9 h-9 bg-primary/10 border border-primary/20" />
          <div className="space-y-2">
            <div className="h-3 w-16 bg-primary/10 rounded" />
            <div className="h-6 w-44 bg-primary/10 rounded" />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-primary/20 p-6 space-y-4">
                <div className="h-4 w-32 bg-primary/10 rounded" />
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
                {[1, 2, 3].map((i) => <div key={i} className="aspect-square bg-primary/10" />)}
              </div>
              <div className="h-10 bg-primary/5 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => guardedNavigate("/dashboard/venues")}
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              {isNew ? "Create New" : "Edit"}
            </p>
            <h1 className="text-primary text-2xl font-semibold tracking-wide">
              {isNew ? "New Venue" : formData.name || "Venue"}
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
            disabled={saveStatus === "saving" || isDestinationsLoading || isExperiencesLoading}
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
        {/* ── Left Column ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Basic Information */}
          <Section
            title="Basic Information"
            subtitle="Core details about this venue"
          >
            <div className="space-y-5">
              {/* name — required, min 2, max 255 */}
              <FormField label="Venue Name" required>
                <TextInput
                  value={formData.name}
                  onChange={(v) => {
                    setField("name", v);
                    setField("slug", toSlug(v));
                  }}
                  placeholder="e.g. The Edge Bali"
                  error={formErrors.name ? String(formErrors.name.message) : undefined}
                />
              </FormField>

              {/* slogan — required, min 2 */}
              <FormField label="Slogan" required>
                <TextInput
                  value={formData.slogan}
                  onChange={(v) => setField("slogan", v)}
                  placeholder="e.g. Where the ocean meets the sky"
                  error={formErrors.slogan ? String(formErrors.slogan.message) : undefined}
                />
              </FormField>

              {/* description — required, min 1 */}
              <FormField label="Description" required>
                <TextareaInput
                  value={formData.description}
                  onChange={(v) => setField("description", v)}
                  placeholder="Describe the venue — the setting, atmosphere, and what makes it unique..."
                  rows={4}
                  error={formErrors.description ? String(formErrors.description.message) : undefined}
                />
              </FormField>
            </div>
          </Section>

          {/* Destination */}
          <Section title="Destination" subtitle="Where this venue is situated">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* destination_id — required, uuid */}
              <FormField label="Destination" required>
                <div className="relative">
                  <select
                    value={formData.destination_id}
                    onChange={(e) => setField("destination_id", e.target.value)}
                    disabled={isDestinationsLoading}
                    className="w-full pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDestinationsLoading ? (
                      <option value="" disabled>Loading destinations…</option>
                    ) : (
                      <>
                        <option value="" disabled>— Select a destination —</option>
                        {allDestinations.map((dest) => (
                          <option key={dest.id} value={dest.id}>
                            {dest.name}
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

              {/* destination type — read-only, auto-filled */}
              <FormField label="Destination Type">
                <div className="flex items-center gap-2 px-3 py-2.5 bg-primary/5 border border-primary/20 text-sm text-primary/60">
                  <MapPin className="w-4 h-4 text-primary/30 flex-shrink-0" />
                  <span>{selectedDestination?.type ?? "—"}</span>
                  <span className="ml-auto text-xs text-primary/30 tracking-widest uppercase">Auto</span>
                </div>
              </FormField>
            </div>
          </Section>

          {/* Wedding Experience */}
          <Section
            title="Wedding Experience"
            subtitle="Which experience category this venue belongs to"
          >
            {/* experience_id — required, uuid */}
            <FormField label="Experience" required>
              <div className="relative">
                <select
                  value={formData.experience_id}
                  onChange={(e) => setField("experience_id", e.target.value)}
                  disabled={isExperiencesLoading}
                  className="w-full pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExperiencesLoading ? (
                    <option value="" disabled>Loading experiences…</option>
                  ) : (
                    <>
                      <option value="" disabled>— Select an experience —</option>
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
          </Section>

          {/* Capacity & Pricing */}
          <Section title="Capacity & Pricing" subtitle="Guest count and starting rate">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* capacity — required, int, positive */}
              <FormField label="Max Capacity" required>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 pointer-events-none" />
                  <input
                    type="number"
                    min={1}
                    value={formData.capacity || ""}
                    onChange={(e) => setField("capacity", parseInt(e.target.value) || 0)}
                    placeholder="e.g. 150"
                    className={`w-full pl-9 pr-4 py-2.5 text-sm text-primary bg-white border focus:outline-none focus:border-primary/50 transition-colors ${
                      formErrors.capacity ? "border-red-400" : "border-primary/30"
                    }`}
                  />
                </div>
                {formErrors.capacity && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.capacity.message)}
                  </p>
                )}
              </FormField>

              {/* starting_price — required, positive (> 0) */}
              <FormField label="Starting Price (USD)" required>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 pointer-events-none" />
                  <input
                    type="number"
                    min={1}
                    value={formData.starting_price || ""}
                    onChange={(e) => setField("starting_price", parseFloat(e.target.value) || 0)}
                    placeholder="e.g. 3500"
                    className={`w-full pl-9 pr-4 py-2.5 text-sm text-primary bg-white border focus:outline-none focus:border-primary/50 transition-colors ${
                      formErrors.starting_price ? "border-red-400" : "border-primary/30"
                    }`}
                  />
                </div>
                {formErrors.starting_price && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.starting_price.message)}
                  </p>
                )}
              </FormField>
            </div>
          </Section>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">

          {/* Hero Image — required, valid URL */}
          <Section title="Hero Image">
            {/* Preview */}
            <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden border border-primary/20 bg-primary/5">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt={formData.name || "Venue preview"}
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
            <FormField label="Hero Image URL" required>
              <ImageUpload
                value={formData.image}
                onChange={(v) => setField("image", v)}
                inputId="hero-upload"
              />
            </FormField>
            {formErrors.image && (
              <p className="text-red-500 text-xs mt-2">
                {String(formErrors.image.message)}
              </p>
            )}
          </Section>

          {/* Gallery Images */}
          <Section
            title="Gallery"
            subtitle={`${galleryImages.length} image${galleryImages.length !== 1 ? "s" : ""}`}
          >
            <GalleryManager
              venueId={isNew ? null : id}
              images={galleryImages}
              onChange={setGalleryImages}
            />
          </Section>

          {/* URL & SEO */}
          <Section title="URL & SEO">
            <div className="space-y-2">
              <p className="text-primary/80 text-xs tracking-widest uppercase mb-1">URL Slug</p>
              <p className="text-sm text-primary bg-primary/5 px-3 py-2 border border-primary/20">
                {slugPreview || "—"}
              </p>
              <p className="text-primary/50 text-xs">Auto-generated from venue name</p>
            </div>
          </Section>

          {/* Quick Summary */}
          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">Summary</p>
            <div className="space-y-3">
              {[
                {
                  label: "Destination",
                  value: selectedDestination?.name ?? (formData.destination_id ? "—" : "Not set"),
                },
                {
                  label: "Experience",
                  value: selectedExperience?.name ?? (formData.experience_id ? "—" : "Not set"),
                },
                {
                  label: "Capacity",
                  value: formData.capacity > 0 ? `${formData.capacity} guests` : "—",
                },
                {
                  label: "Starting",
                  value: formData.starting_price > 0
                    ? `$${Number(formData.starting_price).toLocaleString()}`
                    : "—",
                },
                {
                  label: "Gallery",
                  value: `${galleryImages.length} photos`,
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
          entityName="Venue"
          itemName={formData.name || undefined}
          onConfirm={confirmSave}
          onCancel={() => saveStatus !== "saving" && setSaveStatus("idle")}
          isLoading={saveStatus === "saving"}
        />
      )}

      {/* ── Delete Modal ── */}
      {(deleteStatus === "confirm" || deleteStatus === "deleting") && (
        <DeleteModal
          name={formData.name}
          onConfirm={deleteVenueById}
          onCancel={() => deleteStatus !== "deleting" && setDeleteStatus("idle")}
          isLoading={deleteStatus === "deleting"}
        />
      )}
    </div>
  );
}