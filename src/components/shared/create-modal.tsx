import { Plus, X, Loader2 } from "lucide-react";
import { type FormEventHandler } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { DestinationCategoryFormData } from "@/utils/form-validators";

export interface CreateModalProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  isLoading: boolean;
  register: UseFormRegister<DestinationCategoryFormData>;
  errors: FieldErrors<DestinationCategoryFormData>;
}

export function CreateModal({
  onSubmit,
  onCancel,
  isLoading,
  register,
  errors,
}: CreateModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!isLoading ? onCancel : undefined}
      />

      <div className="relative bg-white w-full sm:max-w-lg sm:mx-4 p-6 sm:p-8 shadow-2xl rounded-t-2xl sm:rounded-none">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="absolute top-4 right-4 text-primary/50 hover:cursor-pointer hover:text-primary active:text-primary transition-colors w-8 h-8 flex items-center justify-center disabled:opacity-30"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5 sm:mb-6">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          ) : (
            <Plus className="w-5 h-5 text-primary" />
          )}
        </div>
        <p className="text-primary/60 tracking-[0.2em] uppercase text-xs mb-2">
          Add New
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          Create Category
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-6 sm:mb-8">
          Enter the details for the new destination category.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs tracking-widest uppercase text-primary/40 mb-2"
            >
              Category Name
            </label>
            <input
              id="name"
              {...register("name")}
              type="text"
              placeholder="e.g., Beach Resorts"
              className="w-full px-3 py-2.5 text-sm text-primary border border-primary/30 focus:outline-none focus:border-primary/60 transition-colors"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-xs tracking-widest uppercase text-primary/40 mb-2"
            >
              Slug{" "}
              <span className="normal-case tracking-normal text-primary/30">
                (auto-generated)
              </span>
            </label>
            <input
              id="slug"
              {...register("slug")}
              type="text"
              readOnly
              className="w-full px-3 py-2.5 text-sm text-primary/50 bg-primary/5 border border-primary/20 font-mono cursor-not-allowed select-none"
              tabIndex={-1}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-xs tracking-widest uppercase text-primary/40 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={4}
              placeholder="Describe this destination category..."
              className="w-full px-3 py-2.5 text-sm text-primary border border-primary/30 focus:outline-none focus:border-primary/60 transition-colors resize-none"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 border border-primary/30 text-primary text-xs tracking-widest uppercase px-5 py-3.5 sm:py-3 hover:cursor-pointer hover:bg-primary/10 active:bg-primary/10 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3.5 sm:py-3 hover:cursor-pointer hover:bg-primary/90 active:bg-primary/80 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Create
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
