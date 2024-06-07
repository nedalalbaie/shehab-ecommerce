<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      إضافة تصنيف أساسي جديد
    </h1>
    <v-btn
      :to="{ name: 'categories' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى التصنيفات الأساسية
    </v-btn>
  </div>
  <MainCategoryForm
    :is-loading="addMainCategoryMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addMainCategory } from "../services/mainCategories-service"
import router from "@/router";
import MainCategoryForm from "../components/MainCategoryFrom.vue"
import type { PostMainCategoryRequest } from '../models/mainCategory';

const queryClient = useQueryClient()
const addMainCategoryMutation = useMutation({
    mutationFn: addMainCategory,
    onSuccess: () => {
        router.replace({ name: 'categories' })
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