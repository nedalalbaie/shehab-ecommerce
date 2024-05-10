<template>
  <h1 class="text-2xl font-medium ">
    إضافة منتج جديد
  </h1>
  <ProductForm
    :is-loading="addProduct.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
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