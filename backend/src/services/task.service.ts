import { randomUUID } from "crypto";
import type { Task, TaskStatus } from "../models/task.model";
import type { CreateTaskInput, UpdateTaskInput } from "../validators/task.validator";
import { HttpError } from "../utils/http-error";
import * as jsonServer from "./jsonServerTasks.client";

const STATUSES: TaskStatus[] = ["todo", "in-progress", "done"];

function isTaskStatus(value: unknown): value is TaskStatus {
  return typeof value === "string" && STATUSES.includes(value as TaskStatus);
}

function parseTask(raw: unknown): Task {
  if (!raw || typeof raw !== "object") {
    throw new HttpError(502, "Formato de tarefa inválido no json-server");
  }
  const o = raw as Record<string, unknown>;
  return {
    id: String(o.id),
    title: String(o.title ?? ""),
    description: String(o.description ?? ""),
    status: isTaskStatus(o.status) ? o.status : "todo",
    createdAt: new Date(
      typeof o.createdAt === "string" || typeof o.createdAt === "number"
        ? o.createdAt
        : String(o.createdAt ?? "")
    ),
  };
}

export async function listTasks(): Promise<Task[]> {
  const data = await jsonServer.fetchTasksList();
  if (!Array.isArray(data)) {
    throw new HttpError(502, "Resposta inesperada ao listar tarefas");
  }
  return data
    .map(parseTask)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export async function getTaskById(id: string): Promise<Task> {
  const data = await jsonServer.fetchTaskById(id);
  return parseTask(data);
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const createdAtIso = new Date().toISOString();
  const payload = {
    id: randomUUID(),
    title: input.title,
    description: input.description ?? "",
    status: input.status,
    createdAt: createdAtIso,
  };
  const data = await jsonServer.postTask(payload);
  return parseTask(data);
}

export async function updateTask(
  id: string,
  input: UpdateTaskInput
): Promise<Task> {
  const body: Record<string, unknown> = {};
  if (input.title !== undefined) {
    body.title = input.title;
  }
  if (input.description !== undefined) {
    body.description = input.description;
  }
  if (input.status !== undefined) {
    body.status = input.status;
  }
  const data = await jsonServer.patchTask(id, body);
  return parseTask(data);
}

export async function deleteTask(id: string): Promise<void> {
  await jsonServer.deleteTaskRemote(id);
}
