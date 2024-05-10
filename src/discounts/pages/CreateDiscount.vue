<template>
  <h1 class="text-2xl font-medium ">
    إضافة تخفيض جديد
  </h1>
  <DiscountForm
    :is-loading="addDiscountMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
  <script setup lang="ts">
  import { useMutation, useQueryClient } from '@tanstack/vue-query'
  import { postDiscount } from "../discounts-service"
  import router from "@/router";
  import DiscountForm from "../components/DiscountForm.vue"
  import type { DiscountFormRequest } from '../models/discount';
  
  const queryClient = useQueryClient()
  const addDiscountMutation = useMutation({
    mutationFn: postDiscount,
    onSuccess: () => {
      router.replace({ name: 'discounts' })
      queryClient.invalidateQueries({ queryKey: ['discounts'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  
  const handleSubmit = (payload: DiscountFormRequest) => {
    addDiscountMutation.mutate(payload)
  }
  </script>