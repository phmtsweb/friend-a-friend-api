import { APIError } from '@/errors/APIError'

export class OrganizationAlreadyExistsError extends APIError {
  constructor() {
    super('Organization already exists', 409)
  }
}
