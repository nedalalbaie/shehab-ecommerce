<template>
  <v-btn
    :to="{ name: 'orders' }"
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
        <span>الطلب</span>
        <span>{{ orderDetails.order_details.order_number }}</span> 
        <span>{{ checkStatus(orderDetails.order_details.status) }} </span>
        <div
          class="h-6 w-6 rounded-[50%] "
          :class="{
            'bg-green-600': orderDetails.order_details.status === STATUS.CONFIRMED,
            'bg-red-600': orderDetails.order_details.status === STATUS.CANCELD,
            'bg-orange-300': orderDetails.order_details.status === STATUS.PENDING,
            'bg-[#00696F]': orderDetails.order_details.status === STATUS.SHIPPING,
          }"
        />
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
        density="compact"
        :items="statusOptions"
        item-title="label"
        item-value="value"
      />

      <v-btn
        v-if="orderDetails.order_details.status == STATUS.CONFIRMED"
        size="large"
        rounded="xl"
        variant="elevated"
        color="primary"
        :loading="makeBillMutation.isPending.value"
        @click="onMakeBill"
      >
        إنشاء فاتورة
        <template #prepend>
          <v-icon :icon="BillIcon" />
        </template>
      </v-btn>

      <v-btn
        :to="{ name: 'edit-order', params: { id: orderDetails.order_details.id } }"
        size="large"
        rounded="xl"
        variant="elevated"
        color="primary"
      >
        تعديل
        <template #prepend>
          <v-icon :icon="mdiPencil" />
        </template>
      </v-btn>

      <v-dialog width="500">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            size="large"
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
            :title="dialogQuestion(orderDetails.order_details.order_number)"
            rounded="lg"
            color="#EFE9F5"
            style="padding-block: 1.75rem !important "
          >
            <v-card-text>
              سيتم الغاء هذه الطبية بشكل نهائي، سيتلقى الزبون اشعارا يوضح ان الطبية تم الغاؤها.
            </v-card-text>

            <v-card-actions>
              <v-spacer />

              <v-btn
                text="لا"
                @click="isActive.value = false"
              />
              <v-btn
                text="نعم"
                @click="
                  isActive.value = false;
                  onCancelOrder(orderDetails.order_details.id as number)
                "
              />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
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
          v-if="orderDetails.order_details.payment_method == 'installments'"
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
import { cancelOrder, changeOrderStatus, getOrder } from '../orders-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import OrderDetails from '../components/OrderDetails.vue'
import { mdiArrowRight, mdiPencil } from '@mdi/js'
import { STATUS, statusOptions, type OrderStatus } from '../models/status'
import { checkStatus } from '@/core/helpers/check-status'
import { formatDateWithTime } from '@/core/helpers/format-date'
import DeleteIcon from '@/core/components/icons/DeleteIcon.vue'
import { ref, watch, watchEffect } from 'vue'
import BillIcon from '../components/icons/BillIcon.vue'
import { postBill } from '@/bills/bill-service'

const status = ref<OrderStatus>()
let statusCounter = 0

const route = useRoute()
const id = Number(route.params.id)

const {
  data: orderDetails,
  isPending,
  isError
} = useQuery({
  queryKey: ['orderDetails'],
  queryFn: () => getOrder(id)
})

const convertToObject = (hexCodesParam: string) => {
  return JSON.parse(hexCodesParam) as string[]
}

const dialogQuestion = (productCode: string) => {
  return `إلغاء الطلبية ${productCode} ؟`
}

const queryClient = useQueryClient()
const cancelOrderMutation = useMutation({
  mutationFn: cancelOrder,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orderDetails'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const makeBillMutation = useMutation({
  mutationFn: postBill,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orderDetails'] })
  }
})

const changeOrderStatusMutation = useMutation({
  mutationFn: changeOrderStatus,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['orderDetails'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const onCancelOrder = (id: number) => {
  cancelOrderMutation.mutate(id)
}

const onchangeOrderStatus = (order_number: string, new_status: OrderStatus) => {
  changeOrderStatusMutation.mutate({ order_number: order_number, new_status: new_status })
}

const onMakeBill = () => {
  if (orderDetails.value) {
    makeBillMutation.mutate(orderDetails.value.order_details.order_number)
  }
}

watchEffect(() => {
  if (orderDetails.value) {
    status.value = orderDetails.value.order_details.status
  }
})

watch(status, (orderStatus) => {
  if (statusCounter === 1) {
    if (orderDetails.value) {
      onchangeOrderStatus(orderDetails.value.order_details.order_number, orderStatus!)
    }
  } else statusCounter++
})
</script>
