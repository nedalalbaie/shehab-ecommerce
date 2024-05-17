<template>
  <div
    :class="notificationStatus"
    dir="rtl"
    class="fixed bottom-3 left-[-25rem] bg-red-800 rounded-md w-72 sm:w-96 text-white flex gap-4 items-center px-2 py-2 shadow-alert border-2 border-neutral-600"
    :style="backgroundColor"
  >
    <div
      class="h-8 md:h-11 w-1 rounded-md"
      :class="alertStore.type"
    />
    <SuccessCheck v-if="alertStore.type == 'success'" />
    <InfoIcon v-if="alertStore.type == 'info'" />
    <ErrorIcon v-if="alertStore.type == 'error'" />
    <TrashCan v-if="alertStore.type == 'delete'" />
    <WifiOn v-if="alertStore.type == 'wifiOn'" />
    <WifiOff v-if="alertStore.type == 'wifiOff'" />

    <p class="text-sm ">
      {{ alertStore.message }}
    </p>
    <v-btn
      v-if="alertStore.type !== 'wifiOff' && alertStore.type !== 'wifiOn'"
      size="small"
      class="mr-auto"
      :icon="mdiClose"
      color="#333C42"
      @click="alertStore.clear()"
    />
  </div>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js'
import { alertStore } from '../stores/alert.store'
import SuccessCheck from './icons/SuccessCheck.vue'
import InfoIcon from './icons/InfoIcon.vue'
import ErrorIcon from './icons/ErrorIcon.vue'
import WifiOn from './icons/WifiOn.vue'
import WifiOff from './icons/WifiOff.vue'
import TrashCan from './icons/TrashCan.vue'
import { computed, ref, type CSSProperties, watch } from 'vue'

const firstRender = ref(false)
const notificationStatus = ref('')

const backgroundColor = computed<CSSProperties>(() => {
  return {
    backgroundColor:
      alertStore.type == 'wifiOn' ? '#15803d' : alertStore.type == 'wifiOff' ? '#991b1b' : '#323741'
  }
})

watch(
  () => alertStore.open,
  (isOpen) => {
    if (firstRender.value) {
      notificationStatus.value = isOpen ? 'animate-notification-in' : 'animate-notification-out'
      return
    }
    firstRender.value = true
  },
  { immediate: true }
)
</script>

<style>
.success {
  background-color: #4caa55;
}
.info {
  background-color: #4369f0;
}
.error {
  background-color: #ec6161;
}
.delete {
  background-color: #F4B962;
}
</style>
