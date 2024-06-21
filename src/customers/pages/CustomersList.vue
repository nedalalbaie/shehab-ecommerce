<template>
  <div>
    <h1 class="text-3xl font-medium mt-6">
      الزبائن
      <span
        v-if="customers?.total"
        class="bg-gray-200 px-2 rounded-lg text-2xl"
      >{{ customers?.total }}</span>
    </h1>
    <div class="flex justify-between">
      <div class="w-72  mt-8">
        <v-text-field
          v-model="search"
          label="إبحث بإسم الزبون"
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
    </div>

    <div
      v-if="isPending"
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
      v-else-if="isError"
      type="error"
      class="my-6"
      title="خطأ في الوصول الى بيانات المحلات"
      text="الرجاء اعادة المحاولة مرة أخرى."
    />

    <div
      v-else-if="customers"
      class="mt-8"
    >
      <div class="flex gap-4">
        <v-btn
          :loading="isTrustStatusLoading"
          :prepend-icon="mdiCheck"
          color="green-darken-3"
          rounded="xl"
          :disabled="selected.length < 1"
          @click="onGroupTrustChange(BASE_STATUS.Activated)"
        >
          توثيق الحسابات
        </v-btn>

        <v-btn
          :loading="isUnTrustStatusLoading"
          :prepend-icon="CircleX"
          color="grey-darken-3"
          variant="elevated"
          rounded="xl"
          :disabled="selected.length < 1"
          @click="onGroupTrustChange(BASE_STATUS.Deactivated)"
        >
          إلفاء توثيق الحسابات
        </v-btn>
      </div>

      <div class="mt-4 border border-gray-200 shadow-lg rounded-lg">
        <v-data-table-server
          v-model="selected"
          sticky
          :items-per-page="listParams.limit"
          :page="listParams.page"
          :headers="headers"
          :items-length="customers.total"
          :items="customers.data"
          :loading="isPending"
          show-select
          item-value="id"
          @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
        >
          <template #[`item.actions`]="{item}">
            <v-btn
              :to="{
                name: 'view-customer',
                params: { customerId: item.id },
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
          </template>
  
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
              color="green-darken-3"
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
          <template #[`item.is_trusted`]="{ value }">
            <div class="flex gap-2">
              <v-chip
                :color="getStatusColor(value)"
              >
                {{ getTrustedStatusLabel(value) }}
              </v-chip>
  
              <!-- <v-btn
                  v-if="item.is_trusted === BASE_STATUS.Activated"
                  :loading="isTrustStatusLoading[index]"
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
                </v-btn> -->
              <!-- <v-btn
                  v-if="item.is_trusted === BASE_STATUS.Deactivated"
                  :loading="isTrustStatusLoading[index]"
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
                </v-btn> -->
            </div>
          </template>
        </v-data-table-server>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { changeStatus, getCustomers, changeTrustStatus } from "../customers-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import {
    mdiCheck,
    mdiCancel,
    mdiEye
  } from '@mdi/js'
import type { BaseStatus } from "@/core/models/base-status";
import {BASE_STATUS} from "@/core/models/base-status"
import debounce from "lodash.debounce";
import CircleX from "../components/icons/CircleX.vue";

const headers = [
  { title: 'إسم الزبون', value: 'name', width: '300px', sortable: false, },
  { title: 'الإيميل الإلكتروني', value: 'email', width: '300px', sortable: false },
  { title: 'رقم الهاتف', value: 'phone_number', width: '300px', sortable: false },
  { title: 'الإجرائات', key: 'actions', width: '300px', sortable: false },
  { title: 'الحالة', key: 'status', value: 'is_active', width: '300px', sortable: false },
  { title: 'هل المستخدم موثوق به', key: 'is_trusted', value: 'is_trusted', width: '300px', sortable: false },
]

const isStatusLoading = ref<boolean []>([])
const isTrustStatusLoading = ref(false)
const isUnTrustStatusLoading = ref(false)

const selected = ref<number[]>([]);
const search = ref('');
const listParams = ref({
  page: 1,
  limit: 10,
  name: ""
})

const queryClient = useQueryClient()

const { data: customers, isPending, isError} = useQuery({
  queryKey: ['customers', listParams],
  queryFn: () => getCustomers(listParams.value, listParams.value.name)
})

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

const onStatusChange = (customerId: number, status: BaseStatus, index: number) => {
  isStatusLoading.value[index] = true

  changeStatus({id: customerId, is_active: status})
   .then(() => queryClient.invalidateQueries({ queryKey: ['customers'] }))
   .finally(() => isStatusLoading.value[index] = false)
}

const onTrustStatusChange = (customerId: number, status: BaseStatus, index: number) => {
  if (status == BASE_STATUS.Activated) {
    isTrustStatusLoading.value = true
  } else {
    isUnTrustStatusLoading.value = true
  }

  changeTrustStatus({id: customerId, is_trusted: status})
   .then(() => {
    if (selected.value.length == index + 1) {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    }
   })
   .finally(() => {
     isTrustStatusLoading.value = false
     isUnTrustStatusLoading.value = false
   }
  )
}

const onGroupTrustChange = (status: BaseStatus) => {
  selected.value.forEach((customerId, index) => {
    onTrustStatusChange(customerId, status, index )
  })
}

const getStatusColor = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'green-darken-4' : 'error'
}

const getStatusLabel = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'مفعل' : 'غير مفعل'
}

const getTrustedStatusLabel = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'موثوق' : 'غير موثوق'
}

</script>