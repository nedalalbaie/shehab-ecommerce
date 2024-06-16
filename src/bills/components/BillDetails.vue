<template>
  <div class="print:hidden">
    <div class="flex items-center justify-between mt-6">
      <div>
        <h1 class="text-3xl flex items-center gap-2">
          <span>الفاتورة</span>
          <span>{{ bill.result.bill_number }}</span> 
          <span>{{ checkStatus(bill.result.status) }} </span>
          <div
            class="h-6 w-6 rounded-[50%]"
            :class="{
              'bg-green-600': bill.result.status === STATUS.ACCEPTED,
              'bg-red-600': bill.result.status === STATUS.CANCELD
            }"
          />
        </h1>
        <p v-if="bill.result.created_at">
          {{ formatToDate(bill.result.created_at) }}
        </p>
      </div>
  
      <div
        class="flex gap-4"
      >
        <v-btn
          v-if="bill.result.status == STATUS.ACCEPTED"
          variant="tonal"
          class="mx-1"
          density="default"
          color="primary"
          size="large"
          rounded="xl"
          type="button"
          :prepend-icon="mdiPrinter"
          @click="onPrintBill()"
        >
          طباعة 
        </v-btn>

        <v-btn
          v-if="bill.result.status !== STATUS.CANCELD"
          size="large"
          rounded="xl"
          variant="elevated"
          color="error"
          type="submit"
          @click="cancelBillDialog.open = true"
        >
          إلغاء 
          <template #prepend>
            <DeleteIcon fill="fill-white" />
          </template>
        </v-btn>

        <v-dialog
          v-if="bill.result.status != STATUS.CANCELD"
          v-model="cancelBillDialog.open"
          width="500"
        >
          <v-card
            :title="dialogQuestion(bill.result.bill_number)"
            rounded="lg"
            color="#EFE9F5"
            style="padding-block: 1.75rem !important ;"
          >
            <v-card-text>
              سيتم إلغاء هذه الفاتورة بشكل نهائي، سيتلقى الزبون إشعارا يوضح أن الفاتورة تم إلغاءها.
            </v-card-text>
  
            <v-card-actions>
              <v-spacer />
  
              <v-btn
                text="لا"
                @click="cancelBillDialog.open = false"
              />
              <v-btn
                :loading="changeOrderStatusMutation.isPending.value"
                text="نعم"
                @click=" onchangeOrderStatus(bill.result.bill_number, 'canceled')"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  
    <div class="bg-white rounded-md shadow-md pt-6 mt-6">
      <div class="bg-primary-100 text-white grid grid-cols-4 px-8 py-1">
        <p>الزبون</p>
        <p>رقم الهاتف</p>
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
  </div>

  <div
    ref="componentRef"
    class="hidden print:block"
  >
    <print-bill
      :bill="bill.result"
      :products="bill.prodcts"
    />
  </div>
</template>
  <script setup lang="ts">
  import DeleteIcon from "@/core/components/icons/DeleteIcon.vue";
  import { changeBillStatus } from "../bill-service";
  import { useQueryClient, useMutation } from "@tanstack/vue-query";
  import { formatDateWithTime } from "@/core/helpers/format-date"
  import type { Bill } from "../models/bill";
  import { STATUS, type BillStatus } from "../models/status";
  import { mdiPrinter } from "@mdi/js";
  import { useVueToPrint } from 'vue-to-print'
  import { ref } from "vue";
  import PrintBill from "../components/PrintBill.vue"
  import type { Product } from "@/products/models/product";
  
 defineProps<{
    bill: {
      result: Bill,
      prodcts: Product []
    }
  }>()

const cancelBillDialog = ref({
  open: false
})

const componentRef = ref()
const { handlePrint } = useVueToPrint({
  content: () => componentRef.value,
  documentTitle: 'فاتورة',
  removeAfterPrint: true,
  onAfterPrint: () => {
    console.log('Printed');
  }
})

const onPrintBill =  () => {
  setTimeout(() => {
     handlePrint()
    // window.print()
  }, 50)
}
  
  const dialogQuestion = (billNumber: string) => {
    return `إلغاء الفاتورة ${billNumber}# ؟`
  }
  
  const queryClient = useQueryClient()
  
  const changeOrderStatusMutation = useMutation({
    mutationFn: changeBillStatus,
    onSuccess: () => {
      cancelBillDialog.value.open = false
      queryClient.invalidateQueries({ queryKey: ['bills'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  
  const onchangeOrderStatus = (order_number: string, billStatus: BillStatus) => {
    changeOrderStatusMutation.mutate({bill_number: order_number, status: billStatus })
  }
  
  // const checkPaymentMethod = (paymentMethod: 'cash' | 'cridit-card' | 'installments') => {
  //   switch (paymentMethod) {
  //     case 'cash':
  //     return 'دفع كاش'
    
  //     case 'cridit-card':
  //     return 'دفع ببطاقة الائتمان'    
    
  //     case 'installments':
  //     return 'دفع بالتقسيط'
    
  //     default:
  //     return 'دفع كاش'
  //   }
  // }

  const checkStatus = (status: string) => {
  switch (status) {
    case STATUS.CANCELD:
      return 'ملغية'
    case STATUS.ACCEPTED:
      return 'تم القبول'
    default:
      return 'تم القبول'
  }
}

const formatToDate = (date: string) => {
  // const dateObject = new Date(date);
  // if (!isNaN(dateObject.getTime())) {
  //   return dateObject.toLocaleDateString();
  // }
  if (date !== null) {
    return formatDateWithTime(date)
  }
}
  
  </script>
