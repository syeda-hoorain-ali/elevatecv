import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserMembership(status: string, productId: number) {
  if (status === "on_trial") {
    return productId === 412362 ? "trial_monthly"
      : productId === 412413 ? "trial_yearly"
        : "none";
  }
  if (status === "active") {
    return productId === 412362 ? "monthly"
      : productId === 412413 ? "yearly"
        : "none";
  }
  return "none";
}

