<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      إضافة منتج جديد
    </h1>
    <v-btn
      :to="{ name: 'products' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى المنتجات   
    </v-btn>
  </div>
  <ProductForm
    :is-loading="addProduct.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { postProduct } from "../products-service"
import router from "@/router";
import ProductForm from "../components/ProductForm.vue"
import type { AddProductRequest } from '../models/product';

const queryClient = useQueryClient()
const addProduct = useMutation({
  mutationFn: postProduct,
  onSuccess: () => {
    router.replace({ name: 'products' })
    queryClient.invalidateQueries({ queryKey: ['products'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (payload: AddProductRequest) => {
  addProduct.mutate(payload)
}
</script>