import { APIError } from '@/errors/APIError'

export class AuthenticationError extends APIError {
  constructor() {
    super('Incorrect email/password combination', 401)
  }
}
