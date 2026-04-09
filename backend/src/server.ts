import { createApp } from "./app";

const PORT = Number(process.env.PORT) || 5173;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Swagger UI em http://localhost:${PORT}/api-docs`);
});
