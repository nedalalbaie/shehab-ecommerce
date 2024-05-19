<template>
  <OrderDetails
    v-if="orderDetails.data.value"
    :order="orderDetails.data.value"
  >
    <template #default>
      <div
        v-for="product in orderDetails.data.value?.products"
        :key="product.id"
        class="grid grid-cols-3 px-8 py-3"
      >
        <p class="border-b-2 border-neutral-600 pb-1 w-fit">
          {{ product.name }}
        </p>
        <!-- <p>{{ product. }}</p> -->
        <p>{{ product.price }}</p>
      </div>
    </template>
  </OrderDetails>
</template>

<script setup lang="ts">
import { getOrder } from "../orders-service";
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import OrderDetails from "../components/OrderDetails.vue"

const route = useRoute();
const id = Number(route.params.id);

const orderDetails = useQuery({
  queryKey: ['orderDetails'],
  queryFn: () => getOrder(id)
})

</script>