import {
  FilterOptions,
  PaginationOptions,
  PetsRepository,
} from '@/repositories/pets/interface/pets-repository'

export class FetchPetsByCityUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute(
    city: string,
    { page, limit }: PaginationOptions = { page: 1, limit: 10 },
    {
      age,
      size,
      energyLevel,
      environment,
      independencyLevel,
    }: FilterOptions = {},
  ) {
    const pets = await this.petsRepository.findManyByCity(
      city,
      { page, limit },
      { age, size, energyLevel, environment, independencyLevel },
    )

    return { pets }
  }
}
