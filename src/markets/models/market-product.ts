import type { Product } from "@/products/models/product";
import type { Market } from "./market"

export type MarketProducts = {
    market_info: Market;
    product_info: Product;
    saller_price: number;
    inventory: number
}