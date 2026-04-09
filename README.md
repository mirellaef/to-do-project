# Sistema Kanban (fullstack)

Monorepo para um sistema de gerenciamento de tarefas no estilo **Kanban**, com backend em Node.js, persistência via **json-server** (etapa futura) e frontend em **Vite + React + TypeScript + shadcn/ui** (etapa futura).

## Estado atual do projeto

| Parte | Status | Local |
| ----- | ------ | ----- |
| Backend | Etapa 2: CRUD de tarefas (`/api/tasks`), validação Zod, middleware de erros, Swagger em `/docs` | [`backend/`](backend/) |
| Banco/API mock | Planejado (json-server) | — |
| Frontend | Planejado (Vite + React + shadcn) | — |

## Documentação do backend

Instalação, variáveis de ambiente, mapa de pastas, modelo de tarefa e lista de endpoints: **[`backend/README.md`](backend/README.md)**.

- **Swagger UI (local):** `http://localhost:3000/docs` (com `npm run dev` no `backend/`).

## Próximas etapas (resumo)

1. **Persistência:** `json-server` (ou outro) substituindo o armazenamento em memória.
2. **Frontend:** aplicativo Vite + React + TypeScript + shadcn/ui consumindo a API.

---

*Detalhes da API: [`backend/README.md`](backend/README.md).*
