<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Category } from '../models/Category'
import SubCategoryForm from './SubCategoryForm.vue'
import type { CreateOrPatchSubCategory, SubCategory } from '../models/subCategory'
import {  editSubCategory } from '../services/subCategories-service'

const props = defineProps<{
  category: Category | null,
  subCategory: SubCategory,
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()


const queryClient = useQueryClient()
const patchSubCategoryMutation = useMutation({
  mutationFn: ({ id, body }: { id: number, body: CreateOrPatchSubCategory, }) => editSubCategory(id, body),
  onSuccess: () => {
    emit('update:modelValue', false)
    queryClient.invalidateQueries({ queryKey: ['sub-categories'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (body: CreateOrPatchSubCategory) => {
  patchSubCategoryMutation.mutate({ body, id: props.category!.id })
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
            تعديل التصنيف الفرعي 
            <span class="bg-gray-200 px-2 rounded-lg">
              {{ subCategory?.name }}
            </span>
          </h1>
        </div>
        <SubCategoryForm
          :category-id="category?.id!"
          :sub-category="subCategory"
          :is-loading="patchSubCategoryMutation.isPending.value"
          @close-dialog="$emit('update:modelValue', false)"
          @submit="handleSubmit"
        />
      </div>
    </v-card>
  </v-dialog>
</template>
