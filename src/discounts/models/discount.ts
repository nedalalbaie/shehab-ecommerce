type Discount = {
  id: number
  discount_type: 'percentage' | 'fixed'
  discount_value: string
  start_date: string
  end_date: string
}

type DiscountFormRequest = Omit<Discount, 'id'>

export type { Discount, DiscountFormRequest }
