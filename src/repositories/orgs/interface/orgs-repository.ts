import { Pet } from '@/repositories/pets/interface/pets-repository'

export type Address = {
  id: string
  street: string
  number: number
  complement?: string
  neighborhood: string
  city: string
  state: string
  country: string
  zip: string
}

export type AddressDTO = Omit<Address, 'id'>

export type Org = {
  id: string
  owner: string
  email: string
  password_hash: string
  whatsapp: string
  address: Address
  pets?: Pet[]
}

export type OrgDTO = Omit<Org, 'id' | 'address'> & {
  address: AddressDTO
}

export interface OrgsRepository {
  create(data: OrgDTO): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
}
