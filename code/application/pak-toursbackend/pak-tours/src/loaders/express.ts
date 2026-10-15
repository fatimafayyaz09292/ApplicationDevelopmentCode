import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "../routes/auth.routes.js";
import travelRouter from "../routes/travel.routes.js";
import bookingRouter from "../routes/booking.routes.js";
import newsletterRouter from "../routes/newsletter.routes.js";

export default async function ({ app }: { app: Express }) {
  app.enable("trust-proxy");

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "15kb" }));
  app.use(express.urlencoded({ extended: true, limit: "15kb" }));
  app.use(express.static("public"));
  app.use(cookieParser());
  app.use(morgan("tiny"));

  // Global routes
  app.use("/api/v1/user", authRouter);
  app.use("/api/v1/travel", travelRouter);
  app.use("/api/v1/booking", bookingRouter);
  app.use("/api/v1/newsletter", newsletterRouter);

  // Default route for 404 errors
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  // Global error handler
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  });
}
