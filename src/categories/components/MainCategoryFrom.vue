<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-7">
      <v-text-field
        v-model="name"
        label="إسم التصنيف"
        variant="outlined"
        color="primary"
        placeholder="إسم التصنيف"
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
          :image-path="props.mainCategory?.image_path"
          @handle-image="handleImage"
        />
      </div>
    </div>
    
    <div class="mt-6">
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
    import { object, string, } from 'zod'
    import type { MainCategory, PostMainCategoryRequest } from "../models/mainCategory"
    import { computed, ref, watchEffect } from "vue"
    import ImageUpload from "@/core/components/ImageUpload.vue"
    
    const props = defineProps<{
      isLoading: boolean,
      mainCategory?: MainCategory
    }>()
    const emit = defineEmits<{
      submit: [value: PostMainCategoryRequest]
    }>()

    const imageFile = ref<File | null>(null)
    const selectedImageState = ref<"filled" | "empty">("empty")
    const editMode = computed(() => !!props.mainCategory)
    const isDisabled = computed(() => !meta.value.valid || selectedImageState.value == "empty")
    
    const validationSchema = toTypedSchema(
      object({
        name: editMode.value ? string() : string().min(1, 'يجب إدخال إسم التصنيف '),
        description: editMode.value ? string() : string().min(1, 'يجب إدخال التفاصيل  '),
      })
    )
    
    const { handleSubmit, errors, meta, setValues } = useForm({
      validationSchema
    })
    
    const { value: name } = useField<string>('name')
    const { value: description } = useField<string>('description')
    
    watchEffect(() => {
      if (props.mainCategory) {
        setValues({
          name: props.mainCategory.name,
          description: props.mainCategory.description
        })
        selectedImageState.value = props.mainCategory.image_path ? "filled" : "empty"
      }
    })
    
    const submit = handleSubmit(values => {
      emit("submit", {
        ...values,
        image_path: editMode.value ? props.mainCategory!.image_path : imageFile.value as File
      })
    })
    
    const handleImage = (image: File | null, state: "filled" | "empty") => {
      imageFile.value = image
      selectedImageState.value = state
    }
    
    </script>