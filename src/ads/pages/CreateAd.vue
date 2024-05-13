<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      إضافة إعلان جديد
    </h1>
    <v-btn
      :to="{ name: 'ads' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى الإعلانات 
    </v-btn>
  </div>
  <AdsForm
    :is-loading="addAdMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { postAd } from "../ads-service"
import router from "@/router";
import AdsForm from "../components/AdsForm.vue"
import type { PostOrPatchAdRequest } from '../models/ads';

const queryClient = useQueryClient()
const addAdMutation = useMutation({
    mutationFn: postAd,
    onSuccess: () => {
        router.replace({ name: 'ads' })
        queryClient.invalidateQueries({ queryKey: ['ads'] })
    },
    onError: (error) => {
        console.log(error)
    }
})

const handleSubmit = (payload: PostOrPatchAdRequest) => {
    addAdMutation.mutate(payload)
}
</script>