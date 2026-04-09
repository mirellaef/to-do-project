# Sistema Kanban (fullstack)

Monorepo para um sistema de gerenciamento de tarefas no estilo **Kanban**, com backend em Node.js, persistência via **json-server** (etapa futura) e frontend em **Vite + React + TypeScript + shadcn/ui** (etapa futura).

## Estado atual do projeto

| Parte      | Status | Local |
| ---------- | ------ | ----- |
| Backend    | Etapa 1 concluída (estrutura + Express + CORS + Swagger) | [`backend/`](backend/) |
| Banco/API mock | Planejado (json-server) | — |
| Frontend   | Planejado (Vite + React + shadcn) | — |

## Documentação do backend

Instruções de instalação, scripts, variáveis de ambiente, mapa de pastas e endpoints estão em **[`backend/README.md`](backend/README.md)**.

## Próximas etapas (resumo)

1. **Banco de dados:** configurar `json-server` e modelo de dados (boards, colunas, cards).
2. **Frontend:** aplicativo Vite + React + TypeScript + shadcn/ui consumindo a API.

---

*Documentação detalhada da API e da arquitetura do servidor: ver [`backend/README.md`](backend/README.md).*
