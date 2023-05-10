import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/orgs/implementations/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { env } from '@/env'
import { AuthenticateUseCase } from '../authenticate-use-case'
import { AuthenticationError } from '../errors/authentication-error'

describe('Create organization', () => {
  let sut: AuthenticateUseCase
  let orgsRepository: InMemoryOrgsRepository

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })
  it('should be able to authenticate an organization', async () => {
    const organization = {
      owner: 'John Doe',
      email: 'jonhdoe@mail.com',
      whatsapp: '123456789',
      password_hash: await hash('123456', env.HASH_ROUNDS),
      address: {
        street: 'Rua 1',
        number: 123,
        neighborhood: 'Bairro 1',
        city: 'Cidade 1',
        state: 'Estado 1',
        country: 'País 1',
        zip: '12345678',
      },
    }

    await orgsRepository.create(organization)

    const { organization: org } = await sut.execute({
      email: organization.email,
      password: '123456',
    })

    expect(org).not.toBeNull()
    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        address: expect.objectContaining({
          id: expect.any(String),
        }),
      }),
    )
  })

  it('should not be able to authenticate with non existing organization', async () => {
    await expect(
      sut.execute({
        email: 'teste@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AuthenticationError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const organization = {
      owner: 'John Doe',
      email: 'jonhdoe@mail.com',
      whatsapp: '123456789',
      password_hash: await hash('123456', env.HASH_ROUNDS),
      address: {
        street: 'Rua 1',
        number: 123,
        neighborhood: 'Bairro 1',
        city: 'Cidade 1',
        state: 'Estado 1',
        country: 'País 1',
        zip: '12345678',
      },
    }

    await orgsRepository.create(organization)

    await expect(
      sut.execute({
        email: organization.email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AuthenticationError)
  })
})
