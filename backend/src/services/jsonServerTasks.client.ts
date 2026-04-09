import { HttpError } from "../utils/http-error";

function getBaseUrl(): string {
  const raw = process.env.JSON_SERVER_URL ?? "http://localhost:5555";
  return raw.replace(/\/$/, "");
}

function tasksUrl(id?: string): string {
  const base = getBaseUrl();
  if (id === undefined) {
    return `${base}/tasks`;
  }
  return `${base}/tasks/${encodeURIComponent(id)}`;
}

async function parseJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new HttpError(502, "Resposta inválida do serviço de dados");
  }
}

async function handleJsonResponse(res: Response): Promise<unknown> {
  if (res.status === 404) {
    throw new HttpError(404, "Tarefa não encontrada");
  }
  if (res.status >= 500) {
    throw new HttpError(
      503,
      "Serviço de dados indisponível (json-server retornou erro)"
    );
  }
  if (!res.ok) {
    const body = await parseJson(res);
    const msg =
      body &&
      typeof body === "object" &&
      "message" in body &&
      typeof (body as { message: unknown }).message === "string"
        ? (body as { message: string }).message
        : `Erro ${res.status} ao falar com o json-server`;
    throw new HttpError(res.status, msg);
  }
  return parseJson(res);
}

export async function fetchTasksList(): Promise<unknown> {
  try {
    const res = await fetch(tasksUrl(), { method: "GET" });
    return handleJsonResponse(res);
  } catch (err) {
    if (err instanceof HttpError) {
      throw err;
    }
    throw new HttpError(
      503,
      "Serviço de dados indisponível (json-server não está acessível)"
    );
  }
}

export async function fetchTaskById(id: string): Promise<unknown> {
  try {
    const res = await fetch(tasksUrl(id), { method: "GET" });
    return handleJsonResponse(res);
  } catch (err) {
    if (err instanceof HttpError) {
      throw err;
    }
    throw new HttpError(
      503,
      "Serviço de dados indisponível (json-server não está acessível)"
    );
  }
}

export async function postTask(body: Record<string, unknown>): Promise<unknown> {
  try {
    const res = await fetch(tasksUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleJsonResponse(res);
  } catch (err) {
    if (err instanceof HttpError) {
      throw err;
    }
    throw new HttpError(
      503,
      "Serviço de dados indisponível (json-server não está acessível)"
    );
  }
}

export async function patchTask(
  id: string,
  body: Record<string, unknown>
): Promise<unknown> {
  try {
    const res = await fetch(tasksUrl(id), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleJsonResponse(res);
  } catch (err) {
    if (err instanceof HttpError) {
      throw err;
    }
    throw new HttpError(
      503,
      "Serviço de dados indisponível (json-server não está acessível)"
    );
  }
}

export async function deleteTaskRemote(id: string): Promise<void> {
  try {
    const res = await fetch(tasksUrl(id), { method: "DELETE" });
    if (res.status === 404) {
      throw new HttpError(404, "Tarefa não encontrada");
    }
    if (res.status >= 500) {
      throw new HttpError(
        503,
        "Serviço de dados indisponível (json-server retornou erro)"
      );
    }
    if (!res.ok) {
      throw new HttpError(res.status, `Erro ${res.status} ao remover tarefa`);
    }
  } catch (err) {
    if (err instanceof HttpError) {
      throw err;
    }
    throw new HttpError(
      503,
      "Serviço de dados indisponível (json-server não está acessível)"
    );
  }
}
