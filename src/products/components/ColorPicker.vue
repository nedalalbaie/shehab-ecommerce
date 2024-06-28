<template>
  <h1 class="text-xl">
    الألوان
  </h1>

  <div class="flex gap-6 mt-2">
    <v-color-picker
      v-model="color"
      mode="hex"
      hide-inputs
    />

    <div class="flex flex-col items-center gap-3 self-start shadow-md border p-4 rounded-md">
      <p class="text-center">
        إضفط علي الزر  لإضافة هذا اللون إلي ألوان المنتج
      </p>
      <div
        class="w-14 h-14 rounded-[50%] shadow-full-white flex items-end"
        :style="{ 'background-color': color }"
      />

      <v-btn
        :disabled="!color"
        variant="elevated"
        color="primary"
        size="small"
        @click="addColor"
      >
        إضافة اللون 
      </v-btn>
    </div>
  </div>

  <div
    v-if="hexCodes.length > 0"
    class="self-start shadow-md border p-4 rounded-md relative mt-4 w-[70%]"
  >
    <p class="text-xl">
      الألوان المختارة للمنتج 
      <span
        v-if="hexCodes.length > 0"
        class="bg-gray-200 px-2 rounded-lg "
      >{{ hexCodes.length }} </span>
    </p>
    <div class="flex flex-wrap gap-6 mt-4">
      <div
        v-for="(hexColor, index) in hexCodes"
        :key="index"
        class="w-14 h-14 rounded-[50%] shadow-full-white flex items-end border"
        :style="{ 'background-color': hexColor }"
      >
        <div
          class="bg-red-700 w-6 h-6 grid place-content-center rounded-[50%] relative -bottom-4  shadow-full-white border border-neutral-300 cursor-pointer"
          @click="removeColor(hexColor)"
        >
          <MinusIcon />
          <v-tooltip
            activator="parent"
            location="bottom"
          >
            إزالة اللون
          </v-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MinusIcon from "./icons/MinusIcon.vue"
import { alertStore } from '@/core/stores/alert.store';
 
const hexCodes = defineModel<string []>({required: true})

const color = ref()

const addColor = () => {
  if (hexCodes.value.some(code => code == color.value)) {
    alertStore.show({
        message: 'لقد قمت بإدخال هذا اللون مسبقا',
        type: 'error'
      })
      return
  }

  if (hexCodes.value.length >= 20) {
    alertStore.show({
        message: 'لا يمكنك إدخال أكثر من 20 لون',
        type: 'error'
      })
      return
  }

  hexCodes.value.push(color.value)
}

const removeColor = (selectedColor: string) => {
    hexCodes.value = hexCodes.value.filter(color => color !== selectedColor)
}

</script>

