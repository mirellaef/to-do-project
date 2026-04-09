# Sistema Kanban (fullstack)

Monorepo para um sistema de gerenciamento de tarefas no estilo **Kanban**, com backend em Node.js, persistência mock com **json-server** + [`database/db.json`](database/db.json), e frontend em **Vite + React + TypeScript + shadcn/ui** (etapa futura).

## Estado atual do projeto

| Parte | Status | Local |
| ----- | ------ | ----- |
| Backend | CRUD `/api/tasks`, validação Zod, erros, Swagger `/docs`, integração HTTP com json-server | [`backend/`](backend/) |
| Banco mock | **json-server** na porta **5555**, dados em [`database/db.json`](database/db.json) | [`database/db.json`](database/db.json) |
| Frontend | Planejado (Vite + React + shadcn) | — |

## Documentação do backend

Instalação, variáveis (`PORT`, `JSON_SERVER_URL`), scripts `db:server` e `dev:all`, modelo de tarefa e endpoints: **[`backend/README.md`](backend/README.md)**.

- **API:** `http://localhost:3000` (padrão; ver `PORT` no `.env` do backend).
- **Swagger UI:** `http://localhost:3000/docs` (com a API rodando).
- **json-server:** `http://localhost:5555` (ex.: `GET http://localhost:5555/tasks`).

## Próximas etapas (resumo)

1. **Frontend:** aplicativo Vite + React + TypeScript + shadcn/ui consumindo a API em `/api`.

---

*Detalhes da API e do fluxo com json-server: [`backend/README.md`](backend/README.md).*
