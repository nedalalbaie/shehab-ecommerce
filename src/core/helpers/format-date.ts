import { format } from 'date-fns'
import { ar } from 'date-fns/locale'

export const formatToDate = (date: string) => {
  return new Date(date).toISOString().split('T')[0]
}

export const fromatDatePickerToDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatToDatePicker = (dateString: string) => {
  const parts = dateString.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

export const formatDate = (date: string | null): string => {
  return date ? format(new Date(date), 'dd-MM-yyyy') : ''
}

export const formatDateWithTime = (date: string | null): string => {
  return date ? format(new Date(date), 'dd-MM-yyyy | hh:mm aaaa', { locale: ar }) : ''
}

export const formatDateServer = (date: string): string => {
  return format(new Date(date), 'yyyy-MM-dd')
}

