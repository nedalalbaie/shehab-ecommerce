<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-6">
      <v-autocomplete
        v-model="market_id"
        :hide-no-data="false"
        item-title="name"
        item-value="id"
        :items="markets.data.value?.data"
        :loading="markets.isPending.value"
        hide-selected
        label="المحلات *"
        placeholder="المحلات *"
        variant="outlined"
        color="primary"
        auto-select-first
        :error-messages="errors.market_id"
      >
        <template #no-data>
          <v-list-item>
            <v-list-item-title>
              لا توجد نتائج
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-autocomplete>

      <v-autocomplete
        v-model="product_id"
        :hide-no-data="false"
        item-title="name"
        item-value="id"
        :items="products.data.value?.data"
        hide-selected
        label="المنتجات *"
        placeholder="المنتجات *"
        variant="outlined"
        color="primary"
        auto-select-first
        :error-messages="errors.product_id"
      >
        <template #no-data>
          <v-list-item>
            <v-list-item-title>
              لا توجد نتائج
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-autocomplete>

      <v-text-field
        v-model="inventory"
        label="الكمية *"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="الكمية *"
        :error-messages="errors.inventory"
        @input="convertinventoryToNumber"
      />

      <v-text-field
        v-model="saller_price"
        label="سعر الشراء *"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="سعر الشراء *"
        :error-messages="errors.saller_price"
        @input="convertMinimumQuantityToNumber"
      />

      <v-text-field
        v-model="price"
        label=" سعر البيع*"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="*سعر البيع"
        :error-messages="errors.price"
        @input="convertPriceToNumber"
      />
    </div>

    <div class="mt-3">
      <v-btn
        :disabled="!meta.valid"
        size="large"
        variant="elevated"
        color="primary"
        type="submit"
        :loading="props.isLoading"
      >
        {{ editMode ? 'تحديث' : 'إضافة' }}
      </v-btn>
    </div>
  </form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField } from 'vee-validate';
import { object, number } from 'zod';
import { ref, watchEffect } from "vue";
import { useQuery } from "@tanstack/vue-query";
import type { CreateProductDetails, ProductDetails } from '../models/productDetails';
import { getMarkets } from '@/markets/markets-service';
import { getProducts } from '@/products/products-service';

const props = defineProps<{
  editMode?: boolean,
  isLoading: boolean,
  productDetail?: ProductDetails
}>()
const emit = defineEmits<{
  submit: [value: CreateProductDetails & { price?: number}]
}>()

const listParams = ref({
  page: 1,
  limit: 200,
})

const markets = useQuery({
  queryKey: ['markets', listParams],
  queryFn: () => getMarkets(listParams.value)
})

const products = useQuery({
  queryKey: ['products', listParams],
  queryFn: () => getProducts(listParams.value)
})

const validationSchema = toTypedSchema(
  object({
    saller_price: number().min(1, 'يجب إدخال سعر البيع'),
    inventory: number().min(1, 'يجب إدخال الكمية'), // inventory must not be greater than 1000
    market_id: number().min(1, 'يجب إختيار المحل'),
    product_id: number().min(1, 'يجب إختيار المنتج'),
    price: number().min(1, 'يجب إدخال السعر')
  })
);

const { handleSubmit, errors, meta } = useForm({
  validationSchema
});

const { value: saller_price } = useField<number>('saller_price');
const { value: inventory } = useField<number>('inventory');
const { value: market_id } = useField<number>('market_id');
const { value: product_id } = useField<number>('product_id');
const { value: price } = useField<number>('price');

watchEffect(() => {
  if (props.productDetail) {
    inventory.value = props.productDetail.inventory
    saller_price.value = props.productDetail.saller_price
    product_id.value = props.productDetail.product_info.id
    market_id.value = props.productDetail.market_info.id,
    price.value = props.productDetail.product_info.price
  }
})

const convertinventoryToNumber = () => {
  inventory.value = Number(inventory.value)
}

const convertMinimumQuantityToNumber = () => {
  saller_price.value = Number(saller_price.value)
}

const convertPriceToNumber = () => {
  price.value = Number(price.value)
}

const submit = handleSubmit(values => {
  emit("submit", {
    ...values,
  })
})

</script>