import { Save, X } from "lucide-react";

export default function SaveModal({
  onConfirm,
  onCancel,
  isNew,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isNew: boolean;
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
          className="absolute top-4 right-4 text-primary/50 hover:text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6">
          <Save className="w-5 h-5 text-primary" />
        </div>

        <p className="text-primary/80 tracking-[0.2em] uppercase text-[10px] mb-2">
          Confirm Action
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          {isNew ? "Create Destination" : "Save Changes"}
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          {isNew
            ? "Are you sure you want to create this new destination? It will be immediately visible on the public website."
            : "Are you sure you want to save these changes? The destination will be updated immediately on the public website."}
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
            className="flex-1 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/80 transition-colors"
          >
            {isNew ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
