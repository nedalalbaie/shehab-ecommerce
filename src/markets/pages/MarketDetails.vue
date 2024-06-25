<template>
  <div class="flex justify-end">
    <v-btn
      :to="{ name: 'markets-list' }"
      variant="outlined"
      color="primary"
      size="large"
      :append-icon="mdiArrowLeft"
    >
      الرجوع الى المحلات
    </v-btn>
  </div>
 
  <div
    v-if="isLoading"
    class="w-full h-96 flex items-center justify-center"
  >
    <v-progress-circular
      size="50"
      width="4"
      indeterminate
      color="primary"
    />
  </div>

  <!-- <div v-if="marketProducts.length === 0 && !isLoading ">
    <EmptyData @refetch="onRefetch" />
  </div> -->
  
  <div
    v-if="marketProducts"
    class="rounded-md p-6"
  >
    <h1 class="text-3xl">
      {{ marketProducts.market_info.name }}
    </h1>
    <div class="flex items-start gap-6">
      <div class="w-48 shadow-md rounded-md p-4 mt-6 text-center">
        <p class="font-medium mb-2">
          إسم مالك المحل
        </p>
        <p>{{ marketProducts.market_info.owner_name }}</p>
      </div>

      <div class="w-48 shadow-md rounded-md p-4 mt-6 text-center">
        <p class="font-medium mb-2">
          رقم الهاتف
        </p>
        <p>{{ marketProducts.market_info.phone_number }}</p>
      </div>

      <div class="w-48 shadow-md rounded-md p-4 mt-6 text-center">
        <p class="font-medium mb-2">
          الحالة
        </p>
        <v-chip :color="getStatusColor(marketProducts.market_info.active_market as BaseStatus)">
          {{ getStatusLabel(marketProducts.market_info.active_market as BaseStatus) }}
        </v-chip>
      </div>

      <div class="lg:w-1/2">
        <p class="text-xl my-6">
          مكان المحل في الخريطة
        </p>
        <iframe
          class="w- h-[25rem]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.3809451652833!2d39.19203125090872!3d21.531954875714302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3cfd4906639d9%3A0x3885f685a367999f!2z2YXYudmH2K8g2LPZgdix2KfYoSDYp9mE2LnZhNmFINmE2YTYqtiv2LHZitio!5e0!3m2!1sen!2sly!4v1677401828377!5m2!1sen!2sly"
          width="600"
          height="450"
          style="border:0;"
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>

    <div class="h-[1px] w-1/2 bg-gray-300 mx-auto my-8" />

    <div>
      <p class="text-2xl">
        المنتجات التابعة ل{{ marketProducts.market_info.name }}
      </p>

      <p
        v-if="!marketProducts.products"
        class="mt-6 text-center"
      >
        لا توجد منتجات مرتبطة بالمحل .
      </p>

      <div
        v-else-if="marketProducts.products"
        class="mt-6 flex-grow flex flex-col justify-center"
      >
        <div class="grid grid-cols-productsCards gap-x-6 gap-y-8">
          <div
            v-for="product in marketProducts.products"
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
              <p
                v-if="product.discount"
                class="absolute top-0 left-0 bg-red-600 rounded-br-xl text-white px-3"
              >
                {{ product.discount.discount_value }}
              </p>
              <p class="absolute bottom-0 right-0 bg-gray-600 rounded-tl-xl text-white px-3 py-2">
                {{ product.price }} دل
              </p>
            </div>
  
            <div class="mt-4 flex items-center border-b border-gray-700 pb-1">
              <p class="w-1/2">
                الكود
              </p>
              <p class="w-1/2 text-center">
                {{ product.product_code }}
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js'
import { useQuery } from '@tanstack/vue-query'
import {  getMarketProducts } from '../markets-service'
import { useRoute } from 'vue-router'
import { BASE_STATUS, type BaseStatus } from '@/core/models/base-status'
import EmptyData from "@/core/components/EmptyData.vue";
import { computed } from 'vue'

const route = useRoute()
const id = Number(route.params.id)

const isLoading = computed(() => isPending.value || isRefetching.value)

const {data: marketProducts, isPending, isRefetching } = useQuery({
  queryKey: ['market'],
  queryFn: () => getMarketProducts(id)
})

const getStatusColor = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'green-darken-4' : 'error'
}

const getStatusLabel = (status: BaseStatus) => {
  return status === BASE_STATUS.Activated ? 'مفعل' : 'غير مفعل'
}

const getBackgroundImage = (url: string) => {
  return {
    backgroundImage: `url(${url})`,
  }
}

const convertToObject = (hexCodesParam: string) => {
 return JSON.parse(hexCodesParam) as string[]
}

</script>
