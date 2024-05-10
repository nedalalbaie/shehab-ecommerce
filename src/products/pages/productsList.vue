<template>
  <div class="min-h-[calc(100vh-80px)] flex flex-col">
    <h1 class="text-3xl">
      المنتجات
      <span v-if="products.data.value?.data.length! > 0">( {{ products.data.value?.data.length }} )</span>
    </h1>
    <div
      ref="upperElement"
      class="flex items-center mt-6"
      :class="products.data.value?.data.length === 0 ? 'justify-end' : 'justify-between'"
    >
      <div
        v-if="products.data.value?.data.length !== 0"
        class="flex justify-between items-center bg-[#FCF2EA] rounded-xl py-1 px-4"
      >
        <input
          placeholder="إبحث عن منتجات"
          type="text"
          class="w-56 border-none p-2 rounded-lg outline-none transition-all duration-100 placeholder:text-gray-700"
        >
        <SearchIcon custom-style="w-6 h-6" />
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
    
      <div class="grid grid-cols-productsCards gap-x-4 gap-y-8">
        <div
          v-for="product in products.data.value.data"
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
              التصنيف
            </p>
            <p class="w-1/2 text-center">
              سرير
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              الجنس
            </p>
            <p class="w-1/2 text-center">
              --
            </p>
          </div>
          <div class="mt-4 py-1 flex items-center border-b border-gray-700">
            <p class="w-1/5">
              {{ convertToObject(product.hex_codes).length > 1 ? 'الألوان' : 'اللون' }}
            </p>
            <div class="w-4/5 flex justify-end gap-1">
              <div
                v-for="(color, index) in convertToObject(product.hex_codes)"
                :key="index"
                class="w-8 h-8 rounded-[50%] shadow-full-white border-2  flex items-end"
                :style="{ 'background-color': color }"
              />
            </div>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              الكمية
            </p>
            <p class="w-1/2 text-center">
              {{ product.inventory_level }}
            </p>
          </div>
          <div class="mt-4 flex items-center border-b border-gray-700">
            <p class="w-1/2">
              الحجم
            </p>
            <p class="w-1/2 text-center">
              90*110 سم
            </p>
          </div>
          <div class="flex justify-center gap-4 mt-6 text-white">
            <v-btn
              rounded="xl"
              variant="elevated"
              color="primary"
              :to="{ name: 'edit-product', params: { id: product.id } }"
            >
              تعديل
              <template #prepend>
                <EditIcon />
              </template>
            </v-btn>
  
            <v-dialog width="500">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  rounded="xl"
                  variant="elevated"
                  color="#004C6B"
                  type="submit"
                >
                  إلغاء
                  <template #prepend>
                    <DeleteIcon fill="fill-white" />
                  </template>
                </v-btn>
              </template>
  
              <template #default="{ isActive }">
                <v-card
                  :title="dialogQuestion(product.product_code)"
                  rounded="lg"
                  color="#EFE9F5"
                  style="padding-block: 1.75rem !important ;"
                >
                  <v-card-text>
                    سيتم حذف هذه المنتج بشكل نهائي .
                  </v-card-text>
  
                  <v-card-actions>
                    <v-spacer />
  
                    <v-btn
                      text="لا"
                      @click="isActive.value = false"
                    />
                    <v-btn
                      text="نعم"
                      @click="isActive.value = false; onDeleteProduct(product.id)"
                    />
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { getProducts, deleteProduct } from "../products-service"
import type { PaginationParams } from '@/core/models/pagination-params'
import SearchIcon from "@/core/components/icons/SearchIcon.vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import EditIcon from "@/core/components/icons/EditIcon.vue";
import DeleteIcon from "@/core/components/icons/DeleteIcon.vue";
import EmptyData from "@/core/components/EmptyData.vue";
import LoadingProducts from "../components/LoadingProducts.vue";
import {
  mdiPlus
} from '@mdi/js'

const listParams = ref<PaginationParams>({
  page: 1,
  limit: 10,
  productName: undefined,
  category_id: undefined
})

const products = useQuery({
  queryKey: ['products', listParams],
  queryFn: () => getProducts(listParams.value)
})

const storage = import.meta.env.VITE_API_Storage
const upperElement = ref<HTMLElement | null>(null)

const getBackgroundImage = (url: string) => {
  return {
    backgroundImage: `url(${storage}/${url})`,
    // backgroundSize: '60%' 
  }
}

const convertToObject = (hexCodesParam: string) => {
  return JSON.parse(hexCodesParam) as string[]
}

const queryClient = useQueryClient()
const deleteProductMutation = useMutation({
  mutationFn: deleteProduct,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const onDeleteProduct = (id: number) => {
  deleteProductMutation.mutate(id)
}

const dialogQuestion = (productCode: string) => {
  return `حذف المنتج ${productCode}# ?`
}

watchEffect(() => {
  
})

</script>