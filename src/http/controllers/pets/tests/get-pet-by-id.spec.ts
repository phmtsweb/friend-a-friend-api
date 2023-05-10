import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import supertest from 'supertest'

describe('Create a pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
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

    const authResponse = await supertest(app.server)
      .post('/api/orgs/auth')
      .send({
        email: 'jonhdoe@mail.com',
        password: '123456',
      })

    const { token } = authResponse.body

    const petResponse = await supertest(app.server)
      .post('/api/pets')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Pet 1',
        age: 'BABY',
        size: 'SMALL',
        energyLevel: 'LOW',
        environment: 'INDOOR',
        independencyLevel: 'LOW',
        photos: ['http://photo1.com', 'http://photo2.com'],
        requirements: ['Requirement 1', 'Requirement 2'],
      })

    const { id } = petResponse.body.pet

    const response = await supertest(app.server).get(`/api/pets/${id}`).send()
    expect(response.status).toBe(200)
    expect(response.body.pet).toEqual(expect.objectContaining({ id }))
  })
})
