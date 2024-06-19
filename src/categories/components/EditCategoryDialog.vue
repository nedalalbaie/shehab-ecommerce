<script setup lang="ts">
import type { MainCategory } from '../models/mainCategory'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { editCategory } from '../services/categories-service'
import CategoryForm from './CategoryForm.vue'
import type { AddCategoryRequest, Category } from '../models/Category'

 const props = defineProps<{
  mainCategory: MainCategory | null,
  category: Category,
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const queryClient = useQueryClient()
const patchCategoryMutation = useMutation({
  mutationFn: ({ id, body }: { id: number, body: AddCategoryRequest, }) => editCategory(id, body),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    emit('update:modelValue', false)
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (body: AddCategoryRequest) => {
  patchCategoryMutation.mutate({ id: props.category.id , body })
}
</script>

<template>
  <v-dialog
    width="80%"
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <v-card>
      <div class="p-8">
        <div class="flex justify-between">
          <h1 class="text-2xl font-medium"> 
            تعديل التصنيف الثانوي  
            <span class="bg-gray-200 px-2 rounded-lg">
              {{ 'ال' + category?.name }}
            </span>
          </h1>
        </div>
        <CategoryForm
          :main-category-id="mainCategory?.id!"
          :category="category"
          :is-loading="patchCategoryMutation.isPending.value"
          @close-dialog="$emit('update:modelValue', false)"
          @submit="handleSubmit"
        />
      </div>
    </v-card>
  </v-dialog>
</template>
