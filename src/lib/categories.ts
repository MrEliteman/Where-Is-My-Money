import type { BuiltinCategoryId, CategoryIconId } from "./types";

export interface BuiltinCategory {
  id: BuiltinCategoryId;
  color: string;
  icon: CategoryIconId;
}

export const BUILTIN_CATEGORIES: BuiltinCategory[] = [
  { id: "food", color: "#b56a4a", icon: "food" },
  { id: "transport", color: "#6d7c8a", icon: "transport" },
  { id: "home", color: "#8a7a62", icon: "home" },
  { id: "fun", color: "#a56d72", icon: "fun" },
  { id: "health", color: "#6f8f6a", icon: "health" },
  { id: "clothes", color: "#7a6b5c", icon: "clothes" },
  { id: "beauty", color: "#8b7570", icon: "beauty" },
  { id: "gifts", color: "#7d8a62", icon: "gifts" },
  { id: "pets", color: "#9a7a4a", icon: "pets" },
  { id: "study", color: "#5e6e7a", icon: "study" },
  { id: "subs", color: "#5f7a78", icon: "subs" },
  { id: "other", color: "#7a7a74", icon: "other" },
];

export const CATEGORY_COLORS = [
  "#b56a4a",
  "#6d7c8a",
  "#8a7a62",
  "#a56d72",
  "#6f8f6a",
  "#7a6b5c",
  "#8b7570",
  "#7d8a62",
  "#9a7a4a",
  "#5e6e7a",
  "#5f7a78",
  "#7a7a74",
  "#4f5d4a",
  "#8c5a4a",
  "#4a5a6a",
];

export const CUSTOM_ICONS: CategoryIconId[] = [
  "star",
  "heart",
  "coffee",
  "car",
  "plane",
  "phone",
  "game",
  "music",
  "wallet",
  "cart",
  "leaf",
  "wrench",
];

export function isBuiltin(id: string): id is BuiltinCategoryId {
  return BUILTIN_CATEGORIES.some((c) => c.id === id);
}
