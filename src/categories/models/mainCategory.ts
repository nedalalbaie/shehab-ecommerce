type MainCategory = {
  id: number
  name: string
  description: string
  image_path: string
}

type PostMainCategoryRequest = {
  name: string
  description: string
  image_path: File | string
}

export type { MainCategory, PostMainCategoryRequest }
