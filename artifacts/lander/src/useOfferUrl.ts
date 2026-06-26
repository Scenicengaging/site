import { useMemo } from "react";
import { OFFER_URL } from "@/config";

const PASSTHROUGH_PARAMS = ["source", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export function useOfferUrl(baseUrl?: string): string {
  const url = baseUrl ?? OFFER_URL;
  return useMemo(() => {
    const incoming = new URLSearchParams(window.location.search);
    const toAppend = new URLSearchParams();

    for (const key of PASSTHROUGH_PARAMS) {
      const val = incoming.get(key);
      if (val) toAppend.set(key, val);
    }

    if (!toAppend.size) return url;

    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${toAppend.toString()}`;
  }, [url]);
}
