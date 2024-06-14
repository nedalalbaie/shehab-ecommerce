import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import authStore from './core/stores/auth.store'
import vuetify from './core/plugins/vuetify'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
authStore.init()
app.use(router)
app.use(vuetify)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
      }
    }
  }
})

app.mount('#app')
