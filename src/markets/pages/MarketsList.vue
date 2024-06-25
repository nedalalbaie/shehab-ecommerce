<template>
  <h2 class="text-3xl font-medium">
    المحلات
    <span
      v-if="markets.data.value?.data.length! > 0"
      class="bg-gray-200 px-2 rounded-lg text-2xl"
    > {{ markets.data.value?.total }}</span>
  </h2>
  <div class="flex justify-between mt-8">
    <div class="w-72">
      <v-text-field
        v-model="search"
        label="إبحث بإسم المحل "
        bg-color="background"
        clearable
        variant="solo"
        flat
        density="comfortable"
        rounded
        @click:clear="onInputClear"
        @input="handleSearch"
      />
    </div>
    <v-btn
      :append-icon="mdiPlus"
      :to="{ name: 'add-market' }"
      color="primary"
      variant="elevated"
      rounded="xl"
      size="large"
    >
      إضافة محل
    </v-btn>
  </div>

  <div
    v-if="markets.isPending.value"
    class="w-full h-96 flex items-center justify-center"
  >
    <v-progress-circular
      size="50"
      width="4"
      indeterminate
      color="primary"
    />
  </div>

  <v-alert
    v-else-if="markets.isError.value"
    type="error"
    class="my-6"
    title="خطأ في الوصول الى بيانات المحلات"
    text="الرجاء اعادة المحاولة مرة أخرى."
  />

  <div
    v-else-if="markets.data.value"
    class="shadow-lg rounded-lg mt-4 border border-gray-200"
  >
    <v-data-table-server
      sticky
      :items-per-page="listParams.limit"
      :page="listParams.page"
      :headers="headers"
      :items-length="markets.data.value.total"
      :items="markets.data.value.data"
      @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
    >
      <template #[`item.status`]="{ value }">
        <v-chip
          :color="getStatusColor(value)"
        >
          {{ getStatusLabel(value) }}
        </v-chip>
      </template>

      <template #[`item.actions`]="{ item, index }">
        <div class="flex gap-1">
          <v-btn
            v-if="item.active_market === BASE_STATUS.Activated"
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
            v-if="item.active_market === BASE_STATUS.Deactivated"
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

          <v-btn
            :to="{
              name: 'market-details',
              params: { id: item.id },
            }"
            variant="tonal"
            class="mx-1"
            density="comfortable"
            icon
            color="primary"
          >
            <v-icon :icon="mdiEye" />
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              عرض
            </v-tooltip>
          </v-btn>

          <v-btn
            :to="{ name: 'edit-market', params: { id: item.id } }"
            variant="tonal"
            class="mx-1"
            density="comfortable"
            icon
            color="primary"
          >
            <v-icon :icon="mdiPencil" />
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              تعديل
            </v-tooltip>
          </v-btn>
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>
<script setup lang="ts">
import { mdiPlus, mdiCancel, mdiCheck, mdiEye, mdiPencil } from '@mdi/js'
import { ref } from 'vue'
import { getMarkets, changeStatus } from '../markets-service'
import type { PaginationParams } from '@/core/models/pagination-params'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import debounce from 'lodash.debounce'
import { BASE_STATUS, type BaseStatus } from '@/core/models/base-status'

const isStatusLoading = ref<boolean []>([])
const search = ref('')
const listParams = ref({
  page: 1,
  limit: 10,
  name: ''
})

const markets = useQuery({
  queryKey: ['markets', listParams],
  queryFn: () => getMarkets(listParams.value, listParams.value.name)
})

const headers = [
  { title: 'إسم المحل', value: 'name', width: '300px', sortable: false },
  { title: 'إسم مالك المحل', value: 'owner_name', width: '300px', sortable: false },
  { title: 'رقم الهاتف', value: 'phone_number', width: '300px', sortable: false },
  { title: 'الحالة', key: 'status', value: 'active_market', width: '300px', sortable: false },
  { title: 'الإجرائات', key: 'actions', width: '300px', sortable: false }
]

const queryClient = useQueryClient()

const onStatusChange = (marketId: number, status: BaseStatus, index: number) => {
  isStatusLoading.value[index] = true
  changeStatus({id: marketId, active_market: status})
   .then(() => queryClient.invalidateQueries({ queryKey: ['markets'] }))
   .finally(() => isStatusLoading.value[index] = false)
}

const getStatusColor = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'green-darken-4' : 'error'
}

const getStatusLabel = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'مفعل' : 'غير مفعل'
}


const onTableOptionsChange = ({ page, limit }: PaginationParams) => {
  listParams.value = {
    ...listParams.value,
    page: page ?? 1,
    limit: limit ?? 10
  }
}

const onInputClear = () => {
  listParams.value.name = ''
 }

 const handleSearch  = debounce(() => {
   listParams.value.name = search.value
}, 400)

</script>
