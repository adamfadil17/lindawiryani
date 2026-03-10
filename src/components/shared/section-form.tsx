export default function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-primary/20 p-6 lg:p-8">
      <div className="mb-6 pb-5 border-b border-primary/20">
        <h2 className="text-primary font-semibold tracking-wide">{title}</h2>
        {subtitle && <p className="text-primary/80 text-sm mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
