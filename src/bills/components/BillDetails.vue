<template>
  <div class="flex items-center justify-between mt-6">
    <div>
      <h1 class="text-3xl flex items-center gap-2">
        الفاتورة {{ bill.result.bill_number }}# - {{ checkStatus(bill.result.status) }} 
        <div class="h-6 w-6 rounded-[50%] bg-orange-300" />
      </h1>
      <p>
        {{ formatDateWithTime(bill.result.created_at) }}
      </p>
    </div>
  
    <div
      v-if="bill.result.status != STATUS.CANCELD"
      class="flex gap-4"
    >
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
            حذف الفاتورة
            <template #prepend>
              <DeleteIcon fill="fill-white" />
            </template>
          </v-btn>
        </template>
  
        <template #default="{ isActive }">
          <v-card
            :title="dialogQuestion(bill.result.bill_number as number)"
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
                @click="isActive.value = false; onCancelOrder(bill.result.id as number)"
              />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </div>
  
  <div class="bg-white rounded-md shadow-md pt-6 mt-6">
    <div class="bg-primary-100 text-white grid grid-cols-4 px-8 py-1">
      <p>الزبون</p>
      <p>رقم الهاتف</p>
      <p>العنوان</p>
      <p>طريقة الدفع</p>
    </div>
  
    <div class="grid grid-cols-4 px-8 py-6">
      <p>{{ bill.result.customer_name }}</p>
      <p>{{ bill.result.phone_number }}</p>
      <p />
      <!-- <p>{{ checkPaymentMethod(bill.result.payment_method) }}</p> -->
    </div>
  </div>
  
  <div class="bg-white rounded-md shadow-md pt-6 mt-6">
    <div class="bg-primary-100 text-white grid grid-cols-4 px-8 py-1">
      <p>العنصر</p>
      <p>الكمية</p>
      <p>اللون</p>
      <p>السعر</p>
    </div>
  
    <slot />
  </div>
</template>
  <script setup lang="ts">
  import DeleteIcon from "@/core/components/icons/DeleteIcon.vue";
  import { cancelBill, changeBillStatus } from "../bill-service";
  import { useQueryClient, useMutation } from "@tanstack/vue-query";
  import { STATUS, type OrderStatus } from "@/orders/models/status"
  import { checkStatus } from "@/core/helpers/check-status"
  import { formatDateWithTime } from "@/core/helpers/format-date"
import router from "@/router";
import type { Bill } from "../models/bill";
import type { Product } from "@/products/models/product";
  
  // eslint-disable-next-line
  const definedProps = defineProps<{
    bill: {
      result: Bill,
      prodcts: Product []
    }
  }>()
  
  const dialogQuestion = (productCode: number) => {
    return `حذف الفاتورة ${productCode}# ?`
  }
  
  const queryClient = useQueryClient()
  const cancelBillMutation = useMutation({
    mutationFn: cancelBill,
    onSuccess: () => {
      router.replace('bills')
      queryClient.invalidateQueries({ queryKey: ['bills'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  
  const changeOrderStatusMutation = useMutation({
    mutationFn: changeBillStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bills'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  
  const onCancelOrder = (id: number) => {
    cancelBillMutation.mutate(id)
  }
  
  const onchangeOrderStatus = (order_number: number, new_status: OrderStatus) => {
    changeOrderStatusMutation.mutate({order_number: order_number, new_status: new_status })
  }
  
  const checkPaymentMethod = (paymentMethod: 'cash' | 'cridit-card' | 'installments') => {
    switch (paymentMethod) {
      case 'cash':
      return 'دفع كاش'
    
      case 'cridit-card':
      return 'دفع ببطاقة الائتمان'    
    
      case 'installments':
      return 'دفع بالتقسيط'
    
      default:
      return 'دفع كاش'
    }
  }
  
  </script>import type { Product } from "@/products/models/product";
import type { Bill } from "../models/bill";
