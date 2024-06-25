<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      تعديل كوبون 
    </h1>
    <v-btn
      :to="{ name: 'coupons' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى الكوبونات 
    </v-btn>
  </div>
  <CouponForm
    :is-loading="patchCouponMutation.isPending.value"
    :coupon="coupon.data.value"
    @submit="handleSubmit"
  />
</template>
      
  <script setup lang="ts">
  import { mdiArrowLeft } from "@mdi/js";
  import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
  import { editCoupon, getCoupon } from "../coupons-service"
  import router from "@/router";
  import CouponForm from "../components/CouponForm.vue"
  import type { CouponFormRequest } from '../models/coupon';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const id = Number(route.params.id);
  
  const coupon = useQuery({
    queryKey: ['coupon'],
    queryFn: () => getCoupon(id)
  })
  
  const queryClient = useQueryClient()
  const patchCouponMutation = useMutation({
    mutationFn: ({ id, body }: { id: number, body: CouponFormRequest, }) => editCoupon(id, body),
    onSuccess: () => {
      router.replace({ name: 'coupons' })
      queryClient.invalidateQueries({ queryKey: ['coupons'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  
  const handleSubmit = (body: CouponFormRequest) => {
    patchCouponMutation.mutate({ body, id })
  }
  
  </script>