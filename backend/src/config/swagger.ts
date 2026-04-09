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
    tags: [
      { name: "Health", description: "Verificação de disponibilidade da API" },
      { name: "Tasks", description: "CRUD de tarefas Kanban" },
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          required: ["id", "title", "description", "status", "createdAt"],
          properties: {
            id: { type: "string", format: "uuid" },
            title: { type: "string" },
            description: { type: "string" },
            status: {
              type: "string",
              enum: ["todo", "in-progress", "done"],
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        CreateTaskBody: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string", minLength: 1 },
            description: { type: "string", default: "" },
            status: {
              type: "string",
              enum: ["todo", "in-progress", "done"],
              default: "todo",
            },
          },
        },
        UpdateTaskBody: {
          type: "object",
          minProperties: 1,
          properties: {
            title: { type: "string", minLength: 1 },
            description: { type: "string" },
            status: {
              type: "string",
              enum: ["todo", "in-progress", "done"],
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string" },
            details: { type: "object" },
          },
        },
      },
    },
  },
  apis: apis.map((p) => path.join(process.cwd(), p)),
};
