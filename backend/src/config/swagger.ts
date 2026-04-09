import type { Options } from "swagger-jsdoc";
import path from "path";

const apis =
  process.env.NODE_ENV === "production"
    ? [
        path.join("dist", "routes", "*.js"),
        path.join("dist", "controllers", "*.js"),
      ]
    : [
        path.join("src", "routes", "*.ts"),
        path.join("src", "controllers", "*.ts"),
      ];

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Kanban API",
      version: "1.0.0",
      description:
        "API REST para gerenciamento de tarefas no estilo Kanban. Documentação gerada com Swagger (JSDoc nas rotas).",
    },
    servers: [
      {
        url: "/",
        description: "Servidor atual",
      },
    ],
    tags: [{ name: "Health", description: "Verificação de disponibilidade da API" }],
  },
  apis: apis.map((p) => path.join(process.cwd(), p)),
};
