import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrgUseCase } from '../../../useCases/orgs/factories/make-create-org'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgSchema = z.object({
    owner: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string().min(10).max(11),
    address: z.object({
      street: z.string(),
      number: z.number(),
      complement: z.string().optional(),
      neighborhood: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      zip: z.string(),
    }),
  })

  const data = createOrgSchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  const { organization } = await createOrgUseCase.execute(data)

  const { password_hash: _, ...orgWithoutPasswordHash } = organization

  return reply.status(201).send(orgWithoutPasswordHash)
}
