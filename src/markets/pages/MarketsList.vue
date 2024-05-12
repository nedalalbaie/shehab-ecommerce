<template>
  <h2 class="text-2xl font-semibold">
    المحلات
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
    <v-btn
      :append-icon="mdiPlus"
      :to="{ name: 'add-market' }"
      color="primary"
      variant="elevated"
      rounded="xl"
    >
      إضافة محل
    </v-btn>
  </div>

  <LoadingSkeleton v-if="markets.isPending.value" />

  <div
    v-if="markets.data.value"
    class="shadow-lg rounded-lg mt-4 border border-gray-200"
  >
    <v-data-table-server
      sticky
      :items-per-page="listParams.limit"
      :page="listParams.page"
      :headers="headers"
      :items-length="markets.data.value.total"
      :items="markets.data.value.data"
      :loading="markets.isPending.value"
      @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
    >
      <template #[`item.actions`]="{ item }">
        <div class="flex gap-2">
          <v-btn
            :append-icon="mdiTagEdit"
            color="grey-darken-2"
            size="small"
            variant="elevated"
            :to="{ name: 'edit-coupon', params: { id: item.id } }"
          >
            تعديل
          </v-btn>

          <v-dialog width="500">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                size="small"
                variant="elevated"
                color="#004C6B"
                type="submit"
              >
                حذف
                <template #prepend>
                  <DeleteIcon fill="fill-white" />
                </template>
              </v-btn>
            </template>
  
            <template #default="{ isActive }">
              <v-card
                :title="dialogQuestion(item.market_name)"
                rounded="lg"
                color="#EFE9F5"
                style="padding-block: 1.75rem !important ;"
              >
                <v-card-text>
                  سيتم حذف هذه الكوبون بشكل نهائي .
                </v-card-text>
  
                <v-card-actions>
                  <v-spacer />
  
                  <v-btn
                    text="لا"
                    @click="isActive.value = false"
                  />
                  <v-btn
                    text="نعم"
                    @click="isActive.value = false; onDeleteMarket(item.id)"
                  />
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>
<script setup lang="ts">
import {
  mdiPlus,
  mdiTagEdit
} from '@mdi/js'
import { ref } from "vue";
import { getMarkets, deleteMarket } from "../markets-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import debounce from 'lodash.debounce'
import LoadingSkeleton from "@/core/components/LoadingSkeleton.vue"
import DeleteIcon from '@/core/components/icons/DeleteIcon.vue';

const searchValue = ref('');
const listParams = ref<PaginationParams>({
  page: 1,
  limit: 10
})

const markets = useQuery({
  queryKey: ['markets', listParams],
  queryFn: () => getMarkets(listParams.value),
})

const headers = [
  { title: 'إسم المحل', value: 'market_name', width: '300px', sortable: false, },
  { title: 'إسم مالك المحل', value: 'owner_name', width: '300px', sortable: false },
  { title: 'رقم الهاتف', value: 'phone_number', width: '300px', sortable: false },
  { title: 'الإجرائات', key: 'actions', width: '300px', sortable: false },
]

const onTableOptionsChange = ({ page, limit }: PaginationParams) => {
  listParams.value = {
    ...listParams.value,
    page: page ?? 1,
    limit: limit ?? 10
  }
}

const handleSearch = debounce(() => {
  listParams.value.productName = searchValue.value
}, 300)

const queryClient = useQueryClient()
const deleteMarketMutation = useMutation({
  mutationFn: deleteMarket,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['markets'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const onDeleteMarket = (id: number) => {
  deleteMarketMutation.mutate(id)
}

const dialogQuestion = (productCode: string) => {
  return `حذف المحل ${productCode}# ?`
}

</script>