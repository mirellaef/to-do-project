# To-do-project — Frontend (Vite + React + TypeScript + shadcn/ui)

Interface web com **Vite**, **React 19**, **TypeScript**, **Tailwind CSS v4** e **shadcn/ui**. O quadro **Kanban** consome a API em `/api/tasks` via **axios** (`apiClient` + `tasksApi`).

## Portas (convenção do monorepo)

| Serviço | Porta |
| ------- | ----- |
| Frontend (Vite) | **3000** (`vite.config.ts`) |
| API Express | **5173** |
| json-server | **5555** |

## Funcionalidades (Etapa 5)

- Três colunas: **To Do**, **In Progress**, **Done**
- **Criar / editar / excluir** tarefas (dialogs shadcn)
- **Arrastar e soltar** entre colunas (@dnd-kit) — atualiza `status` via `PUT /api/tasks/:id`
- **Busca** por título ou descrição e **filtro** por status
- **Toasts** (Sonner) para feedback de operações e erros

## Pré-requisitos

- Node.js 20+
- Backend em [`../backend`](../backend) com `npm run dev:all` (API + json-server) ao desenvolver

## Instalação

```bash
cd frontend
npm install
```

## Variáveis de ambiente

```bash
copy .env.example .env
```

| Variável | Descrição | Padrão (se omitida) |
| -------- | --------- | --------------------- |
| `VITE_API_URL` | URL base da API Express | `http://localhost:5173` |

## Scripts

| Comando | Descrição |
| ------- | --------- |
| `npm run dev` | Dev em `http://localhost:3000` |
| `npm run build` | Build em `dist/` |
| `npm run preview` | Preview do build (porta 3000) |

## Estrutura relevante

```
frontend/src/
  services/
    apiClient.ts      # axios + interceptor de erro
    tasksApi.ts       # CRUD /api/tasks
  hooks/
    useTasks.ts       # estado, refetch, mutações + toasts
    useApiBase.ts
  components/kanban/
    KanbanBoard.tsx
    KanbanColumn.tsx
    TaskCard.tsx
    TaskFormDialog.tsx
    DeleteTaskDialog.tsx
  pages/
    KanbanPage.tsx
```

## Desenvolvimento fullstack

1. `backend/`: `npm run dev:all`
2. `frontend/`: `npm run dev`
3. Abrir `http://localhost:3000` e garantir que a API responde em `http://localhost:5173`
