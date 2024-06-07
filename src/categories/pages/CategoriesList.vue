<template>
  <CreateCategoryDialog
    v-if="categoryFormDialog.open"
    v-model="categoryFormDialog.open"
    :main-category="categoryFormDialog.mainCategory"
  />

  <CreateSubCategoryDialog
    v-if="subCategoryFormDialog.open"
    v-model="subCategoryFormDialog.open"
    :category="subCategoryFormDialog.category"
  />

  <div class="min-h-[calc(100vh-80px)] flex flex-col">
    <h1 class="text-3xl font-medium">
      التصنيفات
      <span
        v-if="mainCategories && mainCategories.data.length > 0"
        class="bg-gray-200 px-2 rounded-lg text-2xl"
      >{{ mainCategories.data.length }}</span>
    </h1>

    <div class="md:flex items-center justify-between mt-6 mb-4">
      <div class="flex justify-between items-center bg-[#ebf2fc] rounded-xl py-1 px-4 mb-4 md:mb-0">
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
        إضافة تصنيف أساسي
      </v-btn>
    </div>

    <div
      v-if="isPending"
      class="w-full h-96 flex items-center justify-center"
    >
      <v-progress-circular
        size="50"
        width="4"
        indeterminate
        color="primary"
      />
    </div>

    <div v-if="categoriesArray">
      <EmptyData v-if="categoriesArray.length === 0" />

      <CategoriesCards
        v-else
        :categories-array="categoriesArray"
        @open-category="onOpenCategoryDialog"
        @open-sub-category="onOpenSubCategoryDialog"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchIcon from '@/core/components/icons/SearchIcon.vue'
import type { PaginationParams } from '@/core/models/pagination-params'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { deleteCategory, getCategories } from '../services/categories-service'
import EmptyData from '@/core/components/EmptyData.vue'
import {  mdiPlus } from '@mdi/js'
import { computed, ref, watchEffect } from 'vue'
import { getMainCategories } from '../services/mainCategories-service'
import { getSubCategories } from '../services/subCategories-service'
import type { CategoryArray } from '../models/categoriesArray'
import CategoriesCards from '../components/CategoriesCards.vue'
import CreateCategoryDialog from '../components/CreateCategoryDialog.vue'
import type { MainCategory } from '../models/mainCategory'
import CreateSubCategoryDialog from '../components/CreateSubCategoryDialog.vue'
import type { Category } from '../models/Category'

const categoriesArray = ref<CategoryArray []>()
const isPending = computed(() => !categoriesArray.value)

const categoryFormDialog = ref<{
  open: boolean;
  mainCategory: MainCategory | null ;
}>({
  open: false,
  mainCategory: null,
});

const subCategoryFormDialog = ref<{
  open: boolean;
  category: Category | null ;
}>({
  open: false,
  category: null,
});

const listParams = ref<PaginationParams>({
  page: 1,
  limit: 100
})

const { data: mainCategories } = useQuery({
  queryKey: ['main-categories', listParams],
  queryFn: () => getMainCategories(listParams.value)
})

const { data: categories} = useQuery({
  queryKey: ['categories', listParams],
  queryFn: () => getCategories(listParams.value)
})

const { data: subCategories} = useQuery({
  queryKey: ['sub-categories', listParams],
  queryFn: () => getSubCategories(listParams.value)
})

const queryClient = useQueryClient()
const deleteCategoriesMutation = useMutation({
  mutationFn: deleteCategory,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const onDeleteCategories = (id: number) => {
  deleteCategoriesMutation.mutate(id)
}

const dialogQuestion = (categoryName: string) => {
  return `حذف تصنيف ${categoryName} ؟`
}

const onOpenCategoryDialog = (mainCategory: MainCategory) => {
  categoryFormDialog.value = {
    open: true,
    mainCategory: mainCategory
  }
}

const onOpenSubCategoryDialog = (category: Category) => {
  subCategoryFormDialog.value = {
    open: true,
    category: category
  }
}

watchEffect(() => {
  if (mainCategories.value && categories.value && subCategories.value) {
    categoriesArray.value = 
      mainCategories.value.data.map(mainCategory => ({
        ...mainCategory, children: categories.value.data.map(category => ({
          ...category, children : subCategories.value.data.map(subCategory => ({
            ...subCategory
          })).filter(subCategory => subCategory.cat_id === category.id)
        })).filter(category => category.cat_zero_id === mainCategory.id)
      }))
  }
})

</script>
