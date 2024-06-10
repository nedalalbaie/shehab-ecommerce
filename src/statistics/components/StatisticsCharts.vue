<script setup lang="ts">
// import { useQuery } from "@tanstack/vue-query";
// import type { ChartConfiguration, ChartData } from "chart.js";
// import {
//     BarElement,
//     CategoryScale,
//     Chart as ChartJS,
//     Legend,
//     LinearScale,
//     Title,
//     Tooltip,
// } from "chart.js";
// import { computed } from "vue";
// import { Bar } from "vue-chartjs";

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
// ChartJS.defaults.font.family = "Cairo";

// const mostVisitedServiceCenters = useQuery({
//     queryKey: ["most-visited-service-centers"],
//     queryFn: getMostVisitedServiceCenters,
// });

// const formattedData = computed<ChartData<"bar", any[], unknown> | undefined>(() => {
//     if (mostVisitedServiceCenters.data.value) {
//         return {
//             labels: mostVisitedServiceCenters.data.value.map((d) => d.serviceCenterName),
//             datasets: [
//                 {
//                     data: mostVisitedServiceCenters.data.value.map((d) => d.numberOfVist),
//                 },
//             ],
//         };
//     }
//     return undefined;
// });

// const maxVisits = computed(() => {
//     let maxVisits = 0;
//     if (mostVisitedServiceCenters.data.value) {
//         maxVisits = Math.max(
//             ...mostVisitedServiceCenters.data.value.map((d) => d.numberOfVist)
//         );
//     }
//     return maxVisits;
// });

// const chartOptions = computed<ChartConfiguration<"bar">["options"]>(() => ({
//     responsive: true,
//     backgroundColor: "#4056F4",
//     plugins: {
//         tooltip: {
//             intersect: false,
//             bodyAlign: "center",
//         },
//         decimation: {
//             enabled: false,
//         },
//         legend: {
//             display: false,
//         },
//     },
//     scales: {
//         x: {
//             stacked: true,
//             type: "category",
//         },
//         y: {
//             stacked: true,
//             type: "linear",
//             suggestedMin: 0,
//             suggestedMax: maxVisits.value ? maxVisits.value * 1.2 : 100,
//         },
//     },
// }));
</script>

<template>
  <p />
  <!-- <div
    class="w-full p-4 overflow-x-auto overflow-y-hidden"
    dir="ltr"
  >
    <div
      v-if="mostVisitedServiceCenters.isLoading.value"
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
      v-else-if="formattedData"
      class="overflow-x-auto overflow-y-hidden w-full"
    >
      <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="formattedData"
      />
    </div>
  </div> -->
</template>

<style>.tick {
    font-weight: 600;
}</style>
