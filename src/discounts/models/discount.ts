type Discount = {
  id: number
  code: string
  discount_type: 'percentage' | 'fixed'
  amount: string
  start_date: string
  end_date: string
}

type DiscountFormRequest = Omit<Discount, 'id'>

export type { Discount, DiscountFormRequest }
