<template>
  <div>
    <h1 class="text-3xl">
      التصنيفات الفرعية
      <span v-if="subCategories.data.value?.length! > 0">( {{ subCategories.data.value?.length }} )</span>
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
        :to="{ name: 'add-subCategories' }"
        color="primary"
        size="large"
        rounded="xl"
        variant="elevated"
      >
        إضافة تصنيف 
      </v-btn>
    </div>

    <div v-if="!subCategories.data.value">
      <LoadingSubCategories />
    </div>

    <div
      v-if="subCategories.data.value"
      class="mt-8"
    >
      <EmptyData v-if="subCategories.data.value.length === 0" />
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="category in subCategories.data.value"
          :key="category.id"
          class="bg-white rounded-lg px-6 py-3 shadow-md flex flex-col justify-between"
        >
          <div class="flex items-center gap-4">
            <img
              class="w-40 rounded-lg my-2 border border-gray-200"
              :src="`${storage}${category.image_path}`"
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
              :to="{ name: 'edit-subCategories', params: { id: category.id } }"
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
import { getSubCategories } from "../subCategories-service";
import LoadingSubCategories from "../components/LoadingSubCategories.vue"
import EmptyData from "@/core/components/EmptyData.vue";

const storage = import.meta.env.VITE_API_Storage

const listParams = ref<PaginationParams>({
  page: 1,
  limit: 10,
  productName: undefined,
  category_id: undefined 
})

const subCategories = useQuery({
  queryKey: ['subCategories', listParams],
  queryFn: () => getSubCategories(listParams.value)
})

</script>