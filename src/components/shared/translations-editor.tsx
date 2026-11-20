"use client";

import { useState } from "react";
import LocaleTabs from "@/components/shared/locale-tabs";
import TagsInput from "@/components/shared/tags-input";
import TipTapEditor from "@/components/shared/tiptap-editor";
import { SelectInput } from "@/components/shared/select-input";
import { localeLabels } from "@/i18n/routing";
import {
  TRANSLATION_FIELDS,
  translationCompleteness,
  type TranslationEntity,
  type TranslationField,
  type TranslationLocaleCode,
  type TranslationState,
} from "@/lib/content/translation-fields";

const inputClass =
  "w-full px-4 py-3 min-h-[42px] text-sm text-primary placeholder:text-muted-foreground bg-white border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors";
const labelClass =
  "block text-primary/90 tracking-[0.06em] text-xs font-semibold mb-1.5";

export default function TranslationsEditor({
  entity,
  value,
  onChange,
}: {
  entity: TranslationEntity;
  value: TranslationState;
  onChange: (next: TranslationState) => void;
}) {
  const fields = TRANSLATION_FIELDS[entity];
  const [activeLocale, setActiveLocale] =
    useState<TranslationLocaleCode>("id");
  const completeness = translationCompleteness(value, fields);
  const activeLabel = localeLabels[activeLocale];

  const values = value[activeLocale] ?? {};

  const setField = (key: string, fieldValue: unknown) => {
    onChange({
      ...value,
      [activeLocale]: { ...values, [key]: fieldValue },
    });
  };

  return (
    <div className="bg-white border border-primary/20">
      <div className="px-5 py-4 border-b border-primary/15">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.12em]">
              Translations
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              English is edited above. Empty fields fall back to English.
            </p>
          </div>
          <p className="text-muted-foreground text-xs tracking-widest uppercase">
            {activeLabel} · {completeness[activeLocale]}%
          </p>
        </div>
      </div>

      <div className="px-5 pt-4">
        <LocaleTabs
          activeLocale={activeLocale}
          onChange={setActiveLocale}
          completeness={completeness}
        />
      </div>

      <div className="p-5 space-y-5">
        {fields.map((field) => (
          <TranslationFieldInput
            key={`${activeLocale}-${field.key}`}
            field={field}
            value={values[field.key]}
            onChange={(fieldValue) => setField(field.key, fieldValue)}
          />
        ))}

        <div className="flex items-center justify-between pt-2 border-t border-primary/10">
          <p className="text-xs text-muted-foreground">
            Switching tabs keeps unsaved translations for every locale.
          </p>
          <button
            type="button"
            onClick={() => {
              const next = { ...value };
              delete next[activeLocale];
              onChange(next);
            }}
            className="text-xs text-red-700 hover:text-red-800 transition-colors"
          >
            Clear {activeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function TranslationFieldInput({
  field,
  value,
  onChange,
}: {
  field: TranslationField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const id = `translation-${field.key}`;

  if (field.type === "html") {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <TipTapEditor
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
        />
      </div>
    );
  }

  if (field.type === "list") {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <TagsInput
          values={Array.isArray(value) ? (value as string[]) : []}
          onChange={onChange}
          placeholder={`Add ${field.label.toLowerCase()} and press Enter`}
        />
      </div>
    );
  }

  if (field.type === "pair") {
    const pair = Array.isArray(value) ? value : ["", ""];
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            className={inputClass}
            value={String(pair[0] ?? "")}
            onChange={(e) => onChange([e.target.value, String(pair[1] ?? "")])}
            placeholder="First line"
          />
          <input
            className={inputClass}
            value={String(pair[1] ?? "")}
            onChange={(e) => onChange([String(pair[0] ?? ""), e.target.value])}
            placeholder="Second line"
          />
        </div>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label className={labelClass} htmlFor={id}>
          {field.label}
        </label>
        <textarea
          id={id}
          rows={field.rows ?? 4}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      </div>
    );
  }

  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {field.label}
      </label>
      <input
        id={id}
        type="text"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

/** Small publish/draft control used by every content form (task 5.6). */
export function ContentStatusField({
  value,
  onChange,
  previewHref,
}: {
  value: "draft" | "published";
  onChange: (status: "draft" | "published") => void;
  previewHref?: string | null;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-primary/20 px-5 py-4">
      <div>
        <label className={labelClass} htmlFor="content-status">
          Publish status
        </label>
        <SelectInput
          id="content-status"
          value={value}
          onChange={(e) =>
            onChange(e.target.value === "published" ? "published" : "draft")
          }
          wrapperClassName="w-fit"
          className="w-auto min-w-[260px]"
        >
          <option value="draft">Draft — hidden from the public site</option>
          <option value="published">Published — visible on the public site</option>
        </SelectInput>
      </div>
      {value === "published" && previewHref ? (
        <a
          href={previewHref}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-primary underline underline-offset-2 hover:text-muted-foreground"
        >
          View live ↗
        </a>
      ) : null}
    </div>
  );
}
