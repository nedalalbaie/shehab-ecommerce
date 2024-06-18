<template>
  <div class="min-h-[calc(100vh-80px)] flex flex-col">
    <h1 class="text-3xl font-medium">
      المنتجات
      <span
        v-if="products.data.value?.data.length! > 0"
        class="bg-gray-200 px-2 rounded-lg text-2xl"
      >{{ products.data.value?.data.length }} </span>
    </h1>
    <div
      class="flex justify-between mt-6"
    >
      <div class="flex gap-4">
        <v-text-field
          v-model="search"
          class="w-72"
          label="إبحث بإسم المنتج"
          bg-color="background"
          density="comfortable"
          variant="solo"
          clearable
          flat
          rounded
          @click:clear="onInputClear"
          @input="handleSearch"
        />

        <v-btn
          :append-icon="DiscountIcon"
          :to="{ name: 'discounts' }"
          color="primary"
          size="large"
          rounded="xl"
          variant="elevated"
        >
          التخفيضات
        </v-btn>

        <v-btn
          :append-icon="mdiTicketPercentOutline"
          :to="{ name: 'coupons' }"
          color="primary"
          size="large"
          rounded="xl"
          variant="elevated"
        >
          الكوبونات
        </v-btn>
      </div>
      <v-btn
        :append-icon="mdiPlus"
        :to="{ name: 'add-product' }"
        color="primary"
        size="large"
        rounded="xl"
        variant="elevated"
      >
        إضافة منتج
      </v-btn>
    </div>

    <div v-if="!products.data.value">
      <LoadingProducts />
    </div>

    <div
      v-if="products.data.value"
      class="mt-6 flex-grow flex flex-col justify-center"
    >
      <EmptyData v-if="products.data.value.data.length === 0" />
    
      <div class="grid grid-cols-productsCards gap-x-6 gap-y-8">
        <div
          v-for="(product, index) in products.data.value.data"
          :key="product.id"
          class="bg-white shadow-lg rounded-lg p-4"
        >
          <p class="text-xl text-center">
            {{ product.name }}
          </p>
          <div
            class="relative h-64 bg-cover bg-center mt-2"
            :style="getBackgroundImage(product.image1_path)"
          >
            <p class="absolute top-0 left-0 bg-red-600 rounded-br-xl text-white px-3">
              20%
            </p>
            <p class="absolute bottom-0 right-0 bg-gray-600 rounded-tl-xl text-white px-3 py-2">
              {{ product.price }} دل
            </p>
          </div>
  
          <div class="mt-4 flex items-center border-b border-gray-700 pb-1">
            <p class="w-1/2">
              الوصف
            </p>
            <p class="w-1/2 text-center">
              {{ product.description }}
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              طريقة البيع
            </p>
            <p class="w-1/2 text-center">
              {{ product.selling_method == 'package' ? 'بالحزمة' : 'بالقطعة الواحدة' }}
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              القيمة الأدني
            </p>
            <p class="w-1/2 text-center">
              {{ product.minimum_quantity }}
            </p>
          </div>
          <div class="mt-4 py-1 flex items-center border-b border-gray-700">
            <p class="w-1/5">
              {{ product.hex_codes.length > 1 ? 'الألوان' : 'اللون' }}
            </p>
            <div class="w-4/5 flex justify-end gap-1 flex-wrap">
              <div
                v-for="(color, colorIndex) in convertToObject(product.hex_codes)"
                :key="colorIndex"
                class="w-8 h-8 rounded-[50%]  border-2  flex items-end"
                :style="{ 'background-color': `${color}` }"
              />
            </div>
          </div>
          <!-- <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              الكمية
            </p>
            <p class="w-1/2 text-center">
              {{ product.inventory_level }}
            </p>
          </div> -->
          <div class="mt-4 py-1 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              الحالة
            </p>
            <p class="w-1/2 text-center">
              <v-chip
                size="large"
                :color="getStatusColor(product.active_product as BaseStatus)"
              >
                {{ getStatusLabel(product.active_product as BaseStatus) }}
              </v-chip>
            </p>
          </div>
          <div class="flex justify-center gap-1 mt-6 text-white">
            <!-- <v-btn
              rounded="xl"
              variant="elevated"
              color="primary"
              :to="{ name: 'edit-product', params: { id: product.id } }"
            >
              تعديل
              <template #prepend>
                <EditIcon />
              </template>
            </v-btn> -->
            <v-btn
              :to="{
                name: 'product-details',
                params: { id: product.id },
              }"
              variant="tonal"
              rounded="xl"
              :append-icon="mdiEye"
              color="primary"
            >
              عرض
            </v-btn>

            <v-btn
              v-if="product.active_product === BASE_STATUS.Activated"
              :loading="isStatusLoading[index]"
              variant="tonal"
              rounded="xl"
              color="error"
              :append-icon="mdiCancel"
              @click="onStatusChange(product.id, BASE_STATUS.Deactivated, index)"
            >
              الغاء التفعيل
            </v-btn>
            <v-btn
              v-if="product.active_product === BASE_STATUS.Deactivated"
              :loading="isStatusLoading[index]"
              variant="tonal"
              rounded="xl"
              :append-icon="mdiCheck"
              color="primary"
              @click="onStatusChange(product.id, BASE_STATUS.Activated, index)"
            >
              <!-- <v-icon :icon="mdiCheck" />
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                إعادة التفعيل
              </v-tooltip> -->
              إعادة التفعيل
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getProducts, changeStatus } from "../products-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import EmptyData from "@/core/components/EmptyData.vue";
import LoadingProducts from "../components/LoadingProducts.vue";
import {
  mdiPlus,
  mdiCancel,
  mdiCheck,
  mdiTicketPercentOutline,
  mdiEye
} from '@mdi/js'
import debounce from "lodash.debounce";
import { type BaseStatus } from "@/core/models/base-status";
import { BASE_STATUS } from "@/core/models/base-status";
import DiscountIcon from "@/core/components/icons/DiscountIcon.vue"

const isStatusLoading = ref<boolean []>([])
const search= ref('');
const listParams = ref<PaginationParams & {productName?: string}>({
  page: 1,
  limit: 10,
})

const products = useQuery({
  queryKey: ['products', listParams],
  queryFn: () => getProducts(listParams.value)
})

const storage = import.meta.env.VITE_API_Storage

const getBackgroundImage = (url: string) => {
  return {
    backgroundImage: `url(${storage}${url})`
  }
}

const convertToObject = (hexCodesParam: string) => {
 return JSON.parse(hexCodesParam) as string[]
}

const queryClient = useQueryClient()

const handleSearch  = debounce(() => {
    listParams.value.productName = search.value
}, 400)

const onInputClear = () => {
  listParams.value.productName = ''
 }

const onStatusChange = (productId: number, status: BaseStatus, index: number) => {
  isStatusLoading.value[index] = true

  changeStatus({id: productId, active_product: status})
   .then(() => queryClient.invalidateQueries({ queryKey: ['products'] }))
   .finally(() => isStatusLoading.value[index] = false)
}

const getStatusColor = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'success' : 'error'
}

const getStatusLabel = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'مفعل' : 'غير مفعل'
}

</script>