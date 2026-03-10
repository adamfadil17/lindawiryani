"use client";

import React, { useState, useEffect } from "react";
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
  Plus,
  GripVertical,
  ChevronDown,
} from "lucide-react";
import { portfolioItems } from "@/lib/data/new-data/portfolio-data";
import { destinationList } from "@/lib/data/new-data/destination-data";
import { venueList } from "@/lib/data/new-data/venue-data";
import { weddingExperienceList } from "@/lib/data/new-data/wedding-experience-data";
import FormField from "@/components/shared/from-field";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import ImageUpload from "@/components/shared/image-upload";
import SaveModal from "@/components/shared/save-modal";
import TagsInput from "@/components/shared/tags-input";
import { Portfolio, PortfolioStory } from "@/lib/types/new-strucutre";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = Omit<Portfolio, "id" | "destination" | "venue" | "experiences">;

const defaultForm: FormData = {
  slug: "",
  couple: "",
  subtitle: "",
  destinationId: "",
  venueId: "",
  experienceId: "",
  heroImage: "",
  galleryImages: [],
  tags: [],
  excerpt: "",
  origin: "",
  review: "",
  content: "",
  storySections: [],
  credit: {
    role: "",
    planner: "",
    locationDetail: "",
    coupleOrigin: "",
  },
};

// ─── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteModal({
  couple,
  onConfirm,
  onCancel,
}: {
  couple: string;
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
          Delete Portfolio
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{couple}&rdquo;
          </span>
          ? This action cannot be undone and will permanently remove this
          portfolio from the collection.
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

// ─── Gallery Upload ───────────────────────────────────────────────────────────

function GalleryUpload({
  value,
  onChange,
}: {
  value: string[];
  onChange: (images: string[]) => void;
}) {
  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const invalid = files.find(
      (f) => !["image/png", "image/jpeg"].includes(f.type)
    );
    if (invalid) {
      toast.error("PNG or JPG only");
      return;
    }
    const oversized = files.find((f) => f.size > 5 * 1024 * 1024);
    if (oversized) {
      toast.error("Max 5 MB per image");
      return;
    }

    let loaded = 0;
    const results: string[] = [];

    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        results[i] = ev.target?.result as string;
        loaded++;
        if (loaded === files.length) {
          onChange([...value, ...results]);
          toast.success(
            files.length === 1
              ? "Gallery image added"
              : `${files.length} images added`
          );
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const remove = (idx: number) =>
    onChange(value.filter((_, i) => i !== idx));

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((url, idx) => (
            <div key={idx} className="relative aspect-square group">
              <Image
                src={url}
                alt={`Gallery ${idx + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <div className="border border-dashed border-primary/20 py-8 flex flex-col items-center justify-center gap-2">
          <ImageIcon className="w-6 h-6 text-primary/20" />
          <p className="text-primary/30 text-xs tracking-wider">
            No gallery images added
          </p>
        </div>
      )}

      <div className="border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          multiple
          onChange={handleAdd}
          className="hidden"
          id="gallery-upload"
        />
        <label
          htmlFor="gallery-upload"
          className="cursor-pointer flex items-center justify-center gap-2 py-3 text-sm text-primary/60 hover:text-primary transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Gallery Images
        </label>
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
  const addSection = () =>
    onChange([...value, { heading: "", body: [""] }]);

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

  const [form, setForm] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isNew) {
      const existing = portfolioItems.find((p) => p.id === id);
      if (existing) {
        const {
          id: _id,
          destination: _dest,
          venue: _venue,
          experience: _exp,
          ...rest
        } = existing;
        setForm(rest);
      } else {
        toast.error("Portfolio not found");
        router.push("/dashboard/portfolio");
      }
    }
    setIsLoaded(true);
  }, [id, isNew, router]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setCredit = (key: keyof FormData["credit"], value: string) => {
    setForm((prev) => ({
      ...prev,
      credit: { ...prev.credit, [key]: value },
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};
    if (!form.couple.trim()) newErrors.couple = "Couple names are required";
    if (!form.slug.trim()) newErrors.slug = "Slug is required";
    if (!form.heroImage) newErrors.heroImage = "Hero image is required";
    if (!form.destinationId) newErrors.destinationId = "Destination is required";
    if (!form.venueId) newErrors.venueId = "Venue is required";
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
    console.log("Saving portfolio:", form);
    setShowSaveModal(false);
    toast.success(isNew ? "Portfolio created!" : "Portfolio updated!");
    if (isNew) router.push("/dashboard/portfolio");
  };

  const confirmDelete = () => {
    console.log("Deleting portfolio id:", id);
    setShowDeleteModal(false);
    toast.success("Portfolio deleted");
    router.push("/dashboard/portfolio");
  };

  const handleCoupleChange = (v: string) => {
    set("couple", v);
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

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <Link
            href="/dashboard/portfolio"
            className="inline-flex items-center gap-2 text-primary/50 hover:text-primary text-xs tracking-widest uppercase mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Portfolio
          </Link>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
            {isNew ? "Create Portfolio" : "Edit Portfolio"}
          </p>
          <h1 className="text-primary text-2xl md:text-3xl font-semibold tracking-wide">
            {isNew ? "New Portfolio" : form.couple || "Untitled"}
          </h1>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {!isNew && (
            <Link
              href={`/portfolio/${form.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 border border-primary/30 text-primary text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-primary/10 transition-colors"
            >
              View Live
            </Link>
          )}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2.5 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-primary/90 transition-colors hover:cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {isNew ? "Publish Portfolio" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ── Two Column Layout ── */}
      <div className="grid xl:grid-cols-[1fr_340px] gap-6">
        {/* ── Left Column ── */}
        <div className="space-y-6">

          {/* ── Basic Info ── */}
          <Section title="Basic Information" subtitle="Core couple and page details">
            <div className="space-y-4">

              {/* Couple Names */}
              <FormField label="Couple Names" required>
                <TextInput
                  value={form.couple}
                  onChange={handleCoupleChange}
                  placeholder="e.g. Sarah & James"
                  error={errors.couple}
                />
              </FormField>

              {/* Subtitle */}
              <FormField label="Subtitle">
                <TextInput
                  value={form.subtitle ?? ""}
                  onChange={(v) => set("subtitle", v)}
                  placeholder="e.g. A Clifftop Ceremony at Uluwatu"
                />
              </FormField>

              {/* Slug */}
              <FormField label="Slug" required>
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
                  placeholder="portfolio-url-slug"
                  className={`w-full px-3 py-2.5 text-sm text-primary placeholder:text-primary/40 bg-primary/3 border focus:outline-none focus:border-primary/50 transition-colors ${
                    errors.slug ? "border-red-400" : "border-primary/20"
                  }`}
                />
                {errors.slug && (
                  <p className="text-red-500 text-xs mt-1">{errors.slug}</p>
                )}
              </FormField>

              {/* Excerpt */}
              <FormField label="Excerpt">
                <TextareaInput
                  value={form.excerpt ?? ""}
                  onChange={(v) => set("excerpt", v)}
                  placeholder="A short description shown in portfolio cards and SEO…"
                  rows={3}
                />
                <p className="text-primary/40 text-xs mt-1.5">
                  {(form.excerpt ?? "").length} / 200 characters recommended
                </p>
              </FormField>

              {/* Origin */}
              <FormField label="Couple Origin">
                <TextInput
                  value={form.origin ?? ""}
                  onChange={(v) => set("origin", v)}
                  placeholder="e.g. Sydney, Australia"
                />
              </FormField>
            </div>
          </Section>

          {/* ── Venue & Location ── */}
          <Section title="Venue & Location" subtitle="Where the wedding took place">
            <div className="space-y-4">

              {/* Destination */}
              <FormField label="Destination" required>
                <div className="relative">
                  <select
                    value={form.destinationId}
                    onChange={(e) => set("destinationId", e.target.value)}
                    className={`w-full appearance-none px-3 py-2.5 pr-9 text-sm text-primary bg-primary/3 border focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer ${
                      errors.destinationId ? "border-red-400" : "border-primary/20"
                    }`}
                  >
                    <option value="">Select a destination…</option>
                    {destinationList.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                </div>
                {errors.destinationId && (
                  <p className="text-red-500 text-xs mt-1">{errors.destinationId}</p>
                )}
              </FormField>

              {/* Venue */}
              <FormField label="Venue" required>
                <div className="relative">
                  <select
                    value={form.venueId}
                    onChange={(e) => set("venueId", e.target.value)}
                    className={`w-full appearance-none px-3 py-2.5 pr-9 text-sm text-primary bg-primary/3 border focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer ${
                      errors.venueId ? "border-red-400" : "border-primary/20"
                    }`}
                  >
                    <option value="">Select a venue…</option>
                    {venueList.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                </div>
                {errors.venueId && (
                  <p className="text-red-500 text-xs mt-1">{errors.venueId}</p>
                )}
              </FormField>

              {/* Experience */}
              <FormField label="Experience">
                <div className="relative">
                  <select
                    value={form.experienceId ?? ""}
                    onChange={(e) => set("experienceId", e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 pr-9 text-sm text-primary bg-primary/3 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer"
                  >
                    <option value="">Select an experience...</option>
                    {weddingExperienceList.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                </div>
              </FormField>
            </div>
          </Section>

          {/* ── Story Sections ── */}
          <Section
            title="Story Sections"
            subtitle="Narrative paragraphs displayed on the portfolio page"
          >
            <StorySectionsEditor
              value={form.storySections}
              onChange={(v) => set("storySections", v)}
            />
          </Section>

          {/* ── Review ── */}
          <Section title="Couple Review" subtitle="Quote or testimonial from the couple">
            <TextareaInput
              value={form.review ?? ""}
              onChange={(v) => set("review", v)}
              placeholder="&ldquo;Working with the team was an absolute dream…&rdquo;"
              rows={4}
            />
          </Section>

          {/* ── Credits ── */}
          <Section title="Credits" subtitle="Team and attribution details">
            <div className="space-y-4">
              {(
                [
                  { key: "role", label: "Role / Service Type", placeholder: "e.g. Full Wedding Planning & Design" },
                  { key: "planner", label: "Planner / Coordinator", placeholder: "e.g. Raisa Dewi" },
                  { key: "locationDetail", label: "Location Detail", placeholder: "e.g. Uluwatu Cliff, Bali" },
                  { key: "coupleOrigin", label: "Couple Origin", placeholder: "e.g. Sydney, Australia" },
                ] as const
              ).map(({ key, label, placeholder }) => (
                <FormField key={key} label={label}>
                  <TextInput
                    value={form.credit[key]}
                    onChange={(v) => setCredit(key, v)}
                    placeholder={placeholder}
                  />
                </FormField>
              ))}
            </div>
          </Section>

          {/* ── Tags ── */}
          <Section title="Tags" subtitle="Keywords for filtering and discovery">
            {/* Uses shared TagsInput component from @/components/shared/tags-input */}
            <TagsInput
              values={form.tags ?? []}
              onChange={(v) => set("tags", v)}
              placeholder="Type a tag and press Enter…"
            />
          </Section>

        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">

          {/* Hero Image */}
          <Section title="Hero Image">
            <div className="space-y-4">
              <div className="relative aspect-[3/2] bg-primary/5 border border-primary/20 overflow-hidden">
                {form.heroImage ? (
                  <Image
                    src={form.heroImage}
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
                  value={form.heroImage}
                  onChange={(v) => set("heroImage", v)}
                  error={errors.heroImage}
                  inputId="hero-upload"
                />
              </FormField>
            </div>
          </Section>

          {/* Gallery Images */}
          <Section
            title="Gallery Images"
            subtitle={`${form.galleryImages?.length ?? 0} images added`}
          >
            <GalleryUpload
              value={form.galleryImages ?? []}
              onChange={(v) => set("galleryImages", v)}
            />
          </Section>

          {/* Quick Summary */}
          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Summary
            </p>
            <div className="space-y-3">
              {[
                { label: "Couple", value: form.couple || "—" },
                { label: "Slug", value: form.slug ? `/${form.slug}` : "—" },
                { label: "Gallery", value: `${form.galleryImages?.length ?? 0} images` },
                { label: "Tags", value: form.tags?.length ? `${form.tags.length} tags` : "—" },
                { label: "Story", value: form.storySections?.length ? `${form.storySections.length} sections` : "—" },
                { label: "Review", value: form.review ? "Added" : "—" },
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
              {isNew ? "Publish Portfolio" : "Save Changes"}
            </button>

            {!isNew && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Portfolio
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
          couple={form.couple}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}