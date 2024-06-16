import type { BillStatus } from './status'

export type ChangeBillStatusBody = {
  bill_number: string
  status: BillStatus
}
