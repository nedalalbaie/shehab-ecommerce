import { reactive } from 'vue'
import { useTheme } from 'vuetify'

const themeStore = reactive<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
  init: () => void
}>({
  theme: 'light',
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', this.theme)
    if (this.theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  },
  init() {
    const theme = useTheme()

    const currentTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (currentTheme) {
      this.theme = currentTheme
    }
    theme.global.name.value = this.theme
    if (this.theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }
})

export default themeStore
