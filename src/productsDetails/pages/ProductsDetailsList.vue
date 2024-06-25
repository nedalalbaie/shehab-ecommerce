<template>
  <h2 class="text-3xl font-medium">
    ربط المنتجات بمحل
    <span
      v-if="details?.total! > 0"
      class="bg-gray-200 px-2 rounded-lg text-2xl"
    > {{ details?.total }}</span>
  </h2>
  <div class="flex justify-end mt-8">
    <v-btn
      :append-icon="mdiPlus"
      :to="{ name: 'add-products-details' }"
      color="primary"
      variant="elevated"
      rounded="xl"
      size="large"
    >
      ربط المنتج بالمحل
    </v-btn>
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
    title="خطأ في الوصول الى تفاصيل المنتجات"
    text="الرجاء اعادة المحاولة مرة أخرى."
  />

  <div
    v-else-if="details"
    class="shadow-lg rounded-lg mt-6 border border-gray-200"
  >
    <v-data-table-server
      sticky
      :items-per-page="listParams.limit"
      :page="listParams.page"
      :headers="headers"
      :items-length="details.total"
      :items="details.data"
      :loading="isPending"
      @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
    >
      <template #[`item.image`]="{ item }">
        <div class="border-2 border-gray-200 my-2 rounded-lg">
          <img
            class="rounded-lg  h-20 w-full object-cover object-center shadow-md "
            :src="item.product_info.image1_path"
            alt="uploaded image"
          >
        </div>
      </template>

      <template #[`item.actions`]="{ item }">
        <div class="flex gap-1">
          <v-btn
            :to="{ name: 'edit-product-details', params: { id: item.id}}"
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
import { mdiPencil, mdiPlus } from '@mdi/js'
import { ref } from 'vue'
import type { PaginationParams } from '@/core/models/pagination-params'
import { useQuery } from '@tanstack/vue-query'
import { getProductDetails } from '../productDetails-service'

const listParams = ref<PaginationParams & { search_value: string }>({
  page: 1,
  limit: 10,
  search_value: ''
})

const { data:details , isPending, isError} = useQuery({
  queryKey: ['details', listParams],
  queryFn: () => getProductDetails(listParams.value)
})

const headers = [
  { title: 'صورة المنتج', key:'image', width: '230px', sortable: false },
  { title: 'رمز المنتج', value: 'product_info.product_code', width: '300px', sortable: false },
  { title: 'إسم المنتج', value: 'product_info.name', width: '300px', sortable: false },
  { title: 'سعر الشراء', value: 'saller_price', width: '300px', sortable: false },
  { title: 'إسم المحل', value: 'market_info.name', width: '350px', sortable: false },
  { title: 'إسم مالك المحل', value: 'market_info.owner_name', width: '300px', sortable: false },
  { title: 'الكمية', value: 'inventory', width: '300px', sortable: false },
  { title: 'سعر البيع', value: 'product_info.price', width: '250px', sortable: false },
  { title: '', key: 'actions', width: '250px', sortable: false },
]

const onTableOptionsChange = ({ page, limit }: PaginationParams) => {
  listParams.value = {
    ...listParams.value,
    page: page ?? 1,
    limit: limit ?? 10
  }
}


</script>
