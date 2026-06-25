import { useMemo } from "react";
import { OFFER_URL } from "@/config";

const PASSTHROUGH_PARAMS = ["source", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export function useOfferUrl(): string {
  return useMemo(() => {
    const incoming = new URLSearchParams(window.location.search);
    const toAppend = new URLSearchParams();

    for (const key of PASSTHROUGH_PARAMS) {
      const val = incoming.get(key);
      if (val) toAppend.set(key, val);
    }

    if (!toAppend.size) return OFFER_URL;

    const separator = OFFER_URL.includes("?") ? "&" : "?";
    return `${OFFER_URL}${separator}${toAppend.toString()}`;
  }, []);
}
