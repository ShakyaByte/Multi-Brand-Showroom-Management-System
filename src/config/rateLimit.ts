import rateLimit from "express-rate-limit";

const rateLimitOptions = rateLimit({
  windowMs: 60000, // 1 minute
  max: 500, // limit each IP to 500 requests per minute
  message: { success: false, message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimitOptions;
