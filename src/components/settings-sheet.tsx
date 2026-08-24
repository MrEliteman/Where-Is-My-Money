import { useRef } from "react";
import { Download, Moon, Sun, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CURRENCIES } from "@/lib/currencies";
import { LANGUAGES, t } from "@/lib/i18n";
import { APP_VERSION, useLedger } from "@/lib/store";
import type { LangCode, ThemeMode } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SettingsSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const lang = useLedger((s) => s.language);
  const theme = useLedger((s) => s.theme);
  const currency = useLedger((s) => s.displayCurrency);
  const limit = useLedger((s) => s.monthlyLimit);
  const userName = useLedger((s) => s.userName);
  const rates = useLedger((s) => s.rates);
  const setLanguage = useLedger((s) => s.setLanguage);
  const setTheme = useLedger((s) => s.setTheme);
  const setDisplayCurrency = useLedger((s) => s.setDisplayCurrency);
  const setMonthlyLimit = useLedger((s) => s.setMonthlyLimit);
  const setUserName = useLedger((s) => s.setUserName);
  const exportState = useLedger((s) => s.exportState);
  const importState = useLedger((s) => s.importState);
  const resetAll = useLedger((s) => s.resetAll);
  const refreshRates = useLedger((s) => s.refreshRates);
  const fileRef = useRef<HTMLInputElement>(null);

  function download() {
    const blob = new Blob([exportState()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moi-traty-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function onFile(file: File) {
    try {
      const text = await file.text();
      const ok = importState(JSON.parse(text));
      toast(ok ? t(lang, "imported") : t(lang, "importError"));
    } catch {
      toast(t(lang, "importError"));
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t(lang, "settings")}</SheetTitle>
          <SheetDescription>{t(lang, "footer")}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-6 pb-10">
          <section>
            <Label>{t(lang, "nameLabel")}</Label>
            <Input
              className="mt-2"
              value={userName}
              placeholder={t(lang, "namePlaceholder")}
              onChange={(e) => setUserName(e.target.value)}
            />
          </section>

          <section>
            <Label>{t(lang, "language")}</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code as LangCode)}
                  className={cn(
                    "h-10 rounded-[var(--radius-md)] px-3 text-left text-sm",
                    lang === l.code
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                      : "bg-[var(--color-surface-2)]",
                  )}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </section>

          <section>
            <Label>{t(lang, "displayCurrency")}</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setDisplayCurrency(c.code)}
                  className={cn(
                    "flex h-9 items-center gap-1.5 rounded-full px-3 text-sm tabular",
                    currency === c.code
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                      : "bg-[var(--color-surface-2)]",
                  )}
                >
                  {c.code}
                  <span className="opacity-70">{c.symbol}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 text-xs text-[var(--color-muted)] underline-offset-2 hover:underline"
              onClick={async () => {
                const ok = await refreshRates();
                toast(ok ? t(lang, "ratesUpdated") : t(lang, "ratesOffline"));
              }}
            >
              {rates ? t(lang, "ratesUpdated") : t(lang, "ratesOffline")}
            </button>
          </section>

          <section>
            <Label>{t(lang, "theme")}</Label>
            <div className="mt-2 flex gap-2">
              {(
                [
                  ["dark", t(lang, "themeDark"), Moon],
                  ["light", t(lang, "themeLight"), Sun],
                ] as const
              ).map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id as ThemeMode)}
                  className={cn(
                    "flex h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] text-sm",
                    theme === id
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                      : "bg-[var(--color-surface-2)]",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <Label>{t(lang, "monthlyLimit")}</Label>
            <p className="mt-1 text-xs text-[var(--color-subtle)]">{t(lang, "limitHint")}</p>
            <Input
              className="mt-2 tabular"
              inputMode="decimal"
              value={limit ?? ""}
              placeholder="—"
              onChange={(e) => {
                const v = e.target.value.replace(",", ".");
                if (v === "") setMonthlyLimit(null);
                else {
                  const n = Number(v);
                  if (Number.isFinite(n) && n >= 0) setMonthlyLimit(n);
                }
              }}
            />
          </section>

          <Separator />

          <section className="space-y-2">
            <p className="text-xs text-[var(--color-subtle)]">{t(lang, "backupHint")}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={download}>
                <Download />
                {t(lang, "exportData")}
              </Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                <Upload />
                {t(lang, "importData")}
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void onFile(f);
                  e.target.value = "";
                }}
              />
            </div>
            <Button
              variant="ghost"
              className="text-[var(--color-danger)]"
              onClick={() => {
                if (window.confirm(t(lang, "resetConfirm"))) {
                  resetAll();
                  onOpenChange(false);
                }
              }}
            >
              <Trash2 />
              {t(lang, "resetData")}
            </Button>
          </section>

          <p className="text-xs text-[var(--color-subtle)]">Moi Traty · {APP_VERSION}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
