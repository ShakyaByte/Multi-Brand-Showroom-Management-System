import cors from "cors";

const allowOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
];

const corsOptions = cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Api-Key"],
});

export default corsOptions;
