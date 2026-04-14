"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
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
  Trash2,
  Plus,
} from "lucide-react";
import { DestinationCategory, DestinationLocation } from "@/types";
import {
  destinationCategoryFormSchema,
  destinationLocationFormSchema,
  type DestinationCategoryFormData,
  type DestinationLocationFormData,
} from "@/utils/form-validators";
import SaveModal from "@/components/shared/save-modal";
import DeleteModal from "@/components/shared/delete-modal";
import UnsavedChangesModal from "@/components/shared/unsaved-changes-modal";
import { getAuthHeaders } from "@/lib/getAuthHeaders";
import { toast } from "sonner";

function LocationRow({
  location,
  categoryId,
  onUpdated,
  onDeleted,
}: {
  location: DestinationLocation;
  categoryId: string;
  onUpdated: (updated: DestinationLocation) => void;
  onDeleted: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<DestinationLocationFormData>({
    resolver: zodResolver(destinationLocationFormSchema),
    defaultValues: {
      name: location.name,
      slug: location.slug,
      category_id: categoryId,
    },
  });

  const onSave = async (data: DestinationLocationFormData) => {
    setIsSaving(true);
    try {
      const response = await axios.patch(
        `/api/destination-locations/${location.id}`,
        { name: data.name, slug: data.slug },
        { headers: getAuthHeaders(true) },
      );
      onUpdated(response.data.data);
      setIsEditing(false);
      toast.success("Location updated");
    } catch {
      toast.error("Failed to update location");
    } finally {
      setIsSaving(false);
    }
  };

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/destination-locations/${location.id}`, {
        headers: getAuthHeaders(),
      });
      onDeleted(location.id);
      toast.success(`"${location.name}" deleted`);
    } catch {
      toast.error("Failed to delete location");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 sm:p-4 border-b border-primary/10 last:border-0 group">
      <div className="w-8 h-8 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
        <MapPin className="w-3.5 h-3.5 text-primary/40" />
      </div>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSave)} className="space-y-2">
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Location name"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    reset();
                    setIsEditing(false);
                  }
                }}
                className="w-full px-3 py-2 text-sm text-primary border border-primary/30 focus:outline-none focus:border-primary/60 transition-colors"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("slug")}
                type="text"
                placeholder="location-slug"
                className="w-full px-3 py-2 text-sm text-primary border border-primary/30 focus:outline-none focus:border-primary/60 transition-colors font-mono"
              />
              {errors.slug && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.slug.message}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSaving || !isDirty}
                className="flex items-center gap-1 bg-primary text-white text-xs tracking-widest uppercase px-3 py-2 hover:bg-primary/90 transition-colors disabled:opacity-50 hover:cursor-pointer"
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
                onClick={() => {
                  reset();
                  setIsEditing(false);
                }}
                disabled={isSaving}
                className="flex items-center gap-1 border border-primary/20 text-primary text-xs tracking-widest uppercase px-3 py-2 hover:bg-primary/5 transition-colors hover:cursor-pointer"
              >
                <X className="w-3 h-3" />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="text-primary font-medium text-sm">{location.name}</p>
            <p className="text-primary/40 text-xs font-mono mt-0.5">
              {location.slug}
            </p>
            {location.destinations && (
              <p className="text-primary/50 text-xs mt-1">
                {location.destinations.length}{" "}
                {location.destinations.length === 1
                  ? "destination"
                  : "destinations"}
              </p>
            )}
          </>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-0.5 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="w-8 h-8 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-primary/10 transition-colors hover:cursor-pointer"
            title="Edit location"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-8 h-8 flex items-center justify-center text-primary/40 hover:text-red-500 hover:bg-red-50 transition-colors hover:cursor-pointer"
            title="Delete location"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal
          name={location.name}
          onConfirm={onDelete}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}

function AddLocationForm({
  categoryId,
  onCreated,
  onCancel,
}: {
  categoryId: string;
  onCreated: (location: DestinationLocation) => void;
  onCancel: () => void;
}) {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<DestinationLocationFormData>({
    resolver: zodResolver(destinationLocationFormSchema),
    defaultValues: { name: "", slug: "", category_id: categoryId },
  });

  const nameValue = watch("name");
  const slugRef = useRef<boolean>(false);
  useEffect(() => {
    if (!slugRef.current) {
      const generated = nameValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setValue("slug", generated, { shouldValidate: false });
    }
  }, [nameValue, setValue]);

  const onSave = async (data: DestinationLocationFormData) => {
    setIsSaving(true);
    try {
      const response = await axios.post(
        "/api/destination-locations",
        { ...data, category_id: categoryId },
        { headers: getAuthHeaders(true) },
      );
      onCreated(response.data.data);
      reset();
      toast.success("Location added");
    } catch {
      toast.error("Failed to add location");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="p-3 sm:p-4 border-t border-primary/10 bg-primary/2 space-y-2"
    >
      <p className="text-xs tracking-widest uppercase text-primary/50 mb-2">
        New Location
      </p>
      <div>
        <input
          {...register("name")}
          type="text"
          placeholder="Location name"
          autoFocus
          onFocus={() => {
            slugRef.current = false;
          }}
          className="w-full px-3 py-2 text-sm text-primary border border-primary/30 focus:outline-none focus:border-primary/60 transition-colors bg-white"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("slug")}
          type="text"
          placeholder="location-slug"
          onFocus={() => {
            slugRef.current = true;
          }}
          className="w-full px-3 py-2 text-sm text-primary border border-primary/30 focus:outline-none focus:border-primary/60 transition-colors font-mono bg-white"
        />
        {errors.slug && (
          <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-1.5 bg-primary text-white text-xs tracking-widest uppercase px-3 py-2 hover:bg-primary/90 transition-colors disabled:opacity-50 hover:cursor-pointer"
        >
          {isSaving ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Plus className="w-3 h-3" />
          )}
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="flex items-center gap-1 border border-primary/20 text-primary text-xs tracking-widest uppercase px-3 py-2 hover:bg-primary/5 transition-colors hover:cursor-pointer"
        >
          <X className="w-3 h-3" />
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function DestinationCategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [category, setCategory] = useState<DestinationCategory | null>(null);
  const [locations, setLocations] = useState<DestinationLocation[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showAddLocation, setShowAddLocation] = useState(false);

  const [unsavedModal, setUnsavedModal] = useState<{
    open: boolean;
    pendingHref?: string;
  }>({ open: false });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<DestinationCategoryFormData>({
    resolver: zodResolver(destinationCategoryFormSchema),
    defaultValues: { name: "", slug: "", description: "" },
  });

  const nameValue = watch("name");
  const hasUnsavedChanges = isEditing && isDirty;

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

  const guardedNavigate = useCallback(
    (href: string) => {
      if (hasUnsavedChanges && !isSaving) {
        setUnsavedModal({ open: true, pendingHref: href });
      } else {
        router.push(href);
      }
    },
    [hasUnsavedChanges, isSaving, router],
  );

  const getDestinationCategoryById = useCallback(async () => {
    setIsLoadingData(true);
    setApiError(null);
    try {
      const response = await axios.get(`/api/destination-categories/${id}`);
      const data: DestinationCategory = response.data.data;
      setCategory(data);
      setLocations(data.locations ?? []);
      reset({
        name: data.name,
        slug: data.slug,
        description: data.description ?? "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError(
          error.response?.status === 404
            ? "Category not found."
            : "Failed to load category. Please try again.",
        );
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

  const onSubmitForm = async (data: DestinationCategoryFormData) => {
    if (
      data.name === category?.name &&
      data.slug === category?.slug &&
      data.description === (category?.description ?? "")
    ) {
      setIsEditing(false);
      return;
    }
    setShowSaveModal(true);
  };

  const descriptionValue = watch("description");

  const updateDestinationCategoryById = async () => {
    setIsSaving(true);
    setApiError(null);
    try {
      const response = await axios.patch(
        `/api/destination-categories/${id}`,
        { name: nameValue.trim(), description: descriptionValue.trim() },
        { headers: getAuthHeaders(true) },
      );
      const updated: DestinationCategory = response.data.data;
      setCategory(updated);
      reset({
        name: updated.name,
        slug: updated.slug,
        description: updated.description ?? "",
      });
      setIsEditing(false);
      setShowSaveModal(false);
      toast.success("Category saved");
    } catch {
      setApiError("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteDestinationCategoryById = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/destination-categories/${id}`, {
        headers: getAuthHeaders(),
      });
      router.push("/dashboard/destination-categories");
    } catch {
      setApiError("Failed to delete category.");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleEditCancel = () => {
    reset({
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
    });
    setIsEditing(false);
  };

  const handleLocationCreated = useCallback((location: DestinationLocation) => {
    setLocations((prev) => [...prev, location]);
    setShowAddLocation(false);
  }, []);

  const handleLocationUpdated = useCallback((updated: DestinationLocation) => {
    setLocations((prev) =>
      prev.map((l) => (l.id === updated.id ? updated : l)),
    );
  }, []);

  const handleLocationDeleted = useCallback((deletedId: string) => {
    setLocations((prev) => prev.filter((l) => l.id !== deletedId));
  }, []);

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
        <div className="lg:col-span-1 space-y-4 sm:space-y-5">
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

            <div className="mb-4">
              <label className="block text-xs tracking-widest uppercase text-primary/40 mb-2">
                Category Name
              </label>
              {isEditing ? (
                <form
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="space-y-2"
                >
                  <input
                    {...register("name")}
                    type="text"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Escape") handleEditCancel();
                    }}
                    className="w-full px-3 py-2.5 text-sm text-primary border border-primary/30 focus:outline-none focus:border-primary/60 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      {errors.name.message}
                    </p>
                  )}
                  <div className="mt-2">
                    <label className="block text-xs tracking-widest uppercase text-primary/40 mb-1.5">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      rows={3}
                      placeholder="Short category description"
                      className="w-full px-3 py-2.5 text-sm text-primary border border-primary/30 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
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
                  <div>
                    <p className="text-primary font-semibold text-lg">
                      {category.name}
                    </p>
                    <p className="text-primary/40 text-xs font-mono mt-0.5">
                      {category.slug}
                    </p>
                    {category.description && (
                      <p className="text-primary/60 text-sm mt-2 leading-relaxed">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      reset({
                        name: category.name,
                        slug: category.slug,
                        description: category.description ?? "",
                      });
                    }}
                    className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-primary/10 active:bg-primary/10 transition-colors hover:cursor-pointer"
                    title="Edit name"
                  >
                    <Pencil className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-primary/10 pt-4">
              <div className="flex items-center justify-between py-2 border-b border-primary/10">
                <span className="text-xs text-primary/50 tracking-wider">
                  Locations
                </span>
                <span className="text-sm font-semibold text-primary">
                  {locations.length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-red-100 p-4 sm:p-6">
            <p className="text-xs tracking-widest uppercase text-red-400 mb-3">
              Danger Zone
            </p>
            <p className="text-primary/60 text-xs leading-relaxed mb-4">
              Deleting this category will also remove all its locations.
              Destinations linked to those locations will need to be reassigned.
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

        <div className="lg:col-span-2">
          <div className="bg-white border border-primary/20 overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-primary/10">
              <div>
                <p className="text-primary font-medium text-sm">
                  Locations in this Category
                </p>
                <p className="text-primary/50 text-xs mt-0.5">
                  {locations.length}{" "}
                  {locations.length === 1 ? "location" : "locations"}
                </p>
              </div>
              {!showAddLocation && (
                <button
                  onClick={() => setShowAddLocation(true)}
                  className="inline-flex items-center gap-1.5 bg-primary text-white text-xs tracking-widest uppercase px-3 py-2 hover:bg-primary/90 transition-colors hover:cursor-pointer shrink-0 ml-4"
                >
                  <Plus className="w-3 h-3" />
                  Add Location
                </button>
              )}
            </div>

            {locations.length === 0 && !showAddLocation ? (
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
                <MapPin className="w-7 h-7 text-primary/15 mb-3" />
                <p className="text-primary/60 text-xs tracking-widest uppercase mb-1.5">
                  No Locations
                </p>
                <p className="text-primary/40 text-sm">
                  No locations in this category yet.
                </p>
                <button
                  onClick={() => setShowAddLocation(true)}
                  className="mt-4 text-xs tracking-widest uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors hover:cursor-pointer"
                >
                  Add First Location
                </button>
              </div>
            ) : (
              <div>
                {locations.map((location) => (
                  <LocationRow
                    key={location.id}
                    location={location}
                    categoryId={category.id}
                    onUpdated={handleLocationUpdated}
                    onDeleted={handleLocationDeleted}
                  />
                ))}
              </div>
            )}

            {showAddLocation && (
              <AddLocationForm
                categoryId={category.id}
                onCreated={handleLocationCreated}
                onCancel={() => setShowAddLocation(false)}
              />
            )}
          </div>
        </div>
      </div>

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
