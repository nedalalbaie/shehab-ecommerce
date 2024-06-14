<template>
  <div class="flex flex-col">
    <div class="w-72">
      <v-text-field
        v-model="search"
        label="إبحث برقم الفاتورة"
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
      
    <div class="flex gap-4">
      <button
        :class="!billsPaginationParams.status ? 'bg-filter border-filter' : 'border-gray-300'"
        class="border-2 border-solid  py-1 px-3 rounded-md transition-all duration-150"
        @click="billsPaginationParams.status = undefined"
      >
        الكل
      </button>
      <button
        :class="billsPaginationParams.status && billsPaginationParams.status == 'accepted' ? 'bg-filter border-filter' : 'border-gray-300'"
        class="border-2 border-solid py-1 px-3 rounded-md transition-all duration-150"
        @click="billsPaginationParams.status = 'accepted'"
      >
        تم القبول
      </button>
      <button
        :class="billsPaginationParams.status && billsPaginationParams.status == 'canceled' ? 'bg-filter border-filter' : 'border-gray-300'"
        class="border-2 border-solid py-1 px-3 rounded-md transition-all duration-150"
        @click="billsPaginationParams.status = 'canceled'"
      >
        ملغية
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce';
import type { BillsPaginationParamas } from '../models/bills-pagination-params';
import { ref } from 'vue';

 const billsPaginationParams = defineModel<BillsPaginationParamas>({required: true})
 const search = ref('')

 const onInputClear = () => {
  billsPaginationParams.value.bill_number = ''
 }

 const handleSearch  = debounce(() => {
   billsPaginationParams.value.bill_number = search.value
    
}, 400)

</script>