<template>
  <div>
    <v-btn
      :to="{ name: 'view-customer', params: { customerId: customerId } }"
      variant="outlined"
      color="primary"
      size="large"
      :prepend-icon="mdiArrowRight"
    >
      الرجوع الى عرض الزبون
    </v-btn>
    <div class="flex items-center justify-between mt-6">
      <h1 class="text-3xl font-medium">
        الفواتير
        <span
          v-if="bills && bills.length > 0"
          class="bg-gray-200 px-2 rounded-lg text-2xl"
        >{{
          bills?.length
        }}</span>
      </h1>
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
      title="خطأ في الوصول الى بيانات الفواتير"
      text="الرجاء اعادة المحاولة مرة أخرى."
    />

    <div
      v-else-if="bills"
      class="mt-6 flex-grow flex flex-col justify-center"
    >
      <EmptyData v-if="bills.length === 0" />
      <div class="grid grid-cols-productsCards gap-x-4 gap-y-8 mt-6">
        <div
          v-for="bill in bills"
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
                'text-green-600': bill.status === STATUS.ACCEPTED,
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
              :to="{ name: 'view-customer-bill', params: { billId: bill.id } }"
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
                  :title="dialogQuestion(bill.bill_number)"
                  rounded="lg"
                  color="#EFE9F5"
                  style="padding-block: 1.75rem !important"
                >
                  <v-card-text>
                    سيتم الغاء هذه الفاتورة بشكل نهائي، سيتلقى الزبون اشعارا يوضح ان الفاتورة تم
                    الغاؤها.
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
                        onCancelOrder(bill.bill_number, 'canceled')
                      "
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
import { changeBillStatus, getBillByCustomerId } from '@/bills/bill-service'
import { STATUS, type BillStatus } from '@/bills/models/status'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import DeleteIcon from '@/core/components/icons/DeleteIcon.vue'
import ViewIconVue from '@/core/components/icons/ViewIcon.vue'
import { checkStatus } from '@/core/helpers/check-status'
import EmptyData from '@/core/components/EmptyData.vue'
import { useRoute } from 'vue-router'
import { mdiArrowRight } from '@mdi/js'

const route = useRoute()
const customerId = Number(route.params.customerId)

  const { data: bills, isPending, isError } = useQuery({
  queryKey: ['customer-bills', customerId],
  queryFn: () => getBillByCustomerId(customerId)
})

const queryClient = useQueryClient()
const cancelOrderMutation = useMutation({
  mutationFn: changeBillStatus,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['bills'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const onCancelOrder = (billNumber: string, billStatus: BillStatus) => {
  cancelOrderMutation.mutate({
    bill_number: billNumber,
    status: billStatus
  })
}

const dialogQuestion = (billNumber: string) => {
  return `إلغاء الفاتورة ${billNumber} ؟`
}

const formatToDate = (date: string) => {
  const dateObject = new Date(date)
  if (!isNaN(dateObject.getTime())) {
    return dateObject.toLocaleDateString()
  }
}
</script>
