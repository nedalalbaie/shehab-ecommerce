export const STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPING: 'shipping',
  CANCELD: 'canceled'
} as const

export type OrderStatus = (typeof STATUS)[keyof typeof STATUS]

export type ChangeOrderBody = {
  order_number: number
  new_status: OrderStatus
}
