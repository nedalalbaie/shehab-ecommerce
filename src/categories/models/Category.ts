type Category = {
  id: number
  name: string
  description: string
  image_path: string
  created_at: string
  updated_at: string
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
}>

export type { Category, AddCategoryRequest, EditCategoryRequest }
