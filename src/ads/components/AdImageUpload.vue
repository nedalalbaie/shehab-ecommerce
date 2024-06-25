<template>
  <div>
    <input
      ref="fileUpload"
      class="hidden"
      type="file"
      accept="image/jpeg, image/jpg, image/png"
      max="10240"
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
      v-if="base64Image && !isLoading"
      class="relative rounded-lg"
    >
      <img
        class="rounded-lg border-4 border-gray-200 w-full object-cover object-center shadow-md"
        :src="base64Image"
        alt="uploaded image"
      >
      <div
        class="absolute top-0 left-0 h-full w-full flex justify-center items-center "
        @click="fileUploadClick"
      >
        <p class="bg-gray-600 bg-opacity-75 border-2 border-gray-600 py-1 px-3 text-white hover:-translate-y-1 transition-all delay-150 cursor-pointer">
          انقر لتغيير الصورة
        </p>
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
  import SpinAnimation from '@/core/components/icons/SpinAnimation.vue'
  import { toBase64 } from '@/core/helpers/toBase64'
  /* eslint-disable */
  const props = defineProps<{
    imagePath?: string,
  }>()
  const emit = defineEmits<{
    handleImage: [selectedImage: File | null, state: "filled" | "empty"]
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
        emit('handleImage', selectedImage.value, "filled")
      })
    }
  }
  
  const fileUploadClick = () => {
    fileUpload.value.click()
  }
  
  // const deleteImage = () => {
  //   base64Image.value = ""
  //   if (fileUpload.value) {
  //     fileUpload.value.value = ''
  //   }
  //   selectedImage.value = null
  //   emit('handleImage', selectedImage.value )
  // }
  
  watchEffect(() => {
    if (props.imagePath) {
      base64Image.value = props.imagePath
    }
  })
  </script>