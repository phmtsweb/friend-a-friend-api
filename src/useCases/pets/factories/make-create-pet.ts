import { PrismaPetsRepository } from '@/repositories/pets/implementations/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet-use-case'

export function makeCreatePetUseCase(): CreatePetUseCase {
  const petsRepository = new PrismaPetsRepository()
  const createPetUseCase = new CreatePetUseCase(petsRepository)
  return createPetUseCase
}
