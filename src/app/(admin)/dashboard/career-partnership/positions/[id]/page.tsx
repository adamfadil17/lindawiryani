"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import {
  ArrowLeft,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Briefcase,
  Clock,
  Layers,
} from "lucide-react";
import FormField from "@/components/shared/from-field";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import SaveModal from "@/components/shared/save-modal";
import DeleteModal from "@/components/shared/delete-modal";
import { OpenPosition, openPositions } from "@/lib/types/new-strucutre";

// ─── Mock Data (with IDs) ─────────────────────────────────────────────────────

const mockPositions: OpenPosition[] = openPositions.map((p, i) => ({
  ...p,
  id: `pos-00${i + 1}`,
}));

// ─── Schema ───────────────────────────────────────────────────────────────────

const positionSchema = z.object({
  title: z.string().min(1, "Position title is required"),
  type: z.string().min(1, "Employment type is required"),
  level: z.string().min(1, "Level is required"),
  desc: z.string().min(1, "Description is required"),
});

// ─── FormData ─────────────────────────────────────────────────────────────────

type FormData = Omit<OpenPosition, "id">;

const emptyForm: FormData = {
  title: "",
  type: "",
  level: "",
  desc: "",
};

// ─── Employment type options ──────────────────────────────────────────────────

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Part-time / Freelance",
  "Freelance",
  "Contract",
  "Internship",
];

const levelOptions = [
  "Entry level",
  "Mid-level",
  "Mid–Senior",
  "Senior",
  "All levels",
  "Lead",
  "Manager",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PositionDetailPage() {
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
      const position = mockPositions.find((p) => p.id === id);
      if (position) {
        const { id: _id, ...rest } = position;
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
      positionSchema.parse(form);
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
      setShowSaveModal(false);
      if (isNew) {
        toast.success("Position created successfully!", {
          description: "The new open position has been added.",
        });
        setTimeout(() => {
          router.push("/dashboard/career-partnership");
        }, 1000);
      } else {
        setSaved(true);
        toast.success("Changes saved successfully!", {
          description: "The position has been updated.",
        });
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      toast.error("Failed to save changes", {
        description: "An error occurred while saving. Please try again.",
      });
    }
  };

  const confirmDelete = () => {
    try {
      setShowDeleteModal(false);
      toast.success("Position deleted successfully!", {
        description: "The position has been removed.",
      });
      setTimeout(() => {
        router.push("/dashboard/career-partnership");
      }, 1000);
    } catch {
      toast.error("Failed to delete position", {
        description: "An error occurred while deleting. Please try again.",
      });
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
          This position does not exist.
        </p>
        <Link
          href="/dashboard/career-partnership"
          className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
        >
          Back to Career & Partnership
        </Link>
      </div>
    );
  }

  if (!isLoaded) return null;

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/career-partnership"
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              {isNew ? "Create New" : "Edit"} · Open Position
            </p>
            <h1 className="text-primary text-2xl font-semibold tracking-wide">
              {isNew ? "New Position" : form.title || "Position"}
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
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-5 py-2.5 hover:cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            {isNew ? "Create Position" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* ── Left Column ── */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Section
            title="Position Details"
            subtitle="Basic information about this open role"
          >
            <div className="space-y-5">
              <FormField label="Position Title" required>
                <TextInput
                  value={form.title}
                  onChange={(v) => set("title", v)}
                  placeholder="e.g. Wedding Planner & Coordinator"
                  error={errors.title}
                />
              </FormField>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Employment Type — select */}
                <FormField label="Employment Type" required>
                  <div className="relative">
                    <select
                      value={form.type}
                      onChange={(e) => set("type", e.target.value)}
                      className={`w-full appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer ${
                        errors.type ? "border-red-300" : "border-primary/20"
                      }`}
                    >
                      <option value="">Select type...</option>
                      {employmentTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <Clock className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                    {errors.type && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.type}
                      </p>
                    )}
                  </div>
                </FormField>

                {/* Level — select */}
                <FormField label="Level" required>
                  <div className="relative">
                    <select
                      value={form.level}
                      onChange={(e) => set("level", e.target.value)}
                      className={`w-full appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer ${
                        errors.level ? "border-red-300" : "border-primary/20"
                      }`}
                    >
                      <option value="">Select level...</option>
                      {levelOptions.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <Layers className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                    {errors.level && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.level}
                      </p>
                    )}
                  </div>
                </FormField>
              </div>
            </div>
          </Section>

          {/* Description */}
          <Section
            title="Role Description"
            subtitle="Describe the responsibilities and expectations for this role"
          >
            <FormField label="Description" required>
              <TextareaInput
                value={form.desc}
                onChange={(v) => set("desc", v)}
                placeholder="e.g. Lead end-to-end planning and on-site execution of luxury destination weddings in Bali..."
                rows={5}
                error={errors.desc}
              />
            </FormField>
          </Section>
        </div>

        {/* ── Right Column (sidebar) ── */}
        <div className="space-y-6">
          {/* Preview Card */}
          <Section title="Preview">
            <div className="border border-primary/10 bg-primary/3 p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-primary/5">
                  <Briefcase className="w-4 h-4 text-primary/50" />
                </div>
                <div className="min-w-0">
                  <p className="text-primary font-semibold text-sm leading-snug">
                    {form.title || (
                      <span className="text-primary/30">Position Title</span>
                    )}
                  </p>
                  <p className="text-primary/50 text-xs tracking-wider mt-0.5">
                    {form.type || (
                      <span className="text-primary/30">Employment Type</span>
                    )}
                  </p>
                </div>
              </div>
              {form.level && (
                <span className="inline-block text-xs tracking-widest uppercase px-2.5 py-1 font-medium bg-primary/5 text-primary/60 border border-primary/10 mb-3">
                  {form.level}
                </span>
              )}
              {form.desc && (
                <p className="text-primary/60 text-xs leading-relaxed line-clamp-3">
                  {form.desc}
                </p>
              )}
            </div>
          </Section>

          {/* Quick Summary */}
          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Summary
            </p>
            <div className="space-y-3">
              {[
                { label: "Title", value: form.title || "—" },
                { label: "Type", value: form.type || "—" },
                { label: "Level", value: form.level || "—" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="text-primary/60 text-xs">{item.label}</span>
                  <span className="text-primary text-xs font-medium text-right truncate max-w-[140px]">
                    {item.value}
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
              {isNew ? "Create Position" : "Save Changes"}
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
          name={form.title}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}