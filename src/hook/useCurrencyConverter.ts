import { useEffect, useState } from "react";

import {
  FALLBACK_USD_TO_IDR,
  getUsdToIdr,
} from "@/lib/currency";

/**
 * USD→IDR rate for public price displays.
 *
 * The request is de-duplicated and cached by `@/lib/currency` (12h in
 * localStorage, plus a server cache), so mounting this in several components
 * does not cause several network calls.
 */
export function useCurrencyConverter(): number {
  const [exchangeRate, setExchangeRate] = useState<number>(FALLBACK_USD_TO_IDR);

  useEffect(() => {
    let cancelled = false;

    getUsdToIdr().then((rate) => {
      if (!cancelled) setExchangeRate(rate);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return exchangeRate;
}
