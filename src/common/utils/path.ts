import { normalize } from "path";

export function normalizePath(path: string) {
	return normalize(path).trim();
}