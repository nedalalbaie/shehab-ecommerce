<template>
  <div class="flex justify-between ">
    <h1 class="text-2xl font-medium ">
      تعديل الإعلان 
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
    :ad="ad.data.value"
    :is-loading="patchAdMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import router from "@/router";
import { getAd, patchAd } from "../ads-service"
import AdsForm from "../components/AdsForm.vue"
import type { PostOrPatchAdRequest } from '../models/ads';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = Number(route.params.id);

const ad = useQuery({
  queryKey: ['ad'],
  queryFn: () => getAd(id)
})

const queryClient = useQueryClient()
const patchAdMutation = useMutation({
  mutationFn: ({ id, body }: { id: number, body: PostOrPatchAdRequest, }) => patchAd(id, body),
  onSuccess: () => {
    router.replace({ name: 'ads' })
    queryClient.invalidateQueries({ queryKey: ['ads'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (body: PostOrPatchAdRequest) => {
  patchAdMutation.mutate({ id, body })
}

</script>