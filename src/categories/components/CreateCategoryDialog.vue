<script setup lang="ts">
import type { MainCategory } from '../models/mainCategory'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addCategory } from '../services/categories-service'
import CategoryForm from './CategoryForm.vue'
import type { AddCategoryRequest } from '../models/Category'

 defineProps<{
  mainCategory: MainCategory | null,
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const queryClient = useQueryClient()
const addCategoryMutation = useMutation({
  mutationFn: addCategory,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    emit('update:modelValue', false)
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (payload: AddCategoryRequest) => {
  addCategoryMutation.mutate(payload)
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
            إضافة تصنيف تانوي جديد إلي تصنيفات 
            <span class="bg-gray-200 px-2 rounded-lg">
              {{ 'ال' + mainCategory?.name }}
            </span>
          </h1>
        </div>
        <CategoryForm
          :main-category-id="mainCategory?.id!"
          :is-loading="addCategoryMutation.isPending.value"
          @close-dialog="$emit('update:modelValue', false)"
          @submit="handleSubmit"
        />
      </div>
    </v-card>
  </v-dialog>
</template>
