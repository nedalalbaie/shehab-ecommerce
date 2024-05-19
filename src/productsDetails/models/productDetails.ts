import type { Market } from "@/markets/models/market"
import type { Product } from "@/products/models/product";

type ProductDetails = {
  market_info: Market;
  product_info: Product;
  saller_price: number;
  inventory: number;
}

type CreateProductDetails = {
  market_id: number
  product_id: number
  saller_price: number
  inventory: number
}

export type {  ProductDetails, CreateProductDetails }
