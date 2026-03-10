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
  Plus,
  X,
  ImageIcon,
  Building2,
  ChevronDown,
  MapPin,
  Users,
  DollarSign,
} from "lucide-react";
import { venueList } from "@/lib/data/new-data/venue-data";
import { destinationList } from "@/lib/data/new-data/destination-data";
import { weddingExperienceList } from "@/lib/data/new-data/wedding-experience-data";
import FormField from "@/components/shared/from-field";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import ImageUpload from "@/components/shared/image-upload";
import SaveModal from "@/components/shared/save-modal";

// ─── Types ────────────────────────────────────────────────────────────────────

type VenueImage = {
  id: string;
  url: string;
  type: "HERO" | "GALLERY";
  venueId: string;
};

type FormData = {
  name: string;
  slogan: string;
  description: string;
  capacity: number;
  startingPrice: number;
  destinationId: string;
  experienceId: string;
  images: VenueImage[];
};

// ─── Gallery Upload ───────────────────────────────────────────────────────────

function GalleryUpload({
  venueId,
  values,
  onChange,
}: {
  venueId: string;
  values: VenueImage[];
  onChange: (v: VenueImage[]) => void;
}) {
  const galleryImages = values.filter((img) => img.type === "GALLERY");

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      toast.error("PNG or JPG only");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB per image");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const newImg: VenueImage = {
        id: `${venueId}-g-${Date.now()}`,
        url: ev.target?.result as string,
        type: "GALLERY",
        venueId,
      };
      onChange([...values, newImg]);
      toast.success("Gallery image added");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleRemove = (imgId: string) => {
    onChange(values.filter((img) => img.id !== imgId));
  };

  return (
    <div className="space-y-3">
      {galleryImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {galleryImages.map((img, i) => (
            <div key={img.id} className="relative aspect-square group">
              <Image
                src={img.url}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover"
              />
              <button
                onClick={() => handleRemove(img.id)}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleAdd}
          className="hidden"
          id="gallery-upload"
        />
        <label
          htmlFor="gallery-upload"
          className="cursor-pointer flex items-center justify-center gap-2 py-3 text-sm text-primary/60 hover:text-primary transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Gallery Image
        </label>
      </div>
    </div>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteModal({
  name,
  onConfirm,
  onCancel,
}: {
  name: string;
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
        <p className="text-primary/80 tracking-[0.2em] uppercase text-xs mb-2">
          Confirm Delete
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          Delete Venue
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{name}&rdquo;
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

// ─── Default Form ─────────────────────────────────────────────────────────────

const defaultForm: FormData = {
  name: "",
  slogan: "",
  description: "",
  capacity: 0,
  startingPrice: 0,
  destinationId: "uluwatu",
  experienceId: "luxury-weddings",
  images: [],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VenueDetailPage() {
  const router = useRouter();
  const params = useParams();
  const rawId = params?.id as string;
  const isNew = rawId === "new";

  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isNew && rawId) {
      const existing = venueList.find((v) => v.id === rawId);
      if (existing) {
        setForm({
          name: existing.name,
          slogan: existing.slogan ?? "",
          description: existing.description,
          capacity: existing.capacity,
          startingPrice: existing.startingPrice,
          destinationId: existing.destinationId,
          experienceId: existing.experienceId,
          images: existing.images as VenueImage[],
        });
      } else {
        toast.error("Venue not found");
        router.push("/dashboard/venues");
      }
    }
    setIsLoaded(true);
  }, [rawId, isNew, router]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const heroImage = form.images.find((img) => img.type === "HERO");
  const galleryImages = form.images.filter((img) => img.type === "GALLERY");

  const handleHeroChange = (url: string) => {
    const withoutHero = form.images.filter((img) => img.type !== "HERO");
    const heroImg: VenueImage = {
      id: `${rawId ?? "new"}-hero`,
      url,
      type: "HERO",
      venueId: rawId ?? "new",
    };
    set("images", url ? [heroImg, ...withoutHero] : withoutHero);
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};
    if (!form.name.trim()) newErrors.name = "Venue name is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!heroImage) newErrors.hero = "Hero image is required";
    if (form.capacity <= 0)
      newErrors.capacity = "Capacity must be greater than 0";
    if (form.startingPrice <= 0)
      newErrors.startingPrice = "Starting price must be greater than 0";
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
    setShowSaveModal(false);
    toast.success(isNew ? "Venue created!" : "Venue updated!");
    router.push("/dashboard/venues");
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    toast.success("Venue deleted");
    router.push("/dashboard/venues");
  };

  if (!isLoaded) return null;

  const selectedDestination = destinationList.find(
    (d) => d.id === form.destinationId,
  );
  const selectedExperience = weddingExperienceList.find(
    (e) => e.id === form.experienceId,
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link
            href="/dashboard/venues"
            className="inline-flex items-center gap-1.5 text-primary/50 hover:text-primary transition-colors text-xs tracking-widest uppercase mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Venues
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-primary/80 tracking-[0.25em] uppercase text-xs">
                {isNew ? "New Venue" : "Edit Venue"}
              </p>
              <h1 className="text-primary text-xl font-semibold tracking-wide">
                {isNew ? "Create Venue" : form.name || "Untitled Venue"}
              </h1>
            </div>
          </div>
        </div>

        {!isNew && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-primary/50 tracking-widest uppercase">
              ID:
            </span>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1">
              #{rawId}
            </span>
          </div>
        )}
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left Column ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Section
            title="Basic Information"
            subtitle="Core details about this venue"
          >
            <div className="space-y-5">
              {/* Name */}
              <FormField label="Venue Name" required>
                <TextInput
                  value={form.name}
                  onChange={(v) => set("name", v)}
                  placeholder="e.g. The Edge Bali"
                  error={errors.name}
                />
              </FormField>

              {/* Slogan */}
              <FormField label="Slogan">
                <TextInput
                  value={form.slogan}
                  onChange={(v) => set("slogan", v)}
                  placeholder="e.g. Where the ocean meets the sky"
                />
              </FormField>

              {/* Description */}
              <FormField label="Description" required>
                <TextareaInput
                  value={form.description}
                  onChange={(v) => set("description", v)}
                  placeholder="Describe the venue — the setting, atmosphere, and what makes it unique..."
                  rows={4}
                  error={errors.description}
                />
              </FormField>
            </div>
          </Section>

          {/* Destination */}
          <Section title="Destination" subtitle="Where this venue is situated">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Destination */}
              <FormField label="Destination" required>
                <div className="relative">
                  <select
                    value={form.destinationId}
                    onChange={(e) => set("destinationId", e.target.value)}
                    className="w-full px-3 py-2.5 pr-10 text-sm text-primary bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    {destinationList.map((dest) => (
                      <option key={dest.id} value={dest.id}>
                        {dest.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-primary/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </FormField>

              {/* Destination type (auto-filled, read-only) */}
              <FormField label="Destination Type">
                <div className="flex items-center gap-2 px-3 py-2.5 bg-primary/5 border border-primary/20 text-sm text-primary/60">
                  <MapPin className="w-4 h-4 text-primary/30" />
                  {selectedDestination?.type ?? "—"}
                  <span className="ml-auto text-xs text-primary/30 tracking-widest uppercase">
                    Auto
                  </span>
                </div>
              </FormField>
            </div>

            {/* Destination description */}
            {selectedDestination?.description && (
              <p className="mt-3 text-xs text-primary/50 italic border-l-2 border-primary/20 pl-3">
                {selectedDestination.description}
              </p>
            )}
          </Section>

          {/* Experience */}
          <Section
            title="Wedding Experience"
            subtitle="Which experience category this venue belongs to"
          >
            <FormField label="Experience" required>
              <div className="relative">
                <select
                  value={form.experienceId}
                  onChange={(e) => set("experienceId", e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 text-sm text-primary bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                >
                  {weddingExperienceList.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-primary/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </FormField>
          </Section>

          {/* Capacity & Pricing */}
          <Section
            title="Capacity & Pricing"
            subtitle="Guest count and starting rate"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Max Capacity" required>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <input
                    type="number"
                    min={0}
                    value={form.capacity || ""}
                    onChange={(e) =>
                      set("capacity", parseInt(e.target.value) || 0)
                    }
                    placeholder="e.g. 50"
                    className={`w-full pl-9 pr-4 py-2.5 text-sm text-primary bg-primary/3 border focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.capacity ? "border-red-400" : "border-primary/20"
                    }`}
                  />
                  {errors.capacity && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.capacity}
                    </p>
                  )}
                </div>
              </FormField>

              <FormField label="Starting Price (USD)" required>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                  <input
                    type="number"
                    min={0}
                    value={form.startingPrice || ""}
                    onChange={(e) =>
                      set("startingPrice", parseInt(e.target.value) || 0)
                    }
                    placeholder="e.g. 3500"
                    className={`w-full pl-9 pr-4 py-2.5 text-sm text-primary bg-primary/3 border focus:outline-none focus:border-primary/50 transition-colors ${
                      errors.startingPrice
                        ? "border-red-400"
                        : "border-primary/20"
                    }`}
                  />
                  {errors.startingPrice && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.startingPrice}
                    </p>
                  )}
                </div>
              </FormField>
            </div>
          </Section>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Hero Image */}
          <Section title="Hero Image">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-primary/5 border border-primary/20 overflow-hidden">
                {heroImage?.url ? (
                  <Image
                    src={heroImage.url}
                    alt="Hero preview"
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

              <FormField label="Hero Image" required>
                <ImageUpload
                  value={heroImage?.url ?? ""}
                  onChange={handleHeroChange}
                  error={errors.hero}
                  inputId="hero-upload"
                />
              </FormField>
            </div>
          </Section>

          {/* Gallery */}
          <Section
            title="Gallery"
            subtitle={`${galleryImages.length} image${
              galleryImages.length !== 1 ? "s" : ""
            }`}
          >
            <GalleryUpload
              venueId={rawId ?? "new"}
              values={form.images}
              onChange={(v) => set("images", v)}
            />
          </Section>

          {/* Quick Summary */}
          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Summary
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "Destination",
                  value: selectedDestination?.name ?? form.destinationId,
                },
                {
                  label: "Experience",
                  value: selectedExperience?.name ?? form.experienceId,
                },
                {
                  label: "Capacity",
                  value: form.capacity > 0 ? `${form.capacity} guests` : "—",
                },
                {
                  label: "Starting",
                  value:
                    form.startingPrice > 0
                      ? `$${form.startingPrice.toLocaleString()}`
                      : "—",
                },
                {
                  label: "Gallery",
                  value: `${galleryImages.length} photos`,
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

          {/* Actions */}
          <div className="sticky bottom-6 lg:static space-y-2">
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/90 transition-colors shadow-lg lg:shadow-none"
            >
              <Save className="w-4 h-4" />
              {isNew ? "Create Venue" : "Save Changes"}
            </button>

            {!isNew && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Venue
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
          name={form.name}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
