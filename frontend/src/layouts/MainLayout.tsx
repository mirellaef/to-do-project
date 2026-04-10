import type { ReactNode } from "react";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border px-4 py-4 sm:px-6">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Kanban</h1>
          <p className="text-sm text-muted-foreground">
            Organize suas tarefas!
          </p>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
