import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('10m'),
  HASH_ROUNDS: z.coerce.number().default(6),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new Error('Environment variables validation failed')
}

export const env = _env.data
