<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-6">
      <v-text-field
        v-model="name"
        label="إسم التصنيف الفرعي"
        variant="outlined"
        color="primary"
        placeholder="إسم التصنيف الفرعي"
        :error-messages="errors.name"
      />
  
      <v-text-field
        v-model="description"
        label="التفاصيل"
        type="text"
        variant="outlined"
        color="primary"
        placeholder="التفاصيل"
        :error-messages="errors.description"
      />
    </div>
  
    <div v-if="!editMode">
      <h3 class="text-xl">
        قم بالضغط لرفع صورة
      </h3>
  
      <div class="mt-8 w-1/4">
        <ImageUpload
          :image-path="props.subCategory?.image_path"
          @handle-image="handleImage"
        />
      </div>
    </div>
  
    <div class="mt-6 flex gap-4">
      <v-btn
        color="error"
        size="large"
        variant="elevated"
        type="button"
        @click="emit('close-dialog')"
      >
        الغاء
      </v-btn>

      <v-btn
        :disabled="isDisabled"
        size="large"
        variant="elevated"
        color="primary"
        type="submit"
        :loading="props.isLoading"
      >
        {{ editMode ? 'تعديل' : 'إضافة' }}
      </v-btn>
    </div>
  </form>
</template>
  <script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import { useForm, useField } from 'vee-validate'
  import { object, string, number } from 'zod'
  import type { SubCategory, CreateOrPatchSubCategory } from "../models/subCategory"
  import { computed, ref, watchEffect } from "vue"
  import ImageUpload from "@/core/components/ImageUpload.vue"
  
  const props = defineProps<{
    isLoading: boolean,
    subCategory?: SubCategory,
    categoryId: number
  }>()
  const emit = defineEmits<{
    submit: [value: CreateOrPatchSubCategory],
    'close-dialog': []
  }>()
  
  const selectedImage = ref<File | null>(null)
  const selectedImageState = ref<"filled" | "empty">("empty")
  const editMode = computed(() => !!props.subCategory)
  const isDisabled = computed(() => !meta.value.valid || selectedImageState.value == "empty")
  
  const validationSchema = toTypedSchema(
    object({
      name: string().min(1, 'يجب إدخال إسم التصنيف '),
      description: string().min(1, 'يجب إدخال التفاصيل  '),
      cat_id: number()
    })
  )
  
  const { handleSubmit, errors, meta, setValues } = useForm({
    validationSchema, initialValues: {
      cat_id: props.categoryId
    }
  })
  
  const { value: name } = useField<string>('name')
  const { value: description } = useField<string>('description')
  
  watchEffect(() => {
    if (props.subCategory) {
      setValues({
        ...props.subCategory
      })
      selectedImageState.value = props.subCategory.image_path ? "filled" : "empty"
    }
  })
  
  const submit = handleSubmit(values => {
    emit("submit", {
      ...values,
      image_path: editMode.value? props.subCategory!.image_path : selectedImage.value as File
    })
  })
  
  const handleImage = (image: File | null, state: "filled" | "empty") => {
    selectedImage.value = image
    selectedImageState.value = state
  }
  
  </script>