type Product = {
  id: number
  name: string
  description: string
  inventory_level: number
  image1_path: string
  image2_path: string
  image3_path: string
  image4_path: string
  price: number
  sub_category_id: number
  product_code: string
  gender: number
  hex_codes: string
}

type AddProductRequest = Omit<Product, 'id' | 'image1_path' | 'image2_path' | 'image3_path' | 'image4_path'> & {
  image1_path: File
  image2_path: File
  image3_path: File
  image4_path: File
}

export type { Product, AddProductRequest }
