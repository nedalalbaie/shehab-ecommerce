import type { BaseStatus } from "@/core/models/base-status"

export type MarketStatusChangeBody = {
  id: number
  active_market: BaseStatus
}
