import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function extractIdFromUrl(url: string): number {
	const segments = url.replace(/\/$/, "").split("/");
	return Number(segments[segments.length - 1]);
}

export function buildSpriteUrl(id: number): string {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
}

export const baseUrl = process.env.POKEAPI_BASE_URL;
