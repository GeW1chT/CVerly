// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS sınıflarını koşullu olarak birleştirmek ve çakışmaları çözmek için kullanılan yardımcı fonksiyon.
 * @param inputs Tailwind sınıfları veya koşullu ifadeler
 * @returns Birleştirilmiş ve temizlenmiş sınıf dizisi
 * * Örnek kullanım:
 * cn("bg-red-500", "p-4", false && "hidden") -> "bg-red-500 p-4"
 * cn("p-4", "p-2") -> "p-2" (tailwind-merge çakışmayı çözer)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}