<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-6">
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

      <v-autocomplete
        v-model="cat_zero_id"
        :hide-no-data="false"
        item-title="name"
        item-value="id"
        :items="mainCategories.data.value"
        :loading="props.isLoading"
        hide-selected
        label="التصنيفات الأساسية"
        placeholder="التصنيفات الأساسية"
        variant="outlined"
        color="primary"
        auto-select-first
        :error-messages="errors.cat_zero_id"
      >
        <template #no-data>
          <v-list-item>
            <v-list-item-title>
              لا توجد نتائج
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-autocomplete>
    </div>

    <div>
      <h3 class="text-xl">
        قم بالضغط لرفع صورة
      </h3>

      <div class="mt-8 w-1/4">
        <ImageUpload
          :image-path="props.category?.image_path"
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
import { number, object, string, } from 'zod'
import type { AddCategoryRequest, Category } from "../models/Category"
import { computed, ref, watchEffect } from "vue"
import ImageUpload from "@/core/components/ImageUpload.vue"
import { pathToFile } from '@/core/helpers/pathToFile'
import { useQuery } from '@tanstack/vue-query'
import { getMainCategories } from '@/mainCategories/mainCategories-service'

type CategoryForm = AddCategoryRequest

const props = defineProps<{
  isLoading: boolean,
  category?: Category
}>()
const emit = defineEmits<{
  submit: [value: CategoryForm]
}>()

const imageFile = ref<File | null>(null)
const selectedImageState = ref<"filled" | "empty">("empty")
const editMode = computed(() => !!props.category)
const isDisabled = computed(() => !meta.value.valid || selectedImageState.value == "empty")

const validationSchema = toTypedSchema(
  object({
    name: editMode.value ? string() : string().min(1, 'يجب إدخال إسم التصنيف '),
    description: editMode.value ? string() : string().min(1, 'يجب إدخال التفاصيل  '),
    cat_zero_id: number().min(1, 'يجب إدخال التصنيف الأب  '),
  })
)

const { handleSubmit, errors, meta, setValues } = useForm({
  validationSchema
})

const { value: name } = useField<string>('name')
const { value: description } = useField<string>('description')
const { value: cat_zero_id } = useField<number>('cat_zero_id')

const listParams = ref({
  page: 1,
  limit: 50,
})
const mainCategories = useQuery({
  queryKey: ['main-categories', listParams],
  queryFn: () => getMainCategories(listParams.value)
})

watchEffect(() => {
  if (props.category) {
    setValues({
      name: props.category.name,
      description: props.category.description
    })
    selectedImageState.value = props.category.image_path ? "filled" : "empty"

    pathToFile(props.category.image_path, props.category.image_path.substring(props.category.image_path.lastIndexOf("/") + 1))
      .then((file: File) => {
        imageFile.value = file
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }
})

const submit = handleSubmit(values => {
  emit("submit", {
    ...values,
    image_path: imageFile.value as File
  })
})

const handleImage = (image: File | null, state: "filled" | "empty") => {
  imageFile.value = image
  selectedImageState.value = state
}

</script>