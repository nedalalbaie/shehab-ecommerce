<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-6">
      <v-text-field
        v-model="name"
        label="إسم المنتج"
        variant="outlined"
        color="primary"
        placeholder="إسم المنتج"
        :error-messages="errors.name"
      />

      <v-autocomplete
        v-model="sub_category_id"
        :hide-no-data="false"
        item-title="name"
        item-value="id"
        :items="subCategories.data.value?.data"
        :loading="subCategories.isPending.value"
        hide-selected
        label="التصنيفات"
        placeholder="التصنيفات"
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

      <v-text-field
        v-model="product_code"
        label="رمز المنتج"
        variant="outlined"
        color="primary"
        placeholder="رمز المنتج"
        :error-messages="errors.product_code"
      />

      <v-text-field
        v-model="price"
        label="السعر"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="السعر"
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
        v-model="description"
        label="التفاصيل"
        type="text"
        variant="outlined"
        color="primary"
        placeholder="التفاصيل"
        :error-messages="errors.description"
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

      <!-- <div>
        <p class="text-xl mb-4">
          الجنس
        </p>
        <v-radio-group
          v-model="gender"
          inline
        >
          <v-radio
            label="أولاد"
            :value="GENDER.MALE"
            color="#00658D"
          />
          <v-radio
            label="بنات"
            :value="GENDER.FEMALE"
            color="#A13763"
          />
          <v-radio
            label="كلاهما"
            :value="GENDER.BOTH"
            color="primary"
          />
        </v-radio-group>
      </div> -->
    </div>

    <div>
      <ColorPicker
        :hex-codes-prop="hexCodes"
        @pass-hexcodes="handleHexCodes"
      />
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

    <div class="mt-3">
      <v-btn
        :disabled="!meta.valid"
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
import { GENDER } from "../models/gender"
import { computed, reactive, ref, watchEffect } from "vue";
import { getSubCategories } from "@/subCategories/subCategories-service";
import { useQuery } from "@tanstack/vue-query";
import ImageUpload from "@/core/components/ImageUpload.vue"
import ColorPicker from "../components/ColorPicker.vue"
import { pathToFile } from '@/core/helpers/pathToFile';
import { sellingMethods } from "../models/product"

type ProductForm = AddProductRequest

const props = defineProps<{
  isLoading: boolean,
  product?: Omit<Product, "sub_category_id"> & { category_id: number }
}>()
const emit = defineEmits<{
  submit: [value: ProductForm]
}>()

const base64Images = reactive<File[] | null[]>([null, null, null, null,])
const hexCodes = ref<string[]>([])
const selectedImagesState = ref<"filled" | "empty">("empty")

const editMode = computed(() => !!props.product)
const isDisabled = computed(() => !meta.value.valid || selectedImagesState.value == "empty")
const listParams = ref({
  page: 1,
  limit: 50,
})

const subCategories = useQuery({
  queryKey: ['sub-categories', listParams],
  queryFn: () => getSubCategories(listParams.value)
})

const validationSchema = toTypedSchema(
  object({
    name: editMode.value ? string() : string().min(1, 'يجب إدخال إسم المنتج '),
    product_code: editMode.value ? string() : string().min(1, 'يجب إدخال رمز المنتج '),
    description: editMode.value ? string() : string().min(1, 'يجب إدخال التفاصيل  '),
    sub_category_id: number().min(1, 'يجب إختيار التصنيف'),
    price: number().min(1, 'يجب إدخال السعر'),
    inventory_level: number().min(1, 'يجب إدخال الكمية'),
    // gender: number().min(1, 'يجب إدخال الجنس'),
    active_product: number(),
    selling_method: string().min(1, 'طريقة الدفع مطلوبة'),
    minimum_quantity: number().min(1, 'القيمة الأدني مطلوبة'),
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
const { value: sub_category_id } = useField<number>('sub_category_id');
const { value: price } = useField<number>('price');
const { value: inventory_level } = useField<number>('inventory_level');
const { value: gender } = useField<number>('gender');
const { value: selling_method } = useField<number>('selling_method');
const { value: minimum_quantity } = useField<number>('minimum_quantity');

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

const submit = handleSubmit(values => {
  console.log(values);
  
  emit("submit", {
    ...values,
    image1_path: base64Images[0] as File,
    image2_path: base64Images[1] as File,
    image3_path: base64Images[2] as File,
    image4_path: base64Images[3] as File,
    hex_codes: JSON.stringify(hexCodes.value)
  })
})

const handleImage = (imageFile: File | null, state: "filled" | "empty", index?: number) => {
  if (index) {
    base64Images[index - 1] = imageFile
  }

  selectedImagesState.value = base64Images.every(item => item) ? "filled" : "empty"

}

const handleHexCodes = (passedHexCodes: string[]) => {
  hexCodes.value = passedHexCodes
}

</script>