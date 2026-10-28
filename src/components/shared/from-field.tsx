export default function FormField({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs tracking-[0.2em] uppercase text-primary mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-foreground/80 text-sm mt-1.5">{hint}</p>}
    </div>
  );
}
