import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  ChevronDown,
  Pencil,
  Plus,
  Search,
  Settings2,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { CategoryIcon } from "@/components/category-icon";
import { Donut } from "@/components/donut";
import { Onboarding } from "@/components/onboarding";
import { SettingsSheet } from "@/components/settings-sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BUILTIN_CATEGORIES, CATEGORY_COLORS, CUSTOM_ICONS, isBuiltin } from "@/lib/categories";
import { CURRENCIES } from "@/lib/currencies";
import {
  addDays,
  formatMoney,
  isoDate,
  localeOf,
  parseIso,
  startOfMonth,
  startOfWeek,
} from "@/lib/format";
import { catHint, catName, t } from "@/lib/i18n";
import { convert, quotesOf } from "@/lib/rates";
import { useLedger } from "@/lib/store";
import type { CategoryIconId, Expense, Period } from "@/lib/types";
import { cn } from "@/lib/utils";

export function LedgerApp() {
  const onboardingDone = useLedger((s) => s.onboardingDone);
  const hydrateTheme = useLedger((s) => s.hydrateTheme);
  const refreshRates = useLedger((s) => s.refreshRates);
  const rates = useLedger((s) => s.rates);

  useEffect(() => {
    hydrateTheme();
  }, [hydrateTheme]);

  useEffect(() => {
    if (!onboardingDone) return;
    const stale = !rates || Date.now() - rates.fetchedAt > 12 * 60 * 60 * 1000;
    if (stale) void refreshRates();
  }, [onboardingDone, rates, refreshRates]);

  if (!onboardingDone) return <Onboarding />;
  return <Home />;
}

function Home() {
  const lang = useLedger((s) => s.language);
  const theme = useLedger((s) => s.theme);
  const displayCurrency = useLedger((s) => s.displayCurrency);
  const period = useLedger((s) => s.period);
  const setPeriod = useLedger((s) => s.setPeriod);
  const expenses = useLedger((s) => s.expenses);
  const customCategories = useLedger((s) => s.customCategories);
  const monthlyLimit = useLedger((s) => s.monthlyLimit);
  const lastCategoryId = useLedger((s) => s.lastCategoryId);
  const setLastCategory = useLedger((s) => s.setLastCategory);
  const userName = useLedger((s) => s.userName);
  const rates = useLedger((s) => s.rates);
  const addExpense = useLedger((s) => s.addExpense);
  const updateExpense = useLedger((s) => s.updateExpense);
  const deleteExpense = useLedger((s) => s.deleteExpense);
  const addCustomCategory = useLedger((s) => s.addCustomCategory);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string | null>(lastCategoryId);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(isoDate());
  const [expCurrency, setExpCurrency] = useState(displayCurrency);
  const [amountError, setAmountError] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [newCatOpen, setNewCatOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState(CATEGORY_COLORS[0]);
  const [newCatIcon, setNewCatIcon] = useState<CategoryIconId>("star");

  useEffect(() => {
    setExpCurrency(displayCurrency);
  }, [displayCurrency]);

  useEffect(() => {
    document.documentElement.lang = lang;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = theme === "system" ? systemDark : theme === "dark";
    document.documentElement.classList.toggle("dark", dark);
  }, [lang, theme]);

  const quotes = quotesOf(rates);
  const toDisplay = (e: Expense) =>
    convert(e.amount, e.currency, displayCurrency, quotes);

  const inPeriod = useMemo(() => {
    const now = new Date();
    const from =
      period === "week"
        ? startOfWeek(now)
        : period === "month"
          ? startOfMonth(now)
          : null;
    return expenses.filter((e) => {
      if (!from) return true;
      return parseIso(e.date) >= from;
    });
  }, [expenses, period]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return inPeriod;
    return inPeriod.filter((e) => {
      const name = catName(
        lang,
        e.categoryId,
        customCategories.find((c) => c.id === e.categoryId)?.name,
      ).toLowerCase();
      return name.includes(q) || e.note.toLowerCase().includes(q);
    });
  }, [inPeriod, query, lang, customCategories]);

  const spent = filtered.reduce((s, e) => s + toDisplay(e), 0);
  const monthSpent = useMemo(() => {
    const from = startOfMonth(new Date());
    return expenses
      .filter((e) => parseIso(e.date) >= from)
      .reduce((s, e) => s + toDisplay(e), 0);
  }, [expenses, displayCurrency, quotes]);

  const daysInPeriod =
    period === "week" ? 7 : period === "month" ? new Date().getDate() : Math.max(1, uniqueDays(filtered));
  const avg = spent / daysInPeriod;

  const byCat = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of filtered) {
      map.set(e.categoryId, (map.get(e.categoryId) ?? 0) + toDisplay(e));
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [filtered, displayCurrency, quotes]);

  const top = byCat[0];
  const slices = byCat.map(([id, value]) => ({
    id,
    value,
    color: colorOf(id, customCategories),
  }));

  const remaining =
    monthlyLimit != null ? monthlyLimit - monthSpent : null;
  const over = remaining != null && remaining < 0;
  const limitPct =
    monthlyLimit && monthlyLimit > 0
      ? Math.min(100, (monthSpent / monthlyLimit) * 100)
      : 0;

  const grouped = useMemo(() => groupByDay(filtered), [filtered]);

  function submit() {
    const n = Number(amount.replace(",", "."));
    if (!Number.isFinite(n) || n <= 0) {
      setAmountError(true);
      return;
    }
    if (!selectedCat) return;
    setAmountError(false);
    if (editing) {
      updateExpense(editing.id, {
        amount: n,
        currency: expCurrency,
        categoryId: selectedCat,
        note,
        date,
      });
      setEditing(null);
    } else {
      addExpense({
        amount: n,
        currency: expCurrency,
        categoryId: selectedCat,
        note,
        date,
      });
    }
    setAmount("");
    setNote("");
    setDate(isoDate());
  }

  function startEdit(e: Expense) {
    setEditing(e);
    setSelectedCat(e.categoryId);
    setAmount(String(e.amount));
    setNote(e.note);
    setDate(e.date);
    setExpCurrency(e.currency);
    setLastCategory(e.categoryId);
  }

  function createCat() {
    const name = newCatName.trim();
    if (!name) {
      toast(t(lang, "errorCategoryName"));
      return;
    }
    const cat = addCustomCategory({ name, color: newCatColor, icon: newCatIcon });
    setSelectedCat(cat.id);
    setLastCategory(cat.id);
    setNewCatOpen(false);
    setNewCatName("");
  }

  const greeting = userName.trim()
    ? `${t(lang, "hello")}, ${userName.trim()}`
    : t(lang, "helloGuest");

  const convertedPreview = (() => {
    const n = Number(amount.replace(",", "."));
    if (!Number.isFinite(n) || n <= 0 || expCurrency === displayCurrency) return null;
    return convert(n, expCurrency, displayCurrency, quotes);
  })();

  return (
    <div className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-fg)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 pb-28 pt-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-[0.16em] text-[var(--color-muted)] uppercase">
              {t(lang, "appTitle")}
            </p>
            <h1 className="truncate font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] sm:text-[1.75rem]">
              {greeting}
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label={t(lang, "searchHint")}
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t(lang, "settings")}
              onClick={() => setSettingsOpen(true)}
            >
              <Settings2 className="size-5" />
            </Button>
          </div>
        </header>

        {searchOpen && (
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-subtle)]" />
            <Input
              autoFocus
              className="pl-9"
              placeholder={t(lang, "searchHint")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        )}

        <div className="flex rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-1 shadow-[var(--shadow-border)]">
          {(["week", "month", "all"] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={cn(
                "h-10 flex-1 rounded-[var(--radius-md)] text-sm font-medium transition-[background-color,color] duration-150",
                period === p
                  ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                  : "text-[var(--color-muted)]",
              )}
            >
              {p === "week"
                ? t(lang, "periodWeek")
                : p === "month"
                  ? t(lang, "periodMonth")
                  : t(lang, "periodAll")}
            </button>
          ))}
        </div>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[var(--radius-xl)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-border)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-[0.14em] text-[var(--color-muted)] uppercase">
                  {t(lang, "spent")}
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-[2.35rem] leading-none tracking-[-0.03em] tabular sm:text-5xl">
                  {formatMoney(spent, displayCurrency, lang)}
                </p>
                {monthlyLimit != null && (
                  <div className="mt-4 max-w-sm">
                    <div className="mb-1.5 flex items-baseline justify-between gap-3 text-xs">
                      <span
                        className={cn(
                          "font-medium",
                          over ? "text-[var(--color-danger)]" : "text-[var(--color-ok)]",
                        )}
                      >
                        {over
                          ? t(lang, "overLimit")
                          : `${t(lang, "remaining")} ${formatMoney(remaining ?? 0, displayCurrency, lang)}`}
                      </span>
                      <span className="text-[var(--color-subtle)] tabular">
                        {formatMoney(monthSpent, displayCurrency, lang, { maxFrac: 0 })}{" "}
                        {t(lang, "ofLimit")}{" "}
                        {formatMoney(monthlyLimit, displayCurrency, lang, { maxFrac: 0 })}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width] duration-300",
                          over ? "bg-[var(--color-danger)]" : "bg-[var(--color-ok)]",
                        )}
                        style={{ width: `${limitPct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <Donut slices={slices} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <Stat
              label={t(lang, "avgPerDay")}
              value={formatMoney(avg || 0, displayCurrency, lang)}
            />
            <Stat
              label={t(lang, "topCategory")}
              value={
                top
                  ? catName(
                      lang,
                      top[0],
                      customCategories.find((c) => c.id === top[0])?.name,
                    )
                  : t(lang, "noTopCategory")
              }
              hint={top ? formatMoney(top[1], displayCurrency, lang) : undefined}
            />
            <Stat
              label={t(lang, "thisMonth")}
              value={formatMoney(monthSpent, displayCurrency, lang)}
            />
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium tracking-[0.14em] text-[var(--color-muted)] uppercase">
              {t(lang, "pickCategory")}
            </p>
            <button
              type="button"
              className="text-xs text-[var(--color-muted)] underline-offset-2 hover:underline"
              onClick={() => setNewCatOpen(true)}
            >
              {t(lang, "newCategory")}
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {BUILTIN_CATEGORIES.map((c) => {
              const active = selectedCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedCat(c.id);
                    setLastCategory(c.id);
                    setEditing(null);
                  }}
                  className={cn(
                    "flex h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm transition-[background-color,color,box-shadow] duration-150",
                    active
                      ? "text-white"
                      : "bg-[var(--color-surface)] text-[var(--color-fg)] shadow-[var(--shadow-border)]",
                  )}
                  style={active ? { backgroundColor: c.color } : undefined}
                >
                  <CategoryIcon id={c.icon} />
                  {catName(lang, c.id)}
                </button>
              );
            })}
            {customCategories.map((c) => {
              const active = selectedCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedCat(c.id);
                    setLastCategory(c.id);
                    setEditing(null);
                  }}
                  className={cn(
                    "flex h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm",
                    active
                      ? "text-white"
                      : "bg-[var(--color-surface)] shadow-[var(--shadow-border)]",
                  )}
                  style={active ? { backgroundColor: c.color } : undefined}
                >
                  <CategoryIcon id={c.icon} />
                  {c.name}
                </button>
              );
            })}
          </div>
        </section>

        {selectedCat && (
          <section className="rounded-[var(--radius-xl)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-border)] sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {editing ? t(lang, "edit") : t(lang, "addExpense")}
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  {catHint(lang, selectedCat) ||
                    catName(
                      lang,
                      selectedCat,
                      customCategories.find((c) => c.id === selectedCat)?.name,
                    )}
                </p>
              </div>
              {editing && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    setEditing(null);
                    setAmount("");
                    setNote("");
                    setDate(isoDate());
                  }}
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
            <div className="grid items-start gap-3 sm:grid-cols-[1fr_auto]">
              <div>
                <Label>{t(lang, "amount")}</Label>
                <Input
                  className="mt-1.5 h-14 font-[family-name:var(--font-display)] text-2xl tabular"
                  inputMode="decimal"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setAmountError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submit();
                  }}
                />
                {amountError && (
                  <p className="mt-1 text-xs text-[var(--color-danger)]">
                    {t(lang, "errorAmount")}
                  </p>
                )}
                {convertedPreview != null && (
                  <p className="mt-1 text-xs text-[var(--color-muted)]">
                    ≈ {formatMoney(convertedPreview, displayCurrency, lang)}
                  </p>
                )}
              </div>
              <div>
                <Label>{t(lang, "expenseCurrency")}</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-1.5 h-14 min-w-32 justify-between px-3 text-base"
                    >
                      <span className="tabular">
                        {expCurrency} {CURRENCIES.find((c) => c.code === expCurrency)?.symbol}
                      </span>
                      <ChevronDown className="size-4 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="max-h-72 min-w-44">
                    {CURRENCIES.map((c) => (
                      <DropdownMenuItem
                        key={c.code}
                        onSelect={() => setExpCurrency(c.code)}
                      >
                        <span className="flex-1">{c.code}</span>
                        <span className="tabular text-[var(--color-muted)]">{c.symbol}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <Label>{t(lang, "noteOptional")}</Label>
                <Input
                  className="mt-1.5"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={catHint(lang, selectedCat)}
                />
              </div>
              <div>
                <Label>{t(lang, "selectDate")}</Label>
                <div className="relative mt-1.5">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-subtle)]" />
                  <Input
                    type="date"
                    className="pl-9"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Button className="mt-4 h-12 w-full" onClick={submit}>
              <Plus className="size-4" />
              {editing ? t(lang, "save") : t(lang, "add")}
            </Button>
          </section>
        )}

        <section>
          <p className="mb-3 text-xs font-medium tracking-[0.14em] text-[var(--color-muted)] uppercase">
            {t(lang, "history")}
          </p>
          {grouped.length === 0 ? (
            <div className="rounded-[var(--radius-xl)] bg-[var(--color-surface)] px-5 py-10 text-center text-sm leading-relaxed text-[var(--color-muted)] shadow-[var(--shadow-border)]">
              {query ? t(lang, "emptySearch") : t(lang, "emptyHistory")}
            </div>
          ) : (
            <div className="space-y-5">
              {grouped.map(([day, items]) => (
                <div key={day}>
                  <p className="mb-2 text-xs font-medium text-[var(--color-subtle)]">
                    {formatDayLabel(day, lang, t(lang, "today"), t(lang, "yesterday"))}
                  </p>
                  <ul className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-border)]">
                    {items.map((e, i) => {
                      const custom = customCategories.find((c) => c.id === e.categoryId);
                      const color = colorOf(e.categoryId, customCategories);
                      const icon = (custom?.icon ??
                        BUILTIN_CATEGORIES.find((c) => c.id === e.categoryId)?.icon ??
                        "other") as CategoryIconId;
                      const converted = toDisplay(e);
                      return (
                        <li
                          key={e.id}
                          className={cn(
                            "flex items-center gap-3 px-3 py-3",
                            i > 0 && "border-t border-[var(--color-border)]",
                          )}
                        >
                          <span
                            className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-white"
                            style={{ backgroundColor: color }}
                          >
                            <CategoryIcon id={icon} className="size-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {catName(lang, e.categoryId, custom?.name)}
                            </p>
                            {e.note ? (
                              <p className="truncate text-xs text-[var(--color-muted)]">
                                {e.note}
                              </p>
                            ) : null}
                          </div>
                          <div className="text-right">
                            <p className="tabular text-sm font-medium">
                              {formatMoney(e.amount, e.currency, lang)}
                            </p>
                            {e.currency !== displayCurrency && (
                              <p className="tabular text-[11px] text-[var(--color-subtle)]">
                                ≈ {formatMoney(converted, displayCurrency, lang)}
                              </p>
                            )}
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              className="grid size-10 place-items-center text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                              aria-label={t(lang, "edit")}
                              onClick={() => startEdit(e)}
                            >
                              <Pencil className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              className="grid size-10 place-items-center text-[var(--color-muted)] hover:text-[var(--color-danger)]"
                              aria-label={t(lang, "delete")}
                              onClick={() => {
                                if (window.confirm(t(lang, "confirmDelete"))) {
                                  deleteExpense(e.id);
                                  if (editing?.id === e.id) setEditing(null);
                                }
                              }}
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="pb-4 text-center text-xs text-[var(--color-subtle)]">
          {t(lang, "footer")}
        </p>
      </div>

      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />

      <Dialog open={newCatOpen} onOpenChange={setNewCatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t(lang, "createCategory")}</DialogTitle>
            <DialogDescription>{t(lang, "ownCategoryHint")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t(lang, "categoryNameHint")}</Label>
              <Input
                className="mt-1.5"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
              />
            </div>
            <div>
              <Label>{t(lang, "colorLabel")}</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORY_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewCatColor(c)}
                    className={cn(
                      "size-8 rounded-full",
                      newCatColor === c && "ring-2 ring-[var(--color-ring)] ring-offset-2 ring-offset-[var(--color-surface)]",
                    )}
                    style={{ backgroundColor: c }}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label>{t(lang, "iconLabel")}</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {CUSTOM_ICONS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setNewCatIcon(id)}
                    className={cn(
                      "grid size-10 place-items-center rounded-[var(--radius-md)]",
                      newCatIcon === id
                        ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                        : "bg-[var(--color-surface-2)]",
                    )}
                  >
                    <CategoryIcon id={id} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setNewCatOpen(false)}>
              {t(lang, "cancel")}
            </Button>
            <Button onClick={createCat}>{t(lang, "save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] px-4 py-3 shadow-[var(--shadow-border)]">
      <p className="text-[11px] font-medium tracking-[0.12em] text-[var(--color-muted)] uppercase">
        {label}
      </p>
      <p className="mt-1 truncate font-[family-name:var(--font-display)] text-xl tracking-tight tabular">
        {value}
      </p>
      {hint ? <p className="text-xs text-[var(--color-subtle)] tabular">{hint}</p> : null}
    </div>
  );
}

function colorOf(
  id: string,
  custom: { id: string; color: string }[],
): string {
  if (isBuiltin(id)) {
    return BUILTIN_CATEGORIES.find((c) => c.id === id)?.color ?? "#7a7a74";
  }
  return custom.find((c) => c.id === id)?.color ?? "#7a7a74";
}

function uniqueDays(items: Expense[]): number {
  return new Set(items.map((e) => e.date)).size || 1;
}

function groupByDay(items: Expense[]): [string, Expense[]][] {
  const map = new Map<string, Expense[]>();
  for (const e of items) {
    const list = map.get(e.date) ?? [];
    list.push(e);
    map.set(e.date, list);
  }
  return [...map.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));
}

function formatDayLabel(
  iso: string,
  lang: Parameters<typeof localeOf>[0],
  todayLabel: string,
  yesterdayLabel: string,
): string {
  const today = isoDate();
  const yest = isoDate(addDays(new Date(), -1));
  if (iso === today) return todayLabel;
  if (iso === yest) return yesterdayLabel;
  return parseIso(iso).toLocaleDateString(localeOf(lang), {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
