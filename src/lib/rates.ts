import { CURRENCIES } from "./currencies";
import type { RateCache } from "./types";

/** Approximate USD-based fallbacks used when the network is unavailable. */
export const FALLBACK_USD: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  RUB: 82,
  UAH: 41.5,
  KZT: 510,
  BYN: 3.27,
  PLN: 3.85,
  CZK: 22.8,
  TRY: 39,
  AZN: 1.7,
  BRL: 5.45,
  CNY: 7.18,
  JPY: 149,
  KRW: 1380,
  INR: 84,
  CHF: 0.86,
  SEK: 10.6,
  NOK: 10.9,
  CAD: 1.37,
  AUD: 1.53,
  MXN: 18.6,
  GEL: 2.72,
  AMD: 387,
  UZS: 12800,
  AED: 3.6725,
};

export function convert(
  amount: number,
  from: string,
  to: string,
  quotes: Record<string, number>,
): number {
  if (from === to) return amount;
  const fromRate = quotes[from] ?? FALLBACK_USD[from] ?? 1;
  const toRate = quotes[to] ?? FALLBACK_USD[to] ?? 1;
  if (!fromRate || !toRate) return amount;
  return (amount / fromRate) * toRate;
}

export async function fetchUsdRates(): Promise<RateCache> {
  const res = await fetch("https://open.er-api.com/v6/latest/USD", {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("rates");
  const data = (await res.json()) as {
    result?: string;
    time_last_update_utc?: string;
    rates?: Record<string, number>;
  };
  if (data.result !== "success" || !data.rates) throw new Error("rates");
  const wanted = new Set(CURRENCIES.map((c) => c.code));
  const quotes: Record<string, number> = { USD: 1 };
  for (const code of wanted) {
    const v = data.rates[code];
    if (typeof v === "number" && v > 0) quotes[code] = v;
    else if (FALLBACK_USD[code]) quotes[code] = FALLBACK_USD[code];
  }
  return {
    base: "USD",
    date: data.time_last_update_utc ?? new Date().toISOString(),
    quotes,
    fetchedAt: Date.now(),
  };
}

export function quotesOf(cache: RateCache | null): Record<string, number> {
  return cache?.quotes ?? FALLBACK_USD;
}
