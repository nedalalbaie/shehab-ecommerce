<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      تعديل التصنيف الأساسي 
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
  <MainCategoryForm
    :is-loading="patchMainCategoryMutation.isPending.value"
    :main-category="mainCategory.data.value"
    @submit="handleSubmit"
  />
</template> 
    
    <script setup lang="ts">
    import { mdiArrowLeft } from "@mdi/js";
    import { useMutation, useQuery } from '@tanstack/vue-query'
    import router from "@/router";
    import { getMainCategory, editMainCategory } from '../services/mainCategories-service';
    import { useRoute } from 'vue-router';
    import type { PostMainCategoryRequest } from '../models/mainCategory';
    import MainCategoryForm from '../components/MainCategoryFrom.vue';
    
    const route = useRoute();
    const id = Number(route.params.id);
    
    const mainCategory = useQuery({
      queryKey: ['mainCategory'],
      queryFn: () => getMainCategory(id)
    })
    
    const patchMainCategoryMutation = useMutation({
      mutationFn: ({ id, body }: { id: number, body: PostMainCategoryRequest, }) => editMainCategory(id, body),
      onSuccess: () => {
        router.replace({ name: 'categories' })
      },
      onError: (error) => {
        console.log(error)
      }
    })
    
    const handleSubmit = (body: PostMainCategoryRequest) => {
      patchMainCategoryMutation.mutate({ id, body })
    }
    </script>
    