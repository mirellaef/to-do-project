# Kanban — Backend (Node.js + TypeScript)

API REST em **Express** com **CORS**, documentação **OpenAPI 3** via **Swagger UI** em **`/docs`** (gerada com **swagger-jsdoc** + schemas em `config/swagger.ts`). Inclui **CRUD de tarefas** com validação (**Zod**), camada **service** (armazenamento em memória), **middleware de erros** centralizado e helpers **async**.

## Pré-requisitos

- **Node.js** 20 ou superior (recomendado LTS).
- **npm** (incluso com o Node).

## Instalação

Na raiz da pasta `backend/`:

```bash
npm install
```

## Variáveis de ambiente

Copie o exemplo e ajuste se necessário:

```bash
copy .env.example .env
```

No Linux/macOS:

```bash
cp .env.example .env
```

| Variável   | Descrição | Padrão (se omitida) |
| ---------- | --------- | --------------------- |
| `PORT`     | Porta HTTP | `3000` |
| `NODE_ENV` | `development` ou `production` (afeta quais arquivos o swagger-jsdoc escaneia para montar a spec) | — |

## Scripts

| Comando      | Descrição |
| ------------ | --------- |
| `npm run dev`   | Sobe o servidor em modo desenvolvimento com recarregamento (`tsx watch`). |
| `npm run build` | Compila TypeScript para `dist/`. |
| `npm start`     | Executa `node dist/server.js` (use após `npm run build`). |

## Como rodar

**Desenvolvimento:**

```bash
npm run dev
```

**Produção (após build):**

```bash
npm run build
set NODE_ENV=production
npm start
```

No PowerShell, `set` não aplica; use `$env:NODE_ENV="production"; npm start`.

## Documentação interativa (Swagger)

Com o servidor no ar:

- **Swagger UI:** [http://localhost:3000/docs](http://localhost:3000/docs) (ajuste a porta se `PORT` for outra).

A especificação é montada a partir dos arquivos em `src/routes/` e `src/controllers/` (em desenvolvimento, `.ts`; em produção, após build, `.js` em `dist/`), com **schemas reutilizáveis** em `src/config/swagger.ts` (`components.schemas`).

## Endpoints

| Método | Caminho | Descrição |
| ------ | ------- | --------- |
| GET | `/api/health` | Health check: `{ "status": "ok", "timestamp": "<ISO8601>" }` |
| GET | `/api/tasks` | Lista todas as tarefas |
| POST | `/api/tasks` | Cria tarefa (`title` obrigatório; `description` opcional; `status` opcional, default `todo`) |
| GET | `/api/tasks/:id` | Busca uma tarefa por `id` |
| PUT | `/api/tasks/:id` | Atualiza tarefa (parcial: ao menos um de `title`, `description`, `status`) |
| DELETE | `/api/tasks/:id` | Remove a tarefa (resposta `204` sem corpo) |

### Modelo de tarefa (JSON)

| Campo | Tipo | Observações |
| ----- | ---- | ----------- |
| `id` | string (UUID) | Gerado no servidor |
| `title` | string | Obrigatório na criação |
| `description` | string | Default `""` |
| `status` | string | `"todo"` \| `"in-progress"` \| `"done"` |
| `createdAt` | string (ISO 8601) | Definido na criação |

**Persistência:** em memória (reiniciar o processo apaga os dados). Próxima etapa: integrar **json-server** ou outro armazenamento.

### Erros

Respostas de erro seguem o formato `{ "error": string, "details?"?: ... }` com status **400** (validação), **404** (tarefa inexistente) ou **500** (não tratado).

## Estrutura de pastas

```
backend/
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── src/
    ├── server.ts
    ├── app.ts
    ├── config/
    │   └── swagger.ts       # OpenAPI base + components (Task, bodies, ErrorResponse)
    ├── routes/
    │   ├── index.ts         # /api/health + /api/tasks
    │   └── tasks.routes.ts  # Rotas CRUD + JSDoc OpenAPI
    ├── controllers/
    │   ├── health.controller.ts
    │   └── task.controller.ts
    ├── services/
    │   ├── health.service.ts
    │   └── task.service.ts  # Repositório em memória
    ├── models/
    │   └── task.model.ts
    ├── validators/
    │   └── task.validator.ts # Schemas Zod (create/update)
    ├── middlewares/
    │   ├── validate.middleware.ts
    │   └── errorHandler.middleware.ts  # errorHandler + asyncHandler
    └── utils/
        └── http-error.ts
```

### Responsabilidades

- **`server.ts`** — porta e `app.listen`.
- **`app.ts`** — CORS, JSON, `/docs`, montagem de `/api`, **middleware de erro por último**.
- **`routes/`** — apenas rotas e documentação Swagger nas anotações.
- **`controllers/`** — orquestra HTTP e delega ao service.
- **`services/`** — regras e acesso aos dados (aqui: `Map` em memória).
- **`validators/`** — schemas Zod compartilhados entre validação e tipos inferidos.
- **`middlewares/`** — `validateBody`, `errorHandler`, `asyncHandler`.
- **`utils/http-error.ts`** — erros HTTP tipados (`HttpError`).

## O que ainda não está no projeto

- **json-server** ou persistência em arquivo.
- Frontend (Vite, React, shadcn).

## Verificação rápida

1. `npm install`
2. `npm run dev`
3. [http://localhost:3000/api/health](http://localhost:3000/api/health), [http://localhost:3000/docs](http://localhost:3000/docs)
4. `POST /api/tasks` com JSON `{ "title": "Minha tarefa" }` e listar com `GET /api/tasks`
