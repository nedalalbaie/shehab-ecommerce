<template>
  <p>الألوان *</p>

  <v-color-picker
    v-model="colors"
    mode="hex"
    @update:modelValue="selectColor"
  />
  
  <!-- <div class="mt-8 flex gap-4 relative">
    <div
      v-for="(color, index) in hexCodes"
      :key="index"
      class="w-14 h-14 rounded-[50%] shadow-full-white flex items-end"
      :style="{ 'background-color': color }"
    >
      <div
        class="bg-red-700 w-6 h-6 grid place-content-center rounded-[50%] relative -bottom-4  shadow-full-white border border-neutral-300 cursor-pointer"
        @click="removeColor(color, index)"
      >
        <MinusIcon />
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import MinusIcon from "./icons/MinusIcon.vue"
import ArrowIcon from "./icons/ArrowIcon.vue"

// const props = defineProps<{
//   hexCodesProp?: string [] 
// }>()
// const emit = defineEmits<{
//   passHexcodes: [value: string []]
// }>()
 
const hexCodes = ref<string[]>([])
const isColorListOpen = ref(false)

const colors = ref()

const selectColor = (color: any) => {
  console.log(color);
  
}

// const addColor = (selectedColor: string) => {
//     hexCodes.value.push(selectedColor)
//     colors.value = colors.value.filter((color: string) => color !== selectedColor)
//     emit("passHexcodes", hexCodes.value)  
// }

// const removeColor = (selectedColor: string, index: number) => {
//     if (hexCodes.value) {
//         if (hexCodes.value.length < 2) {
//             hexCodes.value.splice(index, 1)
//         } else {
//             hexCodes.value = hexCodes.value.filter(color => color !== selectedColor)
//         }
//     }
//     colors.value.push(selectedColor);
// }

// watchEffect(() => {
//   if (props.hexCodesProp) {
//     hexCodes.value = props.hexCodesProp
//     colors.value = colors.value.filter((color: string) => {
//       return  props.hexCodesProp?.every(item => item !== color)
//     })
//   }
// })

</script>

