import {
  OrgDTO,
  OrgsRepository,
} from '@/repositories/orgs/interface/orgs-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { hash } from 'bcryptjs'
import { env } from '@/env'

type OrgUseCaseDTO = Omit<OrgDTO, 'password_hash'> & {
  password: string
}
export class CreateOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute(data: OrgUseCaseDTO) {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(data.email)

    if (orgAlreadyExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const password_hash = await hash(data.password, env.HASH_ROUNDS)

    const org = await this.orgsRepository.create({
      ...data,
      password_hash,
    })
    return { organization: org }
  }
}
