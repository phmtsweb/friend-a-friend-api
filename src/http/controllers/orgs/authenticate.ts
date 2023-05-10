import { makeAuthenticateUseCase } from '@/useCases/orgs/factories/make-authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authSchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  const { organization } = await authenticateUseCase.execute({
    email,
    password,
  })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: organization.id,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: organization.id,
        expiresIn: '2d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: true,
    })
    .status(200)
    .send({ token })
}
