import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logPath = path.join(__dirname, "../../access.log");

export const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const elapsed = Date.now() - start;
    const line = `[${new Date().toISOString()}] ${req.method} ${
      req.originalUrl
    } - ${res.statusCode} - ${elapsed}ms\n`;

    fs.appendFile(logPath, line, (err) => {
      if (err) console.error("Error escribiendo log:", err.message);
    });
  });

  next();
};
