<template>
  <div>
    <div class="flex items-center justify-between mt-6">
      <h1 class="text-3xl">
        الفواتير
        <span>(20 )</span>
      </h1>
    </div>

    <div v-if="!bills.data.value">
      <LoadingOrders />
    </div>

    <div
      v-if="bills.data.value"
      class="mt-6 flex-grow flex flex-col justify-center"
    >
      <EmptyData v-if="bills.data.value.data.length === 0" />

      <div class="grid grid-cols-productsCards gap-x-4 gap-y-8 mt-6 py-2">
        <div
          v-for="bill in bills.data.value?.data"
          :key="bill.id"
          class="bg-white shadow-lg rounded-lg p-4"
        >
          <p class="text-xl text-center">
            #
          </p>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              الزبون
            </p>
            <p class="w-1/2 text-center">
              {{ bill.customer_name }}
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              التاريخ
            </p>
            <p class="w-1/2 text-center">
              {{ formatToDate(bill.created_at) }}
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              عدد العناصر
            </p>
            <p class="w-1/2 text-center">
              {{ bill.quantity[0] }}
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              الإجمالي
            </p>
            <p class="w-1/2 text-center">
              {{ bill.total_price }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getBills } from "../bill-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { useQuery } from "@tanstack/vue-query";
import EmptyData from "@/core/components/EmptyData.vue";
import LoadingOrders from "@/orders/components/LoadingOrders.vue";

const listParams = ref<PaginationParams>({
  page: 1,
  limit: 10,
  productName: undefined,
  category_id: undefined
})

const bills = useQuery({
  queryKey: ['bills', listParams],
  queryFn: () => getBills(listParams.value)
})

const formatToDate = (date: string) => {
  const dateObject = new Date(date);
  if (!isNaN(dateObject.getTime())) {
    return dateObject.toLocaleDateString();
  }
}

</script>