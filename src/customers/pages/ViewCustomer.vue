<template>
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

  <v-alert
    v-else-if="isError"
    type="error"
    class="my-6"
    title="خطأ في الوصول الى بيانات الزبون"
    text="الرجاء اعادة المحاولة مرة أخرى."
  />

  <div v-else-if="customer">
    <div class="flex justify-between">
      <h1 class="text-2xl font-medium">
        {{ customer.name }}
      </h1>
      <v-btn
        :to="{ name: 'customers' }"
        variant="outlined"
        color="primary"
        size="large"
        :append-icon="mdiArrowLeft"
      >
        الرجوع الى الزبائن
      </v-btn>
    </div>

    <div class="flex gap-6">
      <v-btn
        rounded="xl"
        variant="elevated"
        color="primary"
        type="submit"
        :to="{ name: 'view-customer-bills', params: { customerId: customer.id } }"
      >
        عرض الفواتير
        <template #prepend>
          <ViewIcon />
        </template>
      </v-btn>
            
      <v-btn
        rounded="xl"
        variant="elevated"
        color="primary"
        type="submit"
        :to="{ name: 'view-customer-orders', params: { customerId: customer.id } }"
      >
        عرض الطلبات
        <template #prepend>
          <ViewIcon />
        </template>
      </v-btn>
    </div>

    <v-card class="mt-4">
      <div class="w-1/2 grid grid-cols-2 gap-4 p-4">
        <div>
          <p class="text-lg font-medium">
            الإسم
          </p>
          <p> {{ customer.name }} </p>
        </div>
        <div>
          <p class="text-lg font-medium">
            رقم الهاتف
          </p>
          <p> {{ customer.phone_number }} </p>
        </div>
        <div>
          <p class="text-lg font-medium">
            الإيميل الإلكتروني
          </p>
          <p> {{ customer.email }} </p>
        </div>
        <div>
          <p class="text-lg font-medium">
            التوثيق
          </p> 
          <v-chip
            :color="customer.is_trusted === BASE_STATUS.Activated ? 'success' : 'error'"
          >
            {{ customer.is_trusted === BASE_STATUS.Activated ? 'موثق' : 'غير موثق' }} 
          </v-chip>
        </div>
      </div>

      <div class="p-4">
        <h2 class="text-2xl mb-4">
          العناوين
        </h2>
        <div
          v-for="(address, index) in addresses.data.value"
          :key="address.id"
          class="w-1/2 mb-8"
        >
          <div class="grid grid-cols-2 gap-8">
            <div class="flex flex-col gap-3">
              <div>
                <span>
                  {{ index + 1 }} .
                </span>
                <span class="text-lg font-medium ml-2">
                  إسم العنوان
                </span>
                <span>
                  {{ address.address_name }}
                </span>
              </div>

              <div class="mr-4">
                <span class="text-lg font-medium ml-2">
                  المدينة
                </span>
                <span>
                  {{ address.city }}
                </span>
              </div>

              <div class="mr-4">
                <span class="text-lg font-medium ml-2">
                  الوصف
                </span>
                <span>
                  {{ address.description }}
                </span>
              </div>
            </div>

            <div class="flex justify-center items-center">
              <span class="text-lg font-medium ml-2">
                الشارع
              </span>
              <span>
                {{ address.neighbourhood }}
              </span>
            </div>
          </div>
          
          <div
            v-if="addresses.data.value?.length! > 1 && (index + 1) !== addresses.data.value?.length"
            class="h-[1px] w-full bg-gray-300 my-6"
          />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { mdiArrowLeft } from '@mdi/js'
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { getCustomer } from '../customers-service';
import { BASE_STATUS } from "@/core/models/base-status"
import { getUserAddresses } from '@/addresses/addresses-service';
import ViewIcon from '@/core/components/icons/ViewIcon.vue';

const route = useRoute();
const id = Number(route.params.customerId);

const { data: customer, isPending, isError } = useQuery({
    queryKey: ['customer'],
    queryFn: () => getCustomer(id)
})

const addresses = useQuery({
    queryKey: ['user-addresses'],
    queryFn: () => getUserAddresses(id)
})
</script>

