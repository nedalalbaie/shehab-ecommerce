import type { BillStatus } from "./status"

type Bill = {
  id: number
  bill_number: number
  customer_name: string
  phone_number: string
  quantity: any[]
  status: BillStatus
  total_price: number
  user_id: number
  product_codes: string[]
  created_at: string

  debt_arrears: number
}

export type { Bill }
