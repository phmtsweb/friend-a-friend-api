import { PrismaPetsRepository } from '@/repositories/pets/implementations/prisma-pets-repository'
import { GetPetByIdUseCase } from '../get-pet-by-id-use-case'

export function makeGetPetById() {
  const petsRepository = new PrismaPetsRepository()
  const getPetByIdUseCase = new GetPetByIdUseCase(petsRepository)
  return getPetByIdUseCase
}
