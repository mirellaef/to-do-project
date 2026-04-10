# To-do-project

## Descrição do projeto

Monorepo do **to-do-project**: aplicação de gestão de tarefas em quadro com três colunas (**To Do**, **In Progress**, **Done**), com arrastar e soltar, CRUD completo e persistência em ficheiro JSON. O **Express** expõe a API REST (`/api/tasks`); o **json-server** serve o ficheiro [`database/db.json`](database/db.json) como API HTTP de leitura/escrita usada pelo backend; o **frontend** (Vite + React) consome a API Express via **axios**.

Documentação mais detalhada por pasta:

- [`backend/README.md`](backend/README.md) — API, Swagger, variáveis de ambiente
- [`frontend/README.md`](frontend/README.md) — UI, `VITE_API_URL`, estrutura de pastas

## Tecnologias utilizadas

| Camada | Stack |
| ------ | ----- |
| **Frontend** | Vite 6, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, axios, @dnd-kit (drag-and-drop), Sonner (toasts) |
| **Backend** | Node.js 20+, Express, TypeScript, Zod (validação), Swagger / OpenAPI (`/docs`), CORS |
| **Dados (mock)** | json-server, ficheiro JSON em [`database/db.json`](database/db.json) |

## Pré-requisitos

- **Node.js** 20 ou superior  
- **npm** (incluído com o Node)

---

## Como rodar o backend

Na pasta do backend, instale dependências e inicie o servidor de desenvolvimento (API na porta **5173** por defeito):

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

No Linux/macOS, use `cp .env.example .env` em vez de `copy`.

Variáveis úteis: `PORT` (API), `JSON_SERVER_URL` (URL do json-server). Ver tabela em [`backend/README.md`](backend/README.md).

Para **produção** (após compilar):

```bash
cd backend
npm run build
npm start
```

---

## Como rodar o json-server

O json-server observa [`database/db.json`](database/db.json) na porta **5555**. A partir da pasta **`backend/`** (onde a dependência `json-server` está instalada):

```bash
cd backend
npm install
npm run db:server
```

Isto executa: `json-server --watch ../database/db.json --port 5555`.

> O backend precisa do json-server a correr se for persistir tarefas. Para desenvolvimento local, o atalho **`npm run dev:all`** no backend sobe json-server e API em simultâneo (recomendado).

---

## Como rodar o frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

A app abre em **http://localhost:3000** (configurado em `frontend/vite.config.ts`). O frontend chama a API em `VITE_API_URL` (por defeito `http://localhost:5173`).

Build e preview:

```bash
cd frontend
npm run build
npm run preview
```

---

## Scripts disponíveis

### Raiz do repositório

Não há `package.json` na raiz; os comandos abaixo são executados dentro de **`backend/`** ou **`frontend/`**.

### Backend (`backend/package.json`)

| Script | Descrição |
| ------ | --------- |
| `npm run dev` | API Express em modo watch (`tsx watch src/server.ts`) |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Executa `node dist/server.js` (usar após `build`) |
| `npm run db:server` | Só o json-server na porta **5555** |
| `npm run dev:all` | json-server + API em paralelo (**desenvolvimento fullstack backend**) |

### Frontend (`frontend/package.json`)

| Script | Descrição |
| ------ | --------- |
| `npm run dev` | Servidor Vite (porta **3000**) |
| `npm run build` | `tsc -b` + build de produção em `dist/` |
| `npm run preview` | Servir o build localmente (porta **3000**) |

---

## URLs típicas (desenvolvimento)

| Serviço | URL |
| ------- | --- |
| Frontend (Vite) | http://localhost:3000 |
| API Express | http://localhost:5173 |
| Swagger | http://localhost:5173/docs |
| json-server | http://localhost:5555 |

### Fluxo recomendado para desenvolvimento

1. Terminal 1 — em `backend/`: `npm run dev:all` (API + json-server)  
2. Terminal 2 — em `frontend/`: `npm run dev`  
3. Abrir http://localhost:3000 e garantir que a API responde em http://localhost:5173

---

## Estado resumido

| Parte | Conteúdo |
| ----- | -------- |
| Backend | CRUD `/api/tasks`, validação Zod, Swagger `/docs`, integração com json-server |
| Banco mock | [`database/db.json`](database/db.json), json-server porta **5555** |
| Frontend | Quadro em colunas, CRUD, DnD, filtros, toasts, axios + shadcn |
