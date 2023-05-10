import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getPetById } from './get-pet-by-id'
import { fetchPetsByCity } from './fetch-pets-by-city'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJWT] }, create)
  app.get('/:id', getPetById)
  app.get('/', fetchPetsByCity)
}
