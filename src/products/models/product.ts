import type { Discount } from "../discounts/models/discount"

type Product = {
  id: number
  name: string
  product_code: string
  price: number
  sub_category_id: number
  description: string
  hex_codes: string
  image1_path: string
  image2_path: string
  image3_path: string
  image4_path: string
  active_product: number
  selling_method: string
  minimum_quantity: number
  discount: Discount
}

type AddProductRequest = {
  name: string
  product_code: string
  price: number
  sub_category_id: number
  description: string
  hex_codes: string
  image1_path: File
  image2_path: File
  image3_path: File
  image4_path: File
  selling_method: string
  minimum_quantity: number
}

const sellingMethods = [
  {
    label: 'بالقطعة الواحدة',
    value: 'single-item'
  },
  {
    label: 'بالحزمة',
    value: 'package'
  }
]

export { type Product, type AddProductRequest, sellingMethods }
