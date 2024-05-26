<template>
  <div class="min-h-[calc(100vh-80px)] flex flex-col">
    <h1 class="text-3xl font-medium">
      التصنيفات الأساسية
      <span
        v-if="mainCategories.data.value?.data.length! > 0"
        class="bg-gray-200 px-1 rounded-lg text-2xl"
      >{{ mainCategories.data.value?.data.length }}</span>
    </h1>
    <div class="md:flex items-center justify-between mt-6">
      <div class="flex justify-between items-center bg-[#ebf2fc] rounded-xl py-1 px-4 mb-4 md:mb-0">
        <input
          v-model="searchValue"
          placeholder="إبحث عن تصنيفات"
          type="text"
          class="w-56 border-none p-2 rounded-lg outline-none transition-all duration-100 placeholder:text-gray-700"
          @input="handleSearch"
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
      <EmptyData v-if="mainCategories.data.value.data.length === 0" />
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div
          v-for="category in mainCategories.data.value.data"
          :key="category.id"
          class="bg-white rounded-lg px-6 py-3 shadow-md"
        >
          <div class="flex items-center gap-8">
            <img
              class="w-32 h-32 bg-cover rounded-lg my-2 border border-gray-200"
              :src="`${storage}${category.image_path}`"
              alt=""
            >
            <div>
              <p class="text-xl">
                {{ category.name }}
              </p>
              <p>{{ category.description }}</p>
            </div>
          </div>
          <!-- <div class="flex flex-col md:flex-row justify-end gap-4 mt-4">
            <v-btn
              :to="{ name: 'edit-mainCategory', params: { id: category.id } }"
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
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchIcon from '@/core/components/icons/SearchIcon.vue'
import type { PaginationParams } from '@/core/models/pagination-params'
import { mdiPlus } from '@mdi/js'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import { getMainCategories } from '../mainCategories-service'
import EmptyData from '@/core/components/EmptyData.vue'
import LoadingCategories from '@/categories/components/LoadingCategories.vue'
import debounce from 'lodash.debounce'

const storage = import.meta.env.VITE_API_Storage

const searchValue = ref('')
const listParams = ref<PaginationParams & { search_value: string }>({
  page: 1,
  limit: 10,
  search_value: ''
})

const mainCategories = useQuery({
  queryKey: ['main-categories', listParams],
  queryFn: () => getMainCategories(listParams.value, searchValue.value)
})


const handleSearch = debounce(() => {
  // if (searchValue.value.trim() === '') {
  //   return
  // } else if (searchValue.value.trim().length !== searchValue.value.length) {
  //   listParams.value.filter = searchValue.value
  // }
  listParams.value.search_value = searchValue.value
}, 300)

// watch( searchValue, () => {
//   if (searchValue.value == null) {
//     handleSearch()
//   }
//   // handleSearch()
// })
</script>
