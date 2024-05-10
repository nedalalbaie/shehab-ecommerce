<template>
  <div class="flex items-center justify-between mt-6">
    <h1 class="text-3xl flex items-center gap-2">
      الطلب {{ order.order_details.order_number }}# - {{ checkStatus(order.order_details.status) }} 
      <div class="h-6 w-6 rounded-[50%] bg-orange-300" />
    </h1>
    <div
      v-if="order.order_details.status != STATUS.CANCELD"
      class="flex gap-4"
    >
      <v-dialog width="500">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            size="large"
            rounded="xl"
            variant="elevated"
            color="#004C6B"
            type="submit"
          >
            إلغاء الطلبية
            <template #prepend>
              <DeleteIcon fill="fill-white" />
            </template>
          </v-btn>
        </template>

        <template #default="{ isActive }">
          <v-card
            :title="dialogQuestion(order.order_details.order_number as number)"
            rounded="lg"
            color="#EFE9F5"
            style="padding-block: 1.75rem !important ;"
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
                @click="isActive.value = false; onCancelOrder(order.order_details.id as number)"
              />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </div>

  <div class="bg-white rounded-md shadow-md pt-6 mt-6">
    <div class="bg-primary-100 text-white grid grid-cols-3 px-8 py-1">
      <p>الزبون</p>
      <p>رقم الهاتف</p>
      <p>العنوان</p>
    </div>

    <div class="grid grid-cols-3 px-8 py-6">
      <p>{{ order.user.name }}</p>
      <p>{{ order.user.phone_number }}</p>
      <p>{{ order.user.address }}</p>
    </div>
  </div>

  <div class="bg-white rounded-md shadow-md pt-6 mt-6">
    <div class="bg-primary-100 text-white grid grid-cols-3 px-8 py-1">
      <p>العنصر</p>
      <p>الكمية</p>
      <p>السعر</p>
    </div>

    <slot />

    <div class="bg-primary-100 text-white px-8 py-2 text-xl text-center">
      <p>الإجمالي {{ order.order_details.total_price }} د.ل</p>
    </div>
  </div>

  <div class="bg-white shadow-md p-4 rounded-md mt-4 text-lg font-medium flex gap-2 ">
    <p>ملاحظات الزبون:</p>
    <p>يرجى التوصيل بعد الساعة 4 عصراً</p>
  </div>
</template>
<script setup lang="ts">
import DeleteIcon from "@/core/components/icons/DeleteIcon.vue";
import { cancelOrder } from "../orders-service";
import router from "@/router";
import { useQueryClient, useMutation } from "@tanstack/vue-query";
import type { OrderDetails } from "../models/order-details";
import { STATUS } from "../models/status"
import { checkStatus } from "@/core/helpers/check-status"

// eslint-disable-next-line
const definedProps = defineProps<{
  order: OrderDetails
}>()

const dialogQuestion = (productCode: number) => {
  return `إلغاء الطلبية ${productCode}# ?`
}

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

</script>