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
  Sparkles,
  ChevronDown,
  ImageIcon,
} from "lucide-react";
import { weddingExperienceList } from "@/lib/data/new-data/wedding-experience-data";
import FormField from "@/components/shared/from-field";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import ImageUpload from "@/components/shared/image-upload";
import SaveModal from "@/components/shared/save-modal";
import TagsInput from "@/components/shared/tags-input";
import { WeddingExperience } from "@/lib/types/new-strucutre";

// ─── Types ────────────────────────────────────────────────────────────────────

type FAQ = { q: string; a: string };

type FormData = {
  // identity
  category: string;
  name: string;
  // hero
  heroStyle: string;
  heroImage: string;
  heroDesc: string;
  // intro
  introLabel: string;
  introHeading: [string, string];
  introBody: string;
  introListLabel: string;
  introList: string[];
  introFootnote: string;
  // approach
  approachLabel: string;
  approachHeading: [string, string];
  approachBody: string;
  approachListLabel: string;
  approachList: string[];
  approachImage: string;
  // services
  servicesLabel: string;
  servicesHeading: [string, string];
  servicesList: string[];
  servicesFootnote: string;
  darkPanelLabel: string;
  darkPanelHeading: [string, string];
  darkPanelBody: string;
  darkPanelList: string[];
  darkPanelCta: string;
  // closing
  closingLabel: string;
  closingHeading: [string, string];
  closingBody: string;
  closingImage: string;
  closingCoupleLabel: string;
  closingCoupleValues: string[];
  // faqs
  faqs: FAQ[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function expToForm(e: WeddingExperience): FormData {
  return {
    category: e.category,
    name: e.name,
    heroStyle: e.hero.style,
    heroImage: e.hero.image,
    heroDesc: e.hero.desc,
    introLabel: e.intro.label,
    introHeading: e.intro.heading,
    introBody: e.intro.body,
    introListLabel: e.intro.listLabel ?? "",
    introList: [...e.intro.list],
    introFootnote: e.intro.footnote ?? "",
    approachLabel: e.approach.label,
    approachHeading: e.approach.heading,
    approachBody: e.approach.body,
    approachListLabel: e.approach.listLabel ?? "",
    approachList: [...e.approach.list],
    approachImage: e.approach.image,
    servicesLabel: e.services.label,
    servicesHeading: e.services.heading,
    servicesList: [...e.services.list],
    servicesFootnote: e.services.footnote,
    darkPanelLabel: e.services.darkPanel.label,
    darkPanelHeading: e.services.darkPanel.heading,
    darkPanelBody: e.services.darkPanel.body,
    darkPanelList: [...e.services.darkPanel.list],
    darkPanelCta: e.services.darkPanel.cta,
    closingLabel: e.closing.label,
    closingHeading: e.closing.heading,
    closingBody: e.closing.body,
    closingImage: e.closing.image,
    closingCoupleLabel: e.closing.coupleLabel ?? "",
    closingCoupleValues: [...(e.closing.coupleValues ?? [])],
    faqs: e.faqs.map((f) => ({ q: f.q, a: f.a })),
  };
}

const defaultForm: FormData = {
  category: "luxury-weddings",
  name: "",
  heroStyle: "split",
  heroImage: "",
  heroDesc: "",
  introLabel: "",
  introHeading: ["", ""],
  introBody: "",
  introListLabel: "",
  introList: [""],
  introFootnote: "",
  approachLabel: "",
  approachHeading: ["", ""],
  approachBody: "",
  approachListLabel: "",
  approachList: [""],
  approachImage: "",
  servicesLabel: "What We Offer",
  servicesHeading: ["", ""],
  servicesList: [""],
  servicesFootnote: "",
  darkPanelLabel: "",
  darkPanelHeading: ["", ""],
  darkPanelBody: "",
  darkPanelList: [""],
  darkPanelCta: "",
  closingLabel: "",
  closingHeading: ["", ""],
  closingBody: "",
  closingImage: "",
  closingCoupleLabel: "",
  closingCoupleValues: [],
  faqs: [{ q: "", a: "" }],
};

// ─── Small shared components ──────────────────────────────────────────────────

function HeadingEditor({
  value,
  onChange,
}: {
  value: [string, string];
  onChange: (v: [string, string]) => void;
}) {
  return (
    <div className="space-y-2">
      <input
        value={value[0]}
        onChange={(e) => onChange([e.target.value, value[1]])}
        placeholder="Line 1"
        className="w-full px-4 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors"
      />
      <input
        value={value[1]}
        onChange={(e) => onChange([value[0], e.target.value])}
        placeholder="Line 2"
        className="w-full px-4 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors"
      />
    </div>
  );
}

function FAQEditor({
  faqs,
  onChange,
}: {
  faqs: FAQ[];
  onChange: (v: FAQ[]) => void;
}) {
  const update = (i: number, field: keyof FAQ, val: string) => {
    const next = [...faqs];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  };
  const remove = (i: number) => onChange(faqs.filter((_, idx) => idx !== i));
  const add = () => onChange([...faqs, { q: "", a: "" }]);

  return (
    <div className="space-y-5">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-primary/20 p-4 space-y-3 relative"
        >
          <span className="absolute top-3 left-3 text-[10px] text-primary/30 tracking-widest uppercase">
            #{i + 1}
          </span>
          <button
            onClick={() => remove(i)}
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-primary/30 hover:text-red-400 hover:bg-red-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="pt-4">
            <label className="text-[10px] tracking-widest uppercase text-primary/50 mb-1 block">
              Question
            </label>
            <input
              value={faq.q}
              onChange={(e) => update(i, "q", e.target.value)}
              placeholder="e.g. What is included in..."
              className="w-full px-4 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-widest uppercase text-primary/50 mb-1 block">
              Answer
            </label>
            <textarea
              value={faq.a}
              onChange={(e) => update(i, "a", e.target.value)}
              placeholder="Answer..."
              rows={3}
              className="w-full px-4 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-primary/50 hover:text-primary transition-colors hover:cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        Add FAQ
      </button>
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
        <p className="text-primary/80 tracking-[0.2em] uppercase text-[10px] mb-2">
          Confirm Delete
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          Delete Experience
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{name}&rdquo;
          </span>
          ? This action cannot be undone.
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

export default function ExperienceDetailPage() {
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
      const existing = weddingExperienceList.find((e) => e.id === rawId);
      if (existing) {
        setForm(expToForm(existing));
      } else {
        toast.error("Experience not found");
        router.push("/dashboard/experiences");
      }
    }
    setIsLoaded(true);
  }, [rawId, isNew, router]);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<string, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.heroDesc.trim()) e.heroDesc = "Hero description is required";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      toast.error("Please fix the errors before saving");
      return false;
    }
    return true;
  };

  const confirmSave = () => {
    setShowSaveModal(false);
    toast.success(isNew ? "Experience created!" : "Experience updated!");
    router.push("/dashboard/experiences");
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    toast.success("Experience deleted");
    router.push("/dashboard/experiences");
  };

  if (!isLoaded) return null;

  const categoryOptions = [
    { id: "luxury-weddings", label: "Luxury Weddings" },
    { id: "private-villa-weddings", label: "Private Villa Weddings" },
    { id: "intimate-weddings", label: "Intimate Weddings" },
    { id: "elopement-weddings", label: "Elopement Weddings" },
  ];

  const heroStyleOptions = ["split", "bottom", "centered", "editorial"];

  const summaryItems = [
    { label: "Category", value: form.category || "—" },
    { label: "Hero Style", value: form.heroStyle || "—" },
    { label: "Intro Items", value: `${form.introList.filter(Boolean).length}` },
    { label: "Services", value: `${form.servicesList.filter(Boolean).length}` },
    { label: "FAQs", value: `${form.faqs.filter((f) => f.q).length}` },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link
            href="/dashboard/experiences"
            className="inline-flex items-center gap-1.5 text-primary/50 hover:text-primary transition-colors text-xs tracking-widest uppercase mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Experiences
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-primary/80 tracking-[0.25em] uppercase text-xs">
                {isNew ? "New Experience" : "Edit Experience"}
              </p>
              <h1 className="text-primary text-xl font-semibold tracking-wide">
                {isNew ? "Create Experience" : form.name || "Untitled"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left Column ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* ── Identity ── */}
          <Section
            title="Identity"
            subtitle="Core identifiers for this experience"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Display Name" required>
                  <TextInput
                    value={form.name}
                    onChange={(v) => set("name", v)}
                    placeholder="e.g. Luxury Weddings"
                    error={errors.name}
                  />
                </FormField>
                <FormField label="Category">
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) => set("category", e.target.value)}
                      className="w-full px-4 py-2.5 pr-10 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                    >
                      {categoryOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-primary/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </FormField>
              </div>
              {/* Auto-derived meta preview */}
              <div className="bg-primary/5 border border-primary/20 p-4 space-y-2.5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary/40 font-semibold mb-3">
                  Auto-generated Meta
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-20 shrink-0">Breadcrumb</span>
                  <span className="text-sm text-primary/70 flex-1 truncate">
                    {form.name || <span className="text-primary/30 italic">Waiting for Display Name...</span>}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-20 shrink-0">Eyebrow</span>
                  <span className="text-sm text-primary/70 flex-1 truncate">
                    {form.name
                      ? `${form.name} Wedding Planner in Bali`
                      : <span className="text-primary/30 italic">Waiting for Display Name...</span>}
                  </span>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Hero ── */}
          <Section
            title="Hero Section"
            subtitle="The first thing visitors see"
          >
            <div className="space-y-5">
              <FormField label="Hero Style">
                <div className="relative">
                  <select
                    value={form.heroStyle}
                    onChange={(e) => set("heroStyle", e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    {heroStyleOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-primary/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </FormField>
              <FormField label="Hero Image">
                <div className="space-y-3">
                  <div className="relative aspect-[16/7] bg-primary/5 border border-primary/20 overflow-hidden">
                    {form.heroImage ? (
                      <Image
                        src={form.heroImage}
                        alt="Hero preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <ImageIcon className="w-7 h-7 text-primary/20" />
                        <p className="text-primary/30 text-xs tracking-wider">No image set</p>
                      </div>
                    )}
                  </div>
                  <ImageUpload
                    value={form.heroImage}
                    onChange={(v) => set("heroImage", v)}
                    inputId="hero-image-upload"
                  />
                </div>
              </FormField>
              {/* Auto-derived hero text */}
              <div className="bg-primary/5 border border-primary/20 p-4 space-y-2.5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary/40 font-semibold mb-3">
                  Auto-generated Hero Text
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-16 shrink-0">Title</span>
                  <span className="text-sm text-primary/70 flex-1 truncate">
                    {form.name || <span className="text-primary/30 italic">Waiting for Display Name...</span>}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-16 shrink-0">Subtitle</span>
                  <span className="text-sm text-primary/70">Weddings in Bali</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-16 shrink-0">CTA</span>
                  <span className="text-sm text-primary/70">INQUIRE NOW</span>
                </div>
              </div>
              <FormField label="Description" required>
                <TextareaInput
                  value={form.heroDesc}
                  onChange={(v) => set("heroDesc", v)}
                  placeholder="The headline description shown in the hero..."
                  rows={3}
                  error={errors.heroDesc}
                />
              </FormField>
            </div>
          </Section>

          {/* ── Intro ── */}
          <Section
            title="Intro Section"
            subtitle="Why choose this experience"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Section Label">
                  <TextInput
                    value={form.introLabel}
                    onChange={(v) => set("introLabel", v)}
                    placeholder="e.g. Why Villa"
                  />
                </FormField>
                <FormField label="List Label (optional)">
                  <TextInput
                    value={form.introListLabel}
                    onChange={(v) => set("introListLabel", v)}
                    placeholder="e.g. Private villas provide:"
                  />
                </FormField>
              </div>
              <FormField label="Heading (2 lines)">
                <HeadingEditor
                  value={form.introHeading}
                  onChange={(v) => set("introHeading", v)}
                />
              </FormField>
              <FormField label="Body Text">
                <TextareaInput
                  value={form.introBody}
                  onChange={(v) => set("introBody", v)}
                  rows={4}
                  placeholder="Introductory paragraph..."
                />
              </FormField>
              <FormField label="List Items">
                <TagsInput
                  values={form.introList}
                  onChange={(v) => set("introList", v)}
                  placeholder="e.g. Full creative freedom"
                />
              </FormField>
              <FormField label="Footnote (optional)">
                <TextInput
                  value={form.introFootnote}
                  onChange={(v) => set("introFootnote", v)}
                  placeholder="e.g. Ideal for couples who..."
                />
              </FormField>
            </div>
          </Section>

          {/* ── Approach ── */}
          <Section
            title="Approach Section"
            subtitle="How you design or work"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Section Label">
                  <TextInput
                    value={form.approachLabel}
                    onChange={(v) => set("approachLabel", v)}
                    placeholder="e.g. Our Approach"
                  />
                </FormField>
                <FormField label="List Label (optional)">
                  <TextInput
                    value={form.approachListLabel}
                    onChange={(v) => set("approachListLabel", v)}
                    placeholder="e.g. It requires understanding:"
                  />
                </FormField>
              </div>
              <FormField label="Heading (2 lines)">
                <HeadingEditor
                  value={form.approachHeading}
                  onChange={(v) => set("approachHeading", v)}
                />
              </FormField>
              <FormField label="Body Text">
                <TextareaInput
                  value={form.approachBody}
                  onChange={(v) => set("approachBody", v)}
                  rows={4}
                  placeholder="Approach description..."
                />
              </FormField>
              <FormField label="List Items">
                <TagsInput
                  values={form.approachList}
                  onChange={(v) => set("approachList", v)}
                />
              </FormField>
              <FormField label="Section Image">
                <div className="space-y-3">
                  <div className="relative aspect-[16/7] bg-primary/5 border border-primary/20 overflow-hidden">
                    {form.approachImage ? (
                      <Image
                        src={form.approachImage}
                        alt="Approach preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <ImageIcon className="w-7 h-7 text-primary/20" />
                        <p className="text-primary/30 text-xs tracking-wider">No image set</p>
                      </div>
                    )}
                  </div>
                  <ImageUpload
                    value={form.approachImage}
                    onChange={(v) => set("approachImage", v)}
                    inputId="approach-image-upload"
                  />
                </div>
              </FormField>
            </div>
          </Section>

          {/* ── Services ── */}
          <Section
            title="Services Section"
            subtitle="What you offer"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Section Label">
                  <TextInput
                    value={form.servicesLabel}
                    onChange={(v) => set("servicesLabel", v)}
                    placeholder="e.g. What We Offer"
                  />
                </FormField>
              </div>
              <FormField label="Heading (2 lines)">
                <HeadingEditor
                  value={form.servicesHeading}
                  onChange={(v) => set("servicesHeading", v)}
                />
              </FormField>
              <FormField label="Services List">
                <TagsInput
                  values={form.servicesList}
                  onChange={(v) => set("servicesList", v)}
                  placeholder="e.g. Venue sourcing and design"
                />
              </FormField>
              <FormField label="Footnote">
                <TextInput
                  value={form.servicesFootnote}
                  onChange={(v) => set("servicesFootnote", v)}
                  placeholder="e.g. Every element is designed to feel cohesive."
                />
              </FormField>

              {/* Dark panel */}
              <div className="border border-primary/20 bg-primary/5 p-4 space-y-5 mt-2">
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary/60 font-semibold">
                  Dark Panel
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Panel Label">
                    <TextInput
                      value={form.darkPanelLabel}
                      onChange={(v) => set("darkPanelLabel", v)}
                      placeholder="e.g. The Day Unfolds"
                    />
                  </FormField>
                  <FormField label="CTA Text">
                    <TextInput
                      value={form.darkPanelCta}
                      onChange={(v) => set("darkPanelCta", v)}
                      placeholder="e.g. PLAN YOUR WEDDING"
                    />
                  </FormField>
                </div>
                <FormField label="Heading (2 lines)">
                  <HeadingEditor
                    value={form.darkPanelHeading}
                    onChange={(v) => set("darkPanelHeading", v)}
                  />
                </FormField>
                <FormField label="Body Text">
                  <TextareaInput
                    value={form.darkPanelBody}
                    onChange={(v) => set("darkPanelBody", v)}
                    rows={3}
                    placeholder="Dark panel body..."
                  />
                </FormField>
                <FormField label="List Items">
                  <TagsInput
                    values={form.darkPanelList}
                    onChange={(v) => set("darkPanelList", v)}
                  />
                </FormField>
              </div>
            </div>
          </Section>

          {/* ── Closing ── */}
          <Section
            title="Closing Section"
            subtitle="Final call-to-action area"
          >
            <div className="space-y-5">
              <FormField label="Section Label">
                <TextInput
                  value={form.closingLabel}
                  onChange={(v) => set("closingLabel", v)}
                  placeholder="e.g. A Luxury Wedding That Feels Timeless"
                />
              </FormField>
              <FormField label="Heading (2 lines)">
                <HeadingEditor
                  value={form.closingHeading}
                  onChange={(v) => set("closingHeading", v)}
                />
              </FormField>
              <FormField label="Body Text">
                <TextareaInput
                  value={form.closingBody}
                  onChange={(v) => set("closingBody", v)}
                  rows={3}
                  placeholder="Closing paragraph..."
                />
              </FormField>
              <FormField label="Section Image">
                <div className="space-y-3">
                  <div className="relative aspect-[16/7] bg-primary/5 border border-primary/20 overflow-hidden">
                    {form.closingImage ? (
                      <Image
                        src={form.closingImage}
                        alt="Closing preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <ImageIcon className="w-7 h-7 text-primary/20" />
                        <p className="text-primary/30 text-xs tracking-wider">No image set</p>
                      </div>
                    )}
                  </div>
                  <ImageUpload
                    value={form.closingImage}
                    onChange={(v) => set("closingImage", v)}
                    inputId="closing-image-upload"
                  />
                </div>
              </FormField>
              <FormField label="Couple Label (optional)">
                <TextInput
                  value={form.closingCoupleLabel}
                  onChange={(v) => set("closingCoupleLabel", v)}
                  placeholder="e.g. Created for couples who seek:"
                />
              </FormField>
              {form.closingCoupleLabel && (
                <FormField label="Couple Values">
                  <TagsInput
                    values={form.closingCoupleValues}
                    onChange={(v) => set("closingCoupleValues", v)}
                    placeholder="e.g. Seclusion and intimacy"
                  />
                </FormField>
              )}
            </div>
          </Section>

          {/* ── FAQs ── */}
          <Section
            title="FAQs"
            subtitle={`${form.faqs.filter((f) => f.q).length} questions`}
          >
            <FAQEditor faqs={form.faqs} onChange={(v) => set("faqs", v)} />
          </Section>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Summary
            </p>
            <div className="space-y-3">
              {summaryItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-primary/80 font-semibold text-xs">
                    {item.label}
                  </span>
                  <span className="text-xs font-medium bg-primary text-white px-2 py-0.5 font-mono">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sections checklist */}
          <div className="bg-white border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Sections
            </p>
            <div className="space-y-2">
              {[
                { label: "Hero", filled: !!form.heroDesc && !!form.heroImage },
                {
                  label: "Intro",
                  filled: !!form.introBody && form.introList.some(Boolean),
                },
                { label: "Approach", filled: !!form.approachBody },
                { label: "Services", filled: form.servicesList.some(Boolean) },
                { label: "Dark Panel", filled: !!form.darkPanelBody },
                { label: "Closing", filled: !!form.closingBody },
                { label: "FAQs", filled: form.faqs.some((f) => f.q) },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-xs text-primary/70">{s.label}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${s.filled ? "bg-green-400" : "bg-primary/20"}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-6 lg:static space-y-2">
            <button
              onClick={() => {
                if (validate()) setShowSaveModal(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/90 transition-colors shadow-lg lg:shadow-none"
            >
              <Save className="w-4 h-4" />
              {isNew ? "Create Experience" : "Save Changes"}
            </button>
            {!isNew && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Experience
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