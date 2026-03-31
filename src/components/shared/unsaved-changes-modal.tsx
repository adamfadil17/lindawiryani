import { AlertTriangle, X } from "lucide-react";

export interface UnsavedChangesModalProps {
  onConfirmLeave: () => void;
  onCancel: () => void;
  mode: "create" | "update";
}

export default function UnsavedChangesModal({
  onConfirmLeave,
  onCancel,
  mode,
}: UnsavedChangesModalProps) {
  const isNew = mode === "create";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white w-full max-w-md mx-4 p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-primary/50 hover:text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 bg-amber-50 flex items-center justify-center mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
        </div>

        {/* Label */}
        <p className="text-primary/80 tracking-[0.2em] uppercase text-[10px] mb-2">
          Unsaved Changes
        </p>

        {/* Title */}
        <h2 className="text-primary text-xl font-semibold mb-3">
          Leave without saving?
        </h2>

        {/* Description */}
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          {isNew
            ? "You have unsaved changes on this new venue. If you leave now, all your input will be lost."
            : "You have unsaved changes on this venue. If you leave now, your edits will be discarded."}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-primary/30 text-primary text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/10 transition-colors"
          >
            Keep Editing
          </button>
          <button
            onClick={onConfirmLeave}
            className="flex-1 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:primary/80 transition-colors"
          >
            Leave Anyway
          </button>
        </div>
      </div>
    </div>
  );
}