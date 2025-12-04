import express from "express";
import cors from "cors";

import joyasRoutes from "./routes/joyas.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

app.use("/", joyasRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "La ruta consultada no existe" });
});

app.use(errorMiddleware);

export default app;
