import type { BaseStatus } from '@/core/models/base-status'

export type CustomerStatusChangeBody = {
  id: number
  is_active: BaseStatus
}
