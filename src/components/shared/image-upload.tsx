"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { getAuthHeaders } from "@/lib/getAuthHeaders";

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

  // Upload the file to the server and keep only the returned URL in the form,
  // so image bytes never end up in the database.
  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: getAuthHeaders(),
        body,
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.data?.url) {
        throw new Error(json?.error ?? "Upload failed");
      }
      onChange(json.data.url as string);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload image", {
        description:
          err instanceof Error ? err.message : "Please try uploading again",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset so selecting the same file again still fires onChange.
    e.target.value = "";
    if (!file) return;

    // Validate file type - only PNG, JPG, JPEG
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a PNG or JPG image",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Image must be less than 5MB",
      });
      return;
    }

    void uploadFile(file);
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          error
            ? "border-red-700 bg-red-50/30 hover:bg-red-50/50"
            : "border-primary/30 bg-primary/5 hover:bg-primary/10"
        }`}
      >
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
          id={inputId}
          disabled={uploading}
        />
        <label
          htmlFor={inputId}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <ImageIcon className="w-8 h-8 text-muted-foreground" />
          <div className="text-sm text-primary">
            <p className="font-medium">
              {uploading ? "Uploading…" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-foreground/70">PNG or JPG up to 5MB</p>
          </div>
        </label>
      </div>
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="mt-2 text-xs text-red-700 hover:text-red-700 hover:cursor-pointer transition-colors"
        >
          Remove image
        </button>
      )}
      {error && <p className="text-red-700 text-xs mt-2">{error}</p>}
    </div>
  );
}
