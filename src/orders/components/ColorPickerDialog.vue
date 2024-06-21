<template>
  <v-dialog
    v-model="open"
    class="w-3/5"
  >
    <div class="bg-white rounded-lg p-8">
      <div class="mb-6 flex flex-col items-center">
        <ColorPicker v-model="hexCodes" />
      </div>

      <v-card-actions>
        <v-btn
          color="error"
          type="button"
          @click="open = false"
        >
          الغاء
        </v-btn>

        <v-btn
          color="primary"
          type="submit"
          variant="tonal"
          @click="onUpdateColors()"
        >
          تحديث
        </v-btn>
      </v-card-actions>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import ColorPicker from '../components/ColorsPicker.vue';
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
  open.value = false
  emits('update', hexCodes.value)
}

watchEffect(() => {
  if (props.colors) {
    hexCodes.value = props.colors
  }
})

</script>