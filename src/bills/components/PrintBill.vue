<script setup
        lang="ts"
>
        import { format } from "date-fns";
        import type { Bill } from "../models/bill";

        defineProps<{
          bill: Bill
        }>();

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
