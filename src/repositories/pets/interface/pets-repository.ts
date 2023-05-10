import { Org } from '@/repositories/orgs/interface/orgs-repository'

/* eslint-disable no-unused-vars */
export type Age = 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'

export type Size = 'SMALL' | 'MEDIUM' | 'LARGE'

export type EnergyLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export type Environment = 'INDOOR' | 'OUTDOOR' | 'BOTH'

export type IndependencyLevel = 'LOW' | 'MEDIUM' | 'HIGH'

export type Pet = {
  id: string
  name: string
  age: Age
  description?: string
  size: Size
  energyLevel: EnergyLevel
  environment: Environment
  independencyLevel: IndependencyLevel
  organization: Omit<Org, 'password_hash'>
  photos?: string[]
  requirements?: string[]
}

export type PaginationOptions = {
  page: number
  limit: number
}

export type FilterOptions = {
  age?: Age
  size?: Size
  energyLevel?: EnergyLevel
  environment?: Environment
  independencyLevel?: IndependencyLevel
}

export type PetDTO = Omit<Pet, 'id'>

export interface PetsRepository {
  create(data: PetDTO): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByOrgId(
    orgId: string,
    options: PaginationOptions,
    filterOptions: FilterOptions,
  ): Promise<Pet[]>
  findManyByCity(
    city: string,
    options: PaginationOptions,
    filterOptions?: FilterOptions,
  ): Promise<Pet[]>
}
