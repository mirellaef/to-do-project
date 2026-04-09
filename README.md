# Sistema Kanban (fullstack)

Monorepo para um sistema de gerenciamento de tarefas no estilo **Kanban**, com backend em Node.js, persistência mock com **json-server** + [`database/db.json`](database/db.json), e frontend em **Vite + React + TypeScript + shadcn/ui**.

## Estado atual do projeto

| Parte | Status | Local |
| ----- | ------ | ----- |
| Backend | CRUD `/api/tasks`, validação Zod, Swagger `/docs`, json-server | [`backend/`](backend/) |
| Banco mock | json-server porta **5555**, [`database/db.json`](database/db.json) | [`database/db.json`](database/db.json) |
| Frontend | Etapa 4: Vite + React + TS + Tailwind + shadcn (`Button`, layout, página inicial, `api.ts`) | [`frontend/`](frontend/) |

## Documentação

- **Backend:** [`backend/README.md`](backend/README.md)
- **Frontend:** [`frontend/README.md`](frontend/README.md)

### URLs típicas (desenvolvimento)

- API (backend): `http://localhost:5173`
- Swagger: `http://localhost:5173/docs`
- App Vite (frontend): `http://localhost:3000`
- json-server: `http://localhost:5555`

## Próximas etapas (resumo)

1. **UI Kanban:** colunas, cartões e CRUD consumindo `VITE_API_URL` + `/api/tasks`.

---

*API e json-server: [`backend/README.md`](backend/README.md). Front: [`frontend/README.md`](frontend/README.md).*
