<template>
  <div class="flex justify-between">
    <h1 class="text-2xl font-medium bg-gray-100 w-fit p-2 rounded-md">
      <span>
        تعديل بيانات  -
      </span>
      <span>عبد الرحمن محمد  </span>
    </h1>
    <v-btn
      :to="{ name: 'customers' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى الزبائن 
    </v-btn>
  </div>
  <CustomerForm
    :is-loading="patchCustomer.isPending.value"
    :customer="customer"
    :customer-addresses="addresses.data.value"
    @submit="handleSubmit"
  />
</template>
    
<script setup lang="ts">
import { mdiArrowLeft } from "@mdi/js";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { editCustomer, getCustomer } from "../customers-service"
import router from "@/router";
import CustomerForm from "../components/CustomerForm.vue"
import type { EditCustomerBody } from '../models/customer';
import { useRoute } from 'vue-router';
import { getUserAddresses } from "@/addresses/addresses-service";

const route = useRoute();
const id = Number(route.params.id);

const { data: customer } = useQuery({
    queryKey: ['customer'],
    queryFn: () => getCustomer(id)
})

const addresses = useQuery({
    queryKey: ['user-addresses'],
    queryFn: () => getUserAddresses(id)
})

const queryClient = useQueryClient()
const patchCustomer = useMutation({
  mutationFn: ({ id, body }: { id: number, body: EditCustomerBody, }) => editCustomer(id, body),
  onSuccess: () => {
    router.replace({ name: 'customers' })
    queryClient.invalidateQueries({ queryKey: ['customers'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const handleSubmit = (body: EditCustomerBody) => {
  patchCustomer.mutate({ body, id })
}

</script>