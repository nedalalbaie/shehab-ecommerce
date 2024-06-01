import type { OrderStatus } from "./status"

type Order = {
  id: number
  order_number: number
  total_price: number
  total_price_with_copupon: number
  residual_value: number
  paid_due_value: number
  due_date: string
  debt_arrears: number
  debt_ratio: number
  shipping_address: string
  status: OrderStatus 
  payment_method: 'cash' | 'cridit-card' | 'installments'
  installment_id?: number
  product_codes: string[]
  quantity_selected: number[]
  color_selected: string
  created_at: string
  updated_at: string
}

type PatchOrderRequest = {
  total_price: number
  residual_value?: number
  paid_due_value?: number
  due_date?: string
  debt_arrears?: number
  debt_ratio?: number
  // status: OrderStatus
  // payment_method: 'cash' | 'cridit-card' | 'installments'
  // installment_id: number
  product_codes: string []
  quantity_selected: number []
  color_selected: string
}

export type { Order, PatchOrderRequest }
