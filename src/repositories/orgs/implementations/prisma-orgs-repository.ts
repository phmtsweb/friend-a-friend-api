import { prisma } from '@/lib/prisma'
import { Org, OrgDTO, OrgsRepository } from '../interface/orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: OrgDTO): Promise<Org> {
    const org = await prisma.organization.create({
      data: {
        owner: data.owner,
        email: data.email,
        whatsapp: data.whatsapp,
        password_hash: data.password_hash,
        address: {
          create: {
            street: data.address.street,
            number: data.address.number,
            complement: data.address.complement ?? undefined,
            neighborhood: data.address.neighborhood,
            city: data.address.city,
            state: data.address.state,
            country: data.address.country,
            zip: data.address.zip,
          },
        },
      },
      include: {
        address: true,
      },
    })

    return {
      id: org.id,
      owner: org.owner,
      email: org.email,
      whatsapp: org.whatsapp,
      address: {
        id: org.address.id,
        street: org.address.street,
        number: org.address.number,
        complement: org.address.complement ?? undefined,
        neighborhood: org.address.neighborhood,
        city: org.address.city,
        state: org.address.state,
        country: org.address.country,
        zip: org.address.zip,
      },
    }
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.organization.findUnique({
      where: {
        email,
      },
      include: {
        address: true,
      },
    })

    if (!org) return null
    return {
      id: org.id,
      owner: org.owner,
      email: org.email,
      whatsapp: org.whatsapp,
      address: {
        id: org.address.id,
        street: org.address.street,
        number: org.address.number,
        complement: org.address.complement ?? undefined,
        neighborhood: org.address.neighborhood,
        city: org.address.city,
        state: org.address.state,
        country: org.address.country,
        zip: org.address.zip,
      },
    }
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.organization.findUnique({
      where: {
        id,
      },
      include: {
        address: true,
      },
    })

    if (!org) return null
    return {
      id: org.id,
      owner: org.owner,
      email: org.email,
      whatsapp: org.whatsapp,
      address: {
        id: org.address.id,
        street: org.address.street,
        number: org.address.number,
        complement: org.address.complement ?? undefined,
        neighborhood: org.address.neighborhood,
        city: org.address.city,
        state: org.address.state,
        country: org.address.country,
        zip: org.address.zip,
      },
    }
  }
}
