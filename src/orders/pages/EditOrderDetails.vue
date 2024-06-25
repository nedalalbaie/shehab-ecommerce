<template>
  <ColorPickerDialog
    v-if="updateColorsDialog.productColors"
    v-model="updateColorsDialog.open"
    :colors="updateColorsDialog.colors"
    :colors-list="updateColorsDialog.productColors!"
    @update="onUpdateColors"
  /> 

  <!-- <AddProductDialog
    v-model:addProductDialog="addProducteDialog"
    v-model:selectedProduct="selectedProduct"
    :products-options="productsOptions"
    :is-pending="isPending"
    @add-product="onAddProductToOrder"
    @passHexCodes="passHexCodes"
  /> -->

  <DeleteProductDialog
    v-if="orderDetails"
    v-model="deleteProducteDialog"
    :order-details="orderDetails"
    @remove-product="onRemoveProduct"
  />

  <!-- <v-dialog
    v-if="deleteProducteDialog.product"
    v-model="deleteProducteDialog.open"
    class="w-3/5"
  >
    <v-card
      :title="dialogQuestion(deleteProducteDialog.product.name, deleteProducteDialog.product.product_code)"
      rounded="lg"
      style="padding-block: 1.75rem !important ;"
    >
      <v-card-text>
        سيتم حذف عدد {{ orderDetails?.order_details.quantity_selected[deleteProducteDialog.index] }} 
        {{ orderDetails?.order_details.quantity_selected[deleteProducteDialog.index] === 1 ? 'عنصر' : 'عناصر' }} بقيمة {{ orderDetails?.order_details.quantity_selected[deleteProducteDialog.index]! * deleteProducteDialog.product.price }} د.ل من هذه الطلبية.
        لا يمكن التراجع عن هذه العملية.
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="error"
          type="button"
          text="لا"
          @click="deleteProducteDialog.open = false"
        />
        <v-btn
          color="primary"
          variant="tonal"
          text="نعم"
          @click="onRemoveProduct()"
        />
      </v-card-actions>
    </v-card>
  </v-dialog> -->
            
  <v-btn
    :to="{ name: 'order-details', params: { id: id} }"
    variant="outlined"
    color="primary"
    size="large"
    :prepend-icon="mdiArrowRight"
  >
    الرجوع الى  عرض الطلب 
  </v-btn>

  <OrderDetails
    v-if="orderDetails"
    :order="orderDetails"
  >
    <template #default>
      <form
        class="px-8 py-3"
        @submit.prevent="submit"
      >
        <div
          v-for="(product, index) in products"
          :key="product.id"
          class="grid grid-cols-[1fr_1fr_30%_1fr] gap-2 items-start py-3"
        >
          <p class="border-b-2 border-neutral-600 pb-1 w-fit">
            {{ product.name }} <br> {{ product.product_code }}
          </p>

          <div>
            <v-text-field
              v-model="quantityInputs[index]"
              class="w-32"
              label="الكمية"
              type="number"
              variant="outlined"
              color="primary"
              placeholder="الكمية"
              @input="convertQuantityToNumber(index)"
            />

            <p
              v-if="quantityInputsErrors[index]"
              class="text-red-500 text-sm -mt-4"
            >
              الكمية مطلوبة
            </p>
          </div>

          <div class="flex gap-4 items-center">
            <div class="flex flex-wrap gap-2 max-w-60">
              <div
                v-for="(hexColor, colorIndex) in color_selected[index]"
                :key="colorIndex"
                class="w-8 h-8 rounded-[50%] shadow-full-white flex items-end border"
                :style="{ 'background-color': hexColor }"
              />
            </div>

            <v-btn
              variant="tonal"
              class="mx-1"
              density="comfortable"
              icon
              color="black"
              @click="openColorsDialog(color_selected[index], index, convertToObject(product.hex_codes))"
            >
              <v-icon :icon="mdiPencil" />
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                تعديل الألوان
              </v-tooltip>
            </v-btn>
          </div>
          
          <div class="flex items-start gap-6">
            <p>
              {{ product.price }}
            </p>

            <v-btn
              v-if="products.length > 1"
              @click="openDeleteProductDialog(product, index)"
            >
              <DeleteIcon
                fill="fill-black"
                custom-style="w-7 h-7 cursor-pointer"
              />
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                حذف المنتج
              </v-tooltip>
            </v-btn>
          </div>
        </div>

        <div class="flex justify-end">
          <v-btn
            :prepend-icon="mdiPlusCircle"
            rounded="xl"
            variant="elevated"
            color="#CCEDA4"
            @click="addProducteDialog.open = true"
          >
            إضافة منتج  
          </v-btn>
        </div>

        <v-dialog
          v-model="addProducteDialog.open"
          class="w-3/5"
        >
          <div class="bg-white rounded-lg p-6">
            <v-card-title>إضافة منتج للطلب</v-card-title>

            <v-autocomplete
              v-model="selectedProduct"
              :hide-no-data="false"
              item-title="name"
              item-value="id"
              :return-object="true"
              :items="productsOptions"
              :loading="isPending"
              hide-selected
              label="المنتجات"
              placeholder="المنتجات"
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

            <div class="mb-3">
              <ColorPicker
                v-if="selectedProduct"
                :colors-list="convertToObject(selectedProduct.hex_codes)"
                :hex-codes-prop="addProducteDialog.colors"
                @passHexcodes="passHexCodes"
              />
            </div>

            <v-card-actions>
              <v-btn
                color="error"
                type="button"
                @click="addProducteDialog.open = false"
              >
                الغاء
              </v-btn>

              <v-btn
                color="primary"
                type="submit"
                variant="tonal"
                :disabled="!selectedProduct || addProducteDialog.colors.length < 1"
                @click="onAddProductToOrder(selectedProduct as Product)"
              >
                إضافة
              </v-btn>
            </v-card-actions>
          </div>
        </v-dialog>

        <div class="mt-2 md:w-3/4 lg:w-2/5 rounded-l-xl bg-primary py-3 px-5 mb-6 text-xl">
          <div class="flex justify-between mb-2">
            <p>الإجمالي :</p>
            <p> {{ total }} د.ل</p>
          </div>

          <div class="flex justify-between mt-3">
            <p>تاريخ الدفع :</p>
            <p> {{ formatDate(orderDetails.order_details.due_date) }}</p>
          </div>

          <div v-if="orderDetails.order_details.payment_method == 'installments'">
            <div class="flex justify-between mt-3">
              <p> الإجمالي بعد الكوبون :</p>
              <p> {{ orderDetails.order_details.total_price_with_copupon }}</p>
            </div>

            <div class="flex justify-between mt-3">
              <p>معدل الفائدة :</p>
              <p> {{ orderDetails.order_details.debt_ratio }}</p>
            </div>

            <div
              class="grid gap-4 mt-8"
            >
              <div class="flex gap-3 justify-between mt-1">
                <v-text-field
                  v-model="debt_arrears"
                  label="متأخرات سداد الديون"
                  placeholder="متأخرات سداد الديون"
                  type="number"
                  variant="outlined"
                  :error-messages="errors.debt_arrears"
                  @input="convertToNumber"
                />
              </div>

              <div class="flex gap-x-3 justify-between mt-1">
                <v-text-field
                  v-model="paid_due_value"
                  label="المدفوع"
                  placeholder="المدفوع"
                  type="number"
                  variant="outlined"
                  :error-messages="errors.paid_due_value"
                  @input="convertToNumber"
                />
              </div>
              <div class="flex gap-3 justify-between mt-1">
                <v-text-field
                  v-model="residual_value"
                  label="الإجمالي بعد الإستحقاق"
                  placeholder="الإجمالي بعد الإستحقاق"
                  type="number"
                  variant="outlined"
                  :error-messages="errors.residual_value"
                  @input="convertToNumber"
                />
              </div>
            </div>
          </div>
        </div>

        <v-btn
          size="large"
          rounded="xl"
          variant="elevated"
          color="primary"
          type="submit"
          :loading="patchOrderMutation.isPending.value"
        >
          تحديث 
        </v-btn>
      </form>
    </template>
  </OrderDetails>
</template>
  
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import OrderDetails from "../components/OrderDetails.vue"
import DeleteIcon from "@/core/components/icons/DeleteIcon.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useQueryClient, useMutation, useQuery } from "@tanstack/vue-query";
import { patchOrder, getOrder } from "../orders-service";
import type { PatchOrderRequest } from "../models/order";
import { mdiArrowRight, mdiPencil, mdiPlusCircle } from "@mdi/js";
import { toTypedSchema } from "@vee-validate/zod";
import { number, object, string } from "zod";
import { formatDate } from "@/core/helpers/format-date"
import { useField, useForm } from "vee-validate";
import type { Product } from "@/products/models/product";
import { getProducts } from "@/products/products-service";
import ColorPickerDialog from "../components/ColorPickerDialog.vue";
import ColorPicker from "@/products/components/ColorPicker copy.vue";

import DeleteProductDialog from "../components/DeleteProductDialog.vue";

const quantityInputs = ref<any[]>([]);
const quantityInputsErrors = ref<boolean[]>([]);

const priceInputs = ref<number[]>([]);
const productCodes = ref<string[]>([]);
const color_selected = ref<string[][]>([]);

const products = ref<Product[]>([])
const productsOptions = ref<Product[]>([])
const selectedProduct = ref<Product>()

const addProducteDialog = ref<{
  open: boolean,
  colors: string [],
  productColors: string [] | null
}>({
  open: false,
  colors: [],
  productColors: null
})

const updateColorsDialog = ref<{
  open: boolean,
  colors: string [],
  index: number,
  productColors: string [] | null
}>({
  open: false,
  colors: [],
  index: 0,
  productColors: null
})

const deleteProducteDialog = ref<{
  open: boolean,
  product: Product | null,
  index: number
}>({
  open: false,
  product: null,
  index: 0
})

const route = useRoute();
const id = Number(route.params.id);

const { data: orderDetails} = useQuery({
  queryKey: ['orderDetails'],
  queryFn: () => getOrder(id)
})

const { data: productsList, isPending} = useQuery({
  queryKey: ['products'],
  queryFn: () => getProducts({page:1, limit: 200})
})

const queryClient = useQueryClient()
const patchOrderMutation = useMutation({
    mutationFn: ({ id, body }: { id: number, body: PatchOrderRequest, }) => patchOrder(id, body),
    onSuccess: () => {
        router.replace({ name: 'order-details' })
        queryClient.invalidateQueries({ queryKey: ['orderDetails'] })
    },
    onError: (error) => {
        console.log(error)
    }
})

const validationSchema = toTypedSchema(
  object({
    debt_arrears: number().optional(),
    residual_value: number().optional(),
    paid_due_value: number().optional(),
    total_price_with_copupon: number().optional(),
    debt_ratio: number().optional(),
    due_date: string().optional(),
  })
);

const { errors, setValues, handleSubmit } = useForm({
  validationSchema, 
  initialValues: {
    due_date: orderDetails.value?.order_details.due_date
  }
});

const { value: debt_arrears } = useField<number>('debt_arrears');
const { value: residual_value } = useField<number>('residual_value');
const { value: paid_due_value } = useField<number>('paid_due_value');
const { value: total_price_with_copupon } = useField<number>('total_price_with_copupon');
const { value: debt_ratio } = useField<number>('debt_ratio');

watchEffect(() => {
  if ( orderDetails.value) {
    setValues({
      debt_arrears: orderDetails.value.order_details.debt_arrears,
      paid_due_value: orderDetails.value.order_details.paid_due_value,
      residual_value: orderDetails.value.order_details.residual_value,
      total_price_with_copupon: orderDetails.value.order_details.total_price_with_copupon,
      debt_ratio: orderDetails.value.order_details.debt_ratio,
    })

    products.value = [...orderDetails.value.products];
    console.log(color_selected.value);
    color_selected.value = [...orderDetails.value.order_details.color_selected]
    console.log(color_selected.value);

    quantityInputs.value = [...orderDetails.value.order_details.quantity_selected]

    orderDetails.value.products.forEach((product) => {
      priceInputs.value.push(product.price)
      productCodes.value.push(product.product_code)
    })
  }
})

// const dialogQuestion = (title: string, id: string) => {
//     return `هل تريد حذف  ${title} من الطلبية  ${id} ؟`
// }

const onRemoveProduct = () => {
  const index = deleteProducteDialog.value.index
  const id = deleteProducteDialog.value.product?.id

  products.value = products.value!.filter(item => item.id !== id)
  quantityInputs.value.splice(index, 1)
  priceInputs.value.splice(index, 1)
  productCodes.value.splice(index, 1)

  color_selected.value.splice(index, 1)

  deleteProducteDialog.value.open = false
}

const total = computed(() => {
   return products.value.reduce((acc, product, currentIndex) => acc + (product.price * (quantityInputs.value[currentIndex] ?? 0)), 0)
})

const submit  = handleSubmit(values => {

  if (checkQuantitiesErrors()) {
    return
  }
 
    const body: PatchOrderRequest = {
      ...values,
      product_codes: productCodes.value,
      quantity_selected: quantityInputs.value,
      total_price: total.value,
      color_selected: color_selected.value
    }
    patchOrderMutation.mutate({ body, id })
})

const convertToNumber = () => {
  debt_arrears.value = Number(debt_arrears.value)
  residual_value.value = Number(residual_value.value)
  paid_due_value.value = Number(paid_due_value.value)
  total_price_with_copupon.value = Number(total_price_with_copupon.value)
  debt_ratio.value = Number(debt_ratio.value)
}

const convertQuantityToNumber = (index: number) => {
  quantityInputs.value[index] = Number(quantityInputs.value[index])
}

const onAddProductToOrder = (product: Product) => {

  quantityInputs.value.push(0)

  productCodes.value.push(product.product_code)
  console.log(color_selected.value);
  
  color_selected.value.push(addProducteDialog.value.colors)
  console.log(color_selected.value);
  products.value.push(product)

  addProducteDialog.value.colors = []
  selectedProduct.value = undefined
  addProducteDialog.value.open = false
}

const openDeleteProductDialog = (product: Product, index: number) => {
  deleteProducteDialog.value.open = true
  deleteProducteDialog.value.index = index
  deleteProducteDialog.value.product = product
}

const convertToObject = (hexCodesParam: any) => {
  if (typeof JSON.parse(hexCodesParam) == 'string' ) {
    return JSON.parse(JSON.parse(hexCodesParam)) as string[]   
  } 
  
 return JSON.parse(hexCodesParam) as string[]   
}

const openColorsDialog = (colors: string [], index: number, productHexcodes: string []) => {
  
  updateColorsDialog.value = {
    open: true,
    colors: colors,
    index: index,
    productColors: productHexcodes
  }
}

const onUpdateColors = (colors: string []) => {
  color_selected.value[updateColorsDialog.value.index] = colors
}

watchEffect(() => {
  if (productsList.value) {
    productsOptions.value = productsList.value.data.filter((item) => !products.value.some((s) => s.id === item.id));
  }
})


const checkQuantitiesErrors = (): boolean => {
  let hasErrors = false
  
  quantityInputs.value.forEach((input, index) => {
    if (input == '' || input < 1) {
      
      quantityInputsErrors.value[index] = true
      hasErrors = true
    } else {
      quantityInputsErrors.value[index] = false
      hasErrors = false
    }
  })

  return hasErrors
}
 
watchEffect(() => {
  checkQuantitiesErrors()
})

const passHexCodes = (hexColors: string []) => {
  addProducteDialog.value.colors = hexColors
}
  

</script>