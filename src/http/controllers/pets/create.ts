import { PetDTO } from '@/repositories/pets/interface/pets-repository'
import { makeCreatePetUseCase } from '@/useCases/pets/factories/make-create-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independencyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['INDOOR', 'OUTDOOR', 'BOTH']),
    photos: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
  })

  const data = createPetSchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    ...data,
    organization: request.user.sub,
  } as unknown as PetDTO)

  return reply.status(201).send({ pet })
}
