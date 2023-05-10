import { PrismaPetsRepository } from '@/repositories/pets/implementations/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city-use-case'

export function makeFetchPetsByCity() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petsRepository)
  return fetchPetsByCityUseCase
}
