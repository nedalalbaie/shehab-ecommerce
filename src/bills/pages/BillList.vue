<template>
  <div>
    <div class="flex items-center justify-between mt-6">
      <h1 class="text-3xl font-medium">
        الفواتير
        <span
          v-if="bills && bills.total > 0"
          class="bg-gray-200 px-2 rounded-lg text-2xl"
        >{{ bills?.total }}</span>
      </h1>
      <div class="flex gap-4">
        <button class="bg-sky-200 py-1 px-2 rounded-md">
          قيد المعالجة
        </button>
        <button class="bg-sky-200 py-1 px-2 rounded-md">
          قيد التوصيل
        </button>
        <button class="bg-sky-200 py-1 px-2 rounded-md">
          تم التوصيل
        </button>
        <button class="bg-sky-200 py-1 px-2 rounded-md">
          ملغية
        </button>
      </div>
    </div>

    <div v-if="!bills">
      <LoadingOrders />
    </div>

    <div
      v-if="bills"
      class="mt-6 flex-grow flex flex-col justify-center"
    >
      <EmptyData v-if="bills.total === 0" />
      <div class="grid grid-cols-productsCards gap-x-4 gap-y-8 mt-6">
        <div
          v-for="bill in bills.data"
          :key="bill.id"
          class="bg-white shadow-lg rounded-lg p-4"
        >
          <p class="text-xl text-center">
            #{{ bill.bill_number }}
          </p>
          <div class="mt-4 flex items-center border-b border-gray-700 pb-1">
            <p class="w-1/2">
              الحالة
            </p>
            <p
              class="w-1/2 text-center font-medium"
              :class="{
                // 'text-green-600': order.status === STATUS.DELIVERD,
                'text-blue-600': bill.status === STATUS.PENDING,
                'text-yellow-600': bill.status === STATUS.SHIPPING,
                'text-purple-600': bill.status === STATUS.CONFIRMED,
                'text-red-600': bill.status === STATUS.CANCELD
              }"
            >
              {{ checkStatus(bill.status) }}
            </p>
          </div>
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
              5
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              العنوان
            </p>
            <p class="w-1/2 text-center">
              طرابلس
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              رقم الهاتف
            </p>
            <p class="w-1/2 text-center">
              {{ bill.phone_number }}
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
          <div class="flex justify-center gap-4 mt-6 text-white">
            <v-btn
              rounded="xl"
              variant="elevated"
              color="primary"
              type="submit"
              :to="{ name: 'view-bill', params: { id: bill.id } }"
            >
              عرض
              <template #prepend>
                <ViewIconVue />
              </template>
            </v-btn>

            <v-dialog
              v-if="bill.status != STATUS.CANCELD"
              width="500"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
  
                  rounded="xl"
                  variant="elevated"
                  color="#004C6B"
                  type="submit"
                >
                  إلغاء
                  <template #prepend>
                    <DeleteIcon fill="fill-white" />
                  </template>
                </v-btn>
              </template>

              <template #default="{ isActive }">
                <v-card
                  :title="dialogQuestion(bill.bill_number)"
                  rounded="lg"
                  color="#EFE9F5"
                  style="padding-block: 1.75rem !important ;"
                >
                  <v-card-text>
                    سيتم الغاء هذه الفاتورة بشكل نهائي، سيتلقى الزبون اشعارا يوضح ان الفاتورة تم الغاؤها.
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />

                    <v-btn
                      text="لا"
                      @click="isActive.value = false"
                    />
                    <v-btn
                      text="نعم"
                      @click="isActive.value = false; onCancelOrder(bill.id)"
                    />
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { cancelBill, getBills } from "../bill-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { STATUS } from "../models/status"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import DeleteIcon from "@/core/components/icons/DeleteIcon.vue";
import ViewIconVue from "@/core/components/icons/ViewIcon.vue";
import router from "@/router";
import { checkStatus } from "@/core/helpers/check-status"
import LoadingOrders from "@/orders/components/LoadingOrders.vue";
import EmptyData from "@/core/components/EmptyData.vue";

const listParams = ref<PaginationParams>({
  page: 1,
  limit: 10
})

const { data: bills} = useQuery({
  queryKey: ['bills', listParams],
  queryFn: () => getBills(listParams.value)
})

const queryClient = useQueryClient()
const cancelOrderMutation = useMutation({
  mutationFn: cancelBill,
  onSuccess: () => {
    router.replace({ name: 'orders' })
    queryClient.invalidateQueries({ queryKey: ['orders'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const onCancelOrder = (id: number) => {
  cancelOrderMutation.mutate(id)
}

const dialogQuestion = (orderCode: number) => {
  return `إلغاء الفاتورة ${orderCode}# ?`
}

const formatToDate = (date: string) => {
  const dateObject = new Date(date);
  if (!isNaN(dateObject.getTime())) {
    return dateObject.toLocaleDateString();
  }
}

</script>