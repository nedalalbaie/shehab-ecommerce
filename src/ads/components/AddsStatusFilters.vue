<template>
  <div class="flex flex-col">
    <!-- <div class="w-72">
      <v-text-field
        v-model="search"
        label="إبحث بإسم الإعلان"
        bg-color="background"
        clearable
        variant="solo"
        flat
        density="comfortable"
        rounded
        @click:clear="onInputClear"
        @input="handleSearch"
      />
    </div> -->
        
    <div class="flex gap-4">
      <button
        :class="show && show == 1 ? 'bg-filter border-filter' : 'border-gray-300'"
        class="border-2 border-solid py-1 px-3 rounded-md transition-all duration-150"
        @click="show = 1"
      >
        مفعل
      </button>
      <button
        :class=" show == 0 ? 'bg-filter border-filter' : 'border-gray-300'"
        class="border-2 border-solid py-1 px-3 rounded-md transition-all duration-150"
        @click="show = 0"
      >
        معطل
      </button>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  // import debounce from 'lodash.debounce';
  import type { AdPaginationParams } from '../models/ads-pagination-params';
  // import { ref } from 'vue';
  
   const show = defineModel<1 | 0>({required: true})
  //  const search = ref('')
  
  //  const onInputClear = () => {
  //   showe.bill_number = ''
  //  }
  
  //  const handleSearch  = debounce(() => {
  //    showe.bill_number = search.value
      
  // }, 400)
  
  </script>