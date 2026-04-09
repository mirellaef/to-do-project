import cors from "cors";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { router } from "./routes";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const openapiSpec = swaggerJsdoc(swaggerOptions);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

  app.use("/api", router);

  app.use(errorHandler);

  return app;
}
