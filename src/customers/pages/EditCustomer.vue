<template>
  <h1 class="text-2xl font-medium bg-gray-100 w-fit p-2 rounded-md">
    <span>عبد الرحمن محمد  - </span>
    <span>
      تعديل
    </span>
  </h1>
  <CustomerForm
    :is-loading="patchCustomer.isPending.value"
    :customer="customer.data.value"
    @submit="handleSubmit"
  />
</template>
    
<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { editCustomer, getCustomer } from "../customers-service"
import router from "@/router";
import CustomerForm from "../components/CustomerForm.vue"
import type { CustomerFormRequest } from '../models/customer';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = Number(route.params.id);

const customer = useQuery({
  queryKey: ['customer'],
  queryFn: () => getCustomer(id)
})

const queryClient = useQueryClient()
const patchCustomer = useMutation({
  mutationFn: ({ id, body }: { id: number, body: CustomerFormRequest, }) => editCustomer(id, body),
  onSuccess: () => {
    router.replace({ name: 'customers' })
    queryClient.invalidateQueries({ queryKey: ['customers'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (body: CustomerFormRequest) => {
  patchCustomer.mutate({ body, id })
}

</script>