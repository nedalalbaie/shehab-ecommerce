export const STATUS = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    SHIPPING: "shipping",
    DELIVERD: "deliverd",
    CANCELD: "canceled",
} as const

export type BillStatus = (typeof STATUS)[keyof typeof STATUS]