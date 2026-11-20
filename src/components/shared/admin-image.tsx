"use client";

import Image, { type ImageProps } from "next/image";
import { ImageOff, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type LoadStatus = "loading" | "loaded" | "error";

export interface AdminImageProps extends ImageProps {
  /** Extra classes for the loading / error placeholder layer. */
  placeholderClassName?: string;
  /** Size/colour of the spinner, e.g. `h-4 w-4` for small thumbnails. */
  spinnerClassName?: string;
  /** Hide the broken-image fallback icon (the image is still hidden). */
  showErrorFallback?: boolean;
}

/**
 * `next/image` with a loading state for the admin area.
 *
 * The image must be rendered inside a positioned container (the existing admin
 * cards and preview panels already are), because the placeholder uses
 * `absolute inset-0`. The image is hidden until `onLoad`, then fades in.
 */
export function AdminImage({
  className,
  placeholderClassName,
  spinnerClassName,
  showErrorFallback = true,
  onLoad,
  onError,
  src,
  ...props
}: AdminImageProps) {
  const [status, setStatus] = useState<LoadStatus>("loading");
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setStatus("loading");

    // Cached images can finish before React attaches onLoad.
    const image = imageRef.current;
    if (image?.complete) {
      setStatus(image.naturalWidth > 0 ? "loaded" : "error");
    }
  }, [src]);

  return (
    <>
      {status === "loading" && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-primary/[0.06]",
            placeholderClassName,
          )}
        >
          <Loader2
            className={cn("h-6 w-6 animate-spin text-primary/40", spinnerClassName)}
          />
        </div>
      )}

      {status === "error" && showErrorFallback && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-primary/[0.06] text-muted-foreground",
            placeholderClassName,
          )}
        >
          <ImageOff className={cn("h-6 w-6", spinnerClassName)} />
        </div>
      )}

      <Image
        {...props}
        ref={imageRef}
        src={src}
        className={cn(
          className,
          "transition-opacity duration-200",
          status !== "loaded" && "opacity-0",
        )}
        onLoad={(event) => {
          setStatus("loaded");
          onLoad?.(event);
        }}
        onError={(event) => {
          setStatus("error");
          onError?.(event);
        }}
      />
    </>
  );
}
