import { currencySymbol } from "./currencies";
import type { LangCode } from "./types";

const LOCALE: Record<LangCode, string> = {
  ru: "ru-RU",
  en: "en-US",
  uk: "uk-UA",
  kk: "kk-KZ",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  pt: "pt-BR",
  tr: "tr-TR",
  az: "az-AZ",
  pl: "pl-PL",
  it: "it-IT",
};

export function localeOf(lang: LangCode): string {
  return LOCALE[lang];
}

export function formatMoney(
  amount: number,
  currency: string,
  lang: LangCode,
  opts?: { compact?: boolean; maxFrac?: number },
): string {
  const abs = Math.abs(amount);
  const maxFrac =
    opts?.maxFrac ??
    (abs >= 1000 ? 0 : abs >= 100 ? 0 : abs >= 10 ? 1 : 2);
  try {
    return new Intl.NumberFormat(localeOf(lang), {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      maximumFractionDigits: maxFrac,
      minimumFractionDigits: maxFrac === 0 ? 0 : Math.min(2, maxFrac),
      notation: opts?.compact && abs >= 10000 ? "compact" : "standard",
    }).format(amount);
  } catch {
    const n = amount.toLocaleString(localeOf(lang), {
      maximumFractionDigits: maxFrac,
      minimumFractionDigits: 0,
    });
    return `${n} ${currencySymbol(currency)}`;
  }
}

export function formatNumber(n: number, lang: LangCode, maxFrac = 0): string {
  return n.toLocaleString(localeOf(lang), {
    maximumFractionDigits: maxFrac,
    minimumFractionDigits: 0,
  });
}

export function isoDate(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseIso(date: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function startOfWeek(d: Date): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = x.getDay();
  const diff = day === 0 ? 6 : day - 1;
  x.setDate(x.getDate() - diff);
  return x;
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function sameDay(a: string, b: string): boolean {
  return a === b;
}
