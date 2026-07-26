"use client";

import { useCallback, useMemo } from "react";

import { useDiscover } from "@/lib/discover/filters-context";
import { dictionaries, type Dictionary } from "./dictionary";

type DotPath<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : T[K] extends Record<string, unknown>
      ? DotPath<T[K], `${Prefix}${K}.`>
      : never;
}[keyof T & string];

/** Any "namespace.key" path into the Dictionary that resolves to a string. */
export type TranslationKey = DotPath<Dictionary>;

function resolve(dict: Dictionary, path: string): string {
  const value = path.split(".").reduce<unknown>((node, segment) => {
    if (node && typeof node === "object" && segment in node) {
      return (node as Record<string, unknown>)[segment];
    }
    return undefined;
  }, dict);

  return typeof value === "string" ? value : path;
}

/**
 * `t("landing.headline")` reads the current locale's string; pass `vars` to
 * fill in `{token}` placeholders (e.g. `t("landing.headlineReturning", {
 * name: visitorName })`). Locale comes from DiscoverProvider — same
 * localStorage-backed state as visitorName/filters/etc., so it's already
 * available everywhere the rest of the app's client state is.
 */
export function useTranslation() {
  const { locale, setLocale } = useDiscover();
  const dict = dictionaries[locale];

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const template = resolve(dict, key);
      if (!vars) return template;
      return Object.entries(vars).reduce(
        (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
        template
      );
    },
    [dict]
  );

  return useMemo(() => ({ t, locale, setLocale }), [t, locale, setLocale]);
}
