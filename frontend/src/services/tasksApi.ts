import type { Task, TaskStatus } from "@/types/task";
import { apiClient } from "./apiClient";

export type CreateTaskPayload = {
  title: string;
  description?: string;
  status?: TaskStatus;
};

export type UpdateTaskPayload = {
  title?: string;
  description?: string;
  status?: TaskStatus;
};

export async function listTasks(): Promise<Task[]> {
  const { data } = await apiClient.get<Task[]>("/api/tasks");
  return data;
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const { data } = await apiClient.post<Task>("/api/tasks", payload);
  return data;
}

export async function updateTask(
  id: string,
  payload: UpdateTaskPayload
): Promise<Task> {
  const { data } = await apiClient.put<Task>(
    `/api/tasks/${encodeURIComponent(id)}`,
    payload
  );
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  await apiClient.delete(`/api/tasks/${encodeURIComponent(id)}`);
}
