<template>
  <div class="min-h-[calc(100vh-80px)] flex flex-col">
    <h1 class="text-3xl">
      التصنيفات الأساسية
      <span v-if="mainCategories.data.value?.length! > 0">( {{ mainCategories.data.value?.length }} )</span>
    </h1>
    <div class="md:flex items-center justify-between mt-6">
      <div class="flex justify-between items-center bg-[#FCF2EA] rounded-xl py-1 px-4 mb-4 md:mb-0">
        <input
          placeholder="إبحث عن تصنيفات"
          type="text"
          class="w-56 border-none p-2 rounded-lg outline-none transition-all duration-100 placeholder:text-gray-700"
        >
        <SearchIcon custom-style="w-6 h-6" />
      </div>
      <v-btn
        :append-icon="mdiPlus"
        :to="{ name: 'add-main-category' }"
        color="primary"
        size="large"
        rounded="xl"
        variant="elevated"
      >
        إضافة تصنيف
      </v-btn>
    </div>
  
    <div v-if="!mainCategories.data.value">
      <LoadingCategories />
    </div>
  
    <div
      v-if="mainCategories.data.value"
      class="mt-8"
    >
      <EmptyData v-if="mainCategories.data.value.length === 0" />
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div
          v-for="category in mainCategories.data.value"
          :key="category.id"
          class="bg-white rounded-lg px-6 py-3 shadow-md"
        >
          <div class="flex items-center gap-4">
            <img
              class="w-32 h-32 bg-cover rounded-lg my-2 border border-gray-200"
              :src="`${storage}/${category.image_path}`"
              alt=""
            >
            <p class="text-xl">
              {{ category.name }} - {{ category.description }}
            </p>
          </div>
          <div class="flex flex-col md:flex-row justify-end gap-4 mt-4">
            <v-btn
              :append-icon="mdiPlus"
              color="primary"
              rounded="xl"
              variant="elevated"
              :to="{ name: 'edit-category', params: { id: category.id } }"
            >
              تعديل
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchIcon from "@/core/components/icons/SearchIcon.vue";
import type { PaginationParams } from "@/core/models/pagination-params";
import {
    mdiPlus
} from '@mdi/js'
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { getMainCategories } from "../mainCategories-service";
import EmptyData from "@/core/components/EmptyData.vue";
import LoadingCategories from "@/categories/components/LoadingCategories.vue";

const storage = import.meta.env.VITE_API_Storage

const listParams = ref<PaginationParams>({
page: 1,
limit: 10,
productName: undefined,
category_id: undefined
})

const mainCategories = useQuery({
queryKey: ['main-categories', listParams],
queryFn: () => getMainCategories(listParams.value)
})


</script>