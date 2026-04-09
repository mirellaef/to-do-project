import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";
import { TASK_CARD_STATUS_BORDER } from "./columnConfig";

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("touch-none", isDragging && "z-10 opacity-90")}
    >
      <Card
        className={cn(
          "border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md",
          TASK_CARD_STATUS_BORDER[task.status],
          isDragging && "ring-2 ring-ring/40"
        )}
      >
        <CardHeader className="space-y-1 p-3 pb-0">
          <div className="flex items-start justify-between gap-2">
            <button
              type="button"
              className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
              {...listeners}
              {...attributes}
              aria-label="Arrastar tarefa"
            >
              <GripVertical className="size-5 shrink-0" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="shrink-0"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Pencil className="mr-2 size-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete(task)}
                >
                  <Trash2 className="mr-2 size-4" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="line-clamp-2 text-base leading-snug">
            {task.title}
          </CardTitle>
        </CardHeader>
        {task.description ? (
          <CardContent className="p-3 pt-2">
            <CardDescription className="line-clamp-4 text-sm">
              {task.description}
            </CardDescription>
          </CardContent>
        ) : null}
        <CardContent className="p-3 pt-0">
          <Badge variant="secondary" className="text-xs font-normal">
            {new Date(task.createdAt).toLocaleString()}
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
