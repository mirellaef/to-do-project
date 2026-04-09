/**
 * URL base da API Express (padrão do projeto: http://localhost:5173).
 * Defina `VITE_API_URL` no `.env` ou use o padrão abaixo.
 */
export const API_BASE = (
  import.meta.env.VITE_API_URL ?? "http://localhost:5173"
).replace(/\/$/, "");

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

/**
 * `fetch` para rotas da API, com JSON por padrão.
 */
export async function apiFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const headers = new Headers(init?.headers);
  if (
    init?.body !== undefined &&
    typeof init.body === "string" &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(apiUrl(path), {
    ...init,
    headers,
  });
}
