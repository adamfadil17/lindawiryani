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
  ChevronDown,
  ImageIcon,
  Loader2,
  AlertCircle,
  CheckCircle2,
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
import { WeddingExperience, ExperienceFaq } from "@/types";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import {
  weddingExperienceFormSchema,
  WeddingExperienceFormData,
} from "@/utils/form-validators";
import { toSlug } from "@/utils";

type FAQ = ExperienceFaq;
type ExperienceFormData = WeddingExperienceFormData;

function expToForm(e: WeddingExperience): ExperienceFormData {
  return {
    slug: e.slug,
    category: e.category,
    name: e.name,
    hero_style: e.hero_style,
    hero_image: e.hero_image,
    hero_desc: e.hero_desc,
    intro_label: e.intro_label,
    intro_heading: e.intro_heading,
    intro_body: e.intro_body,
    intro_list_label: e.intro_list_label ?? "",
    intro_list: [...e.intro_list],
    intro_footnote: e.intro_footnote ?? "",
    intro_images: [...e.intro_images],
    approach_label: e.approach_label,
    approach_heading: e.approach_heading,
    approach_body: e.approach_body,
    approach_list_label: e.approach_list_label ?? "",
    approach_list: [...e.approach_list],
    approach_image: e.approach_image,
    services_label: e.services_label,
    services_heading: e.services_heading,
    services_list: [...e.services_list],
    services_footnote: e.services_footnote,
    services_dark_label: e.services_dark_label,
    services_dark_heading: e.services_dark_heading,
    services_dark_body: e.services_dark_body,
    services_dark_list: [...e.services_dark_list],
    closing_label: e.closing_label,
    closing_heading: e.closing_heading,
    closing_body: e.closing_body,
    closing_image: e.closing_image,
    closing_couple_label: e.closing_couple_label ?? "",
    closing_couple_values: [...e.closing_couple_values],
  };
}

function formToDto(form: ExperienceFormData) {
  return {
    slug: form.slug,
    category: form.category,
    name: form.name,
    hero_style: form.hero_style,
    hero_image: form.hero_image,
    hero_desc: form.hero_desc,
    intro_label: form.intro_label,
    intro_heading: form.intro_heading,
    intro_body: form.intro_body,
    intro_list_label: form.intro_list_label || null,
    intro_list: form.intro_list.filter(Boolean),
    intro_footnote: form.intro_footnote || null,
    intro_images: form.intro_images,
    approach_label: form.approach_label,
    approach_heading: form.approach_heading,
    approach_body: form.approach_body,
    approach_list_label: form.approach_list_label || null,
    approach_list: form.approach_list.filter(Boolean),
    approach_image: form.approach_image,
    services_label: form.services_label,
    services_heading: form.services_heading,
    services_list: form.services_list.filter(Boolean),
    services_footnote: form.services_footnote,
    services_dark_label: form.services_dark_label,
    services_dark_heading: form.services_dark_heading,
    services_dark_body: form.services_dark_body,
    services_dark_list: form.services_dark_list.filter(Boolean),
    closing_label: form.closing_label,
    closing_heading: form.closing_heading,
    closing_body: form.closing_body,
    closing_image: form.closing_image,
    closing_couple_label: form.closing_couple_label || null,
    closing_couple_values: form.closing_couple_values,
  };
}

function HeadingEditor({
  value,
  onChange,
  error,
}: {
  value: [string, string];
  onChange: (v: [string, string]) => void;
  error?: string;
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
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function FAQEditor({
  experienceId,
  faqs,
  onFaqsChange,
}: {
  experienceId: string;
  faqs: FAQ[];
  onFaqsChange: (faqs: FAQ[]) => void;
}) {
  const [savingIdx, setSavingIdx] = useState<number | null>(null);
  const [deletingIdx, setDeletingIdx] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<{ question: string; answer: string }[]>(
    [],
  );

  const baseUrl = `/api/wedding-experiences/${experienceId}/faqs`;

  const updateFaq = (
    idx: number,
    field: "question" | "answer",
    val: string,
  ) => {
    onFaqsChange(faqs.map((f, i) => (i === idx ? { ...f, [field]: val } : f)));
  };

  const saveFaqUpdate = async (idx: number) => {
    const faq = faqs[idx];
    if (!faq.question.trim()) return;
    setSavingIdx(idx);
    try {
      await axios.patch(
        `${baseUrl}/${faq.id}`,
        { question: faq.question, answer: faq.answer },
        { headers: getAuthHeaders(true) },
      );
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to save FAQ";
      toast.error(errorMsg);
    } finally {
      setSavingIdx(null);
    }
  };

  const deleteFaqById = async (idx: number) => {
    const faq = faqs[idx];
    setDeletingIdx(idx);
    try {
      await axios.delete(`${baseUrl}/${faq.id}`, { headers: getAuthHeaders() });
      onFaqsChange(faqs.filter((_, i) => i !== idx));
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to delete FAQ";
      toast.error(errorMsg);
    } finally {
      setDeletingIdx(null);
    }
  };

  const addDraft = () => setDrafts((d) => [...d, { question: "", answer: "" }]);
  const updateDraft = (i: number, field: "question" | "answer", val: string) =>
    setDrafts((d) =>
      d.map((dr, idx) => (idx === i ? { ...dr, [field]: val } : dr)),
    );
  const removeDraft = (i: number) =>
    setDrafts((d) => d.filter((_, idx) => idx !== i));

  const createFaq = async (i: number) => {
    const draft = drafts[i];
    if (!draft.question.trim()) return;
    setSavingIdx(-(i + 1));
    try {
      const response = await axios.post(
        baseUrl,
        {
          question: draft.question,
          answer: draft.answer,
          sort_order: faqs.length + i,
        },
        { headers: getAuthHeaders(true) },
      );
      const data: FAQ = response.data.data ?? response.data;
      onFaqsChange([...faqs, data]);
      removeDraft(i);
      toast.success("FAQ added");
    } catch (err) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to add FAQ";
      toast.error(errorMsg);
    } finally {
      setSavingIdx(null);
    }
  };

  return (
    <div className="space-y-5">
      {faqs.map((faq, i) => (
        <div
          key={faq.id}
          className="border border-primary/20 p-4 space-y-3 relative"
        >
          <span className="absolute top-3 left-3 text-[10px] text-primary/30 tracking-widest uppercase">
            #{i + 1}
          </span>
          <button
            type="button"
            onClick={() => deleteFaqById(i)}
            disabled={deletingIdx === i}
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-primary/30 hover:text-red-400 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {deletingIdx === i ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <X className="w-3.5 h-3.5" />
            )}
          </button>
          <div className="pt-4">
            <label className="text-[10px] tracking-widest uppercase text-primary/50 mb-1 block">
              Question
            </label>
            <input
              value={faq.question}
              onChange={(e) => updateFaq(i, "question", e.target.value)}
              onBlur={() => saveFaqUpdate(i)}
              placeholder="e.g. What is included in..."
              className="w-full px-4 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-widest uppercase text-primary/50 mb-1 block">
              Answer
            </label>
            <textarea
              value={faq.answer}
              onChange={(e) => updateFaq(i, "answer", e.target.value)}
              onBlur={() => saveFaqUpdate(i)}
              placeholder="Answer..."
              rows={3}
              className="w-full px-4 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>
          {savingIdx === i && (
            <p className="text-[10px] text-primary/40 flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> Saving...
            </p>
          )}
        </div>
      ))}

      {drafts.map((draft, i) => (
        <div
          key={`draft-${i}`}
          className="border border-dashed border-primary/30 p-4 space-y-3 relative"
        >
          <span className="absolute top-3 left-3 text-[10px] text-primary/30 tracking-widest uppercase">
            #{faqs.length + i + 1} — unsaved
          </span>
          <button
            type="button"
            onClick={() => removeDraft(i)}
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-primary/30 hover:text-red-400 hover:bg-red-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="pt-4">
            <label className="text-[10px] tracking-widest uppercase text-primary/50 mb-1 block">
              Question
            </label>
            <input
              value={draft.question}
              onChange={(e) => updateDraft(i, "question", e.target.value)}
              placeholder="e.g. What is included in..."
              className="w-full px-4 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-widest uppercase text-primary/50 mb-1 block">
              Answer
            </label>
            <textarea
              value={draft.answer}
              onChange={(e) => updateDraft(i, "answer", e.target.value)}
              placeholder="Answer..."
              rows={3}
              className="w-full px-4 py-2.5 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>
          <button
            type="button"
            onClick={() => createFaq(i)}
            disabled={!draft.question.trim() || savingIdx === -(i + 1)}
            className="flex items-center gap-1.5 text-xs text-primary/60 border border-primary/20 px-3 py-1.5 hover:bg-primary/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {savingIdx === -(i + 1) ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Save className="w-3 h-3" />
            )}
            Save FAQ
          </button>
        </div>
      ))}

      {faqs.length === 0 && drafts.length === 0 && (
        <p className="text-xs text-primary/30 italic">
          No FAQs yet. Click &ldquo;Add FAQ&rdquo; to begin.
        </p>
      )}

      <button
        type="button"
        onClick={addDraft}
        className="flex items-center gap-1.5 text-xs text-primary/50 hover:text-primary transition-colors hover:cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        Add FAQ
      </button>
    </div>
  );
}

export default function ExperiencesDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors: formErrors, isDirty },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(weddingExperienceFormSchema),
    defaultValues: {
      slug: "",
      category: "luxury_weddings",
      name: "",
      hero_style: "split",
      hero_image: "",
      hero_desc: "",
      intro_label: "",
      intro_heading: ["", ""],
      intro_body: "",
      intro_list_label: "",
      intro_list: [],
      intro_footnote: "",
      intro_images: [],
      approach_label: "",
      approach_heading: ["", ""],
      approach_body: "",
      approach_list_label: "",
      approach_list: [],
      approach_image: "",
      services_label: "",
      services_heading: ["", ""],
      services_list: [],
      services_footnote: "",
      services_dark_label: "",
      services_dark_heading: ["", ""],
      services_dark_body: "",
      services_dark_list: [],
      closing_label: "",
      closing_heading: ["", ""],
      closing_body: "",
      closing_image: "",
      closing_couple_label: "",
      closing_couple_values: [],
    },
  });

  const setField = (key: keyof ExperienceFormData, value: unknown) =>
    setValue(key as any, value as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  const formData = watch();

  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const [isLoading, setIsLoading] = useState(!isNew);
  const [notFound, setNotFound] = useState(false);
  const [experienceId, setExperienceId] = useState<string | null>(
    isNew ? null : id,
  );

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
        formData.name ||
        formData.hero_desc ||
        formData.hero_image ||
        formData.intro_body ||
        formData.approach_body ||
        formData.closing_body ||
        formData.closing_image ||
        (formData.intro_list && formData.intro_list.some(Boolean)) ||
        (formData.services_list && formData.services_list.some(Boolean)),
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

  useEffect(() => {
    if (isNew) return;
    setIsLoading(true);
    const getExperienceById = async () => {
      try {
        const response = await axios.get(`/api/wedding-experiences/${id}`);
        const data: WeddingExperience = response.data.data ?? response.data;
        reset(expToForm(data));
        setFaqs(data.faqs ?? []);
        setExperienceId(data.id);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setNotFound(true);
        } else {
          const errorMsg =
            axios.isAxiosError(err) && err.response?.data?.message
              ? err.response.data.message
              : "Failed to load experience";
          toast.error(errorMsg, {
            description: err instanceof Error ? err.message : "Unknown error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    getExperienceById();
  }, [id, isNew, reset]);

  const onSubmitForm = async () => {
    setSaveStatus("confirm");
  };

  const onSubmitError = async () => {
    await trigger();
  };

  const confirmSave = async () => {
    setSaveStatus("saving");
    try {
      const dto = formToDto(formData);

      if (isNew) {
        dto.slug = toSlug(formData.name);
        const response = await axios.post("/api/wedding-experiences", dto, {
          headers: getAuthHeaders(true),
        });
        const data: WeddingExperience = response.data.data ?? response.data;
        setExperienceId(data.id);
        setSaveStatus("idle");
        toast.success("Experience created!", {
          description: "Your new experience has been added to the system.",
        });
        reset();
        router.push("/dashboard/wedding-experiences");
      } else {
        await axios.patch(`/api/wedding-experiences/${id}`, dto, {
          headers: getAuthHeaders(true),
        });
        setSaveStatus("saved");
        toast.success("Changes saved!", {
          description: "Your experience has been updated.",
        });

        reset(formData);
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

  const deleteExperienceById = async () => {
    setDeleteStatus("deleting");
    try {
      await axios.delete(`/api/wedding-experiences/${id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteStatus("idle");
      toast.success("Experience deleted!", {
        description: "The experience has been removed from the system.",
      });
      router.push("/dashboard/wedding-experiences");
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

  if (notFound) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-10 h-10 text-primary/20 mb-4" />
        <p className="text-primary/50 text-xs tracking-widest uppercase mb-2">
          Not Found
        </p>
        <p className="text-primary/80 text-sm mb-6">
          This experience does not exist.
        </p>
        <Link
          href="/dashboard/wedding-experiences"
          className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
        >
          Back to Experiences
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-[1200px] mx-auto animate-pulse">
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

  const categoryOptions = [
    { id: "luxury_weddings", label: "Luxury Weddings" },
    { id: "private_villa_weddings", label: "Private Villa Weddings" },
    { id: "intimate_weddings", label: "Intimate Weddings" },
    { id: "elopement_weddings", label: "Elopement Weddings" },
  ];

  const heroStyleOptions = ["split", "bottom", "centered", "editorial"];

  const summaryItems = [
    { label: "Category", value: formData.category || "—" },
    { label: "Hero Style", value: formData.hero_style || "—" },
    {
      label: "Intro Items",
      value: `${formData.intro_list.filter(Boolean).length}`,
    },
    {
      label: "Services",
      value: `${formData.services_list.filter(Boolean).length}`,
    },
    { label: "FAQs", value: `${faqs.length}` },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => guardedNavigate("/dashboard/wedding-experiences")}
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              {isNew ? "Create New" : "Edit"}
            </p>
            <h1 className="text-primary text-2xl font-semibold tracking-wide">
              {isNew ? "New Experience" : formData.name || "Experience"}
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
        <div className="lg:col-span-2 space-y-6">
          <Section
            title="Identity"
            subtitle="Core identifiers for this experience"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Experience Name" required>
                  <TextInput
                    value={formData.name}
                    onChange={(v) => {
                      setField("name", v);
                      if (isNew) setValue("slug", toSlug(v));
                    }}
                    placeholder="e.g. Luxury Weddings"
                    error={
                      formErrors.name
                        ? String(formErrors.name.message)
                        : undefined
                    }
                  />
                </FormField>

                <FormField label="Category" required>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setField(
                          "category",
                          e.target
                            .value as WeddingExperienceFormData["category"],
                        )
                      }
                      className="w-full px-4 py-2.5 pr-10 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                    >
                      {categoryOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                  </div>
                  {formErrors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {String(formErrors.category.message)}
                    </p>
                  )}
                </FormField>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-4 space-y-2.5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary/40 font-semibold mb-3">
                  Auto-generated Meta
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-20 shrink-0">
                    Slug
                  </span>
                  <span className="text-sm text-primary/70 flex-1 truncate font-mono">
                    {formData.slug || toSlug(formData.name) || (
                      <span className="text-primary/30 italic not-italic">
                        Waiting for Name...
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-20 shrink-0">
                    Breadcrumb
                  </span>
                  <span className="text-sm text-primary/70 flex-1 truncate">
                    {formData.name || (
                      <span className="text-primary/30 italic">
                        Waiting for Display Name...
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-20 shrink-0">
                    Eyebrow
                  </span>
                  <span className="text-sm text-primary/70 flex-1 truncate">
                    {formData.name ? (
                      `${formData.name} Wedding Planner in Bali`
                    ) : (
                      <span className="text-primary/30 italic">
                        Waiting for Display Name...
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Hero Section" subtitle="The first thing visitors see">
            <div className="space-y-5">
              <FormField label="Hero Style" required>
                <div className="relative">
                  <select
                    value={formData.hero_style}
                    onChange={(e) =>
                      setField(
                        "hero_style",
                        e.target
                          .value as WeddingExperienceFormData["hero_style"],
                      )
                    }
                    className="w-full px-4 py-2.5 pr-10 text-sm text-primary bg-white border border-primary/30 focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    {heroStyleOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                </div>
                {formErrors.hero_style && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(formErrors.hero_style.message)}
                  </p>
                )}
              </FormField>

              <FormField label="Hero Image" required>
                <div className="space-y-3">
                  <div className="relative aspect-[16/7] bg-primary/5 border border-primary/20 overflow-hidden">
                    {formData.hero_image ? (
                      <Image
                        src={formData.hero_image}
                        alt="Hero preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <ImageIcon className="w-7 h-7 text-primary/20" />
                        <p className="text-primary/30 text-xs tracking-wider">
                          No image set
                        </p>
                      </div>
                    )}
                  </div>
                  <ImageUpload
                    value={formData.hero_image}
                    onChange={(v) => setField("hero_image", v)}
                    inputId="hero-image-upload"
                  />
                  {formErrors.hero_image && (
                    <p className="text-red-500 text-xs mt-1">
                      {String(formErrors.hero_image.message)}
                    </p>
                  )}
                </div>
              </FormField>

              <div className="bg-primary/5 border border-primary/20 p-4 space-y-2.5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary/40 font-semibold mb-3">
                  Auto-generated Hero Text
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-16 shrink-0">
                    Title
                  </span>
                  <span className="text-sm text-primary/70 flex-1 truncate">
                    {formData.name || (
                      <span className="text-primary/30 italic">
                        Waiting for Display Name...
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-16 shrink-0">
                    Subtitle
                  </span>
                  <span className="text-sm text-primary/70">
                    Weddings in Bali
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-widest uppercase text-primary/40 w-16 shrink-0">
                    CTA
                  </span>
                  <span className="text-sm text-primary/70">INQUIRE NOW</span>
                </div>
              </div>

              <FormField label="Description" required>
                <TextareaInput
                  value={formData.hero_desc}
                  onChange={(v) => setField("hero_desc", v)}
                  placeholder="The headline description shown in the hero..."
                  rows={3}
                  error={
                    formErrors.hero_desc
                      ? String(formErrors.hero_desc.message)
                      : undefined
                  }
                />
              </FormField>
            </div>
          </Section>

          <Section title="Intro Section" subtitle="Why choose this experience">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Section Label" required>
                  <TextInput
                    value={formData.intro_label}
                    onChange={(v) => setField("intro_label", v)}
                    placeholder="e.g. Why Villa"
                    error={
                      formErrors.intro_label
                        ? String(formErrors.intro_label.message)
                        : undefined
                    }
                  />
                </FormField>

                <FormField label="List Label (optional)">
                  <TextInput
                    value={formData.intro_list_label ?? ""}
                    onChange={(v) => setField("intro_list_label", v)}
                    placeholder="e.g. Private villas provide:"
                  />
                </FormField>
              </div>

              <FormField label="Heading (2 lines)" required>
                <HeadingEditor
                  value={formData.intro_heading as [string, string]}
                  onChange={(v) => setField("intro_heading", v)}
                  error={
                    (formErrors.intro_heading as any)?.[0]?.message
                      ? String((formErrors.intro_heading as any)[0].message)
                      : (formErrors.intro_heading as any)?.[1]?.message
                        ? String((formErrors.intro_heading as any)[1].message)
                        : undefined
                  }
                />
              </FormField>

              <FormField label="Body Text" required>
                <TextareaInput
                  value={formData.intro_body}
                  onChange={(v) => setField("intro_body", v)}
                  rows={4}
                  placeholder="Introductory paragraph..."
                  error={
                    formErrors.intro_body
                      ? String(formErrors.intro_body.message)
                      : undefined
                  }
                />
              </FormField>

              <FormField label="List Items">
                <TagsInput
                  values={formData.intro_list}
                  onChange={(v) => setField("intro_list", v)}
                  placeholder="e.g. Full creative freedom"
                />
              </FormField>

              <FormField label="Footnote (optional)">
                <TextInput
                  value={formData.intro_footnote ?? ""}
                  onChange={(v) => setField("intro_footnote", v)}
                  placeholder="e.g. Ideal for couples who..."
                />
              </FormField>

              <FormField label="Intro Images (max 2)">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[0, 1].map((idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="relative aspect-[4/3] bg-primary/5 border border-primary/20 overflow-hidden">
                        {formData.intro_images[idx] ? (
                          <Image
                            src={formData.intro_images[idx]}
                            alt={`Intro image ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <ImageIcon className="w-6 h-6 text-primary/20" />
                            <p className="text-primary/30 text-xs tracking-wider">
                              Image {idx + 1}
                            </p>
                          </div>
                        )}
                      </div>
                      <ImageUpload
                        value={formData.intro_images[idx] ?? ""}
                        onChange={(v) => {
                          const next = [...formData.intro_images];
                          next[idx] = v;
                          setField("intro_images", next);
                        }}
                        inputId={`intro-image-${idx}-upload`}
                      />
                    </div>
                  ))}
                </div>
                {formErrors.intro_images && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(
                      (formErrors.intro_images as any)?.message ??
                        (formErrors.intro_images as any)?.root?.message ??
                        (formErrors.intro_images as any)?.[0]?.message ??
                        (formErrors.intro_images as any)?.[1]?.message ??
                        "",
                    )}
                  </p>
                )}
              </FormField>
            </div>
          </Section>

          <Section title="Approach Section" subtitle="How you design or work">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Section Label" required>
                  <TextInput
                    value={formData.approach_label}
                    onChange={(v) => setField("approach_label", v)}
                    placeholder="e.g. Our Approach"
                    error={
                      formErrors.approach_label
                        ? String(formErrors.approach_label.message)
                        : undefined
                    }
                  />
                </FormField>

                <FormField label="List Label (optional)">
                  <TextInput
                    value={formData.approach_list_label ?? ""}
                    onChange={(v) => setField("approach_list_label", v)}
                    placeholder="e.g. It requires understanding:"
                  />
                </FormField>
              </div>

              <FormField label="Heading (2 lines)" required>
                <HeadingEditor
                  value={formData.approach_heading as [string, string]}
                  onChange={(v) => setField("approach_heading", v)}
                  error={
                    (formErrors.approach_heading as any)?.[0]?.message
                      ? String((formErrors.approach_heading as any)[0].message)
                      : (formErrors.approach_heading as any)?.[1]?.message
                        ? String(
                            (formErrors.approach_heading as any)[1].message,
                          )
                        : undefined
                  }
                />
              </FormField>

              <FormField label="Body Text" required>
                <TextareaInput
                  value={formData.approach_body}
                  onChange={(v) => setField("approach_body", v)}
                  rows={4}
                  placeholder="Approach description..."
                  error={
                    formErrors.approach_body
                      ? String(formErrors.approach_body.message)
                      : undefined
                  }
                />
              </FormField>

              <FormField label="List Items">
                <TagsInput
                  values={formData.approach_list}
                  onChange={(v) => setField("approach_list", v)}
                />
              </FormField>

              <FormField label="Approach Image" required>
                <div className="space-y-3">
                  <div className="relative aspect-[16/7] bg-primary/5 border border-primary/20 overflow-hidden">
                    {formData.approach_image ? (
                      <Image
                        src={formData.approach_image}
                        alt="Approach preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <ImageIcon className="w-7 h-7 text-primary/20" />
                        <p className="text-primary/30 text-xs tracking-wider">
                          No image set
                        </p>
                      </div>
                    )}
                  </div>
                  <ImageUpload
                    value={formData.approach_image}
                    onChange={(v) => setField("approach_image", v)}
                    inputId="approach-image-upload"
                  />
                  {formErrors.approach_image && (
                    <p className="text-red-500 text-xs mt-1">
                      {String(formErrors.approach_image.message)}
                    </p>
                  )}
                </div>
              </FormField>
            </div>
          </Section>

          <Section title="Services Section" subtitle="What you offer">
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Section Label" required>
                  <TextInput
                    value={formData.services_label}
                    onChange={(v) => setField("services_label", v)}
                    placeholder="e.g. What We Offer"
                    error={
                      formErrors.services_label
                        ? String(formErrors.services_label.message)
                        : undefined
                    }
                  />
                </FormField>
              </div>

              <FormField label="Heading (2 lines)" required>
                <HeadingEditor
                  value={formData.services_heading as [string, string]}
                  onChange={(v) => setField("services_heading", v)}
                  error={
                    (formErrors.services_heading as any)?.[0]?.message
                      ? String((formErrors.services_heading as any)[0].message)
                      : (formErrors.services_heading as any)?.[1]?.message
                        ? String(
                            (formErrors.services_heading as any)[1].message,
                          )
                        : undefined
                  }
                />
              </FormField>

              <FormField label="Services List" required>
                <TagsInput
                  values={formData.services_list}
                  onChange={(v) => setField("services_list", v)}
                  placeholder="e.g. Venue sourcing and design"
                />
                {formErrors.services_list && (
                  <p className="text-red-500 text-xs mt-1">
                    {String(
                      formErrors.services_list.message ??
                        (formErrors.services_list as any)?.root?.message ??
                        "At least one service is required",
                    )}
                  </p>
                )}
              </FormField>

              <FormField label="Footnote" required>
                <TextInput
                  value={formData.services_footnote}
                  onChange={(v) => setField("services_footnote", v)}
                  placeholder="e.g. Every element is designed to feel cohesive."
                  error={
                    formErrors.services_footnote
                      ? String(formErrors.services_footnote.message)
                      : undefined
                  }
                />
              </FormField>

              <div className="border border-primary/20 bg-primary/5 p-4 space-y-5 mt-2">
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary/60 font-semibold">
                  Dark Panel
                </p>

                <FormField label="Panel Label" required>
                  <TextInput
                    value={formData.services_dark_label}
                    onChange={(v) => setField("services_dark_label", v)}
                    placeholder="e.g. The Day Unfolds"
                    error={
                      formErrors.services_dark_label
                        ? String(formErrors.services_dark_label.message)
                        : undefined
                    }
                  />
                </FormField>

                <FormField label="Heading (2 lines)" required>
                  <HeadingEditor
                    value={formData.services_dark_heading as [string, string]}
                    onChange={(v) => setField("services_dark_heading", v)}
                    error={
                      (formErrors.services_dark_heading as any)?.[0]?.message
                        ? String(
                            (formErrors.services_dark_heading as any)[0]
                              .message,
                          )
                        : (formErrors.services_dark_heading as any)?.[1]
                              ?.message
                          ? String(
                              (formErrors.services_dark_heading as any)[1]
                                .message,
                            )
                          : undefined
                    }
                  />
                </FormField>

                <FormField label="Body Text" required>
                  <TextareaInput
                    value={formData.services_dark_body}
                    onChange={(v) => setField("services_dark_body", v)}
                    rows={3}
                    placeholder="Dark panel body..."
                    error={
                      formErrors.services_dark_body
                        ? String(formErrors.services_dark_body.message)
                        : undefined
                    }
                  />
                </FormField>

                <FormField label="List Items" required>
                  <TagsInput
                    values={formData.services_dark_list}
                    onChange={(v) => setField("services_dark_list", v)}
                  />
                  {formErrors.services_dark_list && (
                    <p className="text-red-500 text-xs mt-1">
                      {String(
                        formErrors.services_dark_list.message ??
                          (formErrors.services_dark_list as any)?.root
                            ?.message ??
                          "At least one list item is required",
                      )}
                    </p>
                  )}
                </FormField>
              </div>
            </div>
          </Section>

          <Section title="Closing Section" subtitle="Final call-to-action area">
            <div className="space-y-5">
              <FormField label="Section Label" required>
                <TextInput
                  value={formData.closing_label}
                  onChange={(v) => setField("closing_label", v)}
                  placeholder="e.g. A Luxury Wedding That Feels Timeless"
                  error={
                    formErrors.closing_label
                      ? String(formErrors.closing_label.message)
                      : undefined
                  }
                />
              </FormField>

              <FormField label="Heading (2 lines)" required>
                <HeadingEditor
                  value={formData.closing_heading as [string, string]}
                  onChange={(v) => setField("closing_heading", v)}
                  error={
                    (formErrors.closing_heading as any)?.[0]?.message
                      ? String((formErrors.closing_heading as any)[0].message)
                      : (formErrors.closing_heading as any)?.[1]?.message
                        ? String((formErrors.closing_heading as any)[1].message)
                        : undefined
                  }
                />
              </FormField>

              <FormField label="Body Text" required>
                <TextareaInput
                  value={formData.closing_body}
                  onChange={(v) => setField("closing_body", v)}
                  rows={3}
                  placeholder="Closing paragraph..."
                  error={
                    formErrors.closing_body
                      ? String(formErrors.closing_body.message)
                      : undefined
                  }
                />
              </FormField>

              <FormField label="Section Image" required>
                <div className="space-y-3">
                  <div className="relative aspect-[16/7] bg-primary/5 border border-primary/20 overflow-hidden">
                    {formData.closing_image ? (
                      <Image
                        src={formData.closing_image}
                        alt="Closing preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <ImageIcon className="w-7 h-7 text-primary/20" />
                        <p className="text-primary/30 text-xs tracking-wider">
                          No image set
                        </p>
                      </div>
                    )}
                  </div>
                  <ImageUpload
                    value={formData.closing_image}
                    onChange={(v) => setField("closing_image", v)}
                    inputId="closing-image-upload"
                  />
                  {formErrors.closing_image && (
                    <p className="text-red-500 text-xs mt-1">
                      {String(formErrors.closing_image.message)}
                    </p>
                  )}
                </div>
              </FormField>

              <FormField label="Couple Label (optional)">
                <TextInput
                  value={formData.closing_couple_label ?? ""}
                  onChange={(v) => setField("closing_couple_label", v)}
                  placeholder="e.g. Created for couples who seek:"
                />
              </FormField>

              {formData.closing_couple_label && (
                <FormField label="Couple Values" required>
                  <TagsInput
                    values={formData.closing_couple_values}
                    onChange={(v) => setField("closing_couple_values", v)}
                    placeholder="e.g. Seclusion and intimacy"
                  />
                  {formErrors.closing_couple_values && (
                    <p className="text-red-500 text-xs mt-1">
                      {String(
                        formErrors.closing_couple_values.message ??
                          (formErrors.closing_couple_values as any)?.root
                            ?.message ??
                          "At least one couple value is required",
                      )}
                    </p>
                  )}
                </FormField>
              )}
            </div>
          </Section>

          <Section
            title="FAQs"
            subtitle={
              isNew
                ? "Available after saving"
                : `${faqs.length} question${faqs.length !== 1 ? "s" : ""}`
            }
          >
            {isNew || !experienceId ? (
              <p className="text-xs text-primary/40 italic">
                FAQs can be added after the experience is created and saved.
              </p>
            ) : (
              <FAQEditor
                experienceId={experienceId}
                faqs={faqs}
                onFaqsChange={setFaqs}
              />
            )}
          </Section>
        </div>

        <div className="space-y-6">
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

          <div className="bg-white border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Sections
            </p>
            <div className="space-y-2">
              {[
                {
                  label: "Hero",
                  filled: !!formData.hero_desc && !!formData.hero_image,
                },
                {
                  label: "Intro",
                  filled:
                    !!formData.intro_body && formData.intro_list.some(Boolean),
                },
                { label: "Approach", filled: !!formData.approach_body },
                {
                  label: "Services",
                  filled: formData.services_list.some(Boolean),
                },
                { label: "Dark Panel", filled: !!formData.services_dark_body },
                { label: "Closing", filled: !!formData.closing_body },
                { label: "FAQs", filled: faqs.length > 0 },
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
          entityName="Experience"
          itemName={formData.name || undefined}
          onConfirm={confirmSave}
          onCancel={() => saveStatus !== "saving" && setSaveStatus("idle")}
          isLoading={saveStatus === "saving"}
        />
      )}

      {(deleteStatus === "confirm" || deleteStatus === "deleting") && (
        <DeleteModal
          name={formData.name}
          onConfirm={deleteExperienceById}
          onCancel={() =>
            deleteStatus !== "deleting" && setDeleteStatus("idle")
          }
          isLoading={deleteStatus === "deleting"}
        />
      )}
    </div>
  );
}
