<template>
  <RouterView />
  <AppNotification />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppNotification from './core/components/AppNotification.vue'
import { alertStore }  from './core/stores/alert.store'

onMounted(() => {
  window.addEventListener('online', () => {
    alertStore.show({
      message: 'تم إعادة الإتصال بالإنترنت ',
      type: 'success'
    })
  })

  window.addEventListener('offline', () => {
    alertStore.show({
      message: 'لا يوجد اتصال  بالإنترنت',
      type: 'error'
    })
  })
})
</script>
