import { OrgsRepository } from '@/repositories/orgs/interface/orgs-repository'
import { AuthenticationError } from './errors/authentication-error'
import { compare } from 'bcryptjs'

type AuthenticateDTO = {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute(data: AuthenticateDTO) {
    const org = await this.orgsRepository.findByEmail(data.email)

    if (!org) {
      throw new AuthenticationError()
    }

    const passwordMatch = await compare(data.password, org.password_hash)

    if (!passwordMatch) {
      throw new AuthenticationError()
    }

    return { organization: org }
  }
}
