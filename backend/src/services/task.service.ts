import { randomUUID } from "crypto";
import type { Task } from "../models/task.model";
import type { CreateTaskInput, UpdateTaskInput } from "../validators/task.validator";
import { HttpError } from "../utils/http-error";

const tasks = new Map<string, Task>();

export function listTasks(): Task[] {
  return [...tasks.values()].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );
}

export function getTaskById(id: string): Task {
  const task = tasks.get(id);
  if (!task) {
    throw new HttpError(404, "Tarefa não encontrada");
  }
  return task;
}

export function createTask(input: CreateTaskInput): Task {
  const task: Task = {
    id: randomUUID(),
    title: input.title,
    description: input.description ?? "",
    status: input.status,
    createdAt: new Date(),
  };
  tasks.set(task.id, task);
  return task;
}

export function updateTask(id: string, input: UpdateTaskInput): Task {
  const existing = tasks.get(id);
  if (!existing) {
    throw new HttpError(404, "Tarefa não encontrada");
  }
  const updated: Task = {
    ...existing,
    ...(input.title !== undefined ? { title: input.title } : {}),
    ...(input.description !== undefined ? { description: input.description } : {}),
    ...(input.status !== undefined ? { status: input.status } : {}),
  };
  tasks.set(id, updated);
  return updated;
}

export function deleteTask(id: string): void {
  if (!tasks.has(id)) {
    throw new HttpError(404, "Tarefa não encontrada");
  }
  tasks.delete(id);
}
