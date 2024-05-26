<template>
  <div>
    <h1 class="text-3xl font-medium mt-6">
      الزبائن
      <span
        v-if="customers.data.value?.total"
        class="bg-gray-200 px-2 rounded-lg text-2xl"
      >{{ customers.data.value?.total }}</span>
    </h1>
    <div class="flex justify-between">
      <div class="w-72  mt-8">
        <v-text-field
          v-model="searchValue"
          label="البحث"
          variant="outlined"
          color="primary"
          clearable
          placeholder="البحث"
          density="compact"
          @input="handleSearch"
        />
      </div>
    
      <v-btn
        append-icon=""
        color="primary"
        size="large"
        rounded="xl"
        variant="elevated"
      >
        إضافة منتج
      </v-btn>
    </div>

    <div v-if="!customers.data.value?.data">
      <LoadingSkeleton v-if="customers.isPending.value" />
    </div>

    <div
      v-if="customers.data.value"
      class="mt-8"
    >
      <EmptyData v-if="customers.data.value.data.length === 0" />

      <!-- :item-selectable="(item) => item.name == 'client2'" -->
      <div
        v-if="customers.data.value"
        class="shadow-lg rounded-lg mt-4 border border-gray-200"
      >
        <v-data-table-server
          v-model="selected"
          sticky
          :items-per-page="listParams.limit"
          :page="listParams.page"
          :headers="headers"
          :items-length="customers.data.value.total"
          :items="customers.data.value.data"
          :loading="customers.isPending.value"
          show-select
          item-value="id"
          @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
        >
          <template #[`item.status`]="{ value, item, index }">
            <v-chip
              :color="getStatusColor(value)"
            >
              {{ getStatusLabel(value) }}
            </v-chip>
            <v-btn
              v-if="item.is_active === BASE_STATUS.Activated"
              :loading="isStatusLoading[index]"
              variant="tonal"
              class="mx-1"
              density="comfortable"
              icon
              color="warning"
              @click="onStatusChange(item.id, BASE_STATUS.Deactivated, index)"
            >
              <v-icon :icon="mdiCancel" />
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                الغاء التفعيل
              </v-tooltip>
            </v-btn>
            <v-btn
              v-if="item.is_active === BASE_STATUS.Deactivated"
              :loading="isStatusLoading[index]"
              variant="tonal"
              class="mx-1"
              density="comfortable"
              icon
              color="success"
              @click="onStatusChange(item.id, BASE_STATUS.Activated, index)"
            >
              <v-icon :icon="mdiCheck" />
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                إعادة التفعيل
              </v-tooltip>
            </v-btn>
          </template>
          <template #[`item.is_trusted`]="{ item, index, value }">
            <div class="flex gap-2">
              <v-chip
                :color="getStatusColor(value)"
              >
                {{ getTrustedStatusLabel(value) }}
              </v-chip>

              <v-btn
                v-if="item.is_trusted === BASE_STATUS.Activated"
                :loading="isStatusLoading[index]"
                variant="tonal"
                class="mx-1"
                density="comfortable"
                icon
                color="warning"
                @click="onTrustStatusChange(item.id, BASE_STATUS.Deactivated, index)"
              >
                <v-icon :icon="mdiCancel" />
                <v-tooltip
                  activator="parent"
                  location="bottom"
                >
                  الغاء الثقة بالمستخدم
                </v-tooltip>
              </v-btn>
              <v-btn
                v-if="item.is_trusted === BASE_STATUS.Deactivated"
                :loading="isStatusLoading[index]"
                variant="tonal"
                class="mx-1"
                density="comfortable"
                icon
                color="success"
                @click="onTrustStatusChange(item.id, BASE_STATUS.Activated, index)"
              >
                <v-icon :icon="mdiCheck" />
                <v-tooltip
                  activator="parent"
                  location="bottom"
                >
                  تحويل إلي  مستخدم موثوق
                </v-tooltip>
              </v-btn>
            </div>
          </template>
        </v-data-table-server>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { changeStatus, getCustomers, changeTrustStatus } from "../customers-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import LoadingSkeleton from "@/core/components/LoadingSkeleton.vue";
import EmptyData from "@/core/components/EmptyData.vue";
import {
    mdiCheck,
    mdiCancel,
  } from '@mdi/js'
import type { BaseStatus } from "@/core/models/base-status";
import {BASE_STATUS} from "@/core/models/base-status"
import debounce from "lodash.debounce";

const headers = [
  { title: 'إسم الزبون', value: 'name', width: '300px', sortable: false, },
  { title: 'الإيميل الإلكتروني', value: 'email', width: '300px', sortable: false },
  { title: 'رقم الهاتف', value: 'phone_number', width: '300px', sortable: false },
  { title: 'الحالة', key: 'status', value: 'is_active', width: '300px', sortable: false },
  { title: 'هل المستخدم موثوق به', key: 'is_trusted', value: 'is_trusted', width: '300px', sortable: false }
]

const isStatusLoading = ref<boolean []>([])
  const selected = ref<string[]>([]);
const searchValue = ref('');
const listParams = ref<PaginationParams  & { search_value: string }>({
  page: 1,
  limit: 10,
  search_value: ""
})

const queryClient = useQueryClient()

const customers = useQuery({
  queryKey: ['customers', listParams],
  queryFn: () => getCustomers(listParams.value, searchValue.value)
})

const onTableOptionsChange = ({ page, limit }: PaginationParams) => {
  listParams.value = {
    ...listParams.value,
    page: page ?? 1,
    limit: limit ?? 10 
  }
}

const handleSearch = debounce(() => {
  listParams.value.search_value = searchValue.value
}, 300)

const onStatusChange = (customerId: number, status: BaseStatus, index: number) => {
  isStatusLoading.value[index] = true

  changeStatus({id: customerId, is_active: status})
   .then(() => queryClient.invalidateQueries({ queryKey: ['customers'] }))
   .finally(() => isStatusLoading.value[index] = false)
}

const onTrustStatusChange = (customerId: number, status: BaseStatus, index: number) => {
  isStatusLoading.value[index] = true

  changeTrustStatus({id: customerId, is_trusted: status})
   .then(() => queryClient.invalidateQueries({ queryKey: ['customers'] }))
   .finally(() => isStatusLoading.value[index] = false)
}

const getStatusColor = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'success' : 'error'
}

const getStatusLabel = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'مفعل' : 'غير مفعل'
}

const getTrustedStatusLabel = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'موثوق' : 'غير موثوق'
}



watchEffect(() => {
  console.log(selected.value);
  
})

</script>