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
  organization: Org
  photos?: string[]
  requirements?: string[]
}

export type PetDTO = Omit<Pet, 'id'>

export interface PetsRepository {
  create(data: PetDTO): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  fetchByOrgId(orgId: string): Promise<Pet[]>
  fetchByCity(city: string): Promise<Pet[]>
}
