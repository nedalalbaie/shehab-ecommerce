<template>
  <h1 class="text-2xl font-medium ">
    إضافة تصنيف جديد
  </h1>
  <MainCategoryForm
    :is-loading="addMainCategoryMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addMainCategory } from "../mainCategories-service"
import router from "@/router";
import MainCategoryForm from "../components/MainCategoryForm.vue"
import type { PostMainCategoryRequest } from '../models/mainCategory';

const queryClient = useQueryClient()
const addMainCategoryMutation = useMutation({
    mutationFn: addMainCategory,
    onSuccess: () => {
        router.replace({ name: 'main-categories' })
        queryClient.invalidateQueries({ queryKey: ['main-categories'] })
    },
    onError: (error) => {
        console.log(error)
    }
})

const handleSubmit = (payload: PostMainCategoryRequest) => {
    addMainCategoryMutation.mutate(payload)
}
</script>