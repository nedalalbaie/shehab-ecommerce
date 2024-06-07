<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Category } from '../models/Category'
import SubCategoryForm from './SubCategoryForm.vue'
import type { CreateOrPatchSubCategory } from '../models/subCategory'
import { addSubCategory } from '@/subCategories/subCategories-service'

defineProps<{
  category: Category | null,
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const queryClient = useQueryClient()
const addSubCategoryMutation = useMutation({
  mutationFn: addSubCategory,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['sub-categories'] })
    emit('update:modelValue', false)
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (payload: CreateOrPatchSubCategory) => {
  addSubCategoryMutation.mutate(payload)
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
            إضافة تصنيف فرعي جديد إلي تصنيفات 
            <span class="bg-gray-200 px-2 rounded-lg">
              {{ 'ال' + category?.name }}
            </span>
          </h1>
        </div>
        <SubCategoryForm
          :category-id="category?.id!"
          :is-loading="addSubCategoryMutation.isPending.value"
          @close-dialog="$emit('update:modelValue', false)"
          @submit="handleSubmit"
        />
      </div>
    </v-card>
  </v-dialog>
</template>
