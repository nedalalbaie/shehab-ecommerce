<template>
  <div class="flex justify-between">
    <h2 class="text-2xl font-semibold">
      التخفيضات
    </h2>
    <v-btn
      :to="{ name: 'products' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى المتجات
    </v-btn>
  </div>

  <div class="flex justify-between mt-8">
    <div class="w-72">
      <v-text-field
        v-model="search"
        label="إبحث بقيمة التخفيض"
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
      :to="{ name: 'add-discount' }"
      color="primary"
      variant="elevated"
      rounded="xl"
      size="large"
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
        <template #[`item.discountType`]="{ item }">
          <p>
            {{ item.discount_type == 'fixed' ? 'قيمة ثابت' : 'نسبة مئوية' }}
          </p>
        </template>

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

            <v-btn
              variant="text"
              class="mx-1"
              density="comfortable"
              icon
              color="error"
              @click="openDeleteDialog(item)"
            >
              <v-icon :icon="mdiDelete" />
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                حذف
              </v-tooltip>
            </v-btn>
          </div>
        </template>
      </v-data-table-server>
    </div>
  </div>

  <v-dialog
    v-model="deleteDialog.open"
    width="500"
  >
    <v-card
      :title="dialogQuestion()"
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
          @click="deleteDialog.open = false"
        />
        <v-btn
          :loading="deleteDiscountMutation.isPending.value"
          text="نعم"
          @click=" onDeleteDiscount()"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import {
  mdiArrowLeft,
  mdiDelete,
  mdiPlus
} from '@mdi/js'
import { ref } from "vue";
import { getDiscounts, deleteDiscount } from "../discounts-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import debounce from 'lodash.debounce'
import LoadingSkeleton from "@/core/components/LoadingSkeleton.vue"
import type { Discount } from '../models/discount';

const deleteDialog = ref<{
  open: boolean,
  discount: Discount | null
}>({
 open: false,
 discount: null
})

const search = ref('');
const listParams = ref({
  page: 1,
  limit: 10,
  discount_value: ''
})

const discounts = useQuery({
  queryKey: ['discounts', listParams],
  queryFn: () => getDiscounts(listParams.value)
}) 

const headers = [
  { title: 'نوع التخفيض', value: 'discount_type', key:'discountType' , width: '300px', sortable: false },
  { title: 'قيمة التخفيض', value: 'discount_value', width: '300px', sortable: false },
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

const queryClient = useQueryClient()
const deleteDiscountMutation = useMutation({
  mutationFn: deleteDiscount,
  onSuccess: () => {
    deleteDialog.value.open = false
    queryClient.invalidateQueries({ queryKey: ['discounts'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const onDeleteDiscount = () => {
  deleteDiscountMutation.mutate(deleteDialog.value.discount!.id)
}

const dialogQuestion = () => {
  return `حذف التخفيض ${deleteDialog.value.discount!.discount_value} ؟`
}

const openDeleteDialog = (discount: Discount) => {
  deleteDialog.value = {
    open: true,
    discount: discount
  }
}

const handleSearch  = debounce(() => {
   listParams.value.discount_value = search.value
    
}, 400)
const onInputClear = () => {
  listParams.value.discount_value = ''
 }

</script>