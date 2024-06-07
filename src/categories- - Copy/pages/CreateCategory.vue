<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      إضافة تصنيف جديد
    </h1>
    <v-btn
      :to="{ name: 'categories' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى التصنيفات 
    </v-btn>
  </div>
  <CategoryForm
    :is-loading="addCategoryMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addCategory } from "../services/categories-service"
import router from "@/router";
import CategoryForm from "../components/CategoryForm.vue"
import type { AddCategoryRequest } from '../models/Category';

const queryClient = useQueryClient()
const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
        router.replace({ name: 'categories' })
        queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
        console.log(error)
    }
})

const handleSubmit = (payload: AddCategoryRequest) => {
    addCategoryMutation.mutate(payload)
}
</script>