type Order = {
  id: number
  status: string
  customer_name: string 
  phone_number: string
  order_number: number
  total_price: number
  shipping_address: string
  product_codes: string[]
  quantity_selected: number[]
  created_at: string
  updated_at: string
}

type PostOrderRequest = {
  shipping_address: string
  coupon_code: string
}

type PatchOrderRequest = {
  id: number
  shipping_address: string
  coupon_code: string
}

export type { Order, PostOrderRequest, PatchOrderRequest }
