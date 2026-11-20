import { useEffect, useRef, useState } from "react";
import { ImageIcon, ImageOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function ImageUpload({
  value,
  onChange,
  error,
  inputId = "image-upload",
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  inputId?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [previewStatus, setPreviewStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");
  const previewRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setPreviewStatus("loading");
    const image = previewRef.current;
    if (image?.complete) {
      setPreviewStatus(image.naturalWidth > 0 ? "loaded" : "error");
    }
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Allow selecting the same file again after an error.
    e.target.value = "";
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a PNG, JPG, or WebP image",
      });
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error("File too large", {
        description: `Image must be less than ${MAX_SIZE_MB}MB`,
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.data?.url) {
        throw new Error(
          payload?.error ??
            (response.status === 401
              ? "Your session has expired. Please sign in again."
              : "Upload failed"),
        );
      }

      onChange(payload.data.url as string);
      toast.success("Image uploaded successfully!");
    } catch (uploadError) {
      toast.error("Upload failed", {
        description:
          uploadError instanceof Error ? uploadError.message : "Please try again",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          uploading
            ? "border-primary/30 bg-primary/5 opacity-70"
            : error
              ? "border-red-700 bg-red-50/30 hover:bg-red-50/50"
              : "border-primary/30 bg-primary/5 hover:bg-primary/10"
        }`}
      >
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleFileChange}
          className="hidden"
          id={inputId}
          disabled={uploading}
        />
        <label
          htmlFor={inputId}
          className={`flex flex-col items-center gap-2 ${
            uploading ? "cursor-wait" : "cursor-pointer"
          }`}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          ) : (
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          )}
          <div className="text-sm text-primary">
            <p className="font-medium">
              {uploading ? "Uploading…" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or WebP up to {MAX_SIZE_MB}MB
            </p>
          </div>
        </label>
      </div>

      {value && (
        <div className="mt-3 flex items-start gap-3">
          {/* Plain img: works for local /uploads paths and legacy Cloudinary URLs. */}
          <div className="relative h-20 w-28 shrink-0 overflow-hidden border border-primary/20 bg-primary/[0.06]">
            {previewStatus === "loading" && (
              <Loader2 className="absolute inset-0 m-auto h-5 w-5 animate-spin text-primary/40" />
            )}
            {previewStatus === "error" && (
              <ImageOff className="absolute inset-0 m-auto h-5 w-5 text-muted-foreground" />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Uploaded preview"
              ref={previewRef}
              className={`h-full w-full object-cover transition-opacity ${
                previewStatus === "loaded" ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setPreviewStatus("loaded")}
              onError={() => setPreviewStatus("error")}
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            disabled={uploading}
            className="text-xs text-red-700 hover:text-red-700 hover:cursor-pointer transition-colors disabled:opacity-50"
          >
            Remove image
          </button>
        </div>
      )}
      {error && <p className="text-red-700 text-xs mt-2">{error}</p>}
    </div>
  );
}
