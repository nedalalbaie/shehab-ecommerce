<template>
  <div class="flex justify-between">
    <h1 class="text-2xl font-medium ">
      تعديل البيانات 
    </h1>
    <v-btn
      :to="{ name: 'products-details-list' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع إلى القائمة
    </v-btn>
  </div>
  <ProductDetailsForm
    :is-loading="patchDiscountMutation.isPending.value"
    :product-detail="productDetail"
    :edit-mode="true"
    @submit="handleSubmit"
  />
</template>
        
  <script setup lang="ts">
  import { mdiArrowLeft } from '@mdi/js'
  import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
  import { editProductDetails, getProductDetail } from "../productDetails-service"
  import router from "@/router";
  import ProductDetailsForm from "../components/ProductDetailsForm.vue"
  import type { PatchProductDetails } from '../models/productDetails';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const id = Number(route.params.id);
  
  const { data: productDetail} = useQuery({
    queryKey: ['productDetail'],
    queryFn: () => getProductDetail(id)
  })
  
  const queryClient = useQueryClient()
  const patchDiscountMutation = useMutation({
    mutationFn: ({ id, body }: { id: number, body: PatchProductDetails }) => editProductDetails(id, body),
    onSuccess: () => {
      router.replace({ name: 'products-details-list' })
      queryClient.invalidateQueries({ queryKey: ['details'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  
  const handleSubmit = (body: PatchProductDetails) => {
    patchDiscountMutation.mutate({ body, id })
  }
  
  </script>