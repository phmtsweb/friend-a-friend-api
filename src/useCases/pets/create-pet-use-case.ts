import {
  PetDTO,
  PetsRepository,
} from '@/repositories/pets/interface/pets-repository'

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: PetDTO) {
    const pet = await this.petsRepository.create(data)
    return { pet }
  }
}
