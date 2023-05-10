import { APIError } from '@/errors/APIError'

export class PetNotFoundError extends APIError {
  constructor() {
    super('Pet not found', 404)
  }
}
