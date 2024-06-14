<template>
  <div>
    <div class="flex items-center justify-between mt-6">
      <h1 class="text-3xl font-medium">
        الطلبات
        <span
          v-if="orders.data.value && orders.data.value.total > 0"
          class="bg-gray-200 px-2 rounded-lg text-2xl"
        >{{ orders.data.value.total }}</span>
      </h1>
      
      <orders-search-filter v-model="listParams" />
    </div>

    <div v-if="!orders.data.value">
      <LoadingOrders />
    </div>

    <div
      v-if="orders.data.value"
      class="mt-6 flex-grow flex flex-col justify-center"
    >
      <EmptyData v-if="orders.data.value.data.length === 0" />
      <div class="grid grid-cols-productsCards gap-x-4 gap-y-8 mt-6">
        <div
          v-for="order in orders.data.value?.data"
          :key="order.id"
          class="bg-white shadow-lg rounded-lg p-4"
        >
          <p class="text-xl text-center">
            {{ order.order_number }}
          </p>
          <div class="mt-4 flex items-center border-b border-gray-700 pb-1">
            <p class="w-1/2">
              الحالة
            </p>
            <p
              class="w-1/2 text-center font-medium"
              :class="{
                // 'text-green-600': order.status === STATUS.DELIVERD,
                'text-green-600': order.status === STATUS.CONFIRMED,
                'text-red-600': order.status === STATUS.CANCELD,
                'text-orange-500': order.status === STATUS.PENDING,
                'text-[#00696F]': order.status === STATUS.SHIPPING,
              }"
            >
              {{ checkStatus(order.status) }}
            </p>
          </div>
          <!-- <div class="mt-4 flex items-center border-b border-gray-700">
          <p class="w-1/2">
            الزبون
          </p>
          <p class="w-1/2 text-center">
            عبدالرحمن
          </p>
        </div> -->
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              التاريخ
            </p>
            <p class="w-1/2 text-center">
              {{ formatToDate(order.created_at) }}
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              عدد العناصر
            </p>
            <p class="w-1/2 text-center">
              {{ quantityTotal(order.quantity_selected) }}
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              العنوان
            </p>
            <p class="w-1/2 text-center">
              {{ order.shipping_address }}
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              رقم الهاتف
            </p>
            <p class="w-1/2 text-center">
              0925448193
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              الإجمالي
            </p>
            <p class="w-1/2 text-center">
              {{ order.total_price }}
            </p>
          </div>
          <div class="flex justify-center gap-4 mt-6 text-white">
            <v-btn
              rounded="xl"
              variant="elevated"
              color="primary"
              type="submit"
              :to="{ name: 'order-details', params: { id: order.id } }"
            >
              عرض
              <template #prepend>
                <ViewIconVue />
              </template>
            </v-btn>

            <v-dialog
              v-if="order.status != STATUS.CANCELD"
              width="500"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
  
                  rounded="xl"
                  variant="elevated"
                  color="error"
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
                  :title="dialogQuestion(order.order_number)"
                  rounded="lg"
                  color="#EFE9F5"
                  style="padding-block: 1.75rem !important ;"
                >
                  <v-card-text>
                    سيتم الغاء هذه الطلبية بشكل نهائي، سيتلقى الزبون اشعارا يوضح ان الطلبية تم الغاؤها.
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />

                    <v-btn
                      text="لا"
                      @click="isActive.value = false"
                    />
                    <v-btn
                      text="نعم"
                      @click="isActive.value = false; onCancelOrder(order.id)"
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
import { cancelOrder, getOrders } from "../orders-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { STATUS } from "../models/status"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import DeleteIcon from "@/core/components/icons/DeleteIcon.vue";
import ViewIconVue from "@/core/components/icons/ViewIcon.vue";
import router from "@/router";
import { checkStatus } from "@/core/helpers/check-status"
import LoadingOrders from "../components/LoadingOrders.vue";
import EmptyData from "@/core/components/EmptyData.vue";
import OrdersSearchFilter from "../components/OrdersSearchFilter.vue";

const listParams = ref<PaginationParams>({
  page: 1,
  limit: 10
})

const orders = useQuery({
  queryKey: ['orders', listParams],
  queryFn: () => getOrders(listParams.value)
})

const queryClient = useQueryClient()
const cancelOrderMutation = useMutation({
  mutationFn: cancelOrder,
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

const dialogQuestion = (orderCode: string) => {
  return `إلغاء الطلبية ${orderCode}# ?`
}

const formatToDate = (date: string) => {
  const dateObject = new Date(date);
  if (!isNaN(dateObject.getTime())) {
    return dateObject.toLocaleDateString();
  }
}

const quantityTotal = (quantites: number[]) => (
     quantites.reduce((acc, quantity) => acc + quantity)
  )

</script>