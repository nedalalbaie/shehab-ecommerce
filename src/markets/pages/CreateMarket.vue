<template>
  <h1 class="text-2xl font-medium ">
    إضافة كوبون جديد
  </h1>
  <MarketForm
    :is-loading="addMarketMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
  <script setup lang="ts">
  import { useMutation, useQueryClient } from '@tanstack/vue-query'
  import { postMarket } from "../markets-service"
  import router from "@/router";
  import MarketForm from "../components/MarketForm.vue"
  import type {MarketFormRequest } from '../models/market';
  
  const queryClient = useQueryClient()
  const addMarketMutation = useMutation({
    mutationFn: postMarket,
    onSuccess: () => {
      router.replace({ name: 'cmarketsoupons' })
      queryClient.invalidateQueries({ queryKey: ['markets'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  
  const handleSubmit = (payload: MarketFormRequest) => {
    addMarketMutation.mutate(payload)
  }
  </script>