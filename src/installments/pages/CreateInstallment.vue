<template>
  <div class="flex justify-between">
    <h1 class="text-2xl font-medium">
      إضافة قسط جديد
    </h1>
    <v-btn
      :to="{ name: 'installments' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى الأقساط
    </v-btn>
  </div>
  <InstallemntForm
    :is-loading="addInstallemntMutation.isPending.value"
    @submit="handleSubmit"
  />
</template>
<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import router from '@/router'
import InstallemntForm from '../components/InstallemntForm.vue'
import type { Installment } from '../models/installment'
import { postInstallment } from '../installment-service'

const queryClient = useQueryClient()

const addInstallemntMutation = useMutation({
  mutationFn: postInstallment,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['installments'] })
    router.replace({name: 'installments'})
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (payload: Omit<Installment, 'id'>) => {
  addInstallemntMutation.mutate(payload)
}
</script>
