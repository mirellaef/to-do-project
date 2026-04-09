# Kanban — Backend (Node.js + TypeScript)

API REST em **Express** com **CORS**, documentação **OpenAPI 3** via **Swagger UI** em **`/docs`** (gerada com **swagger-jsdoc** + schemas em `config/swagger.ts`). Inclui **CRUD de tarefas** com validação (**Zod**), **middleware de erros** centralizado e persistência das tarefas via **json-server** (HTTP), com arquivo em [`../database/db.json`](../database/db.json).

## Portas (convenção do monorepo)

| Serviço | Porta |
| ------- | ----- |
| Frontend (Vite) | **3000** |
| API Express (este serviço) | **5173** (`PORT`) |
| json-server | **5555** |

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

| Variável | Descrição | Padrão (se omitida) |
| -------- | --------- | --------------------- |
| `PORT` | Porta HTTP da API Express | `5173` |
| `NODE_ENV` | `development` ou `production` (afeta quais arquivos o swagger-jsdoc escaneia para montar a spec) | — |
| `JSON_SERVER_URL` | URL base do **json-server** (sem barra final) | `http://localhost:5555` |

O arquivo [`.env`](.env) é carregado automaticamente em [`src/server.ts`](src/server.ts) via `dotenv`.

## Persistência (json-server)

- Arquivo de dados: **`database/db.json`** na raiz do repositório (não dentro de `backend/`), com chave raiz `"tasks"`.
- O **json-server** escuta na porta **5555** por padrão (script `db:server`).
- A API Express (**porta `PORT`**, default **5173**) fala com o json-server por **HTTP** (`fetch`), implementado em [`src/services/jsonServerTasks.client.ts`](src/services/jsonServerTasks.client.ts).

**Ordem ao desenvolver:** subir o json-server antes ou junto da API (veja `dev:all` abaixo). Se o json-server não estiver acessível, as rotas de tarefas respondem **503** com mensagem indicando indisponibilidade do serviço de dados.

## Scripts

| Comando | Descrição |
| ------- | --------- |
| `npm run dev` | Sobe só a API Express com recarregamento (`tsx watch`). |
| `npm run db:server` | Sobe o **json-server** em `http://localhost:5555` com watch em `../database/db.json`. |
| `npm run dev:all` | Sobe **json-server** e **API** em paralelo (`concurrently`). |
| `npm run build` | Compila TypeScript para `dist/`. |
| `npm start` | Executa `node dist/server.js` (use após `npm run build`). |

## Como rodar

**Desenvolvimento (recomendado — um terminal):**

```bash
npm run dev:all
```

**Ou dois terminais** (na pasta `backend/`):

```bash
npm run db:server
```

```bash
npm run dev
```

**Produção (após build):** é necessário o json-server (ou outro processo servindo o mesmo contrato REST) acessível em `JSON_SERVER_URL`.

```bash
npm run build
$env:NODE_ENV="production"; npm start
```

No cmd: `set NODE_ENV=production` antes de `npm start`.

## Documentação interativa (Swagger)

Com a API no ar:

- **Swagger UI:** [http://localhost:5173/docs](http://localhost:5173/docs) (ajuste a porta se `PORT` for outra).

A especificação é montada a partir dos arquivos em `src/routes/` e `src/controllers/`, com **schemas** em `src/config/swagger.ts` (`components.schemas`).

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
| `id` | string (UUID) | Gerado pela API ao criar e enviado ao json-server |
| `title` | string | Obrigatório na criação |
| `description` | string | Default `""` |
| `status` | string | `"todo"` \| `"in-progress"` \| `"done"` |
| `createdAt` | string (ISO 8601) | Definido na criação; persistido no `db.json` |

### Erros

Respostas de erro seguem o formato `{ "error": string, "details?"?: ... }` com status **400** (validação), **404** (tarefa inexistente), **503** (json-server inacessível ou erro 5xx no proxy) ou **500** (erro interno não tratado).

## Estrutura de pastas (trecho relevante)

```
projeto/
├── database/
│   └── db.json              # Dados mock (tasks); alterado pelo json-server --watch
└── backend/
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── server.ts        # dotenv + listen
        ├── app.ts
        ├── services/
        │   ├── task.service.ts              # Orquestra CRUD + mapeamento Task
        │   └── jsonServerTasks.client.ts    # fetch para json-server
        └── ...
```

### Responsabilidades

- **`task.service.ts`** — regras de montagem de payloads, ordenação da lista e conversão do JSON do json-server para `Task`.
- **`jsonServerTasks.client.ts`** — apenas HTTP (`GET/POST/PATCH/DELETE`) e tratamento de status (404, 5xx, rede).

## O que ainda não está no projeto

- Frontend (Vite, React, shadcn).

## Verificação rápida

1. `npm install` em `backend/`
2. `npm run dev:all`
3. [http://localhost:5173/api/health](http://localhost:5173/api/health), [http://localhost:5173/docs](http://localhost:5173/docs)
4. `POST /api/tasks` com `{ "title": "Minha tarefa" }` e conferir se `database/db.json` foi atualizado
5. Reiniciar só a API: as tarefas permanecem no arquivo
