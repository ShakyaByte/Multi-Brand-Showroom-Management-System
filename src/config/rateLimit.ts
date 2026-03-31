import rateLimit from "express-rate-limit";

// General API rate limiter — 100 requests per minute per IP
export const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,
});

// Strict limiter for auth routes (login, register, forgot/reset password)
// Prevents brute-force and credential-stuffing attacks
export const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Only 10 attempts per minute
  message: {
    success: false,
    message: "Too many authentication attempts, please try again after 1 minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Default export for backward compatibility with server.ts
export default generalLimiter;

