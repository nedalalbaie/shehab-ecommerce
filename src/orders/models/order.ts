import type { OrderStatus } from "./status"

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
  residual_value: number
  paid_due_value: number
  due_date: string
  debt_arrears: number
  debt_ratio: number
  shipping_address: string
  status: OrderStatus
  payment_method: 'cash' | 'cridit-card' | 'installments'
  installment_id: number
  product_codes: string []
  quantity_selected: number []
  color_selected: string
}

export type { Order, PostOrderRequest, PatchOrderRequest }
