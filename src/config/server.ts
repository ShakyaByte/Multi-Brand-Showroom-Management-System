import express from "express";
import path from "path";
import corsOptions from "@/config/cors";
import helmetOptions from "@/config/helmet";
import rateLimitOptions from "@/config/rateLimit";

const app = express();

// Built-in Middlewares
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Security Middlewares
app.use(corsOptions);
app.use(helmetOptions);
app.use(rateLimitOptions);

// Health Check
app.get("/", (_req, res) => {
  res.json({
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

export default app;
