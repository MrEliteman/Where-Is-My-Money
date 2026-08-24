export type Period = "week" | "month" | "all";
export type ThemeMode = "dark" | "light" | "system";

export type LangCode =
  | "ru"
  | "en"
  | "uk"
  | "kk"
  | "es"
  | "fr"
  | "de"
  | "pt"
  | "tr"
  | "az"
  | "pl"
  | "it";

export type BuiltinCategoryId =
  | "food"
  | "transport"
  | "home"
  | "fun"
  | "health"
  | "clothes"
  | "beauty"
  | "gifts"
  | "pets"
  | "study"
  | "subs"
  | "other";

export type CategoryIconId =
  | BuiltinCategoryId
  | "star"
  | "heart"
  | "coffee"
  | "car"
  | "plane"
  | "phone"
  | "game"
  | "music"
  | "wallet"
  | "cart"
  | "leaf"
  | "wrench";

export interface CustomCategory {
  id: string;
  name: string;
  color: string;
  icon: CategoryIconId;
  createdAt: number;
}

export interface Expense {
  id: string;
  amount: number;
  currency: string;
  categoryId: string;
  note: string;
  date: string;
  createdAt: number;
}

export interface RateCache {
  base: string;
  date: string;
  quotes: Record<string, number>;
  fetchedAt: number;
}

export interface AppState {
  version: string;
  expenses: Expense[];
  customCategories: CustomCategory[];
  monthlyLimit: number | null;
  theme: ThemeMode;
  language: LangCode;
  displayCurrency: string;
  onboardingDone: boolean;
  period: Period;
  lastCategoryId: string | null;
  rates: RateCache | null;
  userName: string;
}
