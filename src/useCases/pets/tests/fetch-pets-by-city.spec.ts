import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/pets/implementations/in-memory-pets-repository'
import { randomUUID } from 'node:crypto'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city-use-case'
import { PetDTO } from '@/repositories/pets/interface/pets-repository'

describe('Fetch pets', () => {
  let sut: FetchPetsByCityUseCase
  let petsRepository: InMemoryPetsRepository
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })
  it('should fetch pets by city', async () => {
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

    const org2 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe2@mail.com',
      whatsapp: '123456789',
      password_hash: '123456',
      address: {
        id: randomUUID(),
        street: 'Rua 1',
        number: 123,
        neighborhood: 'Bairro 1',
        city: 'Cidade 2',
        state: 'Estado 1',
        country: 'País 1',
        zip: '12345678',
      },
    }

    const org3 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe3@mail.com',
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

    petsRepository.create(pet)

    const pet2: PetDTO = {
      name: 'Pet 2',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org2,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet2)

    const pet3: PetDTO = {
      name: 'Pet 3',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org3,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet3)

    const { pets } = await sut.execute('Cidade 1')

    expect(pets).not.toBeNull()
    expect(pets).toHaveLength(2)
  })

  it('should fetch pets by age', async () => {
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

    const org2 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe2@mail.com',
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

    const org3 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe3@mail.com',
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

    petsRepository.create(pet)

    const pet2: PetDTO = {
      name: 'Pet 2',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org2,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet2)

    const pet3: PetDTO = {
      name: 'Pet 3',
      age: 'ADULT',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org3,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet3)

    const { pets } = await sut.execute('Cidade 1', undefined, { age: 'BABY' })

    expect(pets).not.toBeNull()
    expect(pets).toHaveLength(2)
  })

  it('should fetch pets by size', async () => {
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

    const org2 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe2@mail.com',
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

    const org3 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe3@mail.com',
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

    petsRepository.create(pet)

    const pet2: PetDTO = {
      name: 'Pet 2',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org2,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet2)

    const pet3: PetDTO = {
      name: 'Pet 3',
      age: 'BABY',
      size: 'MEDIUM',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org3,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet3)

    const { pets } = await sut.execute('Cidade 1', undefined, { size: 'SMALL' })

    expect(pets).not.toBeNull()
    expect(pets).toHaveLength(2)
  })

  it('should fetch pets by energy level', async () => {
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

    const org2 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe2@mail.com',
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

    const org3 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe3@mail.com',
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
      energyLevel: 'HIGH',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet)

    const pet2: PetDTO = {
      name: 'Pet 2',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org2,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet2)

    const pet3: PetDTO = {
      name: 'Pet 3',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org3,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet3)

    const { pets } = await sut.execute('Cidade 1', undefined, {
      energyLevel: 'HIGH',
    })

    expect(pets).not.toBeNull()
    expect(pets).toHaveLength(1)
  })

  it('should fetch pets by independency level', async () => {
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

    const org2 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe2@mail.com',
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

    const org3 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe3@mail.com',
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

    petsRepository.create(pet)

    const pet2: PetDTO = {
      name: 'Pet 2',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org2,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet2)

    const pet3: PetDTO = {
      name: 'Pet 3',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org3,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet3)

    const { pets } = await sut.execute('Cidade 1', undefined, {
      independencyLevel: 'LOW',
    })

    expect(pets).not.toBeNull()
    expect(pets).toHaveLength(3)
  })

  it('should fetch pets by environment', async () => {
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

    const org2 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe2@mail.com',
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

    const org3 = {
      id: randomUUID(),
      owner: 'John Doe',
      email: 'jonhdoe3@mail.com',
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

    petsRepository.create(pet)

    const pet2: PetDTO = {
      name: 'Pet 2',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org2,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet2)

    const pet3: PetDTO = {
      name: 'Pet 3',
      age: 'BABY',
      size: 'SMALL',
      energyLevel: 'LOW',
      environment: 'INDOOR',
      independencyLevel: 'LOW',
      organization: org3,
      photos: ['http://photo1.com', 'http://photo2.com'],
      requirements: ['Requirement 1', 'Requirement 2'],
    }

    petsRepository.create(pet3)

    const { pets } = await sut.execute('Cidade 1', undefined, {
      environment: 'OUTDOOR',
    })

    expect(pets).not.toBeNull()
    expect(pets).toHaveLength(0)
  })
})
