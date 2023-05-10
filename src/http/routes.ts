import { FastifyInstance } from 'fastify'
import { orgsRoutes } from './controllers/orgs/routes'
import { petsRoutes } from './controllers/pets/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(orgsRoutes, { prefix: '/orgs' })
  app.register(petsRoutes, { prefix: '/pets' })
}
