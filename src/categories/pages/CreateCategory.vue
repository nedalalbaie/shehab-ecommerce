<template>
  <h1 class="text-2xl font-medium ">
    إضافة تصنيف جديد
  </h1>
  <CategoryForm
    :is-loading="addCategoryMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
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