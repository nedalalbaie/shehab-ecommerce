<script setup lang="ts">
import {
  mdiAccountGroup,
  mdiAccountMultiple,
  mdiAccountTie,
  mdiHospitalBuilding,
  mdiHumanMaleFemaleChild,
  mdiPill,
} from "@mdi/js";
  import OrderSvg from "@/core/components/icons/OrderSvg.vue"
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import StatCard from "./components/StatCard.vue";
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
      class="w-full max-w-[1250px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
    >
      <stat-card
        title="عدد الزبائن"
        :value="statistics.total_customers"
        :icon="mdiAccountGroup"
        color="bg-purple-600"
      />

      <stat-card
        title="عدد الطلبات"
        :value="statistics.total_orders"
        :icon="OrderSvg as string"
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
        :icon="mdiHumanMaleFemaleChild"
        color="bg-orange-600"
      />

      <stat-card
        title="عدد الطلبات قيد الإنتظار"
        :value="statistics.total_order_pinding"
        :icon="mdiHumanMaleFemaleChild"
        color="bg-orange-600"
      />

      <stat-card
        title="عدد الطلبات الملفية"
        :value="statistics.total_order_canceled"
        :icon="mdiHumanMaleFemaleChild"
        color="bg-orange-600"
      />

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
        title="إجمالي المبيعات"
        :value="statistics.total_sales"
        :icon="mdiHospitalBuilding"
        color="bg-sky-600"
      />

      <stat-card
        title="إجمالي مبيعات اليوم"
        :value="statistics.sales_today"
        :icon="mdiHospitalBuilding"
        color="bg-sky-600"
      />

      <stat-card
        title="إجمالي مبيعات الأسبوع"
        :value="statistics.sales_all_week"
        :icon="mdiHospitalBuilding"
        color="bg-sky-600"
      />

      <stat-card
        title="إجمالي مبيعات الشهر"
        :value="statistics.sales_all_month"
        :icon="mdiHospitalBuilding"
        color="bg-sky-600"
      />

      <stat-card
        title="عدد القطع في المخزن"
        :value="statistics.items_stored"
        :icon="mdiPill"
        color="bg-indigo-600"
      />

      <stat-card
        title="قيمة المخزن"
        :value="statistics.total_store_value"
        :icon="mdiPill"
        color="bg-indigo-600"
      />

      <stat-card
        title="الأرباح"
        :value="statistics.profits"
        :icon="mdiPill"
        color="bg-indigo-600"
      />

      <stat-card
        title="الأرباح"
        :value="statistics.total_order_confirmed"
        :icon="mdiPill"
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
