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
  },
  init() {
    const theme = useTheme()

    const currentTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (currentTheme) {
      this.theme = currentTheme
    }
    theme.global.name.value = this.theme
  }
})

export default themeStore
