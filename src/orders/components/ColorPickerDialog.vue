<template>
  <v-dialog
    v-model="open"
    class="w-3/4"
  >
    <div class="bg-white rounded-lg p-6">
      <ColorPicker v-model="hexCodes" />

      <v-card-actions>
        <v-spacer />
        <v-btn
          text="لا"
          @click="open = false"
        />
        <v-btn
          text="نعم"
          @click="onUpdateColors()"
        />
      </v-card-actions>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import ColorPicker from '@/products/components/ColorPicker.vue';
import { ref, watchEffect } from 'vue';

const hexCodes = ref<string []>([])

const props = defineProps<{
  colors: string []
}>()
const emits = defineEmits<{
  update: [colors: string[]]
}>()

const open = defineModel<boolean>({required: true})

const onUpdateColors = () => {
  emits('update', hexCodes.value)
}

watchEffect(() => {
  if (props.colors) {
    hexCodes.value = props.colors
  }
})

</script>