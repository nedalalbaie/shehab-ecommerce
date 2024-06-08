export const STATUS = {
    ACCEPTED: "accepted",
    CANCELD: "canceled"
} as const

export type BillStatus = (typeof STATUS)[keyof typeof STATUS]
  