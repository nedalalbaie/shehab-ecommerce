<template>
  <div
    v-for="(mainCategory, index) in categoriesArray"
    :key="index"
    class="border border-gray-500 rounded-lg py-2 px-6 mb-6"
  >
    <div class="flex items-center gap-4">
      <img
        class="w-10 h-10 bg-cover rounded-lg my-2 border border-gray-200"
        :src="mainCategory.image_path"
        alt=""
      >
      <p class="w-fit">
        {{ mainCategory.name }} ({{ mainCategory.children.length }})
      </p>

      <v-btn
        variant="text"
        density="comfortable"
        icon
        color="primary"
        @click="openCategoryDialog(mainCategory)"
      >
        <v-icon :icon="mdiPlusCircle" />
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          إضافة تصنيف ثانوي
        </v-tooltip>
      </v-btn>
   
      <v-btn
        variant="text"
        density="comfortable"
        icon
        :to="{name: 'edit-mainCategory', params: { id: mainCategory.id}}"
      >
        <v-icon
          color="primary"
          :icon="mdiPencil"
        />
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          تعديل التصنيف الأساسي ' {{ mainCategory.name }} '
        </v-tooltip>
      </v-btn>

      <div
        class="h-[1px] flex-grow bg-gray-500"
        @click="toggleSubCategory(index)"
      />

      <v-btn
        variant="text"
        density="comfortable"
        icon
        color="primary"
        @click="toggleSubCategory(index)"
      >
        <v-icon :icon="mdiArrowDownDropCircleOutline" />
      </v-btn>
    </div>

    <div
      class="border-r-2 border-gray-300 pr-2 mr-10" 
      :class="showMainCategory[index] ? 'block' : 'hidden'"
    >
      <div
        v-for="(category, categoryIndex) in mainCategory.children"
        :key="category.id"
        class="mr-10 mt-7"
      >
        <div class="flex items-center gap-4 mb-2">
          <img
            class="w-10 h-10 bg-cover rounded-lg my-2 border border-gray-200"
            :src="category.image_path"
            alt=""
          >
        
          <p class="w-fit">
            {{ category.name }} ({{ category.children.length }})
          </p>

          <v-btn
            variant="text"
            density="comfortable"
            icon
            color="primary"
            @click="openSubCategoryDialog(category)"
          >
            <v-icon :icon="mdiPlusCircle" />
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              إضافة تصنيف فرعي
            </v-tooltip>
          </v-btn>
     
          <v-btn
            variant="text"
            density="comfortable"
            icon
            @click="openEditCategoryDialog(category, mainCategory)"
          >
            <v-icon
              color="primary"
              :icon="mdiPencil"
            />
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              تعديل 
            </v-tooltip>
          </v-btn>
 
          <div
            class="h-[1px] flex-grow bg-gray-500"
            @click="toggleChildCategory(index, categoryIndex)"
          />
 
          <v-btn
            variant="text"
            density="comfortable"
            icon
            color="primary"
            @click="toggleChildCategory(index, categoryIndex)"
          >
            <v-icon :icon="mdiArrowDownDropCircleOutline" />
          </v-btn>
        </div>

        <div
          class="border-r-2 border-gray-300 pr-4 mr-10"
          :class="showSubCategory[index][categoryIndex] ? 'block' : 'hidden'"
        >
          <div
            v-for="(subCategory, subIndex) in category.children"
            :key="subIndex"
          >
            <div class="flex items-center gap-4 mb-2">
              <img
                class="w-10 h-10 bg-cover rounded-lg my-2 border border-gray-200"
                :src="subCategory.image_path"
                alt=""
              >

              <p>
                {{ subCategory.name }} 
              </p>
       
              <v-btn
                variant="text"
                density="comfortable"
                icon
                @click="openEditSubCategoryDialog(subCategory, category)"
              >
                <v-icon
                  color="primary"
                  :icon="mdiPencil"
                />
                <v-tooltip
                  activator="parent"
                  location="bottom"
                >
                  تعديل
                </v-tooltip>
              </v-btn>
   
              <div class="h-[1px] flex-grow bg-gray-500" />
            </div>
          </div>
        </div>


        <!-- <div
          v-if="categories.data.value"
          class="mt-8"
        >
          <EmptyData v-if="categories.data.value.data.length === 0" /> -->

        <!-- <div class="flex flex-col md:flex-row justify-end mt-4"> -->
        <!-- <v-btn
              :to="{ name: 'edit-category', params: { id: category.id } }"
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
            </v-btn> -->

        <!-- <v-dialog width="500">
               <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="text"
                  class="mx-1"
                  density="comfortable"
                  icon
                  color="error"
                >
                  <v-icon :icon="mdiDelete" />
                  <v-tooltip
                    activator="parent"
                    location="bottom"
                  >
                    حذف
                  </v-tooltip>
                </v-btn>
              </template> 

              <template #default="{ isActive }">
                <v-card
                  :title="dialogQuestion(category.name)"
                  rounded="lg"
                  color="#EFE9F5"
                  style="padding-block: 1.75rem !important "
                >
                  <v-card-text> سيتم حذف هذه التصنيف بشكل نهائي . </v-card-text>

                  <v-card-actions>
                    <v-spacer />

                    <v-btn
                      text="لا"
                      @click="isActive.value = false"
                    />
                    <v-btn
                      :disabled="deleteCategoriesMutation.isPending.value"
                      text="نعم"
                      @click="
                        isActive.value = false
                        onDeleteCategories(category.id)
                      "
                    />
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog> -->
        <!-- </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiArrowDownDropCircleOutline, mdiPencil, mdiPlusCircle } from '@mdi/js';
import type { CategoryArray } from '../models/categoriesArray';
import { ref, watchEffect } from 'vue';
import type { MainCategory } from '../models/mainCategory';
import type { Category } from '../models/Category';
import type { SubCategory } from '../models/subCategory';

const props = defineProps<{
  categoriesArray: CategoryArray []
}>()

const emit = defineEmits<{
  'open-category': [value: MainCategory]
  'open-sub-category': [value: Category]
  'open-edit-category': [category: Category, mainCategory: MainCategory]
  'open-edit-sub-category': [value: SubCategory, category: Category]
}>()

const showMainCategory = ref<boolean[]>([]);
const showSubCategory = ref<boolean[][]>([]);

const toggleSubCategory = (mainIndex: number) => {
  showMainCategory.value[mainIndex] = !showMainCategory.value[mainIndex];
};

// Function to toggle visibility of child categories
const toggleChildCategory = (mainIndex: number, subIndex: number) => {
  showSubCategory.value[mainIndex][subIndex] = !showSubCategory.value[mainIndex][subIndex];
};

watchEffect(() => {
  if (props.categoriesArray) {
    showMainCategory.value = Array(props.categoriesArray.length).fill(false);
    showSubCategory.value = props.categoriesArray.map((category: any) => Array(category.children.length).fill(false));
  }
})

const openCategoryDialog = (mainCategory: MainCategory) => {
  emit('open-category', mainCategory)
}

const openSubCategoryDialog = (category: Category) => {
  emit('open-sub-category', category)
}


const openEditCategoryDialog = (category: Category, mainCategory: MainCategory) => {
  emit('open-edit-category', category, mainCategory)
}

const openEditSubCategoryDialog = (subCategory: SubCategory, category: Category) => {
  emit('open-edit-sub-category', subCategory, category)
}

</script>