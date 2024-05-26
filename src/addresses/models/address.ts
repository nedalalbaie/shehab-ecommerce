type Address = {
  id: number
  city: string
  neighbourhood: string
  address_name: string
  description: string
  user_id: number
  created_at: string
}

type CreateAddress = Omit<Address, 'id' | 'created_at'>

export type { Address, CreateAddress }
