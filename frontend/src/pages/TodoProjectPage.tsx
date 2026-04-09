import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { DeleteTaskDialog } from "@/components/todo-project/DeleteTaskDialog";
import { TodoProjectBoard } from "@/components/todo-project/TodoProjectBoard";
import { COLUMN_LABELS } from "@/components/todo-project/columnConfig";
import { TaskFormDialog } from "@/components/todo-project/TaskFormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTasks } from "@/hooks/useTasks";
import type { Task, TaskStatus } from "@/types/task";

export function TodoProjectPage() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
  } = useTasks();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | TaskStatus>("all");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const filtered = useMemo(() => {
    let list = tasks;
    if (statusFilter !== "all") {
      list = list.filter((t) => t.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [tasks, search, statusFilter]);

  const columns = useMemo(
    () => ({
      todo: filtered.filter((t) => t.status === "todo"),
      "in-progress": filtered.filter((t) => t.status === "in-progress"),
      done: filtered.filter((t) => t.status === "done"),
    }),
    [filtered]
  );

  function openCreate() {
    setFormMode("create");
    setEditingTask(null);
    setFormOpen(true);
  }

  function openEdit(task: Task) {
    setFormMode("edit");
    setEditingTask(task);
    setFormOpen(true);
  }

  function openDelete(task: Task) {
    setTaskToDelete(task);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por título ou descrição…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Buscar tarefas"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) =>
              setStatusFilter(v as "all" | TaskStatus)
            }
          >
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="todo">{COLUMN_LABELS.todo}</SelectItem>
              <SelectItem value="in-progress">
                {COLUMN_LABELS["in-progress"]}
              </SelectItem>
              <SelectItem value="done">{COLUMN_LABELS.done}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="button" onClick={openCreate} className="shrink-0">
          <Plus className="mr-2 size-4" />
          Nova tarefa
        </Button>
      </div>

      <Separator />

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando tarefas…</p>
      ) : null}
      {error && !loading ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}

      {!loading ? (
        <TodoProjectBoard
          tasks={filtered}
          columns={columns}
          onMove={(id, status) => {
            void moveTask(id, status);
          }}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      ) : null}

      <TaskFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        task={formMode === "edit" ? editingTask : null}
        onSubmit={async (data) => {
          if (formMode === "create") {
            await createTask({
              title: data.title,
              description: data.description || undefined,
              status: data.status,
            });
          } else if (editingTask) {
            await updateTask(editingTask.id, {
              title: data.title,
              description: data.description,
              status: data.status,
            });
          }
        }}
      />

      <DeleteTaskDialog
        task={taskToDelete}
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) {
            setTaskToDelete(null);
          }
        }}
        onConfirm={async () => {
          if (taskToDelete) {
            await deleteTask(taskToDelete.id);
          }
        }}
      />
    </div>
  );
}
