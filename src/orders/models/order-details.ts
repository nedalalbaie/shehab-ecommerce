import type { Customer } from "@/customers/models/customer"
import type { Order } from "./order"
import type { Product } from "@/products/models/product"

export type OrderDetails = {
    order_details: Order,
    user: Customer,
    products: Product[]
}