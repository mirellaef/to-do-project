import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import * as tasksApi from "@/services/tasksApi";
import type { Task, TaskStatus } from "@/types/task";

function sortByCreatedAt(a: Task, b: Task) {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.listTasks();
      setTasks(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Falha ao carregar tarefas";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const createTask = async (payload: tasksApi.CreateTaskPayload) => {
    try {
      const created = await tasksApi.createTask(payload);
      setTasks((prev) => [...prev, created].sort(sortByCreatedAt));
      toast.success("Tarefa criada");
      return created;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao criar tarefa");
      throw e;
    }
  };

  const updateTask = async (id: string, payload: tasksApi.UpdateTaskPayload) => {
    try {
      const updated = await tasksApi.updateTask(id, payload);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t)).sort(sortByCreatedAt)
      );
      toast.success("Tarefa atualizada");
      return updated;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao atualizar tarefa");
      throw e;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await tasksApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Tarefa removida");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao remover tarefa");
      throw e;
    }
  };

  const moveTask = async (id: string, status: TaskStatus) => {
    try {
      const updated = await tasksApi.updateTask(id, { status });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t)).sort(sortByCreatedAt)
      );
      toast.success("Tarefa movida");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao mover");
      await refetch();
    }
  };

  return {
    tasks,
    loading,
    error,
    refetch,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
  };
}
