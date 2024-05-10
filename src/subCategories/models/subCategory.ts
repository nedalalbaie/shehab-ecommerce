type SubCategory = {
  id: number
  name: string
  description: string
  image_path: string
  cat_id: number
}

type CreateOrPatchSubCategory = {
  name: string
  description: string
  image_path: File
  cat_id: number
}

export type { SubCategory, CreateOrPatchSubCategory }
