import { FilterOptions } from '@/repositories/pets/interface/pets-repository'
import { makeFetchPetsByCity } from '@/useCases/pets/factories/make-fetch-pets-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    city: z.string(),
    page: z.number().default(1),
    limit: z.number().default(10),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environment: z.enum(['INDOOR', 'OUTDOOR', 'BOTH']).optional(),
  })

  const { city, page, limit, ...filterOptions } = querySchema.parse(
    request.query,
  )

  const fetchPetsByCityUseCase = makeFetchPetsByCity()

  const { pets } = await fetchPetsByCityUseCase.execute(
    city,
    { page, limit },
    filterOptions as FilterOptions,
  )

  return reply.status(200).send({ pets })
}
