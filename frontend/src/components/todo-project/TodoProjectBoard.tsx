import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import type { Task, TaskStatus } from "@/types/task";
import { COLUMN_ORDER } from "./columnConfig";
import { TodoProjectColumn } from "./TodoProjectColumn";

function resolveTargetStatus(
  overId: string | undefined,
  tasks: Task[]
): TaskStatus | null {
  if (!overId) {
    return null;
  }
  if (overId === "todo" || overId === "in-progress" || overId === "done") {
    return overId;
  }
  const overTask = tasks.find((t) => t.id === overId);
  return overTask ? overTask.status : null;
}

type TodoProjectBoardProps = {
  tasks: Task[];
  columns: Record<TaskStatus, Task[]>;
  onMove: (taskId: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TodoProjectBoard({
  tasks,
  columns,
  onMove,
  onEdit,
  onDelete,
}: TodoProjectBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const id = String(event.active.id);
    const t = tasks.find((x) => x.id === id);
    setActiveTask(t ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeId = String(active.id);
    const activeTaskItem = tasks.find((t) => t.id === activeId);
    if (!activeTaskItem) {
      return;
    }
    const target = resolveTargetStatus(
      over.id ? String(over.id) : undefined,
      tasks
    );
    if (!target || target === activeTaskItem.status) {
      return;
    }
    void onMove(activeId, target);
  }

  function handleDragCancel() {
    setActiveTask(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {COLUMN_ORDER.map((status) => (
          <TodoProjectColumn
            key={status}
            status={status}
            tasks={columns[status]}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <div className="max-w-sm rounded-xl border border-border bg-card p-4 shadow-lg">
            <p className="font-medium leading-snug">{activeTask.title}</p>
            {activeTask.description ? (
              <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                {activeTask.description}
              </p>
            ) : null}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
