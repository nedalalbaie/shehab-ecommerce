<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      إضافة محل جديد
    </h1>
    <v-btn
      :to="{ name: 'markets-list' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى المحلات 
    </v-btn>
  </div>
  <MarketForm
    :is-loading="addMarketMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
  <script setup lang="ts">
  import { mdiArrowLeft } from "@mdi/js";
  import { useMutation, useQueryClient } from '@tanstack/vue-query'
  import { postMarket } from "../markets-service"
  import router from "@/router";
  import MarketForm from "../components/MarketForm.vue"
  import type {MarketFormRequest } from '../models/market';
  
  const queryClient = useQueryClient()
  const addMarketMutation = useMutation({
    mutationFn: postMarket,
    onSuccess: () => {
      router.replace({ name: 'markets-list' })
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