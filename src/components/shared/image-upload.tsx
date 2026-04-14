import { ImageIcon } from "lucide-react";
import { toast } from "sonner";

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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description: "Please upload a PNG or JPG image",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Image must be less than 5MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onChange(dataUrl);
        toast.success("Image uploaded successfully!");
      };
      reader.onerror = () => {
        toast.error("Failed to read file", {
          description: "Please try uploading again",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          error
            ? "border-red-500 bg-red-50/30 hover:bg-red-50/50"
            : "border-primary/30 bg-primary/5 hover:bg-primary/10"
        }`}
      >
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
          id={inputId}
        />
        <label
          htmlFor={inputId}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <ImageIcon className="w-8 h-8 text-primary/40" />
          <div className="text-sm text-primary">
            <p className="font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-primary/60">PNG or JPG up to 5MB</p>
          </div>
        </label>
      </div>
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="mt-2 text-xs text-red-500 hover:text-red-700 hover:cursor-pointer transition-colors"
        >
          Remove image
        </button>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
