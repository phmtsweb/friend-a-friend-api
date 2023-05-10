import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { globalErrorHandler } from './errors/globalErrorHandler'
import { env } from './env'
import { appRoutes } from './http/routes'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: env.JWT_EXPIRES_IN,
  },
})

app.register(fastifyCookie)

app.register(appRoutes, { prefix: '/api' })

app.setErrorHandler(globalErrorHandler)

export { app }
