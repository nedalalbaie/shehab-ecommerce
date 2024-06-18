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
    title="خطأ في الوصول الى بيانات المنتج"
    text="الرجاء اعادة المحاولة مرة أخرى."
  />

  <div
    v-else-if="product"
  >
    <div class="flex justify-end">
      <v-btn
        :to="{ name: 'products' }"
        variant="outlined"
        color="primary"
        size="large"
        :append-icon="mdiArrowLeft"
      >
        الرجوع الى المنتجات
      </v-btn>
    </div>

    <div class="grid grid-cols-[40%1fr] mt-6">
      <div class="mb-14 p-2">
        <h1 class="text-3xl font-medium text-center">
          <span>تفاصيل المنتج</span>
          <span> "{{ product.name }}"</span>
        </h1>
  
        <div class="grid grid-cols-2 items-start gap-4 gap-y-8 mt-6">
          <div class="rounded-md text-center ">
            <p class="font-medium mb-2">
              رمز المنتج
            </p>
            <p>{{ product.product_code }}</p>
          </div>
  
          <div class="rounded-md text-center ">
            <p class="font-medium mb-2">
              السعر
            </p>
            <p>  {{ product.price }} د.ل</p>
          </div>
      
          <div class="rounded-md text-center">
            <p class="font-medium mb-2">
              التفاصيل
            </p>
            <p>{{ product.description }}</p>
          </div>
      
          <div class="rounded-md text-center">
            <p class="font-medium mb-2">
              طريقة البيع
            </p>
            <p>
              {{ product.selling_method == 'package' ? 'بالحزمة' : 'بالقطعة الواحدة' }}
            </p>
          </div>
      
          <div class="rounded-md text-center">
            <p class="font-medium mb-2">
              طريقة البيع
            </p>
            <p>
              {{ product.selling_method == 'package' ? 'بالحزمة' : 'بالقطعة الواحدة' }}
            </p>
          </div>
      
          <div class="rounded-md text-center">
            <p class="font-medium mb-2">
              القيمة الأدني
            </p>
            <p>
              {{ product.minimum_quantity }}
            </p>
          </div>
      
          <div class="rounded-md text-center">
            <p class="font-medium mb-2">
              {{ product.hex_codes.length > 1 ? 'الألوان' : 'اللون' }}
            </p>
                
            <div class="w-4/5 flex flex-wrap justify-center gap-1">
              <div
                v-for="(color, colorIndex) in convertToObject(product.hex_codes)"
                :key="colorIndex"
                class="w-8 h-8 rounded-[50%] border-2  flex items-end"
                :style="{ 'background-color': `${color}` }"
              />
            </div>
          </div>
        </div>
      </div>
  
      <ImagesSlider :product="product" />
    </div>
    
    <MarketsTable />
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { getProduct } from '../products-service';
import ImagesSlider from '../components/ImagesSlider.vue';
import MarketsTable from '../components/MarketsTable.vue';
import { mdiArrowLeft } from '@mdi/js';

const route = useRoute();
const { data: product, isPending, isError} = useQuery({
    queryKey: ['product'],
    queryFn: () => getProduct(Number(route.params.id))
})

const convertToObject = (hexCodesParam: string) => {
 return JSON.parse(hexCodesParam) as string[]
}

</script>