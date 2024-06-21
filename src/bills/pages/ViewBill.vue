<template>
  <v-btn
    :to="{ name: 'bills' }"
    variant="outlined"
    color="primary"
    size="large"
    :prepend-icon="mdiArrowRight"
  >
    الرجوع الى  الفواتير 
  </v-btn>
    
  <div
    v-if="isPending"
    class="w-full h-96 flex items-center justify-center"
  >
    <v-progress-circular
      size="50"
      width="4"
      indeterminate
      color="primary"
    />
  </div>

  <v-alert
    v-else-if="isError"
    type="error"
    class="my-6"
    title="خطأ في الوصول الى بيانات الفاتورة"
    text="الرجاء اعادة المحاولة مرة أخرى."
  />
  
  <BillDetails
    v-else-if="bill"
    :bill="bill"
  >
    <template #default>
      <div
        v-for="product in bill.prodcts"
        :key="product.id"
        class="grid grid-cols-3 px-8 py-3"
      >
        <p class="border-b-2 border-neutral-600 pb-1 w-fit">
          {{ product.name }}
        </p>
        <p>{{ product.minimum_quantity }}</p>
        <p>{{ product.price }}</p>
      </div>
  
      <div class="mt-2 w-1/4  rounded-tl-lg bg-primary-100 text-white p-3 text-xl ">
        <div class="flex justify-between">
          <p>الإجمالي :</p>
          <p> {{ bill.result.total_price }} د.ل</p>
        </div>
        <div
          v-if="bill.result.debt_arrears"
          class="flex justify-between mt-2"
        >
          <p>متأخرات سداد الديون :</p>
          <!-- <p> {{ orderDetails.order_details.paid_due_value }} د.ل</p> -->
        </div>
      </div>
    </template>
  </BillDetails>
</template>
  
  <script setup lang="ts">
  import { getBill } from "../bill-service";
  import { useQuery } from "@tanstack/vue-query";
  import { useRoute } from "vue-router";
  import BillDetails from "../components/BillDetails.vue"
  import {
    mdiArrowRight
  } from '@mdi/js'
  
  const route = useRoute();
  const id = Number(route.params.id);
  
  const { data: bill , isPending, isError} = useQuery({
    queryKey: ['bill'],
    queryFn: () => getBill(id)
  })
  
  </script>