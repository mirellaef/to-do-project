import type { TaskStatus } from "@/types/task";

export const COLUMN_ORDER: TaskStatus[] = ["todo", "in-progress", "done"];

export const COLUMN_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export const COLUMN_BADGE_CLASS: Record<TaskStatus, string> = {
  todo:
    "border-sky-500/35 bg-sky-500/12 text-sky-900 dark:bg-sky-500/20 dark:text-sky-100",
  "in-progress":
    "border-amber-500/40 bg-amber-500/12 text-amber-950 dark:bg-amber-500/18 dark:text-amber-50",
  done:
    "border-emerald-500/35 bg-emerald-500/12 text-emerald-950 dark:bg-emerald-500/18 dark:text-emerald-50",
};

export const TASK_CARD_STATUS_BORDER: Record<TaskStatus, string> = {
  todo: "border-l-[3px] border-l-sky-500",
  "in-progress": "border-l-[3px] border-l-amber-500",
  done: "border-l-[3px] border-l-emerald-500",
};
