import type { MainCategory } from './mainCategory'
import type { SubCategory } from './subCategory'

export type CategoryArray = MainCategory & {
  children: {
    id: number
    name: string
    description: string
    image_path: string
    created_at: string
    updated_at: string
    cat_zero_id: number
    children: SubCategory[]
  } []
}
