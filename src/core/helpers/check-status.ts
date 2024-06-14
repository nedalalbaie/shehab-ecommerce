import { STATUS } from '@/orders/models/status'

export const checkStatus = (status: string) => {
  switch (status) {
    case STATUS.CANCELD:
      return 'ملغية'
    case STATUS.CONFIRMED:
      return 'تم القبول'
    case STATUS.SHIPPING:
      return 'قيد التوصيل'
    default:
      return 'قيد المعالجة'
  }
}
