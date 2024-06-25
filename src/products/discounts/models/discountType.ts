export const DiscountType = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed'
} as const

type DiscountType = 'percentage' | 'fixed'

export const discountTypeOptions: { label: string; value: DiscountType }[] = [
  {
    label: 'تخفيض بالنسبة المئوية',
    value: DiscountType.PERCENTAGE
  },
  {
    label: 'قيمة ثابتة',
    value: DiscountType.FIXED
  }
]
