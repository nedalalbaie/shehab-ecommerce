<template>
  <div class="flex justify-between">
    <h1 class="text-2xl font-medium">
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
    :is-loading="addProduct.isPending.value || addProductDetails.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { postProduct } from '../products-service'
import router from '@/router'
import ProductForm from '../components/ProductForm.vue'
import type { AddProductRequest } from '../models/product'
import { postProductDetails } from '@/productsDetails/productDetails-service'
import { ref } from 'vue'
import type { CreateProductDetails } from '@/productsDetails/models/productDetails'

const productDetails = ref<Omit<CreateProductDetails, 'product_id'>>()
const queryClient = useQueryClient()

const addProduct = useMutation({
  mutationFn: postProduct,
  onSuccess: async (product) => {
    if (productDetails.value) {
     await addProductDetails.mutateAsync({
        ...productDetails.value,
        product_id: product.id
      })
    }
    router.replace({ name: 'products' })
    queryClient.invalidateQueries({ queryKey: ['products'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const addProductDetails = useMutation({
  mutationFn: postProductDetails,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['details'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (payload: AddProductRequest & Omit<CreateProductDetails, 'product_id'>) => {
  addProduct.mutate(payload)
  productDetails.value = {
    inventory: payload.inventory,
    saller_price: payload.saller_price,
    market_id: payload.market_id
  }
}
</script>
