import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import supertest from 'supertest'

describe('Authenticate organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an organization', async () => {
    await supertest(app.server)
      .post('/api/orgs')
      .send({
        owner: 'John Doe',
        email: 'jonhdoe@mail.com',
        whatsapp: '1234567890',
        password: '123456',
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

    const response = await supertest(app.server).post('/api/orgs/auth').send({
      email: 'jonhdoe@mail.com',
      password: '123456',
    })
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    )
  })
})
