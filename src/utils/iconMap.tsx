"use client";

import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {};

Object.keys(Icons).forEach((key) => {
  iconMap[key.toLowerCase()] = (Icons as unknown as Record<string, LucideIcon>)[key];
});
