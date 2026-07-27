"use client";

import { useLayoutEffect } from "react";

/**
 * Base UI's Select/Dialog/Popover/etc. portal their floating content
 * straight to document.body by default, which escapes the .theme-weeggo
 * class applied to a wrapper div deep inside the tree — CSS custom
 * properties only cascade along the DOM, not the React tree, so a portaled
 * popup falls back to the root (dark, DOMUSAI-era) theme values even though
 * everything else on the page looks right.
 *
 * Toggling the class on <html> instead means every portal — wherever in the
 * DOM it actually lands — is still a descendant of an element carrying the
 * right variables, without patching each portal-based component one by one.
 * Shared across admin/agent/partner rather than one copy per section.
 */
export function ThemeWeeggoScope() {
  useLayoutEffect(() => {
    document.documentElement.classList.add("theme-weeggo");
    return () => {
      document.documentElement.classList.remove("theme-weeggo");
    };
  }, []);

  return null;
}
