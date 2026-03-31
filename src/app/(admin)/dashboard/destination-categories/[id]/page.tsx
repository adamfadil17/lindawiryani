"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  ChevronLeft,
  FolderOpen,
  Pencil,
  Check,
  X,
  MapPin,
  Loader2,
  Eye,
  Trash2,
} from "lucide-react";
import { Destination, DestinationCategory } from "@/types";
import { destinationCategoryFormSchema, type DestinationCategoryFormData } from "@/utils/form-validators";
import SaveModal from "@/components/shared/save-modal";
import DeleteModal from "@/components/shared/delete-modal";
import UnsavedChangesModal from "@/components/shared/unsaved-changes-modal";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

// ─── Destination Mini Card ────────────────────────────────────────────────────

function DestinationMiniCard({ destination }: { destination: Destination }) {
  return (
    <div className="flex items-center gap-3 p-3 sm:p-4 bg-white border border-primary/20 hover:border-primary/30 hover:shadow-sm transition-all group">
      <div className="relative w-14 h-11 sm:w-16 sm:h-12 shrink-0 overflow-hidden">
        <Image
          src={destination.image || "https://placehold.net/default.svg"}
          alt={destination.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-primary/60 text-xs tracking-widest uppercase mb-0.5">
          {destination.type}
        </p>
        <p className="text-primary font-medium text-sm truncate">
          {destination.name}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3 text-primary/30 shrink-0" />
          <p className="text-primary/50 text-xs truncate">
            {destination.location}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <Link
          href={`/destinations/${destination.slug}`}
          target="_blank"
          className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-primary/10 active:bg-primary/10 transition-colors"
          title="View public page"
        >
          <Eye className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        </Link>
        <Link
          href={`/dashboard/destinations/${destination.id}`}
          className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-primary/10 active:bg-primary/10 transition-colors"
          title="Edit destination"
        >
          <Pencil className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        </Link>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DestinationCategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [category, setCategory] = useState<DestinationCategory | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Delete state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Unsaved changes guard — state only (logic setelah useForm) ─────────────
  const [unsavedModal, setUnsavedModal] = useState<{ open: boolean; pendingHref?: string }>({ open: false });

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<DestinationCategoryFormData>({
    resolver: zodResolver(destinationCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const nameValue = watch("name");

  // ── Unsaved changes guard ──────────────────────────────────────────────────────
  // Guard aktif hanya ketika sedang dalam mode edit DAN form sudah diubah (isDirty)
  const hasUnsavedChanges = isEditing && isDirty;

  // Block browser close / refresh saat ada perubahan yang belum disimpan
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !isSaving) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges, isSaving]);

  // Helper: navigate dengan guard check
  const guardedNavigate = useCallback(
    (href: string) => {
      if (hasUnsavedChanges && !isSaving) {
        setUnsavedModal({ open: true, pendingHref: href });
      } else {
        router.push(href);
      }
    },
    [hasUnsavedChanges, isSaving, router]
  );

  // ── Fetch category ────────────────────────────────────────────────────────
  const getDestinationCategoryById = useCallback(async () => {
    setIsLoadingData(true);
    setApiError(null);
    try {
      const response = await axios.get(`/api/destination-categories/${id}`);
      setCategory(response.data.data);
      reset({ name: response.data.data.name });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setApiError("Category not found.");
        } else {
          setApiError("Failed to load category. Please try again.");
        }
      } else {
        setApiError("Failed to load category. Please try again.");
      }
    } finally {
      setIsLoadingData(false);
    }
  }, [id, reset]);

  useEffect(() => {
    getDestinationCategoryById();
  }, [getDestinationCategoryById]);

  // ── Handle save ────────────────────────────────────────────────────────────
  const onSubmitForm = async (data: DestinationCategoryFormData) => {
    if (data.name === category?.name) {
      setIsEditing(false);
      return;
    }
    setShowSaveModal(true);
  };

  const updateDestinationCategoryById = async () => {
    setIsSaving(true);
    setApiError(null);
    try {
      const response = await axios.patch(
        `/api/destination-categories/${id}`,
        { name: nameValue.trim() },
        { headers: getAuthHeaders(true) }
      );
      setCategory(response.data.data);
      reset({ name: response.data.data.name });
      setIsEditing(false);
      setShowSaveModal(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError("Failed to save. Please try again.");
      } else {
        setApiError("Failed to save. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // ── Handle delete ──────────────────────────────────────────────────────────
  const deleteDestinationCategoryById = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/destination-categories/${id}`, {
        headers: getAuthHeaders(),
      });
      router.push("/dashboard/destination-categories");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError("Failed to delete category.");
      } else {
        setApiError("Failed to delete category.");
      }
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // ── Handle edit cancel ─────────────────────────────────────────────────────
  const handleEditCancel = () => {
    reset();
    setIsEditing(false);
  };

  // ── Loading ──────────────────────────────────────────────────────────────��─

  if (isLoadingData) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center justify-center py-32 sm:py-40">
          <Loader2 className="w-6 h-6 text-primary/30 animate-spin mb-3" />
          <p className="text-primary/40 text-xs tracking-widest uppercase">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────

  if (apiError && !category) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center justify-center py-32 sm:py-40 text-center">
          <FolderOpen className="w-8 h-8 text-primary/20 mb-4" />
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-2">
            Error
          </p>
          <p className="text-primary/60 text-sm mb-6">{apiError}</p>
          <Link
            href="/dashboard/destination-categories"
            className="text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  if (!category) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <button
          type="button"
          onClick={() => guardedNavigate("/dashboard/destination-categories")}
          className="flex items-center gap-1.5 text-primary/50 hover:text-primary transition-colors text-xs tracking-widest uppercase"
        >
          <ChevronLeft className="w-3 h-3" />
          Categories
        </button>
        <span className="text-primary/20 text-xs">/</span>
        <span className="text-primary/80 text-xs tracking-widest uppercase truncate max-w-[150px] sm:max-w-[200px]">
          {category.name}
        </span>
      </div>

      {/* ── Error Banner ── */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6 flex items-center justify-between gap-3">
          <span className="text-xs sm:text-sm">{apiError}</span>
          <button
            onClick={() => setApiError(null)}
            className="hover:cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* ── Left: Category Details ── */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-5">
          {/* Category Info Card */}
          <div className="bg-white border border-primary/20 p-4 sm:p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-primary/60 tracking-[0.25em] uppercase text-xs mb-1">
                  Category
                </p>
                <p className="text-primary/40 text-xs font-mono">
                  {category.id.slice(0, 8)}…
                </p>
              </div>
              <div className="w-10 h-10 bg-primary/5 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-primary/40" />
              </div>
            </div>

            {/* Inline Name Editor */}
            <div className="mb-5">
              <label className="block text-xs tracking-widest uppercase text-primary/40 mb-2">
                Category Name
              </label>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-2">
                  <input
                    {...register("name")}
                    type="text"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        handleEditCancel();
                      }
                    }}
                    className="w-full px-3 py-2.5 text-sm text-primary border border-primary/30 focus:outline-none focus:border-primary/60 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name.message}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isSaving || !isDirty}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white text-xs tracking-widest uppercase py-2.5 sm:py-2 hover:bg-primary/90 active:bg-primary/80 transition-colors disabled:opacity-50 hover:cursor-pointer"
                    >
                      {isSaving ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-primary/20 text-primary text-xs tracking-widest uppercase py-2.5 sm:py-2 hover:bg-primary/5 active:bg-primary/5 transition-colors hover:cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-primary font-semibold text-lg">
                    {category.name}
                  </p>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      reset({ name: category.name });
                    }}
                    className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-primary/10 active:bg-primary/10 transition-colors hover:cursor-pointer"
                    title="Edit name"
                  >
                    <Pencil className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="border-t border-primary/10 pt-4">
              <div className="flex items-center justify-between py-2 border-b border-primary/10">
                <span className="text-xs text-primary/50 tracking-wider">
                  Destinations
                </span>
                <span className="text-sm font-semibold text-primary">
                  {category.destinations.length}
                </span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border border-red-100 p-4 sm:p-6">
            <p className="text-xs tracking-widest uppercase text-red-400 mb-3">
              Danger Zone
            </p>
            <p className="text-primary/60 text-xs leading-relaxed mb-4">
              Deleting this category will permanently remove it. Destinations
              linked to this category will need to be reassigned.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 text-xs tracking-widest uppercase px-4 py-3 sm:py-2.5 hover:bg-red-50 active:bg-red-50 transition-colors hover:cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Category
            </button>
          </div>
        </div>

        {/* ── Right: Destinations in this Category ── */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-primary/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-primary/10">
              <div>
                <p className="text-primary font-medium text-sm">
                  Destinations in this Category
                </p>
                <p className="text-primary/50 text-xs mt-0.5">
                  {category.destinations.length}{" "}
                  {category.destinations.length === 1
                    ? "destination"
                    : "destinations"}
                </p>
              </div>
              <Link
                href={`/dashboard/destinations?category=${category.id}`}
                className="text-xs tracking-widest uppercase text-primary/50 hover:text-primary transition-colors border-b border-primary/20 hover:border-primary shrink-0 ml-4"
              >
                View All
              </Link>
            </div>

            {/* Destination List */}
            {category.destinations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
                <MapPin className="w-7 h-7 text-primary/15 mb-3" />
                <p className="text-primary/60 text-xs tracking-widest uppercase mb-1.5">
                  No Destinations
                </p>
                <p className="text-primary/40 text-sm">
                  No destinations linked to this category yet.
                </p>
                <Link
                  href="/dashboard/destinations/new"
                  className="mt-4 text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors"
                >
                  Add Destination
                </Link>
              </div>
            ) : (
              <div className="p-3 sm:p-4 grid sm:grid-cols-2 gap-2 sm:gap-3">
                {category.destinations.map((destination) => (
                  <DestinationMiniCard
                    key={destination.id}
                    destination={destination}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Unsaved Changes Modal ── */}
      {unsavedModal.open && (
        <UnsavedChangesModal
          mode="update"
          onConfirmLeave={() => {
            setUnsavedModal({ open: false });
            if (unsavedModal.pendingHref) router.push(unsavedModal.pendingHref);
          }}
          onCancel={() => setUnsavedModal({ open: false })}
        />
      )}

      {/* ── Save Confirmation Modal ── */}
      {showSaveModal && (
        <SaveModal
          mode="update"
          entityName="Category"
          itemName={nameValue.trim()}
          onConfirm={updateDestinationCategoryById}
          onCancel={() => setShowSaveModal(false)}
          isLoading={isSaving}
        />
      )}

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteModal && (
        <DeleteModal
          name={category.name}
          onConfirm={deleteDestinationCategoryById}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}