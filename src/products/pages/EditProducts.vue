<template>
  <h1 class="text-2xl font-medium ">
    تعديل منتج
  </h1>
  <ProductForm
    :is-loading="patchProductMutation.isPending.value"
    :product="product.data.value"
    @submit="handleSubmit"
  />
</template>
        
<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { editProduct, getProduct } from "../products-service"
import router from "@/router";
import ProductForm from "../components/ProductForm.vue"
import type { AddProductRequest } from '../models/product';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = Number(route.params.id);

const product = useQuery({
    queryKey: ['product'],
    queryFn: () => getProduct(id)
})

const queryClient = useQueryClient()
const patchProductMutation = useMutation({
    mutationFn: ({ id, body }: { id: number, body: Partial<AddProductRequest>, }) => editProduct(id, body),
    onSuccess: () => {
        router.replace({ name: 'products' })
        queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => {
        console.log(error)
    }
})

const handleSubmit = (body: Partial<AddProductRequest>) => {
    patchProductMutation.mutate({ body, id })
}

</script>