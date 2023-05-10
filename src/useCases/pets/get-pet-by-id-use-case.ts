import { PetsRepository } from '@/repositories/pets/interface/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'

export class GetPetByIdUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute(id: string) {
    const pet = await this.petsRepository.findById(id)
    if (!pet) {
      throw new PetNotFoundError()
    }
    return { pet }
  }
}
