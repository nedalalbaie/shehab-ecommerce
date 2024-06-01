<template>
  <div>
    <v-btn
      :to="{ name: 'view-customer', params: { id: id } }"
      variant="outlined"
      color="primary"
      size="large"
      :prepend-icon="mdiArrowRight"
    >
      الرجوع الى  عرض الزبون 
    </v-btn>
    <div class="flex items-center justify-between mt-6">
      <h1 class="text-3xl font-medium">
        الطلبات
        <span
          v-if="orders && orders.length > 0"
          class="bg-gray-200 px-2 rounded-lg text-2xl"
        >{{ orders.length }}</span>
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
  
    <div v-if="!orders">
      <LoadingOrders />
    </div>
  
    <div
      v-if="orders"
      class="mt-6 flex-grow flex flex-col justify-center"
    >
      <EmptyData v-if="orders.length === 0" />
      <div class="grid grid-cols-productsCards gap-x-4 gap-y-8 mt-6">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white shadow-lg rounded-lg p-4"
        >
          <p class="text-xl text-center">
            #{{ order.order_number }}
          </p>
          <div class="mt-4 flex items-center border-b border-gray-700 pb-1">
            <p class="w-1/2">
              الحالة
            </p>
            <p
              class="w-1/2 text-center font-medium"
              :class="{
                // 'text-green-600': order.status === STATUS.DELIVERD,
                'text-blue-600': order.status === STATUS.PENDING,
                'text-yellow-600': order.status === STATUS.SHIPPING,
                'text-purple-600': order.status === STATUS.CONFIRMED,
                'text-red-600': order.status === STATUS.CANCELD
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
              5
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
              :to="{ name: 'view-customer-order', params: { id: order.id } }"
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
  import { cancelOrder, getOrderByCustomerId } from "@/orders/orders-service"
  import { STATUS } from "@/orders/models/status"
  import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
  import DeleteIcon from "@/core/components/icons/DeleteIcon.vue";
  import ViewIconVue from "@/core/components/icons/ViewIcon.vue";
  import router from "@/router";
  import { checkStatus } from "@/core/helpers/check-status"
  import LoadingOrders from "@/orders/components/LoadingOrders.vue";
  import EmptyData from "@/core/components/EmptyData.vue";
import { mdiArrowRight } from "@mdi/js";
import { useRoute } from "vue-router";

const route = useRoute();
  const id = Number(route.params.id);

  const { data: orders} = useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrderByCustomerId(id)
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
  
  const dialogQuestion = (orderCode: number) => {
    return `إلغاء الطلبية ${orderCode}# ?`
  }
  
  const formatToDate = (date: string) => {
    const dateObject = new Date(date);
    if (!isNaN(dateObject.getTime())) {
      return dateObject.toLocaleDateString();
    }
  }
  
  </script>