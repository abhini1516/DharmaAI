import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
app.use("/api", router);

// ---------- Serve React ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We'll copy the frontend build here
const publicDir = path.join(__dirname, "public");

app.use(express.static(publicDir));

// Fix for Express v5: Changed "*" to "*path" to avoid PathError
app.get("*path", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

export default app;