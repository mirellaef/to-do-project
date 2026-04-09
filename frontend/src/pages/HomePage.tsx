import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <div className="flex max-w-lg flex-col gap-4">
      <p className="text-muted-foreground">
        Interface do sistema Kanban. A API Express está em{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-foreground text-sm">
          /api
        </code>{" "}
        — configure{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-foreground text-sm">
          VITE_API_URL
        </code>{" "}
        no <code className="text-foreground">.env</code> se necessário. Para
        tarefas, o backend precisa do json-server (porta 5555).
      </p>
      <div>
        <Button type="button">Começar</Button>
      </div>
    </div>
  );
}
