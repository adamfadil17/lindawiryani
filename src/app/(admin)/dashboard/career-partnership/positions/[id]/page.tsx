"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Briefcase,
  Clock,
  Layers,
  Loader2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import FormField from "@/components/shared/from-field";
import Section from "@/components/shared/section-form";
import TextInput from "@/components/shared/text-input";
import TextareaInput from "@/components/shared/text-area-input";
import SaveModal from "@/components/shared/save-modal";
import DeleteModal from "@/components/shared/delete-modal";
import UnsavedChangesModal from "@/components/shared/unsaved-changes-modal";
import {
  openPositionFormSchema,
  OpenPositionFormData,
} from "@/utils/form-validators";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import { OpenPosition } from "@/types";

type OpenPositionFormInput = z.input<typeof openPositionFormSchema>;

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
  "Mid\u2013Senior",
  "Senior",
  "All levels",
  "Lead",
  "Manager",
];

export default function PositionDetailPage() {
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
  } = useForm<OpenPositionFormInput, any, OpenPositionFormData>({
    resolver: zodResolver(openPositionFormSchema),
    defaultValues: {
      title: "",
      type: "",
      level: "",
      desc: "",
      is_active: true,
    },
  });

  const setField = (key: keyof OpenPositionFormData, value: unknown) =>
    setValue(key as any, value as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  const formData = watch();

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
        formData.title || formData.type || formData.level || formData.desc,
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
    const getPositionById = async () => {
      try {
        const response = await axios.get(`/api/open-positions/${id}`);
        const data: OpenPosition = response.data.data ?? response.data;

        reset({
          title: String(data.title ?? ""),
          type: String(data.type ?? ""),
          level: String(data.level ?? ""),
          desc: String(data.desc ?? ""),
          is_active: Boolean(data.is_active ?? true),
        });
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setNotFound(true);
        } else {
          const errorMsg =
            axios.isAxiosError(err) && err.response?.data?.message
              ? err.response.data.message
              : "Failed to load position";
          toast.error(errorMsg, {
            description: err instanceof Error ? err.message : "Unknown error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    getPositionById();
  }, [id, isNew, reset]);

  const onSubmitForm = async (_data: OpenPositionFormData) => {
    setSaveStatus("confirm");
  };

  const onSubmitError = async () => {
    await trigger();
  };

  const confirmSave = async () => {
    setSaveStatus("saving");
    try {
      const payload = { ...formData };

      if (isNew) {
        await axios.post("/api/open-positions", payload, {
          headers: getAuthHeaders(true),
        });
        setSaveStatus("idle");
        toast.success("Position created!", {
          description: "The new open position has been added to the system.",
        });
        reset();
        router.push("/dashboard/career-partnership");
      } else {
        await axios.patch(`/api/open-positions/${id}`, payload, {
          headers: getAuthHeaders(true),
        });
        setSaveStatus("saved");
        toast.success("Changes saved!", {
          description: "The position has been updated.",
        });
        reset({ ...formData });
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

  const deletePositionById = async () => {
    setDeleteStatus("deleting");
    try {
      await axios.delete(`/api/open-positions/${id}`, {
        headers: getAuthHeaders(),
      });
      setDeleteStatus("idle");
      toast.success("Position deleted!", {
        description: "The position has been removed from the system.",
      });
      router.push("/dashboard/career-partnership");
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
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="space-y-6">
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-3 w-32 bg-primary/10 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="h-10 bg-primary/5 rounded" />
                <div className="h-10 bg-primary/5 rounded" />
              </div>
            </div>
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-3 w-32 bg-primary/10 rounded" />
              <div className="h-28 bg-primary/5 rounded" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white border border-primary/20 p-6 space-y-3">
              <div className="h-3 w-20 bg-primary/10 rounded" />
              <div className="h-10 bg-primary/5 rounded" />
            </div>
            <div className="bg-white border border-primary/20 p-6 space-y-4">
              <div className="h-3 w-20 bg-primary/10 rounded" />
              <div className="h-24 bg-primary/5 rounded" />
            </div>
            <div className="bg-primary/5 border border-primary/20 p-5 space-y-3">
              <div className="h-3 w-16 bg-primary/10 rounded" />
              <div className="h-4 bg-primary/10 rounded" />
              <div className="h-4 bg-primary/10 rounded" />
              <div className="h-4 bg-primary/10 rounded" />
              <div className="h-4 bg-primary/10 rounded" />
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
            onClick={() => guardedNavigate("/dashboard/career-partnership")}
            className="w-9 h-9 flex items-center justify-center border border-primary/20 text-primary/50 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1.5">
              {isNew ? "Create New" : "Edit"} · Open Position
            </p>
            <h1 className="text-primary text-2xl font-semibold tracking-wide">
              {isNew ? "New Position" : formData.title || "Position"}
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
            className="inline-flex items-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-5 py-2.5 hover:cursor-pointer hover:bg-primary/80 transition-colors disabled:opacity-60"
          >
            {saveStatus === "saving" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isNew ? "Create Position" : "Save Changes"}
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
        className="grid lg:grid-cols-[1fr_320px] gap-6 items-start"
      >
        <div className="space-y-6">
          <Section
            title="Position Details"
            subtitle="Basic information about this open role"
          >
            <div className="space-y-5">
              <FormField label="Position Title" required>
                <TextInput
                  value={formData.title}
                  onChange={(v) => setField("title", v)}
                  placeholder="e.g. Wedding Planner & Coordinator"
                  error={
                    formErrors.title
                      ? String(formErrors.title.message)
                      : undefined
                  }
                />
              </FormField>

              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Employment Type" required>
                  <div className="relative">
                    <select
                      value={formData.type}
                      onChange={(e) => setField("type", e.target.value)}
                      className={`w-full appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer ${
                        formErrors.type ? "border-red-300" : "border-primary/20"
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
                  </div>
                  {formErrors.type && (
                    <p className="text-red-500 text-xs mt-1">
                      {String(formErrors.type.message)}
                    </p>
                  )}
                </FormField>

                <FormField label="Level" required>
                  <div className="relative">
                    <select
                      value={formData.level}
                      onChange={(e) => setField("level", e.target.value)}
                      className={`w-full appearance-none pl-4 pr-9 py-2.5 text-sm text-primary bg-white border focus:outline-none focus:border-primary/50 transition-colors hover:cursor-pointer ${
                        formErrors.level
                          ? "border-red-300"
                          : "border-primary/20"
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
                  </div>
                  {formErrors.level && (
                    <p className="text-red-500 text-xs mt-1">
                      {String(formErrors.level.message)}
                    </p>
                  )}
                </FormField>
              </div>
            </div>
          </Section>

          <Section
            title="Role Description"
            subtitle="Describe the responsibilities and expectations for this role"
          >
            <FormField label="Description" required>
              <TextareaInput
                value={formData.desc}
                onChange={(v) => setField("desc", v)}
                placeholder="e.g. Lead end-to-end planning and on-site execution of luxury destination weddings in Bali..."
                rows={5}
                error={
                  formErrors.desc ? String(formErrors.desc.message) : undefined
                }
              />
            </FormField>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Visibility">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-primary text-sm font-medium">
                  {formData.is_active ? "Active" : "Inactive"}
                </p>
                <p className="text-primary/50 text-xs mt-0.5">
                  {formData.is_active
                    ? "This position is publicly visible."
                    : "This position is hidden from the public."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setField("is_active", !formData.is_active)}
                className="text-primary hover:text-primary/70 transition-colors hover:cursor-pointer flex-shrink-0"
                aria-label="Toggle visibility"
              >
                {formData.is_active ? (
                  <ToggleRight className="w-8 h-8 text-green-500" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-primary/30" />
                )}
              </button>
            </div>
          </Section>

          <Section title="Preview">
            <div className="border border-primary/10 bg-primary/[0.02] p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-primary/5">
                  <Briefcase className="w-4 h-4 text-primary/50" />
                </div>
                <div className="min-w-0">
                  <p className="text-primary font-semibold text-sm leading-snug">
                    {formData.title || (
                      <span className="text-primary/30">Position Title</span>
                    )}
                  </p>
                  <p className="text-primary/50 text-xs tracking-wider mt-0.5">
                    {formData.type || (
                      <span className="text-primary/30">Employment Type</span>
                    )}
                  </p>
                </div>
              </div>
              {formData.level && (
                <span className="inline-block text-xs tracking-widest uppercase px-2.5 py-1 font-medium bg-primary/5 text-primary/60 border border-primary/10 mb-3">
                  {formData.level}
                </span>
              )}
              {formData.desc && (
                <p className="text-primary/60 text-xs leading-relaxed line-clamp-3">
                  {formData.desc}
                </p>
              )}
              {!formData.is_active && (
                <span className="mt-3 inline-block text-xs tracking-widest uppercase px-2.5 py-1 font-medium bg-primary/5 text-primary/40 border border-primary/10">
                  Inactive
                </span>
              )}
            </div>
          </Section>

          <div className="bg-primary/5 border border-primary/20 p-5">
            <p className="text-xs tracking-[0.2em] uppercase text-primary/80 mb-4">
              Summary
            </p>
            <div className="space-y-3">
              {[
                { label: "Title", value: formData.title || "—" },
                { label: "Type", value: formData.type || "—" },
                { label: "Level", value: formData.level || "—" },
                {
                  label: "Status",
                  value: formData.is_active ? "Active" : "Inactive",
                },
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

          <div className="sticky bottom-6 lg:static">
            <button
              type="button"
              onClick={() => handleSubmit(onSubmitForm, onSubmitError)()}
              disabled={saveStatus === "saving"}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/90 transition-colors shadow-lg lg:shadow-none disabled:opacity-60"
            >
              {saveStatus === "saving" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isNew ? "Create Position" : "Save Changes"}
            </button>
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

      {saveStatus === "confirm" || saveStatus === "saving" ? (
        <SaveModal
          mode={isNew ? "create" : "update"}
          entityName="Position"
          itemName={formData.title || undefined}
          onConfirm={confirmSave}
          onCancel={() => saveStatus !== "saving" && setSaveStatus("idle")}
          isLoading={saveStatus === "saving"}
        />
      ) : null}

      {deleteStatus === "confirm" || deleteStatus === "deleting" ? (
        <DeleteModal
          name={formData.title}
          onConfirm={deletePositionById}
          onCancel={() =>
            deleteStatus !== "deleting" && setDeleteStatus("idle")
          }
          isLoading={deleteStatus === "deleting"}
        />
      ) : null}
    </div>
  );
}
