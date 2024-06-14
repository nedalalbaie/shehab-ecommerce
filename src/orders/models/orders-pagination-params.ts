import type { PaginationParams } from '@/core/models/pagination-params'
import type { OrderStatus } from './status'

export type OrdersPaginationParamas = PaginationParams &
  Partial<{
    order_number: string
    status: OrderStatus
  }>
