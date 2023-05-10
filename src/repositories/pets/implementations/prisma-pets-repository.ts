import {
  FilterOptions,
  PaginationOptions,
  Pet,
  PetDTO,
  PetsRepository,
} from '../interface/pets-repository'
import { prisma } from '@/lib/prisma'
import {
  Pet as PetPrisma,
  Organization,
  Address,
  Photos,
  Requirements,
} from '@prisma/client'

type PetWithRelations = PetPrisma & {
  organization: Organization & {
    address: Address
  }
  photos: Photos[]
  requirements: Requirements[]
}

export class PrismaPetsRepository implements PetsRepository {
  private formatPetObject(pet: PetWithRelations): Pet {
    return {
      id: pet.id,
      name: pet.name,
      age: pet.age,
      description: pet.description ?? undefined,
      size: pet.size,
      energyLevel: pet.energy_level,
      environment: pet.environment,
      independencyLevel: pet.independency_level,
      organization: {
        id: pet.organization.id,
        owner: pet.organization.owner,
        email: pet.organization.email,
        whatsapp: pet.organization.whatsapp,
        address: {
          id: pet.organization.address.id,
          street: pet.organization.address.street,
          number: pet.organization.address.number,
          complement: pet.organization.address.complement ?? undefined,
          neighborhood: pet.organization.address.neighborhood,
          city: pet.organization.address.city,
          state: pet.organization.address.state,
          country: pet.organization.address.country,
          zip: pet.organization.address.zip,
        },
      },
      photos: pet.photos.map((photo) => photo.url),
      requirements: pet.requirements.map(
        (requirement) => requirement.description,
      ),
    }
  }

  async create(data: PetDTO): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        age: data.age,
        description: data.description ?? undefined,
        size: data.size,
        energy_level: data.energyLevel,
        environment: data.environment,
        independency_level: data.independencyLevel,
        organization_id: data.organization as string,
        photos: {
          create: data.photos?.map((photo) => ({ url: photo })),
        },
        requirements: {
          create: data.requirements?.map((requirement) => ({
            description: requirement,
          })),
        },
      },
      include: {
        organization: {
          include: {
            address: true,
          },
        },
        photos: true,
        requirements: true,
      },
    })
    return this.formatPetObject(pet)
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        organization: {
          include: {
            address: true,
          },
        },
        photos: true,
        requirements: true,
      },
    })

    if (!pet) return null

    return this.formatPetObject(pet)
  }

  async findManyByOrgId(
    orgId: string,
    { page, limit }: PaginationOptions,
    { age, size, energyLevel, environment, independencyLevel }: FilterOptions,
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: orgId,
        age: age ? { equals: age } : undefined,
        size: size ? { equals: size } : undefined,
        energy_level: energyLevel ? { equals: energyLevel } : undefined,
        environment: environment ? { equals: environment } : undefined,
        independency_level: independencyLevel
          ? { equals: independencyLevel }
          : undefined,
      },
      include: {
        organization: {
          include: {
            address: true,
          },
        },
        photos: true,
        requirements: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    return pets.map(this.formatPetObject)
  }

  async findManyByCity(
    city: string,
    { page, limit }: PaginationOptions,
    { age, size, energyLevel, environment, independencyLevel }: FilterOptions,
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          address: {
            city,
          },
        },
        age: age ? { equals: age } : undefined,
        size: size ? { equals: size } : undefined,
        energy_level: energyLevel ? { equals: energyLevel } : undefined,
        environment: environment ? { equals: environment } : undefined,
        independency_level: independencyLevel
          ? { equals: independencyLevel }
          : undefined,
      },
      include: {
        organization: {
          include: {
            address: true,
          },
        },
        photos: true,
        requirements: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    return pets.map(this.formatPetObject)
  }
}
