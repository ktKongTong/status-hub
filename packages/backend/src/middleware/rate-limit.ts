import { rateLimiter } from "hono-rate-limiter";

export const rateLimit = rateLimiter({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "",
  message: { error: "Rate limit exceeded" },
})