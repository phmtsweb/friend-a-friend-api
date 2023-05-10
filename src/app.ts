import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { globalErrorHandler } from './errors/globalErrorHandler'
import { env } from './env'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.JWT_EXPIRES_IN,
  },
})

app.register(fastifyCookie)

app.get('/', async (request, reply) => {
  reply.send({ hello: 'world 2' })
})

app.setErrorHandler(globalErrorHandler)

export { app }
