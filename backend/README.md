# Kanban — Backend (Node.js + TypeScript)

API REST em **Express** com **CORS**, documentação **OpenAPI 3** via **Swagger UI** (gerada com **swagger-jsdoc** a partir de comentários JSDoc nas rotas). Esta etapa entrega apenas a **estrutura base** e um endpoint de **health check**; regras de negócio Kanban e persistência virão depois.

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

- **Swagger UI:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs) (ajuste a porta se `PORT` for outra).

A especificação é montada a partir dos arquivos em `src/routes/` e `src/controllers/` (em desenvolvimento, `.ts`; em produção, após build, `.js` em `dist/`).

## Endpoints atuais

| Método | Caminho        | Descrição |
| ------ | -------------- | --------- |
| GET    | `/api/health`  | Health check: `{ "status": "ok", "timestamp": "<ISO8601>" }` |

## Estrutura de pastas

```
backend/
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração do TypeScript (saída em dist/)
├── .env.example          # Modelo de variáveis de ambiente
├── .gitignore
└── src/
    ├── server.ts         # Ponto de entrada: porta e app.listen
    ├── app.ts            # Factory do Express: CORS, JSON, rotas, Swagger UI
    ├── config/
    │   └── swagger.ts    # Opções do swagger-jsdoc (OpenAPI info, tags, globs)
    ├── routes/
    │   └── index.ts      # Agregação de rotas (prefixo /api no app)
    ├── controllers/      # Camada HTTP (req/res, status)
    ├── services/         # Regras de negócio e orquestração (futuro Kanban)
    ├── models/           # Tipos, entidades, DTOs (futuro)
    ├── middlewares/      # Middlewares Express customizados
    └── utils/            # Funções auxiliares sem acoplamento ao HTTP
```

### Responsabilidades

- **`server.ts`** — instancia o app e inicia o servidor HTTP.
- **`app.ts`** — configura middlewares globais, monta `/api-docs` e o router em `/api`.
- **`config/`** — configurações compartilhadas (ex.: Swagger).
- **`routes/`** — define caminhos e delega aos controllers.
- **`controllers/`** — traduz HTTP em chamadas aos services e formata respostas.
- **`services/`** — lógica de domínio (boards, colunas, cards nas próximas etapas).
- **`models/`** — contratos de dados e tipos compartilhados.
- **`middlewares/`** — autenticação, validação global, tratamento de erros, etc.
- **`utils/`** — helpers reutilizáveis.

Pastas reservadas para etapas futuras (`models`, `middlewares`, `utils`) podem conter apenas `.gitkeep` até haver código.

## O que não está nesta etapa

- **json-server** ou outro armazenamento persistente.
- CRUD de quadros, colunas ou cartões.
- Frontend.

Esses itens serão adicionados em etapas seguintes do repositório.

## Verificação rápida

1. `npm install`
2. `npm run dev`
3. Abrir [http://localhost:3000/api/health](http://localhost:3000/api/health) e [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
