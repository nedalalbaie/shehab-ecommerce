import { reactive } from 'vue'

type AlertType = 'success' | 'info' | 'error' | 'wifiOn' | 'wifiOff' | 'delete'
let notificationTimer: ReturnType<typeof setTimeout>

const alertStore = reactive<{
  open: boolean
  message: string | null
  type: AlertType
  show: ({ message, type }: { message: string; type: AlertType }) => void
  clear: () => void
}>({
  open: false,
  message: null,
  type: 'info',
  show({ message, type }: { message: string; type: AlertType }) {
    clearTimeout(notificationTimer)
    this.open = true
    this.message = message
    this.type = type

    if (this.type !== 'wifiOff') {
      notificationTimer = setTimeout(() => {
        this.clear()
      }, 3000)
    }
  },
  clear() {
    this.open = false
  }
})

export { alertStore }
