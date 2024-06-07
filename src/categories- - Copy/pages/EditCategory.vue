<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      تعديل تصنيف 
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
    :is-loading="patchCategoryMutation.isPending.value"
    :category="category.data.value"
    @submit="handleSubmit"
  />
</template> 

<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import router from "@/router";
import { getCategory, editCategory } from '../services/categories-service';
import { useRoute } from 'vue-router';
import type { EditCategoryRequest } from '../models/Category';
import CategoryForm from '../components/CategoryForm.vue';

const route = useRoute();
const id = Number(route.params.id);

const category = useQuery({
  queryKey: ['category'],
  queryFn: () => getCategory(id)
})

const queryClient = useQueryClient()
const patchCategoryMutation = useMutation({
  mutationFn: ({ id, body }: { id: number, body: EditCategoryRequest, }) => editCategory(id, body),
  onSuccess: () => {
    router.replace({ name: 'categories' })
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (body: EditCategoryRequest) => {
  patchCategoryMutation.mutate({ id, body })
}
</script>
