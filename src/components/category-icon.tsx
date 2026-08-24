import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bus,
  Car,
  Clapperboard,
  Coffee,
  Ellipsis,
  Gamepad2,
  Gift,
  Heart,
  HeartPulse,
  Home,
  Leaf,
  Music,
  PawPrint,
  Phone,
  Plane,
  Repeat,
  Scissors,
  Shirt,
  ShoppingCart,
  Star,
  Utensils,
  Wallet,
  Wrench,
} from "lucide-react";
import type { CategoryIconId } from "@/lib/types";
import { cn } from "@/lib/utils";

const MAP: Record<CategoryIconId, LucideIcon> = {
  food: Utensils,
  transport: Bus,
  home: Home,
  fun: Clapperboard,
  health: HeartPulse,
  clothes: Shirt,
  beauty: Scissors,
  gifts: Gift,
  pets: PawPrint,
  study: BookOpen,
  subs: Repeat,
  other: Ellipsis,
  star: Star,
  heart: Heart,
  coffee: Coffee,
  car: Car,
  plane: Plane,
  phone: Phone,
  game: Gamepad2,
  music: Music,
  wallet: Wallet,
  cart: ShoppingCart,
  leaf: Leaf,
  wrench: Wrench,
};

export function CategoryIcon({
  id,
  className,
}: {
  id: CategoryIconId | string;
  className?: string;
}) {
  const Icon = MAP[id as CategoryIconId] ?? Ellipsis;
  return <Icon className={cn("size-4", className)} strokeWidth={1.75} />;
}
