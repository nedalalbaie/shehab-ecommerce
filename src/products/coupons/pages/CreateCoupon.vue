<template>
  <div class="flex justify-between">
    <h1 class="text-2xl font-medium ">
      إضافة كوبون جديد
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
    :is-loading="addCouponMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
  <script setup lang="ts">
  import { mdiArrowLeft } from "@mdi/js";
  import { useMutation, useQueryClient } from '@tanstack/vue-query'
  import { postCoupon } from "../coupons-service"
  import router from "@/router";
  import CouponForm from "../components/CouponForm.vue"
  import type { CouponFormRequest } from "../models/coupon";
  import type { AxiosError } from "axios";
  import { alertStore } from "@/core/stores/alert.store";
  
  const queryClient = useQueryClient()
  const addCouponMutation = useMutation({
    mutationFn: postCoupon,
    onSuccess: () => {
      router.replace({ name: 'coupons' })
      queryClient.invalidateQueries({ queryKey: ['coupons'] })
    },
    onError: (error: AxiosError<{ errors: {coupon_code: string []}}>) => {
      if (error.response?.status == 422) {
        if ( error.response.data.errors.coupon_code[0] == 'The coupon code has already been taken.') {
          alertStore.show({
            message: 'كود الكوبون مستعمل مسبقا .',
            type: 'error'
          })
        }
      }
    }
  })


  const handleSubmit = (payload: CouponFormRequest) => {
    addCouponMutation.mutate(payload)
  }
  </script>