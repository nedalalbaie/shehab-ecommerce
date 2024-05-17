import type { BaseStatus } from "@/core/models/base-status"

export type ProductStatusChangeBody = {
  id: number
  active_product: BaseStatus
}
