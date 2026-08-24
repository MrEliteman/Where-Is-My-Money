import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENCIES, DEFAULT_CURRENCY_BY_LANG } from "@/lib/currencies";
import { LANGUAGES, t, type MsgKey } from "@/lib/i18n";
import { useLedger } from "@/lib/store";
import type { LangCode, ThemeMode } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Onboarding() {
  const complete = useLedger((s) => s.completeOnboarding);
  const seedDemo = useLedger((s) => s.seedDemo);
  const initialLang = useLedger((s) => s.language);
  const initialCur = useLedger((s) => s.displayCurrency);

  const [lang, setLang] = useState<LangCode>(initialLang);
  const [currency, setCurrency] = useState(initialCur);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [limit, setLimit] = useState("");
  const [name, setName] = useState("");
  const [withDemo, setWithDemo] = useState(false);

  const tr = (k: MsgKey) => t(lang, k);

  function finish() {
    const n = Number(limit.replace(",", "."));
    complete({
      language: lang,
      displayCurrency: currency,
      theme,
      userName: name.trim(),
      monthlyLimit: Number.isFinite(n) && n > 0 ? n : null,
    });
    if (withDemo) seedDemo();
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pt-8 pb-[5.5rem]">
      <p className="rise-in text-[11px] font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
        1.3.0-beta
      </p>
      <h1
        className="rise-in mt-2 font-[family-name:var(--font-display)] text-[1.85rem] leading-[1.15] tracking-[-0.03em] text-[var(--color-fg)] sm:text-[2.15rem]"
        style={{ animationDelay: "40ms" }}
      >
        {tr("onboardTitle")}
      </h1>
      <p
        className="rise-in mt-2 max-w-md text-sm leading-relaxed text-[var(--color-muted)]"
        style={{ animationDelay: "80ms" }}
      >
        {tr("onboardSub")}
      </p>

      <div className="mt-6 space-y-5">
        <section className="rise-in" style={{ animationDelay: "120ms" }}>
          <Label>{tr("onboardLang")}</Label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLang(l.code);
                  setCurrency(DEFAULT_CURRENCY_BY_LANG[l.code]);
                }}
                className={cn(
                  "h-9 rounded-full px-3 text-sm transition-[background-color,color] duration-150",
                  lang === l.code
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                    : "bg-[var(--color-surface)] text-[var(--color-fg)] shadow-[var(--shadow-border)]",
                )}
              >
                {l.native}
              </button>
            ))}
          </div>
        </section>

        <section className="rise-in" style={{ animationDelay: "160ms" }}>
          <Label>{tr("onboardCurrency")}</Label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CURRENCIES.slice(0, 12).map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setCurrency(c.code)}
                className={cn(
                  "flex h-9 items-center gap-1.5 rounded-full px-3 text-sm tabular transition-[background-color,color] duration-150",
                  currency === c.code
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                    : "bg-[var(--color-surface)] text-[var(--color-fg)] shadow-[var(--shadow-border)]",
                )}
              >
                <span>{c.code}</span>
                <span className="opacity-70">{c.symbol}</span>
              </button>
            ))}
          </div>
        </section>

        <section
          className="rise-in grid grid-cols-2 gap-3"
          style={{ animationDelay: "200ms" }}
        >
          <div>
            <Label>{tr("theme")}</Label>
            <div className="mt-2 flex gap-2">
              {(["dark", "light"] as const).map((th) => (
                <button
                  key={th}
                  type="button"
                  onClick={() => setTheme(th)}
                  className={cn(
                    "h-10 flex-1 rounded-[var(--radius-md)] text-sm",
                    theme === th
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                      : "bg-[var(--color-surface)] shadow-[var(--shadow-border)]",
                  )}
                >
                  {th === "dark" ? tr("themeDark") : tr("themeLight")}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>{tr("onboardLimit")}</Label>
            <Input
              className="mt-2 h-10 tabular"
              inputMode="decimal"
              placeholder="—"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
        </section>

        <section className="rise-in" style={{ animationDelay: "240ms" }}>
          <Label>{tr("nameLabel")}</Label>
          <Input
            className="mt-2 h-10"
            placeholder={tr("namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </section>

        <label
          className="rise-in flex min-h-11 items-center gap-3 text-sm text-[var(--color-muted)]"
          style={{ animationDelay: "280ms" }}
        >
          <input
            type="checkbox"
            checked={withDemo}
            onChange={(e) => setWithDemo(e.target.checked)}
            className="size-4 accent-[var(--color-accent)]"
          />
          {tr("demoFill")}
        </label>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 px-5 py-3 backdrop-blur-sm">
        <div className="mx-auto max-w-lg">
          <Button className="h-12 w-full" onClick={finish}>
            {tr("onboardStart")}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
