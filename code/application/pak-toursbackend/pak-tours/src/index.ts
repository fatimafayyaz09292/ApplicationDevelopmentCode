import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import loaders from "./loaders/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 8000;

loaders({ app });

// Start the server
app.listen(port, () => {
  console.log(`Server started at: ${port}`);
});

// Handle application errors
app.on("error", (err) => {
  console.error("App failed!!!", err);
});
