<template>
  <h2 class="text-3xl font-medium">
    ربط المنتجات بمحل
    <span
      v-if="details.data.value?.total! > 0"
      class="bg-gray-200 px-2 rounded-lg text-2xl"
    > {{ details.data.value?.total }}</span>
  </h2>
  <div class="flex justify-end mt-8">
    <!-- <div class="w-72">
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
    </div> -->
    <!-- <div
      class="flex justify-between items-center bg-[#FCF2EA] border  rounded-xl py-1 px-4"
    >
      <input
        v-model="searchValue"
        placeholder="إبحث عن تفاصيل"
        type="text"
        class="w-56 border-none p-2 rounded-lg outline-none transition-all duration-100 placeholder:text-gray-700"
        @input="handleSearch"
      >
      <SearchIcon custom-style="w-6 h-6" />
    </div> -->
    <v-btn
      :append-icon="mdiPlus"
      :to="{ name: 'add-products-details' }"
      color="primary"
      variant="elevated"
      rounded="xl"
      size="large"
    >
      ربط منتج بمحل
    </v-btn>
  </div>

  <LoadingSkeleton v-if="details.isPending.value" />

  <div
    v-if="details.data.value"
    class="shadow-lg rounded-lg mt-6 border border-gray-200"
  >
    <v-data-table-server
      sticky
      :items-per-page="listParams.limit"
      :page="listParams.page"
      :headers="headers"
      :items-length="details.data.value.total"
      :items="details.data.value.data"
      :loading="details.isPending.value"
      @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
    >
      <template #[`item.status`]="{ value }">
        <v-chip
          :color="getStatusColor(value)"
        >
          {{ getStatusLabel(value) }}
        </v-chip>
      </template>

      <!-- <template #[`item.actions`]="{ item, index }">
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
            color="grey-darken-2"
          >
            <v-icon :icon="mdiTagEdit" />
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              تعديل
            </v-tooltip>
          </v-btn>

          <v-dialog width="500">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="mx-1"
                density="comfortable"
                icon
                color="error"
              >
                <v-icon :icon="mdiDelete" />
                <v-tooltip
                  activator="parent"
                  location="bottom"
                >
                  حذف
                </v-tooltip>
              </v-btn>
            </template>

            <template #default="{ isActive }">
              <v-card
                :title="dialogQuestion(item.name)"
                rounded="lg"
                color="#EFE9F5"
                style="padding-block: 1.75rem !important "
              >
                <v-card-text> سيتم حذف هذه المحل بشكل نهائي . </v-card-text>

                <v-card-actions>
                  <v-spacer />

                  <v-btn
                    text="لا"
                    @click="isActive.value = false"
                  />
                  <v-btn
                    text="نعم"
                    @click="
                      isActive.value = false;
                      onDeleteMarket(item.id)
                    "
                  />
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </template> -->
    </v-data-table-server>
  </div>
</template>
<script setup lang="ts">
import { mdiPlus } from '@mdi/js'
import { ref } from 'vue'
import type { PaginationParams } from '@/core/models/pagination-params'
import { useQuery } from '@tanstack/vue-query'
import debounce from 'lodash.debounce'
import LoadingSkeleton from '@/core/components/LoadingSkeleton.vue'
import { BASE_STATUS, type BaseStatus } from '@/core/models/base-status'
import { getProductDetails } from '../productDetails-service'

const searchValue = ref('')
const listParams = ref<PaginationParams & { search_value: string }>({
  page: 1,
  limit: 10,
  search_value: ''
})

const details = useQuery({
  queryKey: ['details', listParams],
  queryFn: () => getProductDetails(listParams.value)
})

const headers = [
  { title: 'رمز المنتج', value: 'product_info.product_code', width: '300px', sortable: false },
  { title: 'إسم المنتج', value: 'product_info.name', width: '300px', sortable: false },
  { title: 'سعر المنتج', value: 'product_info.price', width: '250px', sortable: false },
  { title: 'إسم المحل', value: 'market_info.name', width: '350px', sortable: false },
  { title: 'إسم مالك المحل', value: 'market_info.owner_name', width: '300px', sortable: false },
  { title: 'الكمية', value: 'inventory', width: '300px', sortable: false },
  { title: 'سعر البيع', value: 'saller_price', width: '300px', sortable: false },
  // { title: 'الإجرائات', key: 'actions', width: '300px', sortable: false }
]


// const onStatusChange = (marketId: number, status: BaseStatus, index: number) => {
//   isStatusLoading.value[index] = true
//   changeStatus({id: marketId, active_market: status})
//    .then(() => queryClient.invalidateQueries({ queryKey: ['details'] }))
//    .finally(() => isStatusLoading.value[index] = false)
// }

const getStatusColor = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'success' : 'error'
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

const handleSearch = debounce(() => {
  listParams.value.search_value = searchValue.value
}, 300)

// const deleteMarketMutation = useMutation({
//   mutationFn: deleteMarket,
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['details'] })
//   },
//   onError: (error) => {
//     console.log(error)
//   }
// })

// const onDeleteMarket = (id: number) => {
//   deleteMarketMutation.mutate(id)
// }

// const dialogQuestion = (productCode: string) => {
//   return `حذف المحل ${productCode}# ؟`
// }

</script>
