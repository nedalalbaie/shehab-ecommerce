import { STATUS } from '@/orders/models/status'

export const checkStatus = (status: string) => {
  switch (status) {
    case STATUS.DELIVERD:
      return 'تم التوصيل'
    case STATUS.CANCELD:
      return 'ملغية'
    case STATUS.CONFIRMED:
      return 'تم الموافقة'
    case STATUS.SHIPPED:
      return 'قيد التوصيل'
    default:
      return 'قيد المعالجة'
  }
}
