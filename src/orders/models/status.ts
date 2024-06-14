export const STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPING: 'shipping',
  CANCELD: 'canceled'
} as const

export type OrderStatus = (typeof STATUS)[keyof typeof STATUS]

export const statusOptions = [
  {
    label: 'قيد المعالجة',
    value: STATUS.PENDING
  },
  {
    label: 'تم القبول',
    value: STATUS.CONFIRMED
  },
  {
    label: 'قيد التوصيل',
    value: STATUS.SHIPPING
  }
]

export type ChangeOrderBody = {
  order_number: string
  new_status: OrderStatus
}
