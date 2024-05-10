<template>
  <div>
    <h1 class="text-3xl mt-6">
      الزبائن
      <span v-if="customers.data.value?.total">( {{ customers.data.value?.total }} )</span>
    </h1>

    <div v-if="!customers.data.value?.data">
      <LoadingSkeleton v-if="customers.isPending.value" />
    </div>

    <div
      v-if="customers.data.value"
      class="mt-8"
    >
      <EmptyData v-if="customers.data.value.data.length === 0" />

      <div
        v-if="customers.data.value"
        class="shadow-lg rounded-lg mt-4 border border-gray-200"
      >
        <v-data-table-server
          sticky
          :items-per-page="listParams.limit"
          :page="listParams.page"
          :headers="headers"
          :items-length="customers.data.value.total"
          :items="customers.data.value.data"
          :loading="customers.isPending.value"
          @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
        >
          <template #[`item.actions`]="{ item }">
            <v-btn
              :append-icon="mdiTagEdit"
              color="grey-darken-2"
              size="small"
              variant="elevated"
              :to="{ name: 'edit-coupon', params: { id: item.id } }"
            >
              تعديل
            </v-btn>
          </template>
        </v-data-table-server>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { getCustomers } from "../customers-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { useQuery } from "@tanstack/vue-query";
import LoadingSkeleton from "@/core/components/LoadingSkeleton.vue";
import EmptyData from "@/core/components/EmptyData.vue";
import {
    mdiTagEdit
  } from '@mdi/js'

const headers = [
  { title: 'إسم الزبون', value: 'name', width: '300px', sortable: false, },
  { title: 'الإيميل الإلكتروني', value: 'email', width: '300px', sortable: false },
  { title: 'رقم الهاتف', value: 'phone_number', width: '300px', sortable: false }
]

const listParams = ref<PaginationParams>({
  page: 1,
  limit: 10,
  productName: undefined,
  category_id: undefined
})

const customers = useQuery({
  queryKey: ['ads', listParams],
  queryFn: () => getCustomers(listParams.value)
})

const onTableOptionsChange = ({ page, limit }: PaginationParams) => {
  listParams.value = {
    ...listParams.value,
    page: page ?? 1,
    limit: limit ?? 10 
  }
}

</script>