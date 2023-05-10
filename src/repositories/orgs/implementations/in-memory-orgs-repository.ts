import { randomUUID } from 'node:crypto'
import { Org, OrgDTO, OrgsRepository } from '../interface/orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  private readonly orgs: Org[] = []
  async create(data: OrgDTO): Promise<Org> {
    const org = {
      id: randomUUID(),
      owner: data.owner,
      email: data.email,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      address: {
        id: randomUUID(),
        street: data.address.street,
        number: data.address.number,
        complement: data.address.complement ?? undefined,
        neighborhood: data.address.neighborhood,
        city: data.address.city,
        state: data.address.state,
        country: data.address.country,
        zip: data.address.zip,
      },
    }
    this.orgs.push(org)
    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.orgs.find((org) => org.email === email) ?? null
  }

  async findById(id: string): Promise<Org | null> {
    return this.orgs.find((org) => org.id === id) ?? null
  }
}
