import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchUsdRates } from "./rates";
import { uid } from "./utils";
import type {
  AppState,
  CustomCategory,
  Expense,
  LangCode,
  Period,
  ThemeMode,
} from "./types";

export const APP_VERSION = "1.3.0-beta";
const STORAGE_KEY = "moi-traty-v13";

type Actions = {
  hydrateTheme: () => void;
  setLanguage: (language: LangCode) => void;
  setDisplayCurrency: (displayCurrency: string) => void;
  setTheme: (theme: ThemeMode) => void;
  setPeriod: (period: Period) => void;
  setLastCategory: (id: string | null) => void;
  setMonthlyLimit: (monthlyLimit: number | null) => void;
  setUserName: (userName: string) => void;
  completeOnboarding: (partial?: Partial<AppState>) => void;
  addExpense: (e: Omit<Expense, "id" | "createdAt">) => void;
  updateExpense: (id: string, patch: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addCustomCategory: (c: Omit<CustomCategory, "id" | "createdAt">) => CustomCategory;
  deleteCustomCategory: (id: string) => void;
  refreshRates: () => Promise<boolean>;
  importState: (raw: unknown) => boolean;
  exportState: () => string;
  resetAll: () => void;
  seedDemo: () => void;
};

function defaults(): AppState {
  return {
    version: APP_VERSION,
    expenses: [],
    customCategories: [],
    monthlyLimit: null,
    theme: "dark",
    language: "ru",
    displayCurrency: "RUB",
    onboardingDone: false,
    period: "month",
    lastCategoryId: null,
    rates: null,
    userName: "",
  };
}

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "system" ? systemDark : theme === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

export const useLedger = create<AppState & Actions>()(
  persist(
    (set, get) => ({
      ...defaults(),
      hydrateTheme: () => applyTheme(get().theme),
      setLanguage: (language) => set({ language }),
      setDisplayCurrency: (displayCurrency) => set({ displayCurrency }),
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      setPeriod: (period) => set({ period }),
      setLastCategory: (lastCategoryId) => set({ lastCategoryId }),
      setMonthlyLimit: (monthlyLimit) => set({ monthlyLimit }),
      setUserName: (userName) => set({ userName }),
      completeOnboarding: (partial) => {
        const theme = partial?.theme ?? get().theme;
        applyTheme(theme);
        set({ ...partial, onboardingDone: true });
      },
      addExpense: (e) =>
        set({
          expenses: [
            {
              ...e,
              id: uid("exp"),
              createdAt: Date.now(),
              note: e.note.trim(),
            },
            ...get().expenses,
          ],
          lastCategoryId: e.categoryId,
        }),
      updateExpense: (id, patch) =>
        set({
          expenses: get().expenses.map((x) =>
            x.id === id ? { ...x, ...patch } : x,
          ),
        }),
      deleteExpense: (id) =>
        set({ expenses: get().expenses.filter((x) => x.id !== id) }),
      addCustomCategory: (c) => {
        const cat: CustomCategory = {
          ...c,
          id: uid("cat"),
          createdAt: Date.now(),
        };
        set({ customCategories: [...get().customCategories, cat] });
        return cat;
      },
      deleteCustomCategory: (id) =>
        set({
          customCategories: get().customCategories.filter((c) => c.id !== id),
          expenses: get().expenses.filter((e) => e.categoryId !== id),
          lastCategoryId: get().lastCategoryId === id ? null : get().lastCategoryId,
        }),
      refreshRates: async () => {
        try {
          const rates = await fetchUsdRates();
          set({ rates });
          return true;
        } catch {
          return false;
        }
      },
      importState: (raw) => {
        if (!raw || typeof raw !== "object") return false;
        const d = raw as Partial<AppState>;
        if (!Array.isArray(d.expenses)) return false;
        set({
          expenses: d.expenses,
          customCategories: Array.isArray(d.customCategories)
            ? d.customCategories
            : [],
          monthlyLimit:
            typeof d.monthlyLimit === "number" || d.monthlyLimit === null
              ? d.monthlyLimit
              : get().monthlyLimit,
          theme: d.theme ?? get().theme,
          language: d.language ?? get().language,
          displayCurrency: d.displayCurrency ?? get().displayCurrency,
          period: d.period ?? get().period,
          lastCategoryId: d.lastCategoryId ?? null,
          userName: typeof d.userName === "string" ? d.userName : get().userName,
          onboardingDone: true,
        });
        applyTheme(get().theme);
        return true;
      },
      exportState: () => {
        const s = get();
        return JSON.stringify(
          {
            version: APP_VERSION,
            exportedAt: new Date().toISOString(),
            expenses: s.expenses,
            customCategories: s.customCategories,
            monthlyLimit: s.monthlyLimit,
            theme: s.theme,
            language: s.language,
            displayCurrency: s.displayCurrency,
            period: s.period,
            lastCategoryId: s.lastCategoryId,
            userName: s.userName,
          },
          null,
          2,
        );
      },
      resetAll: () => {
        const next = defaults();
        applyTheme(next.theme);
        set({ ...next, onboardingDone: false });
      },
      seedDemo: () => {
        const { displayCurrency, language } = get();
        const today = new Date();
        const iso = (offset: number) => {
          const d = new Date(today);
          d.setDate(d.getDate() - offset);
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${y}-${m}-${day}`;
        };
        const samples: Omit<Expense, "id" | "createdAt">[] = [
          { amount: 420, currency: displayCurrency, categoryId: "food", note: language === "en" ? "coffee & lunch" : "", date: iso(0) },
          { amount: 180, currency: displayCurrency, categoryId: "transport", note: "", date: iso(0) },
          { amount: 1290, currency: displayCurrency, categoryId: "home", note: "", date: iso(2) },
          { amount: 650, currency: displayCurrency, categoryId: "fun", note: "", date: iso(3) },
          { amount: 890, currency: displayCurrency, categoryId: "clothes", note: "", date: iso(5) },
          { amount: 299, currency: displayCurrency, categoryId: "subs", note: "", date: iso(6) },
          { amount: 540, currency: displayCurrency, categoryId: "food", note: "", date: iso(1) },
          { amount: 210, currency: displayCurrency, categoryId: "health", note: "", date: iso(4) },
        ];
        set({
          expenses: samples.map((e, i) => ({
            ...e,
            id: uid("demo"),
            createdAt: Date.now() - i * 1000,
          })),
          monthlyLimit: get().monthlyLimit ?? 25000,
        });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      partialize: (s) => ({
        version: s.version,
        expenses: s.expenses,
        customCategories: s.customCategories,
        monthlyLimit: s.monthlyLimit,
        theme: s.theme,
        language: s.language,
        displayCurrency: s.displayCurrency,
        onboardingDone: s.onboardingDone,
        period: s.period,
        lastCategoryId: s.lastCategoryId,
        rates: s.rates,
        userName: s.userName,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme);
      },
    },
  ),
);
