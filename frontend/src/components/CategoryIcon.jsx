import React from "react";
import {
  Activity,
  Cpu,
  Heart,
  MapPin,
  Coffee,
  Smile,
  Film,
  Book,
  ShoppingCart,
  MoreHorizontal
} from "lucide-react";

// All categories with icons
const categories = [
  { name: "Sports", icon: Activity },
  { name: "Technology", icon: Cpu },
  { name: "Health & Fitness", icon: Heart },
  { name: "Travel", icon: MapPin },
  { name: "Food & Recipes", icon: Coffee },
  { name: "Lifestyle", icon: Smile },
  { name: "Entertainment", icon: Film },
  { name: "Education", icon: Book },
  { name: "Fashion", icon: ShoppingCart },
  { name: "Others", icon: MoreHorizontal }
];

export const category_names = categories.map( v => v.name);

export default function CategoryIcon({ name, className }) {
  const category = categories.find(v => v.name === name);
  const Icon = category ? category.icon : MoreHorizontal;
  return <Icon size={22} className={className} />;
}
