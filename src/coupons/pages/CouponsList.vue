<template>
  <div class="flex justify-between">
    <h2 class="text-2xl font-semibold">
      الكوبونات
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
        label="إبحث بكود الكوبون  "
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
      :to="{ name: 'add-coupon' }"
      color="primary"
      variant="elevated"
      rounded="xl"
      size="large"
    >
      إضافة كوبون
    </v-btn>
  </div>

  <div
    v-if="coupones.isPending.value"
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
    v-else-if="coupones.isError.value"
    type="error"
    class="my-6"
    title="خطأ في الوصول الى بيانات المحلات"
    text="الرجاء اعادة المحاولة مرة أخرى."
  />

  <div
    v-else-if="coupones.data.value"
    class="shadow-lg rounded-lg mt-4 border border-gray-200"
  >
    <v-data-table-server
      sticky
      :items-per-page="listParams.limit"
      :page="listParams.page"
      :headers="headers"
      :items-length="coupones.data.value.total"
      :items="coupones.data.value.data"
      :loading="coupones.isPending.value"
      @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
    >
      <template #[`item.expireDate`]="{ item }">
        {{ formatToDate(item.expire_date) }}
      </template>
      <template #[`item.actions`]="{ item }">
        <div class="flex gap-2">
          <v-btn
            :to="{ name: 'edit-coupon', params: { id: item.id } }"
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
        سيتم حذف هذه الكوبون بشكل نهائي .
      </v-card-text>
  
      <v-card-actions>
        <v-spacer />
  
        <v-btn
          text="لا"
          @click="deleteDialog.open = false"
        />
        <v-btn
          :loading="deleteCouponMutation.isPending.value"
          text="نعم"
          @click=" onDeleteCoupon()"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import {
  mdiArrowLeft,
  mdiDelete,
  mdiPencil,
  mdiPlus
} from '@mdi/js'
import { ref } from "vue";
import { getCoupons, deleteCoupon } from "../coupons-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import debounce from 'lodash.debounce'
import { formatToDate } from "@/core/helpers/format-date"
import { type Coupon } from '../models/coupon';

const search = ref('');
const listParams = ref({
  page: 1,
  limit: 10,
  coupon_code: ''
})

const deleteDialog = ref<{
  open: boolean,
  coupon: Coupon | null
}>({
 open: false,
 coupon: null
})

const coupones = useQuery({
  queryKey: ['coupones', listParams],
  queryFn: () => getCoupons(listParams.value),
})

const headers = [
  { title: 'الكود', value: 'coupon_code', width: '300px', sortable: false, },
  { title: 'الحد الأعلي', value: 'limit', width: '300px', sortable: false },
  { title: 'نسبة التخفيض', value: 'discount_percentage', width: '300px', sortable: false },
  { title: 'تاريخ إنتهاء الصلاحية', key: 'expireDate', value: 'expire_date', width: '300px', sortable: false },
  { title: 'الإجرائات', key: 'actions', width: '300px', sortable: false },
]

const onTableOptionsChange = ({ page, limit }: PaginationParams) => {
  listParams.value = {
    ...listParams.value,
    page: page ?? 1,
    limit: limit ?? 10
  }
}

const onInputClear = () => {
  listParams.value.coupon_code = ''
 }

 const handleSearch  = debounce(() => {
   listParams.value.coupon_code = search.value
}, 400)

const queryClient = useQueryClient()
const deleteCouponMutation = useMutation({
  mutationFn: deleteCoupon,
  onSuccess: () => {
    deleteDialog.value.open = false
    queryClient.invalidateQueries({ queryKey: ['coupones'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const openDeleteDialog = (coupon: Coupon) => {
  deleteDialog.value = {
    open: true,
    coupon: coupon
  }
}

const onDeleteCoupon = () => {
  deleteCouponMutation.mutate(deleteDialog.value.coupon!.id)
}

const dialogQuestion = () => {
  return `حذف الكوبون ${deleteDialog.value.coupon!.coupon_code} ؟`
}

</script>