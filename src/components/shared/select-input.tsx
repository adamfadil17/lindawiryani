"use client";

import type { SelectHTMLAttributes } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Shared admin <select> styling.
 *
 * Native selects need `appearance-none` + a custom chevron, otherwise every
 * page ends up with its own padding, border and text colour. The base style
 * below is the single source of truth for both form fields and list filters.
 */
const SELECT_BASE =
  "w-full min-h-[42px] appearance-none border bg-white py-3 pl-3.5 pr-9 text-sm text-primary transition-colors focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50";

export interface SelectInputProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  className?: string;
  wrapperClassName?: string;
  /** Red border for validation errors. */
  invalid?: boolean;
  /** Shows a spinner instead of the chevron (e.g. saving in place). */
  loading?: boolean;
  /** `inverted` is for active filter pills (solid primary background). */
  tone?: "default" | "inverted";
}

export function SelectInput({
  className,
  wrapperClassName,
  invalid = false,
  loading = false,
  tone = "default",
  disabled,
  children,
  ...props
}: SelectInputProps) {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <select
        {...props}
        disabled={disabled || loading}
        className={cn(
          SELECT_BASE,
          invalid
            ? "border-red-300 hover:border-red-400 focus:border-red-400 focus:ring-red-200/50"
            : "border-primary/20 hover:border-primary/40",
          tone === "inverted" && "border-primary bg-primary text-white hover:bg-primary/90",
          className,
        )}
      >
        {children}
      </select>

      {loading ? (
        <Loader2 className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-muted-foreground" />
      ) : (
        <ChevronDown
          className={cn(
            "pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2",
            tone === "inverted" ? "text-white/80" : "text-primary/60",
          )}
        />
      )}
    </div>
  );
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  /** Value that represents "no filter". Defaults to "all". */
  defaultValue?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  wrapperClassName?: string;
  "aria-label"?: string;
}

/**
 * Admin list filter. Uses the standard select styling and switches to a solid
 * primary pill when the filter is active — the same pattern on every list page.
 */
export function FilterSelect({
  value,
  onChange,
  options,
  defaultValue = "all",
  disabled,
  loading,
  className,
  wrapperClassName,
  "aria-label": ariaLabel,
}: FilterSelectProps) {
  const isActive = value !== defaultValue;

  return (
    <SelectInput
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      loading={loading}
      aria-label={ariaLabel}
      tone={isActive ? "inverted" : "default"}
      wrapperClassName={cn("shrink-0", wrapperClassName)}
      className={cn(
        "w-auto min-w-[150px] tracking-normal",
        className,
      )}
    >
      {options.map((option) => (
        <option
          key={option.id}
          value={option.id}
          className="bg-white text-primary"
        >
          {option.label}
        </option>
      ))}
    </SelectInput>
  );
}
