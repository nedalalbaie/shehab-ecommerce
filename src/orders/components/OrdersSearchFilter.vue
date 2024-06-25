<template>
  <div class="flex flex-col">
    <div class="w-72">
      <v-text-field
        v-model="search"
        label="إبحث برقم الطلب"
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
        :class="!ordersPaginationParams.status ? 'bg-filter border-filter' : 'border-gray-300'"
        class="border-2 border-solid py-1 px-3 rounded-md transition-all duration-150"
        @click="ordersPaginationParams.status = undefined"
      >
        الكل
      </button>

      <button
        :class="
          ordersPaginationParams.status && ordersPaginationParams.status == STATUS.CONFIRMED
            ? 'bg-filter border-filter'
            : 'border-gray-300'
        "
        class="border-2 border-solid py-1 px-3 rounded-md transition-all duration-150"
        @click="ordersPaginationParams.status = STATUS.CONFIRMED"
      >
        تم القبول
      </button>

      <button
        :class="
          ordersPaginationParams.status && ordersPaginationParams.status == STATUS.PENDING
            ? 'bg-filter border-filter'
            : 'border-gray-300'
        "
        class="border-2 border-solid py-1 px-3 rounded-md transition-all duration-150"
        @click="ordersPaginationParams.status = STATUS.PENDING"
      >
        قيد المعالجة
      </button>

      <button
        :class="
          ordersPaginationParams.status && ordersPaginationParams.status == STATUS.SHIPPING
            ? 'bg-filter border-filter'
            : 'border-gray-300'
        "
        class="border-2 border-solid py-1 px-3 rounded-md transition-all duration-150"
        @click="ordersPaginationParams.status = STATUS.SHIPPING"
      >
        قيد التوصيل
      </button>

      <button
        :class="
          ordersPaginationParams.status && ordersPaginationParams.status == STATUS.CANCELD
            ? 'bg-filter border-filter'
            : 'border-gray-300'
        "
        class="border-2 border-solid py-1 px-3 rounded-md transition-all duration-150"
        @click="ordersPaginationParams.status = STATUS.CANCELD"
      >
        ملغية
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce';
import type { OrdersPaginationParamas } from '../models/orders-pagination-params'
import { STATUS } from '../models/status'
import { ref } from 'vue';

const ordersPaginationParams = defineModel<OrdersPaginationParamas>({ required: true }) 
const search = ref('')

const onInputClear = () => {
  ordersPaginationParams.value.order_number = ''
}

const handleSearch = debounce(() => {
    ordersPaginationParams.value.order_number = search.value
}, 400)
</script>
