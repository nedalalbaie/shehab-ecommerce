type Category = {
  id: number
  name: string
  description: string
  image_path: string
  created_at: string
  updated_at: string
  cat_zero_id: number
}

type AddCategoryRequest = {
  name: string
  description: string
  image_path: File
}

type EditCategoryRequest = Partial<{
  name: string
  description: string
  image_path: File
  cat_zero_id: number
}>

export type { Category, AddCategoryRequest, EditCategoryRequest }
