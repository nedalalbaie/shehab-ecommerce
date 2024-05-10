<template>
  <h1 class="text-2xl font-medium ">
    تعديل بيانات التخفيض
  </h1>
  <DiscountForm
    :is-loading="patchDiscountMutation.isPending.value"
    :discount="discount.data.value"
    @submit="handleSubmit"
  />
</template>
      
<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { editDiscount, getDiscount } from "../discounts-service"
import router from "@/router";
import DiscountForm from "../components/DiscountForm.vue"
import type { DiscountFormRequest } from '../models/discount';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = Number(route.params.id);

const discount = useQuery({
  queryKey: ['discounts'],
  queryFn: () => getDiscount(id)
})

const queryClient = useQueryClient()
const patchDiscountMutation = useMutation({
  mutationFn: ({ id, body }: { id: number, body: DiscountFormRequest }) => editDiscount(id, body),
  onSuccess: () => {
    router.replace({ name: 'discounts' })
    queryClient.invalidateQueries({ queryKey: ['discounts'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (body: DiscountFormRequest) => {
  patchDiscountMutation.mutate({ body, id })
}

</script>