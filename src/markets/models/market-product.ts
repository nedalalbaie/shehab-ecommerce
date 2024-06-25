import type { Product } from "@/products/models/product";
import type { Market } from "./market"

export type MarketProducts = {
    market_info: Market;
    products: Product [];
    saller_price: number;
    inventory: number
}