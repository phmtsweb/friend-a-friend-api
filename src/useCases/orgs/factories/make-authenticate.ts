import { PrismaOrgsRepository } from '@/repositories/orgs/implementations/prisma-orgs-repository'
import { AuthenticateUseCase } from '../authenticate-use-case'

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(orgsRepository)
  return authenticateUseCase
}
