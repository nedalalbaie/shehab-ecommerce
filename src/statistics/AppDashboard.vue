<script setup lang="ts">
import {
  mdiAccountGroup,
  mdiAccountMultiple,
  mdiSale,
  mdiHumanMaleFemaleChild,
  mdiArrowTopLeft
} from "@mdi/js";
import OrderSvg from "@/core/components/icons/OrderSvg.vue"
import PendingOrdersIcon from "./components/icons/PendingOrdersIcon.vue"
import ShippingOrdersIcon from "./components/icons/ShippingOrdersIcon.vue"
import CancledOrdersIcon from "./components/icons/CancledOrdersIcon.vue"
import StoreValueIcon from "./components/icons/StoreValueIcon.vue"
import ItemsStoredIcon from "./components/icons/ItemsStoredIcon.vue"
import TotalSalesIcon from "./components/icons/TotalSalesIcon.vue"
import SalesIcon from "./components/icons/SalesIcon.vue"

import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import StatCard from "./components/StatCard.vue";
import DetailsStarCard from "./components/DetailsStarCard.vue";
import { getStatistics } from "./statistics-service";

const { data: statistics, isLoading, isFetching } = useQuery({
  queryKey: ["statistics"],
  queryFn: getStatistics,
});

const isStatisticsLoading = computed(() => {
  return isLoading.value || isFetching.value;
});
</script>

<template>
  <div class="py-2 w-full h-full relative">
    <div class="w-full flex justify-between items-center flex-col sm:flex-row mb-1 max-w-[1250px] mx-auto">
      <h1 class="text-3xl font-medium">
        لوحة التحكم
      </h1>
    </div>

    <div
      v-if="isLoading"
      class="w-full h-96 flex items-center justify-center"
    >
      <v-progress-circular
        size="50"
        width="4"
        indeterminate
        color="primary"
      />
    </div>

    <div
      v-else-if="statistics"
      class="w-full max-w-[1250px] mx-auto mt-5"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-md">
        <stat-card
          title="عدد المنتجات"
          :value="statistics.total_products"
          :icon="mdiAccountMultiple"
          color="bg-emerald-600"
        />
  
        <stat-card
          title="الكمية الكلية"
          :value="statistics.total_quantity"
          :icon="mdiAccountGroup"
          color="bg-rose-600"
        />
        
        <stat-card
          title="عدد الزبائن"
          :value="statistics.total_customers"
          :icon="mdiAccountGroup"
          color="bg-purple-600"
        />
  
        <stat-card
          title="عدد القطع في المخزن"
          :value="statistics.items_stored"
          :icon="ItemsStoredIcon"
          color="bg-indigo-600"
        />
  
        <stat-card
          title="قيمة المخزن"
          :value="statistics.total_store_value"
          :icon="StoreValueIcon"
          color="bg-indigo-600"
        />
      </div>

      <div class="h-[1px] w-1/2 bg-gray-200 my-7 mx-auto" />

      <div class="p-4 rounded-md">
        <h2 class="text-lg font-medium">
          إحصائيات الطلبات
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          <stat-card
            title="عدد الطلبات"
            :value="statistics.total_orders"
            :icon="OrderSvg"
            color="bg-orange-600"
          />
  
          <stat-card
            title="عدد الطلبات المقبولة"
            :value="statistics.total_order_confirmed"
            :icon="mdiHumanMaleFemaleChild"
            color="bg-orange-600"
          />
  
          <stat-card
            title="عدد الطلبات قيد التوصيل"
            :value="statistics.total_order_shipping"
            :icon="ShippingOrdersIcon"
            color="bg-orange-600"
          />
  
          <stat-card
            title="عدد الطلبات قيد الإنتظار"
            :value="statistics.total_order_pinding"
            :icon="PendingOrdersIcon"
            color="bg-orange-600"
          />
  
          <stat-card
            title="عدد الطلبات الملفية"
            :value="statistics.total_order_canceled"
            :icon="CancledOrdersIcon"
            color="bg-orange-600"
          />
        </div>
      </div>


      

      <stat-card
        title="إجمالي المبيعات"
        :value="statistics.total_sales"
        :icon="TotalSalesIcon"
        color="bg-sky-600"
      />

      <stat-card
        title="إجمالي مبيعات اليوم"
        :value="statistics.sales_today"
        :icon="SalesIcon"
        color="bg-sky-600"
      />

      <stat-card
        title="إجمالي مبيعات الأسبوع"
        :value="statistics.sales_all_week"
        :icon="SalesIcon"
        color="bg-sky-600"
      />

      <stat-card
        title="إجمالي مبيعات الشهر"
        :value="statistics.sales_all_month"
        :icon="SalesIcon"
        color="bg-sky-600"
      />

      

      <stat-card
        title="الأرباح"
        :value="statistics.profits"
        :icon="mdiArrowTopLeft"
        color="bg-indigo-600"
      />  
    </div>

    <div class="w-full max-w-[1250px] mx-auto">
      <h2 class="text-xl font-bold mt-4">
        مراكز الخدمة الاكثر زيارة
      </h2>
      <most-visited-chart />
    </div>

    <div class="w-full max-w-[1250px] mx-auto">
      <h2 class="text-xl font-bold mt-4">
        أعلى المطالبات المالية
      </h2>
      <most-claims-chart />
    </div>
  </div>
</template>
