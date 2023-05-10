import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from '../create-pet-use-case'
import { InMemoryPetsRepository } from '@/repositories/pets/implementations/in-memory-pets-repository'
import { randomUUID } from 'node:crypto'

describe('Create organization', () => {
  let sut: CreatePetUseCase

  beforeEach(() => {
    const petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })
  it('should create a new organization with address', async () => {
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
    const { pet } = await sut.execute({
      name: 'Pet 1',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    })

    expect(pet).not.toBeNull()
    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        organization: expect.objectContaining({
          id: expect.any(String),
        }),
      }),
    )
  })
})
