import { Trash2, X, Loader2 } from "lucide-react";

export default function DeleteModal({
  name,
  onConfirm,
  onCancel,
  isLoading,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!isLoading ? onCancel : undefined}
      />
      <div className="relative bg-white w-full max-w-md mx-4 p-8 shadow-2xl">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="absolute top-4 right-4 text-primary/50 hover:cursor-pointer hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 bg-red-50 flex items-center justify-center mb-6">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
          ) : (
            <Trash2 className="w-5 h-5 text-red-500" />
          )}
        </div>

        <p className="text-primary/80 tracking-[0.2em] uppercase text-[10px] mb-2">
          Confirm Delete
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          Delete Destination
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">
            &ldquo;{name}&rdquo;
          </span>
          ? This action cannot be undone and will permanently remove this
          destination from the system.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 border border-primary/30 text-primary text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-500 text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-red-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
