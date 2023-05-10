import { randomUUID } from 'node:crypto'
import {
  FilterOptions,
  PaginationOptions,
  Pet,
  PetDTO,
  PetsRepository,
} from '../interface/pets-repository'
import { Org } from '@/repositories/orgs/interface/orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  private readonly pets: Pet[] = []
  async create(data: PetDTO): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      description: data.description ?? undefined,
      size: data.size,
      energyLevel: data.energyLevel,
      environment: data.environment,
      independencyLevel: data.independencyLevel,
      organization: data.organization as Org,
      photos: data.photos ?? undefined,
      requirements: data.requirements ?? undefined,
    }

    this.pets.push(pet)
    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    return this.pets.find((pet) => pet.id === id) ?? null
  }

  async findManyByOrgId(
    orgId: string,
    { page, limit }: PaginationOptions,
    {
      age,
      size,
      energyLevel,
      environment,
      independencyLevel,
    }: FilterOptions = {},
  ): Promise<Pet[]> {
    return this.pets
      .filter((pet) => {
        return (
          pet.organization.id === orgId &&
          (!age || pet.age === age) &&
          (!size || pet.size === size) &&
          (!energyLevel || pet.energyLevel === energyLevel) &&
          (!environment || pet.environment === environment) &&
          (!independencyLevel || pet.independencyLevel === independencyLevel)
        )
      })
      .slice((page - 1) * limit, page * limit)
  }

  async findManyByCity(
    city: string,
    { page, limit }: PaginationOptions,
    {
      age,
      size,
      energyLevel,
      environment,
      independencyLevel,
    }: FilterOptions = {},
  ): Promise<Pet[]> {
    return this.pets
      .filter((pet) => {
        return (
          pet.organization.address.city === city &&
          (!age || pet.age === age) &&
          (!size || pet.size === size) &&
          (!energyLevel || pet.energyLevel === energyLevel) &&
          (!environment || pet.environment === environment) &&
          (!independencyLevel || pet.independencyLevel === independencyLevel)
        )
      })
      .slice((page - 1) * limit, page * limit)
  }
}
