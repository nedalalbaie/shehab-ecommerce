<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 items-start gap-x-8 gap-y-3 mt-6">
      <v-text-field
        v-model="name"
        label="اسم المنتج"
        variant="outlined"
        color="primary"
        placeholder="اسم المنتج"
        :error-messages="errors.name"
      />

      <v-text-field
        v-model="product_code"
        label="رمز المنتج"
        variant="outlined"
        color="primary"
        placeholder="رمز المنتج"
        :error-messages="errors.product_code"
      />

      <v-autocomplete
        v-model="selling_method"
        :hide-no-data="false"
        item-title="label"
        item-value="value"
        :items="sellingMethods"
        hide-selected
        label="طريقة الدفع"
        placeholder="طريقة الدفع"
        variant="outlined"
        color="primary"
        auto-select-first
        :error-messages="errors.selling_method"
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
        v-model="mainCategoryId"
        :hide-no-data="false"
        item-title="name"
        item-value="id"
        :items="mainCategories?.data"
        :loading="mainCategoriesPending"
        hide-selected
        label="التصنيفات الأساسية"
        placeholder="التصنيفات الأساسية"
        variant="outlined"
        color="primary"
        auto-select-first
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
        v-if="mainCategoryId"
        v-model="categoryId"
        :hide-no-data="false"
        item-title="name"
        item-value="id"
        :items="categories"
        :loading="categoriesPending"
        hide-selected
        label="التصنيفات الثانوية"
        placeholder="التصنيفات الثانوية"
        variant="outlined"
        color="primary"
        auto-select-first
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
        v-if="mainCategoryId && categoryId"
        v-model="sub_category_id"
        :hide-no-data="false"
        item-title="name"
        item-value="id"
        :items="subCategories"
        :loading="subCategoriesPending"
        hide-selected
        label="التصنيفات الفرعية"
        placeholder="التصنيفات الفرعية"
        variant="outlined"
        color="primary"
        auto-select-first
        :error-messages="errors.sub_category_id"
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
        v-model="price"
        label="سعر البيع"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="سعر البيع"
        :error-messages="errors.price"
        @input="convertPriceToNumber"
      />

      <v-text-field
        v-model="inventory_level"
        label="الكمية"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="الكمية"
        :error-messages="errors.inventory_level"
        @input="convertQuantityToNumber"
      />

      <v-text-field
        v-model="minimum_quantity"
        label="القيمة الأدني"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="القيمة الأدني"
        :error-messages="errors.minimum_quantity"
        @input="convertMinimalquantityToNumber"
      />

      <v-textarea
        v-model="description"
        clearable
        variant="outlined"
        color="primary"
        label="التفاصيل"
        placeholder="التفاصيل"
        :error-messages="errors.description"
      />
    </div>

    <div>
      <ColorPicker v-model="hexCodes" />
    </div>

    <div class="mt-10">
      <h3 class="text-xl">
        الصور
      </h3>
      <p class="mt-2">
        يمكنك رفع ما يصل إلي 4 صور لهذا المنتج، اذا كانت هناك صورة فيمكنك تبديلها بالضغط واختيار صورة اخرى
      </p>

      <div class="mt-8 grid grid-cols-4 gap-4">
        <ImageUpload
          v-for="index in 4"
          :key="index"
          :index="index"
          @handle-image="handleImage"
        />
      </div>
    </div>

    <div class="h-[1px] w-1/2 bg-gray-300 ml-auto my-10" />

    <p class="text-2xl">
      ربط المنتج بمحل
    </p>

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
        label="سعر الشراء"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="سعر الشراء"
        :error-messages="errors.saller_price"
        @input="convertMinimumQuantityToNumber"
      />
    </div>

    <div class="mt-3">
      <v-btn
        :disabled="isDisabled"
        size="large"
        variant="elevated"
        color="primary"
        type="submit"
        :loading="props.isLoading"
      >
        {{ editMode ? 'تعديل منتج' : 'إضافة منتج' }}
      </v-btn>
    </div>
  </form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField } from 'vee-validate';
import { object, string, number } from 'zod';
import type { AddProductRequest, Product } from "../models/product";
import { computed, reactive, ref, watch, watchEffect } from "vue";
import {  getsubCategoriesByCategoryId } from "@/categories/services/subCategories-service";
import { useQuery } from "@tanstack/vue-query";
import ImageUpload from "@/core/components/ImageUpload.vue"
import ColorPicker from "../components/ColorPicker.vue"
import { pathToFile } from '@/core/helpers/pathToFile';
import { sellingMethods } from "../models/product"
import { getMarkets } from '@/markets/markets-service';
import type { CreateProductDetails } from '@/productsDetails/models/productDetails';
import { getMainCategories } from '@/categories/services/mainCategories-service';
import { getCategoriesByMainCategoryId } from '@/categories/services/categories-service';

type ProductForm = AddProductRequest & Omit<CreateProductDetails, "product_id" | "discount">

const props = defineProps<{
  isLoading: boolean,
  product?: Omit<Product, "sub_category_id"> & { category_id: number }
}>()
const emit = defineEmits<{
  submit: [value: ProductForm]
}>()

const mainCategoryId = ref<number | null>(null)
const categoryId = ref<number | null>(null)

const base64Images = reactive<File[] | null[]>([null, null, null, null,])
const hexCodes = ref<string[]>([])
const selectedImagesState = ref<"filled" | "empty">("empty")

const editMode = computed(() => !!props.product)
const isDisabled = computed(() => !meta.value.valid || selectedImagesState.value == "empty" || hexCodes.value.length < 1)
const listParams = ref({
  page: 1,
  limit: 200,
})

const { data: mainCategories, isPending: mainCategoriesPending} = useQuery({
  queryKey: ['main-categories', listParams],
  queryFn: () => getMainCategories(listParams.value)
})
const { data: categories, isPending: categoriesPending, refetch: categoriesRefetch} = useQuery({
  queryKey: ['categories', mainCategoryId],
  queryFn: () => getCategoriesByMainCategoryId(mainCategoryId.value!),
  enabled: false
})
const { data: subCategories, isPending: subCategoriesPending, refetch: subCategoriesRefetch} = useQuery({
  queryKey: ['sub-categories', categoryId],
  queryFn: () => getsubCategoriesByCategoryId(categoryId.value!),
  enabled: false
})

const markets = useQuery({
  queryKey: ['markets', listParams],
  queryFn: () => getMarkets(listParams.value)
})

const validationSchema = toTypedSchema(
  object({
    name: editMode.value ? string() : string().min(1, 'يجب إدخال إسم المنتج '),
    product_code: editMode.value ? string() : string().min(1, 'يجب إدخال رمز المنتج '),
    description: editMode.value ? string() : string().min(1, 'يجب إدخال التفاصيل  '),
    sub_category_id: number().min(1, 'يجب إختيار التصنيف'),
    price: number().min(1, 'يجب إدخال السعر'),
    inventory_level: number().min(1, 'يجب إدخال الكمية'),
    active_product: number(),
    selling_method: string().min(1, 'طريقة الدفع مطلوبة'),
    minimum_quantity: number().min(1, 'القيمة الأدني مطلوبة'),

    saller_price: number().min(1, 'يجب إدخال سعر البيع'),
    inventory: number().min(1, 'يجب إدخال الكمية'), // inventory must not be greater than 1000
    market_id: number().min(1, 'يجب إختيار المحل'),
  })
);

const { handleSubmit, errors, meta, setValues } = useForm({
  validationSchema, 
  initialValues: {
    active_product: 1
  }
});

const { value: name } = useField<string>('name');
const { value: product_code } = useField<number>('product_code');
const { value: description } = useField<string>('description');
const { value: sub_category_id, resetField: resetSubCategory } = useField<number>('sub_category_id');
const { value: price } = useField<number>('price');
const { value: inventory_level } = useField<number>('inventory_level');
const { value: selling_method } = useField<number>('selling_method');
const { value: minimum_quantity } = useField<number>('minimum_quantity');

const { value: saller_price } = useField<number>('saller_price');
const { value: inventory } = useField<number>('inventory');
const { value: market_id } = useField<number>('market_id');

watchEffect(() => {
  if (props.product) {
    setValues({
      ...props.product,
      sub_category_id: props.product.category_id
    })

    hexCodes.value = JSON.parse(props.product.hex_codes) as string[]

    pathToFile(props.product.image1_path, props.product.image1_path.substring(props.product.image1_path.lastIndexOf("/") + 1)).then((file: File) => base64Images[1] = file)
  }
})

const convertPriceToNumber = () => {
  price.value = Number(price.value)
}

const convertQuantityToNumber = () => {
  inventory_level.value = Number(inventory_level.value)
}

const convertMinimalquantityToNumber = () => {
  minimum_quantity.value = Number(minimum_quantity.value)
}

const convertinventoryToNumber = () => {
  inventory.value = Number(inventory.value)
}

const convertMinimumQuantityToNumber = () => {
  saller_price.value = Number(saller_price.value)
}

const submit = handleSubmit(values => {
  
  const body: ProductForm = {
    ...values,
    hex_codes: JSON.stringify(hexCodes.value),
    image1_path: base64Images[0] as File,
  }

  if (base64Images[1]) {
    body.image2_path = base64Images[1]
  }
  if (base64Images[2]) {
    body.image3_path = base64Images[2]
  }
  if (base64Images[3]) {
    body.image4_path = base64Images[3]
  }

  emit("submit", body)
})

const handleImage = (imageFile: File | null, state: "filled" | "empty", index?: number) => {
  if (index) {
    base64Images[index - 1] = imageFile
  }

  // selectedImagesState.value = base64Images.every(item => item) ? "filled" : "empty"
  selectedImagesState.value = base64Images[0] ? "filled" : "empty"

}

watchEffect(() => {
  if (mainCategoryId.value) {
    categoryId.value = null
    categoriesRefetch()
  }
})

watch(
  categoryId, 
  (categoryId) => {
    if (categoryId) {
      resetSubCategory()
      subCategoriesRefetch()
  }
  }
)

</script>