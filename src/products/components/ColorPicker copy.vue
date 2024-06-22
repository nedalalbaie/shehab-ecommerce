<template>
  <div
    class="w-full flex justify-between relative px-3 border border-gray-500 hover:border-gray-700 rounded-[4px] h-[3.49rem]  items-center cursor-pointer text-gray-500"
    @click="isColorListOpen = !isColorListOpen"
  >
    <p>الألوان *</p>

    <ul
      class="dark:text-gray-300 bg-gray-50 absolute right-0 top-14 w-full rounded-[4px] p-3 dark:bg-[#3a3a3a] shadow-full-white dark:border
                               border-gray-600 transition-all duration-200 z-50"
      :class="{
        'profileVisible': isColorListOpen,
        'profileNotVisible': !isColorListOpen,
      }"
    >
      <div class="grid grid-cols-7">
        <li
          v-for="(color, index) in colors"
          :key="index"
          class="hover:bg-gray-200  dark:hover:bg-dark p-2 rounded-md cursor-pointer"
          @click="addColor(color)"
        >
          <div
            class="w-14 h-14 mx-auto rounded-[50%] shadow-full-white border-2"
            :style="{ 'background-color': color }"
          />
        </li>
      </div>
      <li
        v-if="colors.length === 0"
        class="text-lg text-center"
      >
        لقد حددت كل الألوان
      </li>
    </ul>
    <div
      :class="isColorListOpen ? '-rotate-90' : 'rotate-90'"
      class="duration-200 transition-all"
    >
      <ArrowIcon />
    </div>
  </div>
  
  <div
    v-if="hexCodes.length > 0"
    class="self-start shadow-md border p-4 rounded-md relative mt-4 w-full mx-auto"
  >
    <p>
      الألوان المختارة للمنتج
    </p>
    <div class="mt-8 flex gap-4 relative">
      <div
        v-for="(color, index) in hexCodes"
        :key="index"
        class="w-14 h-14 rounded-[50%] shadow-full-white flex items-end"
        :style="{ 'background-color': color }"
      >
        <div
          v-if="hexCodes.length > 1"
          class="bg-red-700 w-6 h-6 grid place-content-center rounded-[50%] relative -bottom-4  shadow-full-white border border-neutral-300 cursor-pointer"
          @click="removeColor(color, index)"
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
import { ref, watchEffect } from 'vue';
import MinusIcon from "./icons/MinusIcon.vue"
import ArrowIcon from "./icons/ArrowIcon.vue"

const props = defineProps<{
  hexCodesProp?: string [] ,
  colorsList: string []
}>()
const emit = defineEmits<{
  passHexcodes: [value: string []]
}>()
 
const hexCodes = ref<string[]>([])
const isColorListOpen = ref(false)

const colors = ref(["red", "blue", "white", "Black", "Yellow", "Orange", "Brown", "Purple", "Pink", "green", "gray"])

const addColor = (selectedColor: string) => {
    hexCodes.value.push(selectedColor)
    colors.value = colors.value.filter((color: string) => color !== selectedColor)
    emit("passHexcodes", hexCodes.value)  
}

const removeColor = (selectedColor: string, index: number) => {
    if (hexCodes.value) {
        if (hexCodes.value.length < 2) {
            hexCodes.value.splice(index, 1)
        } else {
            hexCodes.value = hexCodes.value.filter(color => color !== selectedColor)
        }
    }
    colors.value.push(selectedColor);
}

watchEffect(() => {
  if (props.hexCodesProp) {
    hexCodes.value = [...props.hexCodesProp]
  }
})

watchEffect(() => {
  if (props.colorsList) {
    colors.value = props.colorsList
    colors.value = colors.value.filter((color: string) => {
      return  props.hexCodesProp?.every(item => item !== color)
    })
  }
})

</script>

<style scoped>
.profileVisible {
    opacity: 1;
    pointer-events: auto;
    --tw-translate-y: 0px;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.profileNotVisible {
    opacity: 0;
    pointer-events: none;
    --tw-translate-y: -0.75rem;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
</style>