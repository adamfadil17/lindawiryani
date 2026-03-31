import { Save, X, Loader2, LucideIcon } from "lucide-react";

export type SaveModalMode = "create" | "update";

export interface SaveModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  mode: SaveModalMode;
  isLoading: boolean;
  // Entity info
  entityName: string;       // e.g. "Destination", "Article", "User"
  itemName?: string;        // e.g. "Bali Paradise", "My First Post"
  // Optional overrides
  subtitle?: string;        // overrides "Confirm Action"
  description?: string;     // overrides the default description
  icon?: LucideIcon;        // overrides the Save icon
}

export default function SaveModal({
  onConfirm,
  onCancel,
  mode,
  isLoading,
  entityName,
  itemName,
  subtitle,
  description,
  icon: Icon = Save,
}: SaveModalProps) {
  const isNew = mode === "create";

  const defaultDescription = isNew
    ? `Are you sure you want to create ${itemName ? `"${itemName}"` : `this new ${entityName.toLowerCase()}`}? It will be immediately visible on the public website.`
    : `Are you sure you want to update ${itemName ? `"${itemName}"` : `this ${entityName.toLowerCase()}`}? Changes will be reflected immediately on the public website.`;

  const title = isNew ? `Create ${entityName}` : `Update ${entityName}`;

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
          className="absolute top-4 right-4 text-primary/50 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          ) : (
            <Icon className="w-5 h-5 text-primary" />
          )}
        </div>

        <p className="text-primary/80 tracking-[0.2em] uppercase text-[10px] mb-2">
          {subtitle ?? "Confirm Action"}
        </p>
        <h2 className="text-primary text-xl font-semibold mb-3">
          {title}
        </h2>
        <p className="text-primary/70 text-sm leading-relaxed mb-8">
          {description ?? defaultDescription}
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
            className="flex-1 bg-primary text-white text-xs tracking-widest uppercase px-5 py-3 hover:cursor-pointer hover:bg-primary/80 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {isNew ? "Creating..." : "Updating..."}
              </>
            ) : (
              isNew ? "Create" : "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}