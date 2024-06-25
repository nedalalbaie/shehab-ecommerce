<template>
  <cancel-order-dialog-component
    v-if="cancelOrderDialog.order"
    v-model="cancelOrderDialog.open"
    :order="cancelOrderDialog.order"
    :is-loading="cancelOrderMutation.isPending.value"
    @cancel-order="onCancelOrder"
  />

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

    <div
      v-if="orders.isPending.value"
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
      v-else-if="orders.isError.value"
      type="error"
      class="my-6"
      title="خطأ في الوصول الى بيانات الطلب"
      text="الرجاء اعادة المحاولة مرة أخرى."
    />

    <div
      v-else-if="orders.data.value"
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
                'text-green-600': order.status === STATUS.CONFIRMED,
                'text-red-600': order.status === STATUS.CANCELD,
                'text-orange-500': order.status === STATUS.PENDING,
                'text-[#00696F]': order.status === STATUS.SHIPPING,
              }"
            >
              {{ checkStatus(order.status) }}
            </p>
          </div>
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

            <v-btn
              rounded="xl"
              variant="elevated"
              color="error"
              type="submit"
              @click="openCancelDialog(order)"
            >
              إلغاء
              <template #prepend>
                <DeleteIcon fill="fill-white" />
              </template>
            </v-btn>
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
import { checkStatus } from "@/core/helpers/check-status"
import EmptyData from "@/core/components/EmptyData.vue";
import OrdersSearchFilter from "../components/OrdersSearchFilter.vue";
import type { Order } from "../models/order";
import CancelOrderDialogComponent from "../components/CancelOrderDialog.vue";

const cancelOrderDialog = ref<{
  open: boolean,
  order: Order | null
}>({
  open: false,
  order: null
})

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
    cancelOrderDialog.value.open = false
    queryClient.invalidateQueries({ queryKey: ['orders'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const openCancelDialog = (order: Order) => {
  cancelOrderDialog.value.open = true
  cancelOrderDialog.value.order = order
}

const onCancelOrder = () => {
  const id = cancelOrderDialog.value.order!.id
  cancelOrderMutation.mutate(id)
}

const formatToDate = (date: string) => {
  const dateObject = new Date(date);
  if (!isNaN(dateObject.getTime())) {
    return dateObject.toLocaleDateString();
  }
}

const quantityTotal = (quantites: number[]) => (
  quantites ?  quantites.reduce((acc, quantity) => acc + quantity) : 0
)

</script>