import { API_BASE } from "@/services/api";

/** Retorna a URL base da API (mesmo valor usado em `apiFetch`). */
export function useApiBase(): string {
  return API_BASE;
}
