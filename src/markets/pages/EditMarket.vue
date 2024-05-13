<template>
  <div class="flex justify-between">
    <h1 class="text-2xl font-medium">
      تعديل محل 
    </h1>
    <v-btn
      :to="{ name: 'markets' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى المحلات
    </v-btn>
    <MarketForm
      :is-loading="patchMarketMutation.isPending.value"
      :market="market.data.value"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { getMarket, editMarket } from '../markets-service'
import router from '@/router'
import MarketForm from '../components/MarketForm.vue'
import type { MarketFormRequest } from '../models/market'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = Number(route.params.id)

const market = useQuery({
  queryKey: ['market'],
  queryFn: () => getMarket(id)
})

const queryClient = useQueryClient()
const patchMarketMutation = useMutation({
  mutationFn: ({ id, body }: { id: number; body: MarketFormRequest }) => editMarket(id, body),
  onSuccess: () => {
    router.replace({ name: 'coupons' })
    queryClient.invalidateQueries({ queryKey: ['coupons'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (body: MarketFormRequest) => {
  patchMarketMutation.mutate({ body, id })
}
</script>
