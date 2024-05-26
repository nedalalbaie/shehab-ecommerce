<template>
  <h2 class="text-2xl font-semibold">
    العناوين
  </h2>
  <div class="flex justify-between mt-8">
    <div class="w-72">
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
  </div>

  <LoadingSkeleton v-if="addresses.isPending.value" />

  <div
    v-if="addresses.data.value"
    class="shadow-lg rounded-lg mt-4 border border-gray-200"
  >
    <v-data-table-server
      sticky
      :items-per-page="listParams.limit"
      :page="listParams.page"
      :headers="headers"
      :items-length="addresses.data.value.total"
      :items="addresses.data.value.data"
      :loading="addresses.isPending.value"
      @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getAddresses } from '../addresses-service'
import type { PaginationParams } from '@/core/models/pagination-params'
import { useQuery } from '@tanstack/vue-query'
import debounce from 'lodash.debounce'
import LoadingSkeleton from '@/core/components/LoadingSkeleton.vue'

const searchValue = ref('')
const listParams = ref<PaginationParams & { address_name: string }>({
  page: 1,
  limit: 10,
  address_name: ''
})

const addresses = useQuery({
  queryKey: ['addresses', listParams],
  queryFn: () => getAddresses(listParams.value)
})

const headers = [
  { title: 'العنوان', value: 'address_name', width: '300px', sortable: false },
  { title: 'المدينة', value: 'city', width: '300px', sortable: false },
  { title: 'الحي السكني', value: 'neighbourhood', width: '300px', sortable: false },
  { title: 'التفاصيل', value: 'description', width: '300px', sortable: false },
  { title: 'الإجرائات', key: 'actions', width: '300px', sortable: false }
]

const onTableOptionsChange = ({ page, limit }: PaginationParams) => {
  listParams.value = {
    ...listParams.value,
    page: page ?? 1,
    limit: limit ?? 10
  }
}

const handleSearch = debounce(() => {
  listParams.value.address_name = searchValue.value
}, 300)
</script>
