import { mdiAlertCircle, mdiCheckCircle, mdiInformation } from '@mdi/js'
import { reactive } from 'vue'

type AlertType = 'success' | 'info' | 'warning' | 'error'

export const alertStore = reactive<{
  open: boolean
  message: string | null
  type: AlertType
  icon: string
  show: ({ message, type }: { message: string; type: AlertType }) => void
  clear: () => void
}>({
  open: false,
  message: null,
  type: 'info',
  icon: mdiInformation,
  show({ message, type }: { message: string; type: AlertType }) {
    this.open = true
    this.message = message
    this.type = type
    this.icon = getIconFromType(type)
  },
  clear() {
    this.open = false
  }
})

function getIconFromType(type: AlertType) {
  switch (type) {
    case 'success':
      return mdiCheckCircle
    case 'info':
      return mdiInformation
    case 'warning':
      return mdiAlertCircle
    case 'error':
      return mdiAlertCircle
    default:
      return mdiInformation
  }
}
