import type { PaginationParams } from '@/core/models/pagination-params'
import type { BillStatus } from './status'

export type BillsPaginationParamas = PaginationParams &
  Partial<{
    bill_number: string
    status: BillStatus
  }>
