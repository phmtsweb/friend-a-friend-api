import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/pets/implementations/in-memory-pets-repository'
import { randomUUID } from 'node:crypto'
import { GetPetByIdUseCase } from '../get-pet-by-id-use-case'
import { PetDTO } from '@/repositories/pets/interface/pets-repository'
import { PetNotFoundError } from '../errors/pet-not-found-error'

describe('Get pet by id', () => {
  let sut: GetPetByIdUseCase
  let petsRepository: InMemoryPetsRepository

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })
  it('should get a pet by its id', async () => {
    const org = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe@mail.com',
      whatsapp: '123456789',
      password_hash: '123456',
      address: {
        id: randomUUID(),
        street: 'Rua 1',
        number: 123,
        neighborhood: 'Bairro 1',
        city: 'Cidade 1',
        state: 'Estado 1',
        country: 'País 1',
        zip: '12345678',
      },
    }
    const pet: PetDTO = {
      name: 'Pet 1',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    const createdPet = await petsRepository.create(pet)

    const { pet: petFound } = await sut.execute(createdPet.id)

    expect(petFound).not.toBeNull()
    expect(petFound).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Pet 1',
        organization: expect.objectContaining({
          id: expect.any(String),
        }),
      }),
    )
  })

  it('should throw if pet is not found', async () => {
    await expect(sut.execute(randomUUID())).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
