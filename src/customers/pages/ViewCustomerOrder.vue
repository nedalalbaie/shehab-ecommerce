<template>
  <v-btn
    :to="{ name: 'view-customer-orders', params: { customerId: customerId} }"
    variant="outlined"
    color="primary"
    size="large"
    :prepend-icon="mdiArrowRight"
  >
    الرجوع الى الطلبات
  </v-btn>

  <div
    v-if="orderDetails"
    class="flex items-center justify-between mt-6"
  >
    <div>
      <h1 class="text-3xl flex items-center gap-2">
        الطلب {{ orderDetails.order_details.order_number }}# -
        {{ checkStatus(orderDetails.order_details.status) }}
        <div class="h-6 w-6 rounded-[50%] bg-orange-300" />
      </h1>
      <p>
        {{ formatDateWithTime(orderDetails.order_details.created_at) }}
      </p>
    </div>

    <div
      v-if="orderDetails.order_details.status != STATUS.CANCELD"
      class="flex gap-4"
    >
      <v-select
        v-model="status"
        class="w-60"
        label="تغيير حالة الطلب"
        placeholder="تغيير حالة الطلب"
        variant="outlined"
        density="comfortable"
        :items="statusOptions"
        item-title="label"
        item-value="value"
      />

      <v-btn
        :to="{ name: 'edit-customer-order', params: { customerId, orderId: orderDetails.order_details.id } }"
        size="large"
        rounded="xl"
        variant="elevated"
        color="#004C6B"
      >
        تعديل
        <template #prepend>
          <v-icon :icon="mdiPencil" />
        </template>
      </v-btn>
    </div>
  </div>

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
    title="خطأ في الوصول الى بيانات الطلب"
    text="الرجاء اعادة المحاولة مرة أخرى."
  />

  <OrderDetails
    v-else-if="orderDetails"
    :order="orderDetails"
  >
    <template #default>
      <div
        v-for="(product, index) in orderDetails.products"
        :key="product.id"
        class="grid grid-cols-4 px-8 py-3"
      >
        <p class="border-b-2 border-neutral-600 pb-1 w-fit">
          {{ product.name }}
        </p>
        <p>{{ orderDetails.order_details.quantity_selected[index] }}</p>
        <div class="w-4/5 flex gap-1">
          <div
            v-for="(color, colorIndex) in convertToObject(product.hex_codes)"
            :key="colorIndex"
            class="w-8 h-8 rounded-[50%] shadow-full-white border-2 flex items-end"
            :style="{ 'background-color': `#${color}` }"
          />
        </div>
        <p>{{ product.price }}</p>
      </div>

      <div class="mt-2 w-1/4 rounded-tl-lg bg-primary-100 text-white p-3 text-xl">
        <div class="flex justify-between">
          <p>الإجمالي :</p>
          <p>{{ orderDetails.order_details.total_price }} د.ل</p>
        </div>
        <div
          v-if="orderDetails.order_details.payment_method !== 'cash' "
          class="flex justify-between mt-2"
        >
          <p>متأخرات سداد الديون :</p>
          <p>{{ orderDetails.order_details.paid_due_value }} د.ل</p>
        </div>
      </div>
    </template>
  </OrderDetails>
</template>

<script setup lang="ts">
import { changeOrderStatus, getOrder } from '@/orders/orders-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import OrderDetails from '@/orders/components/OrderDetails.vue'
import { mdiArrowRight, mdiPencil } from '@mdi/js'
import { STATUS, statusOptions, type OrderStatus } from '@/orders/models/status'
import { checkStatus } from '@/core/helpers/check-status'
import { formatDateWithTime } from '@/core/helpers/format-date'
import { ref, watch, watchEffect } from 'vue'

const status = ref<OrderStatus>()
let statusCounter = 0

const route = useRoute()
const orderId = Number(route.params.orderId)
const customerId = Number(route.params.customerId)

const {
  data: orderDetails,
  isPending,
  isError
} = useQuery({
  queryKey: ['orderDetails'],
  queryFn: () => getOrder(orderId)
})

const convertToObject = (hexCodesParam: string) => {
  return JSON.parse(hexCodesParam) as string[]
}

const queryClient = useQueryClient()

const changeOrderStatusMutation = useMutation({
  mutationFn: changeOrderStatus,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orderDetails'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const onchangeOrderStatus = (order_number: string, new_status: OrderStatus) => {
  changeOrderStatusMutation.mutate({ order_number: order_number, new_status: new_status })
}

watchEffect(() => {
  if (orderDetails.value) { 
    status.value = orderDetails.value.order_details.status
  } 
})

watch(
  status ,
  (orderStatus) => {
    if ( statusCounter === 1) {
      if (orderDetails.value) {
        onchangeOrderStatus(orderDetails.value.order_details.order_number, orderStatus!)
      }
    } else 
    statusCounter++
  }
)

</script>
