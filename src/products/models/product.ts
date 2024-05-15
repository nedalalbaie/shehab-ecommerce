type Product = {
  id: number
  product_code: string
  price: number
  name: string
  sub_category_id: number
  description: string
  hex_codes: string
  image1_path: string
  image2_path: string
  image3_path: string
  image4_path: string
  active_product: number
  selling_method: 'single-item' | 'package'
  minimum_quantity: number
}

type AddProductRequest = Omit<Product, 'id' | 'image1_path' | 'image2_path' | 'image3_path' | 'image4_path'> & {
  image1_path: File
  image2_path: File
  image3_path: File
  image4_path: File
}

export type { Product, AddProductRequest }
