<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      إضافة تصنيف فرعي جديد
    </h1>
    <v-btn
      :to="{ name: 'subCategories' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى التصنيفات الفرعية
    </v-btn>
  </div>
  <SubCategoryForm
    :is-loading="addSubCategoryMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addSubCategory } from "../subCategories-service"
import router from "@/router";
import SubCategoryForm from "../components/SubCategoryForm.vue"
import type { CreateOrPatchSubCategory } from '../models/subCategory';

const queryClient = useQueryClient()
const addSubCategoryMutation = useMutation({
    mutationFn: addSubCategory,
    onSuccess: () => {
        router.replace({ name: 'subCategories' })
        queryClient.invalidateQueries({ queryKey: ['subCategories'] })
    },
    onError: (error) => {
        console.log(error)
    }
})

const handleSubmit = (payload: CreateOrPatchSubCategory) => {
    addSubCategoryMutation.mutate(payload)
}
</script>