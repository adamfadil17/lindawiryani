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
        className={`w-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground bg-white border focus:outline-none transition-colors ${
          error
            ? "border-red-700 focus:border-red-700 focus:ring-1 focus:ring-red-700"
            : "border-field focus:border-primary focus:ring-1 focus:ring-primary"
        }`}
      />
      {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
    </div>
  );
}
