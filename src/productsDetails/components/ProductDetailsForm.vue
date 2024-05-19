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
        label="المحلات"
        placeholder="المحلات"
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
        label="المنتجات"
        placeholder="المنتجات"
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
        label="الكمية"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="الكمية"
        :error-messages="errors.inventory"
        @input="convertinventoryToNumber"
      />

      <v-text-field
        v-model="saller_price"
        label="سعر البيع"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="سعر البيع"
        :error-messages="errors.saller_price"
        @input="convertMinimumQuantityToNumber"
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
        إضافة
      </v-btn>
    </div>
  </form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField } from 'vee-validate';
import { object, number, string } from 'zod';
import { computed, ref, watchEffect } from "vue";
import { useQuery } from "@tanstack/vue-query";
import type { CreateProductDetails } from '../models/productDetails';
import { getMarkets } from '@/markets/markets-service';
import { getProducts } from '@/products/products-service';


const props = defineProps<{
  isLoading: boolean,
}>()
const emit = defineEmits<{
  submit: [value: CreateProductDetails]
}>()

const selectedImagesState = ref<"filled" | "empty">("empty")

// const editMode = computed(() => !!props.product)
const isDisabled = computed(() => !meta.value.valid || selectedImagesState.value == "empty")
const listParams = ref({
  page: 1,
  limit: 50,
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
    saller_price: number().min(1, 'سعر البيع'),
    inventory: number().min(1, 'يجب إدخال الكمية'), // inventory must not be greater than 1000
    market_id: number().min(1, 'يجب إختيار المحل'),
    product_id: number().min(1, 'يجب إختيار المنتج'),
  })
);

const { handleSubmit, errors, meta, setValues } = useForm({
  validationSchema
});

const { value: product_id } = useField<string>('product_id');
const { value: saller_price } = useField<number>('saller_price');
const { value: market_id } = useField<number>('market_id');
const { value: inventory } = useField<number>('inventory');

watchEffect(() => {
  // if (props.product) {
  //   setValues({
  //     ...props.product,
  //     market_id: props.product.category_id
  //   })
  // }
})

const convertinventoryToNumber = () => {
  inventory.value = Number(inventory.value)
}

const convertMinimumQuantityToNumber = () => {
  saller_price.value = Number(saller_price.value)
}

const submit = handleSubmit(values => {
  console.log(values);
  
  emit("submit", {
    ...values,
  })
})

</script>