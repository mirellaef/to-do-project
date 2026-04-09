export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  /** ISO 8601 na API; pode vir como string no JSON */
  createdAt: string;
}
