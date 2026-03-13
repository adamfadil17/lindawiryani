"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import {
  ArrowLeft,
  Save,
  Trash2,
  ImageIcon,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import FormField from "@/components/shared/from-field";
import TagsInput from "@/components/shared/tags-input";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import ImageUpload from "@/components/shared/image-upload";
import SaveModal from "@/components/shared/save-modal";
import DeleteModal from "@/components/shared/delete-modal";
import { Destination, DestinationCategory } from "@/lib/types/new-strucutre";
import { destinationList } from "@/lib/data/new-data/destination-data";
import { destinationSchema } from "@/lib/schemas/destination-schema";

// FormData excludes id and relation objects — only scalar/owned fields
type FormData = Omit<Destination, "id" | "category" | "venues">;

// Placeholder categories — replace with real data source / API call
const availableCategories: DestinationCategory[] = [
  { id: "cat-bali", name: "Bali" },
  { id: "cat-indonesia", name: "Indonesia" },
];

const emptyForm: FormData = {
  name: "",
  categoryId: availableCategories[0].id,
  type: "",
  description: "",
  longDescription: "",
  location: "",
  atmosphere: "",
  accessibilityNotes: "",
  seasonalConsiderations: "",
  image: "",
  guestCapacity: "",
  highlights: [],
  bestFor: [],
  ceremonyOptions: [],
  receptionOptions: [],
  accommodationNearby: [],
  diningExperiences: [],
  uniqueFeatures: [],
};

export default function EditDestinationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState<FormData>(emptyForm);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  // Load existing data
  useEffect(() => {
    if (!isNew) {
      const dest = destinationList.find((d) => d.id === id);
      if (dest) {
        // Destructure out relation objects — keep only FormData fields
        const { id: _id, category, venues, ...rest } = dest;
        setForm(rest);
      } else {
        setNotFound(true);
      }
    }
    setIsLoaded(true);
  }, [id, isNew]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = (): boolean => {
    try {
      destinationSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.issues.forEach((err) => {
          const path = err.path[0] as keyof FormData;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        toast.error("Validation failed", {
          description: "Please check the highlighted fields and try again.",
        });
      }
      return false;
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      setShowSaveModal(true);
    }
  };

  const confirmSave = () => {
    try {
      // In a real app: call API here
      setShowSaveModal(false);

      if (isNew) {
        toast.success("Destination created successfully!", {
          description: "Your new destination has been added to the system.",
        });
        setTimeout(() => {
          router.push("/dashboard/destinations");
        }, 1000);
      } else {
        setSaved(true);
        toast.success("Changes saved successfully!", {
          description: "Your destination has been updated.",
        });
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      toast.error("Failed to save changes", {
        description: "An error occurred while saving. Please try again.",
      });
    }
  };

  const confirmDelete = () => {
    try {
      // In a real app: call delete API
      setShowDeleteModal(false);
      toast.success("Destination deleted successfully!", {
        description: "The destination has been removed from the system.",
      });
      setTimeout(() => {
        router.push("/dashboard/destinations");
      }, 1000);
    } catch (error) {
      toast.error("Failed to delete destination", {
        description: "An error occurred while deleting. Please try again.",
      });
    }
  };

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

  if (!isLoaded) return null;

  // Resolve category name for display
  const selectedCategory = availableCategories.find(
    (c) => c.id === form.categoryId,
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/destinations"
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              {isNew ? "Create New" : "Edit"}
            </p>
            <h1 className="text-primary text-2xl font-semibold tracking-wide">
              {isNew ? "New Destination" : form.name || "Destination"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Save success indicator */}
          {saved && (
            <div className="flex items-center gap-1.5 text-green-600 text-xs tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved</span>
            </div>
          )}

          {/* Delete button (only for existing) */}
          {!isNew && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-4 py-2.5 hover:cursor-pointer hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest hover:cursor-pointer uppercase px-5 py-2.5 hover:bg-primary/80 transition-colors"
          >
            <Save className="w-4 h-4" />
            {isNew ? "Create" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left Column (main) ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Section
            title="Basic Information"
            subtitle="Core details shown on the public destination page"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Destination Name" required>
                  <TextInput
                    value={form.name}
                    onChange={(v) => set("name", v)}
                    placeholder="e.g. Ubud, Bali"
                    error={errors.name}
                  />
                </FormField>

                <FormField label="Type" required>
                  <TextInput
                    value={form.type}
                    onChange={(v) => set("type", v)}
                    placeholder="e.g. Tropical Rainforest"
                    error={errors.type}
                  />
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Category — now selects by categoryId */}
                <FormField label="Category" required>
                  <select
                    value={form.categoryId}
                    onChange={(e) => set("categoryId", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    {availableCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Location" required>
                  <TextInput
                    value={form.location}
                    onChange={(v) => set("location", v)}
                    placeholder="e.g. Central Bali, Indonesia"
                    error={errors.location}
                  />
                </FormField>
              </div>

              <FormField
                label="Short Description"
                required
                hint="Shown on the destinations listing card (2-3 sentences)"
              >
                <TextareaInput
                  value={form.description}
                  onChange={(v) => set("description", v)}
                  placeholder="A brief, evocative description..."
                  rows={2}
                  error={errors.description}
                />
              </FormField>

              <FormField
                label="Long Description"
                required
                hint="Full description shown on the destination detail page"
              >
                <TextareaInput
                  value={form.longDescription}
                  onChange={(v) => set("longDescription", v)}
                  placeholder="Detailed description for the destination detail page..."
                  rows={5}
                  error={errors.longDescription}
                />
              </FormField>

              <FormField
                label="Atmosphere"
                hint="The overall mood and feeling of this destination"
              >
                <TextareaInput
                  value={form.atmosphere}
                  onChange={(v) => set("atmosphere", v)}
                  placeholder="e.g. Lush, spiritual, and deeply cultural..."
                  rows={2}
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
              <FormField label="Guest Capacity">
                <TextInput
                  value={form.guestCapacity}
                  onChange={(v) => set("guestCapacity", v)}
                  placeholder="e.g. 20–200 guests"
                />
              </FormField>

              <FormField label="Ceremony Options">
                <TagsInput
                  values={form.ceremonyOptions}
                  onChange={(v) => set("ceremonyOptions", v)}
                  placeholder="Add ceremony option..."
                />
              </FormField>

              <FormField label="Reception Options">
                <TagsInput
                  values={form.receptionOptions}
                  onChange={(v) => set("receptionOptions", v)}
                  placeholder="Add reception option..."
                />
              </FormField>

              <FormField label="Dining Experiences">
                <TagsInput
                  values={form.diningExperiences}
                  onChange={(v) => set("diningExperiences", v)}
                  placeholder="Add dining experience..."
                />
              </FormField>

              <FormField label="Accommodation Nearby">
                <TagsInput
                  values={form.accommodationNearby}
                  onChange={(v) => set("accommodationNearby", v)}
                  placeholder="Add nearby accommodation..."
                />
              </FormField>
            </div>
          </Section>

          {/* Features & Highlights */}
          <Section
            title="Features & Highlights"
            subtitle="Key selling points and notable aspects"
          >
            <div className="space-y-5">
              <FormField label="Highlights" required>
                <TagsInput
                  values={form.highlights}
                  onChange={(v) => set("highlights", v)}
                  placeholder="Add highlight..."
                  error={errors.highlights}
                />
              </FormField>

              <FormField label="Best For" required>
                <TagsInput
                  values={form.bestFor}
                  onChange={(v) => set("bestFor", v)}
                  placeholder="e.g. Intimate ceremonies..."
                  error={errors.bestFor}
                />
              </FormField>

              <FormField label="Unique Features">
                <TagsInput
                  values={form.uniqueFeatures}
                  onChange={(v) => set("uniqueFeatures", v)}
                  placeholder="Add unique feature..."
                />
              </FormField>
            </div>
          </Section>

          {/* Practical Info */}
          <Section
            title="Practical Information"
            subtitle="Accessibility and seasonal details for couples"
          >
            <div className="space-y-5">
              <FormField label="Accessibility Notes">
                <TextareaInput
                  value={form.accessibilityNotes}
                  onChange={(v) => set("accessibilityNotes", v)}
                  placeholder="Note any accessibility considerations..."
                  rows={2}
                />
              </FormField>

              <FormField label="Seasonal Considerations">
                <TextareaInput
                  value={form.seasonalConsiderations}
                  onChange={(v) => set("seasonalConsiderations", v)}
                  placeholder="Best seasons, weather notes, etc."
                  rows={2}
                />
              </FormField>
            </div>
          </Section>
        </div>

        {/* ── Right Column (sidebar) ── */}
        <div className="space-y-6">
          {/* Image */}
          <Section title="Cover Image">
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative aspect-[4/3] bg-primary/5 border border-primary/20 overflow-hidden">
                {form.image ? (
                  <Image
                    src={form.image}
                    alt="Preview"
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

          {/* Quick Summary */}
          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Summary
            </p>
            <div className="space-y-3">
              {[
                { label: "Highlights", count: form.highlights.length },
                {
                  label: "Ceremony Options",
                  count: form.ceremonyOptions.length,
                },
                {
                  label: "Reception Options",
                  count: form.receptionOptions.length,
                },
                { label: "Unique Features", count: form.uniqueFeatures.length },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-primary/80 font-semibold text-xs">
                    {item.label}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 ${
                      item.count > 0
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary/50"
                    }`}
                  >
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Save (sticky bottom on mobile) */}
          <div className="sticky bottom-6 lg:static">
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/90 transition-colors shadow-lg lg:shadow-none"
            >
              <Save className="w-4 h-4" />
              {isNew ? "Create Destination" : "Save Changes"}
            </button>
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
          name={form.name}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}