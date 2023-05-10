import {
  OrgDTO,
  OrgsRepository,
} from '@/repositories/orgs/interface/orgs-repository'

export class CreateOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute(data: OrgDTO) {
    const org = await this.orgsRepository.create(data)
    return { organization: org }
  }
}
