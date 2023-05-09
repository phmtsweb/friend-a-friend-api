import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { APIError } from './APIError'
import { env } from '@/env'
import { ZodError } from 'zod'

export async function globalErrorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (error instanceof APIError) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  return reply.status(500).send({ message: 'Internal server error' })
}
