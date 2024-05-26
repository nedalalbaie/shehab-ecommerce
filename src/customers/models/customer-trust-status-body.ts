import type { BaseStatus } from '@/core/models/base-status'

export type CustomerTrustStatusChangeBody = {
  id: number
  is_trusted: BaseStatus
}
