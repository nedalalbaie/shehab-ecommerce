type Product = {
  id: number
  name: string
  description: string
  inventory: number
  image1_path: string
  image2_path: string
  image3_path: string
  image4_path: string
  price: number
  sub_category_id: number
  product_code: string
  hex_codes: string
  market_id: number
  minimum_sale: number
  selling_method: 'single-item' | 'package'
}

type AddProductRequest = Omit<Product, 'id' | 'image1_path' | 'image2_path' | 'image3_path' | 'image4_path'> & {
  image1_path: File
  image2_path: File
  image3_path: File
  image4_path: File
}

export type { Product, AddProductRequest }
