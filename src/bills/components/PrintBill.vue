<script setup
        lang="ts"
>
        import { format } from "date-fns";
        import type { Bill } from "../models/bill";
        import type { Product } from "@/products/models/product";

        defineProps<{
          bill: Bill,
          products: Product []
        }>();

        const convertToObject = (hexCodesParam: string) => {
          return JSON.parse(hexCodesParam) as string[]
        }

</script>

<template>
  <div
    class="hidden print:flex flex-col items-center p-4"
    dir="rtl"
  >
    <div class="w-full flex justify-between">
      <img
        class="w-20 h-20"
        src="@/assets/images/panda.png"
      >

      <!-- <img
        class="w-20 h-20"
        src="serviceCenterDetails.image"
      > -->
    </div>

    <div class="w-full flex justify-between">
      <h2>ايصال مالي</h2>
      <h2>{{ bill.bill_number }}</h2>
    </div>

    <div class="w-full flex justify-between mt-2 pb-1 border-b-2 border-b-slate-300">
      <span class="text-sm">
        التاريخ: <span class="font-thin">{{ format(bill.created_at, "dd/MM/yyyy") }}</span>
      </span>
      <span class="font-thin">ايصال قبض</span>
    </div>

    <div class="w-full mt-12">
      <span>
        اسم الوافد:
        <span class="font-thin">{{ bill.customer_name }}</span>
      </span>
    </div>

    <div
      class="w-full mt-4 flex justify-between"
    >
      <span>
        المبلغ و قدره:
        <span class="font-thin">{{ bill.total_price }}</span>
      </span>

      <span>
        نوع الدفع:
        <span class="font-thin">نقدا</span>
      </span>
    </div>

    <div
      class="mt-4 w-full"
    >
      <p class="font-semibold">
        المبلغ المدفــــــــــوع:
        <span class="font-thin">{{ bill.total_price }}</span>
      </p>
    </div>

    <div class="bg-white rounded-md shadow-md pt-6 mt-6 w-full">
      <div class="bg-primary-100 text-white grid grid-cols-4 px-8 py-1">
        <p>العنصر</p>
        <p>الكمية</p>
        <p>اللون</p>
        <p>السعر</p>
      </div>
  
      <div
        v-for="product in products"
        :key="product.id"
        class="grid grid-cols-4 px-8 py-3"
      >
        <p class="border-b-2 border-neutral-600 pb-1 w-fit">
          {{ product.name }}
        </p>
        <p>{{ product.minimum_quantity }}</p>
        <div class="w-4/5 flex gap-1">
          <div
            v-for="(color, colorIndex) in convertToObject(product.hex_codes)"
            :key="colorIndex"
            class="w-8 h-8 rounded-[50%] shadow-full-white border-2  flex items-end"
            :style="{ 'background-color': `#${color}` }"
          />
        </div>
        <p>{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped
       media="print"
>
     @media print {
  .page-break {
    page-break-after: always;
  }

  .scroll-container {
    overflow: visible !important;
    height: fit-content !important;
  }
}

@page {
  size: A4;
  margin: 0;
}
    </style>
