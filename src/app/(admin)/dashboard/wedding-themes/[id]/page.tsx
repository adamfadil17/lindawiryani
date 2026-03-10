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
  Heart,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import FormField from "@/components/shared/from-field";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import TagsInput from "@/components/shared/tags-input";
import ImageUpload from "@/components/shared/image-upload";
import SaveModal from "@/components/shared/save-modal";
import { ThemeType, WeddingTheme } from "@/lib/types/new-strucutre";
import { weddingThemeList } from "@/lib/data/new-data/wedding-theme-data";
import { venueList } from "@/lib/data/new-data/venue-data";
import { weddingExperienceList } from "@/lib/data/new-data/wedding-experience-data";

type FormData = Omit<WeddingTheme, "id" | "venue" | "experience">;

const allThemes: WeddingTheme[] = weddingThemeList;

// ─── Gallery Upload ───────────────────────────────────────────────────────────

function GalleryUpload({
  values,
  onChange,
}: {
  values: string[];
  onChange: (v: string[]) => void;
}) {
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
      onChange([...values, ev.target?.result as string]);
      toast.success("Gallery image added");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-3">
      {values.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {values.map((src, i) => (
            <div key={i} className="relative aspect-square group">
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover"
              />
              <button
                onClick={() => onChange(values.filter((_, idx) => idx !== i))}
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
        <p className="text-primary/80 tracking-[0.2em] uppercase text-xs mb-2">
          Confirm Delete
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          Delete Wedding Theme
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{title}&rdquo;
          </span>
          ? This action cannot be undone and will permanently remove this
          wedding theme from the system.
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

const defaultForm: FormData = {
  type: "ELOPEMENT",
  title: "",
  description: "",
  themeName: "",
  venueId: "",
  experienceId: "",
  image: "",
  gallery: [],
  inclusions: [],
};

export default function WeddingThemeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isNew) {
      const existing = allThemes.find((t) => t.id === id);
      if (existing) {
        const { id: _id, ...rest } = existing;
        setForm(rest);
      } else {
        toast.error("Wedding theme not found");
        router.push("/dashboard/wedding-themes");
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
    if (!form.themeName.trim()) newErrors.themeName = "Theme name is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.image) newErrors.image = "Cover image is required";
    if (form.inclusions.length === 0)
      newErrors.inclusions = "At least one inclusion is required";
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
    // In production: call your API here
    toast.success(isNew ? "Wedding theme created!" : "Changes saved!");
    setShowSaveModal(false);
    if (isNew) router.push("/dashboard/wedding-themes");
  };

  const confirmDelete = () => {
    // In production: call your API here
    toast.success("Wedding theme deleted");
    setShowDeleteModal(false);
    router.push("/dashboard/wedding-themes");
  };

  if (!isLoaded) return null;

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/wedding-themes"
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-0.5">
              {isNew ? "Create New" : "Edit"}
            </p>
            <h1 className="text-primary text-2xl font-semibold tracking-wide">
              {isNew ? "New Wedding Theme" : form.title || "Wedding Theme"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-medium border ${
              form.type === "ELOPEMENT"
                ? "bg-rose-50 text-rose-600 border-rose-200"
                : "bg-violet-50 text-violet-600 border-violet-200"
            }`}
          >
            {form.type === "ELOPEMENT" ? (
              <Heart className="w-3.5 h-3.5" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            {form.type.toLowerCase()}
          </div>
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

      {/* ── Two Column Layout ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left Column ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Section
            title="Basic Information"
            subtitle="Core details about this wedding theme"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Type */}
                <FormField label="Theme Type" required>
                  <div className="relative">
                    <select
                      value={form.type}
                      onChange={(e) => set("type", e.target.value as ThemeType)}
                      className="w-full px-3 py-2.5 pr-10 text-sm text-primary 
               bg-primary/3 border border-primary/20 
               focus:outline-none focus:border-primary/50 
               transition-colors appearance-none"
                    >
                      <option value="ELOPEMENT">Elopement</option>
                      <option value="INTIMATE">Intimate</option>
                    </select>

                    <ChevronDown
                      className="w-4 h-4 text-primary/50 
                          absolute right-3 top-1/2 
                          -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </FormField>

                {/* Theme Name (slug key) */}
                <FormField label="Theme Name (key)" required>
                  <TextInput
                    value={form.themeName}
                    onChange={(v) => set("themeName", v)}
                    placeholder="e.g. cliffside, waterfall, garden"
                    error={errors.themeName}
                  />
                </FormField>
              </div>

              {/* Title */}
              <FormField label="Title" required>
                <TextInput
                  value={form.title}
                  onChange={(v) => set("title", v)}
                  placeholder="e.g. Sunset Elopement at the Cliffs"
                  error={errors.title}
                />
              </FormField>

              {/* Description */}
              <FormField label="Description" required>
                <TextareaInput
                  value={form.description}
                  onChange={(v) => set("description", v)}
                  placeholder="Describe this wedding theme — the atmosphere, style, and experience couples can expect..."
                  rows={4}
                  error={errors.description}
                />
              </FormField>
            </div>
          </Section>

          {/* Venue Assignment */}

          <Section
            title="Venue & Experience Assignment"
            subtitle="Link this theme to a specific venue and wedding experience"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Venue">
                  <div className="relative">
                    <select
                      value={form.venueId}
                      onChange={(e) => set("venueId", e.target.value)}
                      className="w-full px-3 py-2.5 pr-10 text-sm text-primary 
               bg-primary/3 border border-primary/20 
               focus:outline-none focus:border-primary/50 
               transition-colors appearance-none"
                    >
                      <option value="">— Select a venue —</option>
                      {venueList.map((venue) => (
                        <option key={venue.id} value={venue.id}>
                          {venue.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-primary/50 
                          absolute right-3 top-1/2 
                          -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                  <p className="text-primary/80 text-sm mt-1">
                    Leave blank if this theme is not tied to a specific venue.
                    Elopement themes typically have no venue assigned.
                  </p>
                </FormField>
                <FormField label="Wedding Experience">
                  <div className="relative">
                    <select
                      value={form.experienceId}
                      onChange={(e) => set("experienceId", e.target.value)}
                      className="w-full px-3 py-2.5 pr-10 text-sm text-primary 
               bg-primary/3 border border-primary/20 
               focus:outline-none focus:border-primary/50 
               transition-colors appearance-none"
                    >
                      <option value="">— Select an experience —</option>
                      {weddingExperienceList.map((experience) => (
                        <option key={experience.id} value={experience.id}>
                          {experience.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-primary/50 
                          absolute right-3 top-1/2 
                          -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                  <p className="text-primary/80 text-sm mt-1">
                    Link this theme to a wedding experience package for a
                    complete package offering.
                  </p>
                </FormField>
              </div>
            </div>
          </Section>

          {/* Inclusions */}
          <Section
            title="Package Inclusions"
            subtitle="What is included in this wedding theme package"
          >
            <FormField label="Inclusions" required>
              <TagsInput
                values={form.inclusions}
                onChange={(v) => set("inclusions", v)}
                placeholder="e.g. Professional wedding celebrant"
                error={errors.inclusions}
              />
            </FormField>
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

          {/* Gallery */}
          <Section
            title="Gallery"
            subtitle={`${form.gallery.length} image${form.gallery.length !== 1 ? "s" : ""}`}
          >
            <GalleryUpload
              values={form.gallery}
              onChange={(v) => set("gallery", v)}
            />
          </Section>

          {/* Quick Summary */}
          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Summary
            </p>
            <div className="space-y-3">
              {[
                { label: "Type", value: form.type || "—" },
                { label: "Theme Key", value: form.themeName || "—" },
                {
                  label: "Inclusions",
                  value: `${form.inclusions.length} items`,
                },
                { label: "Gallery", value: `${form.gallery.length} photos` },
                {
                  label: "Venue",
                  value: form.venueId ? `${form.venueId}` : "None",
                },
                {
                  label: "Experience",
                  value: form.experienceId ? `${form.experienceId}` : "None",
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
              {isNew ? "Create Theme" : "Save Changes"}
            </button>

            {!isNew && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Theme
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
