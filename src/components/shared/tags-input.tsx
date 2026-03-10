import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function TagsInput({
  values,
  onChange,
  placeholder,
  error,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  error?: string;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const val = input.trim();
    if (val && !values.includes(val)) {
      onChange([...values, val]);
      setInput("");
    }
  };

  const remove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder || "Type and press Enter"}
          className={`flex-1 px-4 py-2.5 text-sm text-primary placeholder:text-primary/50 bg-white border focus:outline-none transition-colors ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-primary/30 focus:border-primary/50"
          }`}
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2.5 bg-primary/10 text-primary hover:cursor-pointer hover:bg-primary/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((v, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-2.5 py-1 border border-primary/30"
            >
              {v}
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-primary/50 hover:text-primary/80 hover:cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}