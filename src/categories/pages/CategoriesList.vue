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

  <EditCategoryDialog
    v-if="editCategoryDialog.open"
    v-model="editCategoryDialog.open"
    :main-category="editCategoryDialog.mainCategory"
    :category="editCategoryDialog.category!"
  />

  <EditSubCategoryDialog
    v-if="editSubCategoryDialog.open"
    v-model="editSubCategoryDialog.open"
    :category="editSubCategoryDialog.category"
    :sub-category="editSubCategoryDialog.subCategory!"
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
      <div class="w-72">
        <v-text-field
          v-model="search"
          label="إبحث بإسم التصنيف الأساسي"
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
        @open-edit-category="onOpenEditCategoryDialog"
        @open-edit-sub-category="onOpenEditSubCategoryDialog"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getCategories } from '../services/categories-service'
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
import debounce from 'lodash.debounce'
import EditCategoryDialog from '../components/EditCategoryDialog.vue'
import type { SubCategory } from '../models/subCategory'
import EditSubCategoryDialog from '../components/EditSubCategoryDialog.vue'

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

const editCategoryDialog = ref<{
  open: boolean;
  mainCategory: MainCategory | null ;
  category: Category | null ;
}>({
  open: false,
  mainCategory: null,
  category: null
});

const editSubCategoryDialog = ref<{
  open: boolean;
  category: Category | null ;
  subCategory: SubCategory | null ;
}>({
  open: false,
  category: null,
  subCategory: null
});

const search = ref('')
const listParams = ref({
  page: 1,
  limit: 500,
  name: ''
})

const { data: mainCategories } = useQuery({
  queryKey: ['main-categories', listParams],
  queryFn: () => getMainCategories(listParams.value, listParams.value.name)
})

const { data: categories} = useQuery({
  queryKey: ['categories', listParams],
  queryFn: () => getCategories(listParams.value)
})

const { data: subCategories} = useQuery({
  queryKey: ['sub-categories', listParams],
  queryFn: () => getSubCategories(listParams.value)
})

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

const onOpenEditCategoryDialog = (category: Category, mainCategory: MainCategory) => {
  editCategoryDialog.value = {
    open: true,
    category: category,
    mainCategory: mainCategory
  }
}

const onOpenEditSubCategoryDialog = (subCategory: SubCategory , category: Category) => {
  editSubCategoryDialog.value = {
    open: true,
    category: category,
    subCategory: subCategory
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

const onInputClear = () => {
  listParams.value.name = ''
 }

 const handleSearch  = debounce(() => {
   listParams.value.name = search.value
    
}, 400)

</script>
