<template>
  <h1 class="text-2xl font-medium ">
    تعديل التصنيف الفرعي
  </h1>
  <SubCategoryForm
    :is-loading="patchSubCategoryMutation.isPending.value"
    :sub-category="category.data.value"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { editSubCategory, getSubCategory } from "../subCategories-service"
import router from "@/router";
import SubCategoryForm from "../components/SubCategoryForm.vue"
import type { CreateOrPatchSubCategory } from '../models/subCategory';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = Number(route.params.id);

const category = useQuery({
  queryKey: ['sub-category'],
  queryFn: () => getSubCategory(id)
})

const queryClient = useQueryClient()
const patchSubCategoryMutation = useMutation({
  mutationFn: ({ id, body }: { id: number, body: CreateOrPatchSubCategory, }) => editSubCategory(id, body),
  onSuccess: () => {
    router.replace({ name: 'subCategories' })
    queryClient.invalidateQueries({ queryKey: ['subCategories'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (body: CreateOrPatchSubCategory) => {
  patchSubCategoryMutation.mutate({ body, id })
}

</script>