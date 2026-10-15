import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import loaders from "./loaders/index.js";
const app = express();
const port = process.env.PORT || 8000;
loaders({ app });

// Start the server
app.listen(port, () => {
  console.log(`Server started at: ${port}`);
});

// Handle uncaught application errors
app.on("error", (err) => {
  console.error("App failed!!!", err);
});
