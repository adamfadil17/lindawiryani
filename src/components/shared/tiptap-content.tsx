import { cn } from "@/lib/utils";

/**
 * Renders sanitized TipTap HTML with the shared typography styles.
 * Content is sanitized on the server before it is stored.
 */
export default function TipTapContent({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn("tiptap-content", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
