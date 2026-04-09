import axios from "axios";

export const API_BASE = (
  import.meta.env.VITE_API_URL ?? "http://localhost:5173"
).replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

function messageFromUnknown(data: unknown): string {
  if (data && typeof data === "object" && "error" in data) {
    const e = (data as { error: unknown }).error;
    if (typeof e === "string") {
      return e;
    }
  }
  return "Erro na requisição";
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return Promise.reject(
          new Error("Não foi possível conectar à API. Verifique se o backend está no ar.")
        );
      }
      const data = error.response.data;
      const msg = messageFromUnknown(data);
      return Promise.reject(new Error(msg));
    }
    return Promise.reject(error instanceof Error ? error : new Error("Erro desconhecido"));
  }
);
