"use client";

import { useCallback, useMemo, useState } from "react";

import {
  rowsToTranslationState,
  TRANSLATION_FIELDS,
  translationStateToPayload,
  type TranslationEntity,
  type TranslationState,
} from "@/lib/content/translation-fields";

export type ContentStatus = "draft" | "published";

/**
 * Shared state for the translation editor + publish toggle in admin forms.
 */
export function useContentEditor(entity: TranslationEntity) {
  const [translations, setTranslationsState] = useState<TranslationState>({});
  const [status, setStatusState] = useState<ContentStatus>("draft");
  const [dirty, setDirty] = useState(false);

  const fields = useMemo(() => TRANSLATION_FIELDS[entity], [entity]);

  const setTranslations = useCallback((next: TranslationState) => {
    setTranslationsState(next);
    setDirty(true);
  }, []);

  const setStatus = useCallback((next: ContentStatus) => {
    setStatusState((current) => {
      if (current !== next) setDirty(true);
      return next;
    });
  }, []);

  const load = useCallback(
    (data: {
      status?: string;
      translations?: { locale: string; [key: string]: unknown }[];
    }) => {
      setTranslationsState(
        rowsToTranslationState(data.translations, TRANSLATION_FIELDS[entity]),
      );
      setStatusState(data.status === "published" ? "published" : "draft");
      setDirty(false);
    },
    [entity],
  );

  const reset = useCallback(() => {
    setTranslationsState({});
    setStatusState("draft");
    setDirty(false);
  }, []);

  const markSaved = useCallback(() => setDirty(false), []);

  const payload = useCallback(
    () => ({
      status,
      translations: translationStateToPayload(translations),
    }),
    [status, translations],
  );

  return {
    fields,
    translations,
    setTranslations,
    status,
    setStatus,
    dirty,
    load,
    reset,
    markSaved,
    payload,
  };
}
