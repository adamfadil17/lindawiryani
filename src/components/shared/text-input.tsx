export default function TextInput({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 text-sm text-primary placeholder:text-primary/50 bg-white border focus:outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-primary/30 focus:border-primary/50"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
