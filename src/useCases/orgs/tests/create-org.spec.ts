import { describe, it, expect, beforeEach } from 'vitest'
import { CreateOrgUseCase } from '../create-org-use-case'
import { InMemoryOrgsRepository } from '@/repositories/orgs/implementations/in-memory-orgs-repository'

describe('Create organization', () => {
  let sut: CreateOrgUseCase

  beforeEach(() => {
    const orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })
  it('should create a new organization with address', async () => {
    const { organization } = await sut.execute({
      owner: 'John Doe',
      email: 'jonhdoe@mail.com',
      whatsapp: '123456789',
      password_hash: '123456',
      address: {
        street: 'Rua 1',
        number: 123,
        neighborhood: 'Bairro 1',
        city: 'Cidade 1',
        state: 'Estado 1',
        country: 'País 1',
        zip: '12345678',
      },
    })

    expect(organization).not.toBeNull()
    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        address: expect.objectContaining({
          id: expect.any(String),
        }),
      }),
    )
  })
})
