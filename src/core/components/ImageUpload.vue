<template>
  <div>
    <input
      ref="fileUpload"
      class="hidden"
      type="file"
      accept="image/*"
      @change="handleFileUpload"
    >
    <div
      v-if="!base64Image && !isLoading"
      class="flex justify-center items-center bg-white rounded-lg h-64 border-2 border-slate-200 shadow-md hover:-translate-y-2 transition-all delay-100 cursor-pointer"
      @click="fileUploadClick"
    >
      <UploadImageIcon />
    </div>
    <div
      v-if="base64Image"
      class="relative rounded-lg h-64"
    >
      <img
        class="rounded-lg border-4 border-gray-200 h-64 w-full object-cover object-center shadow-md"
        :src="base64Image"
        alt="uploaded image"
      >
      <div
        class="absolute top-1 right-2 bg-gray-200 p-1 rounded-md hover:-translate-y-1 transition-all delay-150 cursor-pointer border-2 border-gray-400"
        @click="deleteImage"
      >
        <DeleteIcon
          fill="fill-black"
          custom-style="w-7 h-7"
        />
      </div>
    </div>
    <SpinAnimation
      :is-loading="isLoading"
      custom-style="animate-spin m-auto h-8 w-8 text-gray-400"
    />
  </div>
</template>
<script setup lang="ts">
import { type InputHTMLAttributes, ref, watchEffect } from 'vue'
import UploadImageIcon from "@/core/components/icons/UploadImageIcon.vue"
import DeleteIcon from "@/core/components/icons/DeleteIcon.vue"
import SpinAnimation from '@/core/components/icons/SpinAnimation.vue'
import { toBase64 } from '@/core/helpers/toBase64'
/* eslint-disable */
const props = defineProps<{
  imagePath?: string,
  index?: number
}>()
const emit = defineEmits<{
  handleImage: [selectedImage: File | null, state: "filled" | "empty", index?: number]
}>()

const fileUpload: InputHTMLAttributes = ref(null)
const isLoading = ref(false)
const base64Image = ref("")
const selectedImage = ref<File | null>(null)

const handleFileUpload = (event: Event) => {
  isLoading.value = true
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    toBase64(file).then(result => {
      isLoading.value = false
      base64Image.value = result
      selectedImage.value = file
      emit('handleImage', selectedImage.value, "filled", props.index)
    })
  }
}

const fileUploadClick = () => {
  fileUpload.value.click()
}

const deleteImage = () => {
  base64Image.value = ""
  if (fileUpload.value) {
    fileUpload.value.value = ''
  }
  selectedImage.value = null
  emit('handleImage', selectedImage.value, "empty" , props.index)
}

watchEffect(() => {
  if (props.imagePath) {
    const storage = import.meta.env.VITE_API_Storage
    base64Image.value = `${storage}/${props.imagePath}`
  }
})
</script>