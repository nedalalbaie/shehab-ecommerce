<template>
  <p class="mt-8 text-lg font-medium">
    المحلات التابعة للمنتج
  </p>
  <div
    v-if="markets.data.value"
    class="shadow-lg rounded-lg mt-4 border border-gray-200"
  >
    <v-data-table-server
      v-model="listParams"
      sticky
      :items-per-page="listParams.limit"
      :page="listParams.page"
      :headers="headers"
      :items-length="markets.data.value.total"
      :items="markets.data.value.data"
      :loading="markets.isPending.value"
    >
      <template #[`item.status`]="{ value }">
        <v-chip
          :color="getStatusColor(value)"
        >
          {{ getStatusLabel(value) }}
        </v-chip>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup lang="ts">
import { BASE_STATUS, type BaseStatus } from '@/core/models/base-status';
import { getMarkets } from '@/markets/markets-service';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

const listParams = ref({
  page: 1,
  limit: 10,
})

const markets = useQuery({
  queryKey: ['markets', listParams],
  queryFn: () => getMarkets(listParams.value)
})

const headers = [
  { title: 'إسم المحل', value: 'name', width: '300px', sortable: false },
  { title: 'إسم مالك المحل', value: 'owner_name', width: '300px', sortable: false },
  { title: 'رقم الهاتف', value: 'phone_number', width: '300px', sortable: false },
  { title: 'الحالة', key: 'status', value: 'active_market', width: '300px', sortable: false },
]

const getStatusColor = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'success' : 'error'
}

const getStatusLabel = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'مفعل' : 'غير مفعل'
}

</script>