<template>
  <div class="bg-white rounded-md shadow-md pt-6 mt-6">
    <div class="bg-primary-100 text-white grid grid-cols-4 px-8 py-1">
      <p>الزبون</p>
      <p>رقم الهاتف</p>
      <p>العنوان</p>
      <p>طريقة الدفع</p>
    </div>

    <div class="grid grid-cols-4 px-8 py-6">
      <p>{{ order.user.name }}</p>
      <p>{{ order.user.phone_number }}</p>
      <p>{{ order.order_details.shipping_address }}</p>
      <p>{{ checkPaymentMethod(order.order_details.payment_method) }}</p>
    </div>
  </div>

  <div class="bg-white rounded-md shadow-md pt-6 mt-6">
    <div class="bg-primary-100 text-white grid grid-cols-4 px-8 py-1">
      <p>العنصر</p>
      <p>الكمية</p>
      <p>الألوان</p>
      <p>السعر</p>
    </div>

    <slot />
  </div>
</template>
<script setup lang="ts">
import type { OrderDetails } from "../models/order-details";

// eslint-disable-next-line
const definedProps = defineProps<{
  order: OrderDetails
}>()

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

</script>