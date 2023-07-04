import Redis from "ioredis"

export const redisClient = new Redis({
  port: 6379,
  retryStrategy: times => Math.max(times * 100, 3000)
})
