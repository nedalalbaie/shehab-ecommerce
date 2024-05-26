export const STATUS = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    SHIPPED: "shipped",
    DELIVERD: "deliverd",
    CANCELD: "canceled",
} as const

export type OrderStatus = typeof STATUS