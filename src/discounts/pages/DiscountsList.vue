<template>
  <h2 class="text-2xl font-semibold">
    التخفيضات
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
      :to="{ name: 'add-discount' }"
      color="primary"
      variant="elevated"
    >
      إضافة تخفيض
    </v-btn>
  </div>
 
  <LoadingSkeleton v-if="discounts.isPending.value" />

  <div v-if="discounts.data.value">
    <div
      class="shadow-lg rounded-lg mt-4 border border-gray-200"
    >
      <v-data-table-server
        sticky
        :items-per-page="listParams.limit"
        :page="listParams.page"
        :headers="headers"
        :items-length="discounts.data.value.length"
        :items="discounts.data.value"
        @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
      >
        <template #[`item.actions`]="{ item }">
          <div class="flex gap-2">
            <!-- <v-btn
              :append-icon="mdiTagEdit"
              color="grey-darken-2"
              size="small"
              variant="elevated"
              :to="{ name: 'edit-discount', params: { id: item.id } }"
            >
              تعديل 
            </v-btn> -->

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
                  :title="dialogQuestion(item.code)"
                  rounded="lg"
                  color="#EFE9F5"
                  style="padding-block: 1.75rem !important ;"
                >
                  <v-card-text>
                    سيتم حذف هذه التخفيض بشكل نهائي .
                  </v-card-text>
  
                  <v-card-actions>
                    <v-spacer />
  
                    <v-btn
                      text="لا"
                      @click="isActive.value = false"
                    />
                    <v-btn
                      text="نعم"
                      @click="isActive.value = false; onDeleteDiscount(item.id)"
                    />
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </template>
      </v-data-table-server>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  mdiPlus,
  mdiTagEdit
} from '@mdi/js'
import { ref } from "vue";
import { getDiscounts, deleteDiscount } from "../discounts-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import debounce from 'lodash.debounce'
import LoadingSkeleton from "@/core/components/LoadingSkeleton.vue"
import DeleteIcon from '@/core/components/icons/DeleteIcon.vue';

const searchValue = ref('');
const listParams = ref<PaginationParams>({
  page: 1,
  limit: 10,
})

const discounts = useQuery({
  queryKey: ['discounts', listParams],
  queryFn: () => getDiscounts(listParams.value)
}) 

const headers = [
  { title: 'الكود', value: 'code', width: '300px', sortable: false, },
  { title: 'نوع التخفيض', value: 'discount_type', width: '300px', sortable: false },
  { title: 'نسبة التخفيض', value: 'amount', width: '300px', sortable: false },
  { title: 'تاريخ بداية التخفيض', value: 'start_date', width: '300px', sortable: false },
  { title: 'تاريخ إنتهاء الصلاحية', value: 'end_date', width: '300px', sortable: false },
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
  // listParams.value.productName = searchValue.value
}, 300)

const queryClient = useQueryClient()
const deleteCouponMutation = useMutation({
  mutationFn: deleteDiscount,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['discounts'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const onDeleteDiscount = (id: number) => {
  deleteCouponMutation.mutate(id)
}

const dialogQuestion = (productCode: string) => {
  return `حذف التخفيض ${productCode}# ?`
}

</script>