import { makeGetPetById } from '@/useCases/pets/factories/make-get-pet-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const getPetByIdUseCase = makeGetPetById()

  const { pet } = await getPetByIdUseCase.execute(id)

  return reply.status(200).send({ pet })
}
