<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      ربط منتج بمحل
    </h1>
    <v-btn
      :to="{ name: 'products-details-list' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى القائمة   
    </v-btn>
  </div>
  <ProductDetailsForm
    :is-loading="addProduct.isPending.value"
    @submit="handleSubmit"
  />
</template>
  <script setup lang="ts">
  import { mdiArrowLeft } from "@mdi/js";
  import { useMutation, useQueryClient } from '@tanstack/vue-query'
  import { postProductDetails } from "../productDetails-service"
  import router from "@/router";
  import ProductDetailsForm from "../components/ProductDetailsForm.vue"
  import type { CreateProductDetails } from '../models/productDetails';
  
  const queryClient = useQueryClient()
  const addProduct = useMutation({
    mutationFn: postProductDetails,
    onSuccess: () => {
      router.replace({ name: 'products-details-list' })
      queryClient.invalidateQueries({ queryKey: ['details'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  
  const handleSubmit = (payload: CreateProductDetails) => {
    addProduct.mutate(payload)
  }
  </script>
