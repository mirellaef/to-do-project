# Kanban — Frontend (Vite + React + TypeScript + shadcn/ui)

Interface web com **Vite**, **React 19**, **TypeScript**, **Tailwind CSS v4** e **shadcn/ui** (estilo radix-nova, componentes em `src/components/ui`).

## Portas (convenção do monorepo)

| Serviço | Porta |
| ------- | ----- |
| Frontend (Vite) | **3000** (`vite.config.ts`) |
| API Express | **5173** |
| json-server | **5555** |

## Pré-requisitos

- Node.js 20+
- Backend em [`../backend`](../backend) (e json-server) quando for consumir `/api`

## Instalação

```bash
cd frontend
npm install
```

## Variáveis de ambiente

Copie o exemplo:

```bash
copy .env.example .env
```

| Variável | Descrição | Padrão (se omitida) |
| -------- | --------- | --------------------- |
| `VITE_API_URL` | URL base da API Express | `http://localhost:5173` |

No Vite, apenas variáveis prefixadas com `VITE_` são expostas ao cliente.

## Scripts

| Comando | Descrição |
| ------- | --------- |
| `npm run dev` | Servidor de desenvolvimento (`http://localhost:3000`) |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Preview do build |

## Estrutura de pastas

```
frontend/
├── components.json          # Configuração shadcn/ui
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css            # Tailwind + tema shadcn
│   ├── components/ui/       # Componentes shadcn (ex.: button)
│   ├── layouts/             # Layouts (ex.: MainLayout)
│   ├── pages/               # Páginas (ex.: HomePage)
│   ├── services/            # Cliente HTTP (api.ts)
│   ├── hooks/               # Hooks (ex.: useApiBase)
│   ├── types/               # Tipos (ex.: Task)
│   └── lib/utils.ts         # helper `cn()` do shadcn
└── vite.config.ts           # Alias `@` → `src`
```

## Desenvolvimento fullstack

1. Terminal — na pasta `backend/`: `npm run dev:all` (API + json-server) ou processos separados conforme [`backend/README.md`](../backend/README.md).
2. Terminal — na pasta `frontend/`: `npm run dev`.
3. Ajuste `VITE_API_URL` se a API não estiver em `http://localhost:5173`.

## Próximas etapas

- Quadro Kanban, listagem de tarefas e formulários chamando `apiFetch("/api/tasks", …)`.
