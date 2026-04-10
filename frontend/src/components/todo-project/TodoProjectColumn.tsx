import { useDroppable } from "@dnd-kit/core";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/task";
import { COLUMN_BADGE_CLASS, COLUMN_LABELS } from "./columnConfig";
import { TaskCard } from "./TaskCard";

type TodoProjectColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TodoProjectColumn({
  status,
  tasks,
  onEdit,
  onDelete,
}: TodoProjectColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex min-h-[min(70vh,560px)] min-w-[260px] flex-1 flex-col rounded-xl border border-border/80 bg-muted/20 p-3 md:min-w-0">
      <div className="mb-3 flex items-center justify-between gap-2">
        <Badge
          variant="outline"
          className={cn(
            "h-7 border px-2.5 text-sm font-semibold tracking-tight",
            COLUMN_BADGE_CLASS[status]
          )}
        >
          {COLUMN_LABELS[status]}
        </Badge>
        <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground tabular-nums">
          {tasks.length}
        </span>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div
          ref={setNodeRef}
          className={cn(
            "min-h-[200px] rounded-lg border border-dashed border-transparent p-1 transition-colors",
            isOver && "border-primary/50 bg-primary/5"
          )}
        >
          <div className="flex flex-col gap-3 pb-2">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {tasks.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Nenhuma tarefa
              </p>
            ) : null}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
