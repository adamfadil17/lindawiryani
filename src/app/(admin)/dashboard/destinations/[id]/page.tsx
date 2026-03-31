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
  AlertCircle,
  CheckCircle2,
  Loader2,
  ChevronDown,
} from "lucide-react";
import FormField from "@/components/shared/from-field";
import TagsInput from "@/components/shared/tags-input";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import ImageUpload from "@/components/shared/image-upload";
import SaveModal from "@/components/shared/save-modal";
import DeleteModal from "@/components/shared/delete-modal";
import UnsavedChangesModal from "@/components/shared/unsaved-changes-modal";
import { toSlug } from "@/utils";
import { DestinationCategory } from "@/types";
import {
  destinationFormSchema,
  DestinationFormData,
} from "@/utils/form-validators";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DestinationDetailPage() {
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
  } = useForm<DestinationFormData>({
    resolver: zodResolver(destinationFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      category_id: "",
      type: "",
      description: "",
      long_description: "",
      location: "",
      atmosphere: "",
      accessibility_notes: "",
      seasonal_considerations: "",
      image: "",
      guest_capacity: "",
      highlights: [],
      best_for: [],
      ceremony_options: [],
      reception_options: [],
      accommodation_nearby: [],
      dining_experiences: [],
      unique_features: [],
    },
  });

  // ── setField helper: always triggers validation + touch so errors show ──
  const setField = (key: keyof DestinationFormData, value: unknown) =>
    setValue(key as any, value as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  const formData = watch();
  const categoryId = watch("category_id");

  // ── Categories ──
  const [allCategories, setAllCategories] = useState<DestinationCategory[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  // ── Page state ──
  const [isLoading, setIsLoading] = useState(!isNew);
  const [notFound, setNotFound] = useState(false);

  // ── Save state (consolidated) ──
  // idle | confirm | saving | saved
  const [saveStatus, setSaveStatus] = useState<"idle" | "confirm" | "saving" | "saved">("idle");

  // ── Delete state (consolidated) ──
  // idle | confirm | deleting
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "confirm" | "deleting">("idle");

  // ── Unsaved changes guard ──
  // Create mode: any non-empty field counts as "dirty"
  // Edit mode: react-hook-form's isDirty tracks real changes vs. loaded data
  const [unsavedModal, setUnsavedModal] = useState<{ open: boolean; pendingHref?: string }>({ open: false });

  const hasUnsavedChanges = isNew
    ? Boolean(
        formData.name ||
        formData.type ||
        formData.description ||
        formData.long_description ||
        formData.location ||
        formData.image ||
        (formData.highlights && formData.highlights.length > 0) ||
        (formData.ceremony_options && formData.ceremony_options.length > 0)
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

  // ── Load categories on mount ──
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("/api/destination-categories", {
          params: { limit: 100 },
        });
        const cats = response.data.data ?? [];
        setAllCategories(cats);
        if (isNew && cats.length > 0 && !categoryId) {
          setValue("category_id", cats[0].id);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setIsCategoriesLoading(false);
      }
    };
    getCategories();
  }, [isNew, categoryId, setValue]);

  // ── Load destination data (edit mode only) ──
  useEffect(() => {
    if (isNew) return;
    setIsLoading(true);
    const getDestinationById = async () => {
      try {
        const response = await axios.get(`/api/destinations/${id}`);
        const data = response.data.data ?? response.data;

        reset({
          name: String(data.name ?? ""),
          slug: String(data.slug ?? ""),
          category_id: String(data.category_id ?? ""),
          type: String(data.type ?? ""),
          description: String(data.description ?? ""),
          long_description: String(data.long_description ?? ""),
          location: String(data.location ?? ""),
          atmosphere: String(data.atmosphere ?? ""),
          accessibility_notes: String(data.accessibility_notes ?? ""),
          seasonal_considerations: String(data.seasonal_considerations ?? ""),
          image: String(data.image ?? ""),
          guest_capacity: String(data.guest_capacity ?? ""),
          highlights: Array.isArray(data.highlights) ? data.highlights : [],
          best_for: Array.isArray(data.best_for) ? data.best_for : [],
          ceremony_options: Array.isArray(data.ceremony_options)
            ? data.ceremony_options
            : [],
          reception_options: Array.isArray(data.reception_options)
            ? data.reception_options
            : [],
          accommodation_nearby: Array.isArray(data.accommodation_nearby)
            ? data.accommodation_nearby
            : [],
          dining_experiences: Array.isArray(data.dining_experiences)
            ? data.dining_experiences
            : [],
          unique_features: Array.isArray(data.unique_features)
            ? data.unique_features
            : [],
        });
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setNotFound(true);
        } else {
          const errorMsg =
            axios.isAxiosError(err) && err.response?.data?.message
              ? err.response.data.message
              : "Failed to load destination";
          toast.error(errorMsg, {
            description: err instanceof Error ? err.message : "Unknown error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    getDestinationById();
  }, [id, isNew, reset]);

  // ── Save flow ──
  const onSubmitForm = async (_data: DestinationFormData) => {
    setSaveStatus("confirm");
  };

  // Called when handleSubmit validation fails — force all errors to show
  const onSubmitError = async () => {
    await trigger();
  };

  const confirmSave = async () => {
    setSaveStatus("saving");
    try {
      const slugPreview = formData.name ? toSlug(formData.name) : "";
      const payload = { ...formData, slug: slugPreview };

      if (isNew) {
        await axios.post("/api/destinations", payload, {
          headers: getAuthHeaders(true),
        });
        setSaveStatus("idle");
        toast.success("Destination created!", {
          description: "Your new destination has been added to the system.",
        });
        reset(); // clear dirty state before navigating
        router.push("/dashboard/destinations");
      } else {
        await axios.patch(`/api/destinations/${id}`, payload, {
          headers: getAuthHeaders(true),
        });
        setSaveStatus("saved");
        toast.success("Changes saved!", {
          description: "Your destination has been updated.",
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
  const deleteDestinationById = async () => {
    setDeleteStatus("deleting");
    try {
      await axios.delete(`/api/destinations/${id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteStatus("idle");
      toast.success("Destination deleted!", {
        description: "The destination has been removed from the system.",
      });
      router.push("/dashboard/destinations");
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

  // ── Not found ──
  if (notFound) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-10 h-10 text-primary/20 mb-4" />
        <p className="text-primary/50 text-xs tracking-widest uppercase mb-2">
          Not Found
        </p>
        <p className="text-primary/80 text-sm mb-6">
          This destination does not exist.
        </p>
        <Link
          href="/dashboard/destinations"
          className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
        >
          Back to Destinations
        </Link>
      </div>
    );
  }

  // ── Loading skeleton ──
  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto animate-pulse">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-9 h-9 bg-primary/10 border border-primary/20" />
          <div className="space-y-2">
            <div className="h-3 w-24 bg-primary/10 rounded" />
            <div className="h-6 w-48 bg-primary/10 rounded" />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-primary/20 p-6 space-y-4"
              >
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
          </div>
        </div>
      </div>
    );
  }

  const slugPreview = formData.name ? toSlug(formData.name) : "";

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => guardedNavigate("/dashboard/destinations")}
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              {isNew ? "Create New" : "Edit"}
            </p>
            <h1 className="text-primary text-2xl font-semibold tracking-wide">
              {isNew ? "New Destination" : formData.name || "Destination"}
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
              onClick={() => setDeleteStatus("confirm")}
              disabled={deleteStatus === "deleting" || saveStatus === "saving"}
              className="inline-flex items-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-4 py-2.5 hover:cursor-pointer hover:bg-red-50 transition-colors disabled:opacity-40"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}

          <button
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
        {/* ── Left Column ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Section
            title="Basic Information"
            subtitle="Core details shown on the public destination page"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* name — required */}
                <FormField label="Destination Name" required>
                  <TextInput
                    value={formData.name}
                    onChange={(v) => setField("name", v)}
                    placeholder="e.g. Ubud, Bali"
                    error={
                      formErrors.name
                        ? String(formErrors.name.message)
                        : undefined
                    }
                  />
                </FormField>

                {/* type — required */}
                <FormField label="Type" required>
                  <TextInput
                    value={formData.type}
                    onChange={(v) => setField("type", v)}
                    placeholder="e.g. Tropical Rainforest"
                    error={
                      formErrors.type
                        ? String(formErrors.type.message)
                        : undefined
                    }
                  />
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* category_id — required */}
                <FormField label="Category" required>
                  <div className="relative">
                    <select
                      value={categoryId}
                      onChange={(e) => setField("category_id", e.target.value)}
                      disabled={isCategoriesLoading}
                      className="w-full pl-4 pr-9 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCategoriesLoading ? (
                        <option value="" disabled>
                          Loading categories…
                        </option>
                      ) : (
                        allCategories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))
                      )}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                  </div>
                  {formErrors.category_id && (
                    <p className="text-red-500 text-xs mt-1">
                      {String(formErrors.category_id.message)}
                    </p>
                  )}
                </FormField>

                {/* location — required */}
                <FormField label="Location" required>
                  <TextInput
                    value={formData.location}
                    onChange={(v) => setField("location", v)}
                    placeholder="e.g. Central Bali, Indonesia"
                    error={
                      formErrors.location
                        ? String(formErrors.location.message)
                        : undefined
                    }
                  />
                </FormField>
              </div>

              {/* description — required */}
              <FormField
                label="Short Description"
                required
                hint="Shown on the destinations listing card (2–3 sentences)"
              >
                <TextareaInput
                  value={formData.description}
                  onChange={(v) => setField("description", v)}
                  placeholder="A brief, evocative description..."
                  rows={2}
                  error={
                    formErrors.description
                      ? String(formErrors.description.message)
                      : undefined
                  }
                />
              </FormField>

              {/* long_description — required */}
              <FormField
                label="Long Description"
                required
                hint="Full description shown on the destination detail page"
              >
                <TextareaInput
                  value={formData.long_description}
                  onChange={(v) => setField("long_description", v)}
                  placeholder="Detailed description for the destination detail page..."
                  rows={5}
                  error={
                    formErrors.long_description
                      ? String(formErrors.long_description.message)
                      : undefined
                  }
                />
              </FormField>
            </div>
          </Section>

          {/* Location & Atmosphere */}
          <Section
            title="Location & Atmosphere"
            subtitle="Describe the physical setting and mood of the destination"
          >
            <div className="space-y-5">
              {/* atmosphere — required */}
              <FormField
                label="Atmosphere"
                required
                hint="The overall mood and feeling of this destination"
              >
                <TextareaInput
                  value={formData.atmosphere}
                  onChange={(v) => setField("atmosphere", v)}
                  placeholder="e.g. Lush, spiritual, and deeply cultural..."
                  rows={2}
                  error={
                    formErrors.atmosphere
                      ? String(formErrors.atmosphere.message)
                      : undefined
                  }
                />
              </FormField>
            </div>
          </Section>

          {/* Wedding Details */}
          <Section
            title="Wedding Details"
            subtitle="Venue-specific information for wedding planning"
          >
            <div className="space-y-5">
              {/* guest_capacity — required */}
              <FormField label="Guest Capacity" required>
                <TextInput
                  value={formData.guest_capacity}
                  onChange={(v) => setField("guest_capacity", v)}
                  placeholder="e.g. 20–200 guests"
                  error={
                    formErrors.guest_capacity
                      ? String(formErrors.guest_capacity.message)
                      : undefined
                  }
                />
              </FormField>

              {/* ceremony_options — required (min 1 item) */}
              <FormField label="Ceremony Options" required>
                <TagsInput
                  values={formData.ceremony_options}
                  onChange={(v) => setField("ceremony_options", v)}
                  placeholder="Add ceremony option..."
                />
                {formErrors.ceremony_options && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.ceremony_options.message)}
                  </p>
                )}
              </FormField>

              {/* reception_options — required (min 1 item) */}
              <FormField label="Reception Options" required>
                <TagsInput
                  values={formData.reception_options}
                  onChange={(v) => setField("reception_options", v)}
                  placeholder="Add reception option..."
                />
                {formErrors.reception_options && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.reception_options.message)}
                  </p>
                )}
              </FormField>

              {/* dining_experiences — required (min 1 item) */}
              <FormField label="Dining Experiences" required>
                <TagsInput
                  values={formData.dining_experiences}
                  onChange={(v) => setField("dining_experiences", v)}
                  placeholder="Add dining experience..."
                />
                {formErrors.dining_experiences && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.dining_experiences.message)}
                  </p>
                )}
              </FormField>
            </div>
          </Section>

          {/* Additional Information */}
          <Section
            title="Additional Information"
            subtitle="Extra details about the destination"
          >
            <div className="space-y-5">
              {/* accessibility_notes — required */}
              <FormField label="Accessibility Notes" required>
                <TextareaInput
                  value={formData.accessibility_notes}
                  onChange={(v) => setField("accessibility_notes", v)}
                  placeholder="e.g. Wheelchair accessible, steps required..."
                  rows={2}
                  error={
                    formErrors.accessibility_notes
                      ? String(formErrors.accessibility_notes.message)
                      : undefined
                  }
                />
              </FormField>

              {/* seasonal_considerations — required */}
              <FormField label="Seasonal Considerations" required>
                <TextareaInput
                  value={formData.seasonal_considerations}
                  onChange={(v) => setField("seasonal_considerations", v)}
                  placeholder="e.g. Best visited during dry season..."
                  rows={2}
                  error={
                    formErrors.seasonal_considerations
                      ? String(formErrors.seasonal_considerations.message)
                      : undefined
                  }
                />
              </FormField>

              {/* highlights — required (min 1 item) */}
              <FormField label="Highlights" required>
                <TagsInput
                  values={formData.highlights}
                  onChange={(v) => setField("highlights", v)}
                  placeholder="Add a highlight..."
                />
                {formErrors.highlights && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.highlights.message)}
                  </p>
                )}
              </FormField>

              {/* best_for — required (min 1 item) */}
              <FormField label="Best For" required>
                <TagsInput
                  values={formData.best_for}
                  onChange={(v) => setField("best_for", v)}
                  placeholder="Add a wedding type..."
                />
                {formErrors.best_for && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.best_for.message)}
                  </p>
                )}
              </FormField>

              {/* accommodation_nearby — required (min 1 item) */}
              <FormField label="Accommodation Nearby" required>
                <TagsInput
                  values={formData.accommodation_nearby}
                  onChange={(v) => setField("accommodation_nearby", v)}
                  placeholder="Add accommodation option..."
                />
                {formErrors.accommodation_nearby && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.accommodation_nearby.message)}
                  </p>
                )}
              </FormField>

              {/* unique_features — required (min 1 item) */}
              <FormField label="Unique Features" required>
                <TagsInput
                  values={formData.unique_features}
                  onChange={(v) => setField("unique_features", v)}
                  placeholder="Add a unique feature..."
                />
                {formErrors.unique_features && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.unique_features.message)}
                  </p>
                )}
              </FormField>
            </div>
          </Section>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-6">
          {/* image — required (valid URL) */}
          <Section title="Destination Image">
            {formData.image && (
              <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden border border-primary/20 bg-primary/5">
                <Image
                  src={formData.image}
                  alt={formData.name || "Destination preview"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <ImageUpload
              value={formData.image}
              onChange={(v) => setField("image", v)}
            />
            {formErrors.image && (
              <p className="text-red-500 text-xs mt-2">
                {String(formErrors.image.message)}
              </p>
            )}
          </Section>

          {/* SEO Info */}
          <Section title="URL & SEO">
            <div className="space-y-2">
              <div>
                <p className="text-primary/80 text-xs tracking-widest uppercase mb-1">
                  URL Slug
                </p>
                <p className="text-sm text-primary bg-primary/5 px-3 py-2 border border-primary/20">
                  {slugPreview || "—"}
                </p>
              </div>
            </div>
          </Section>
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
      {saveStatus === "confirm" || saveStatus === "saving" ? (
        <SaveModal
          mode={isNew ? "create" : "update"}
          entityName="Destination"
          itemName={formData.name || undefined}
          onConfirm={confirmSave}
          onCancel={() => saveStatus !== "saving" && setSaveStatus("idle")}
          isLoading={saveStatus === "saving"}
        />
      ) : null}

      {/* ── Delete Modal ── */}
      {deleteStatus === "confirm" || deleteStatus === "deleting" ? (
        <DeleteModal
          name={formData.name}
          onConfirm={deleteDestinationById}
          onCancel={() => deleteStatus !== "deleting" && setDeleteStatus("idle")}
          isLoading={deleteStatus === "deleting"}
        />
      ) : null}
    </div>
  );
}