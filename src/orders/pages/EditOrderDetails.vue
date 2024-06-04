<template>
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
          class="grid grid-cols-4 items-start"
        >
          <p class="border-b-2 border-neutral-600 pb-1 w-fit">
            {{ product.name }}
          </p>
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

          <div />

          <div class="flex items-start gap-6">
            <!-- <v-text-field
              v-model="priceInputs[index]"
              class="w-32"
              label="السعر"
              type="number"
              variant="outlined"
              color="primary"
              placeholder="السعر"
            /> -->

            <p>
              {{ product.price }}
            </p>

            <v-dialog width="500">
              <template #activator="{ props }">
                <v-btn v-bind="props">
                  <DeleteIcon
                    fill="fill-black"
                    custom-style="w-7 h-7 cursor-pointer"
                  />
                </v-btn>
              </template>

              <template #default="{ isActive }">
                <v-card
                  :title="dialogQuestion(product.name, product.id)"
                  rounded="lg"
                  color="#EFE9F5"
                  style="padding-block: 1.75rem !important ;"
                >
                  <v-card-text>
                    سيتم حذف عدد {{ product.minimum_quantity }} {{ product.minimum_quantity === 1 ? 'عنصر' : 'عناصر' }} بقيمة {{ product.price }} د.ل من هذه الطلبية.
                    لا يمكن التراجع عن هذه العملية.
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />

                    <v-btn
                      text="لا"
                      @click="isActive.value = false"
                    />
                    <v-btn
                      text="نعم"
                      @click="onRemoveProduct(index, product.id); isActive.value = false"
                    />
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>

        <div class="flex justify-end">
          <v-btn
            size="small"
            rounded="xl"
            variant="elevated"
            color="#004C6B"
            @click="addProducteDialog.open = true"
          >
            إضافة منتج  
          </v-btn>
        </div>

        <v-dialog
          v-model="addProducteDialog.open"
          class="w-3/4 p-6"
        >
          <v-card>
            <v-card-title>إضافة منتج للطلب</v-card-title>

            <v-card-text>
              <v-autocomplete
                v-model="selectedProduct"
                :hide-no-data="false"
                item-title="name"
                item-value="id"
                :return-object="true"
                :items="productsList?.data"
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
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
                type="submit"
                variant="tonal"
                @click="onAddProductToOrder(selectedProduct as Product); addProducteDialog.open = false"
              >
                إضافة
              </v-btn>

              <v-btn
                color="error"
                type="button"
                @click="addProducteDialog.open = false"
              >
                الغاء
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <div class="mt-2 w-3/4 rounded-tl-lg bg-white shadow-md p-3 mb-6 text-xl">
          <div class="flex gap-8 mb-2">
            <p>الإجمالي :</p>
            <p> {{ total }} د.ل</p>
          </div>

          <div class="flex gap-8 mt-3">
            <p>تاريخ الدفع :</p>
            <p> {{ formatDate(orderDetails.order_details.due_date) }}</p>
          </div>

          <div v-if="orderDetails.order_details.payment_method == 'installments' ">
            <div class="flex gap-8 mt-3">
              <p> الإجمالي بعد الكوبون :</p>
              <p> {{ orderDetails.order_details.total_price_with_copupon }}</p>
            </div>

            <div class="flex gap-8 mt-3">
              <p>معدل الفائدة :</p>
              <p> {{ orderDetails.order_details.debt_ratio }}</p>
            </div>

            <div
              class="grid grid-cols-2 gap-4 mt-8"
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
          color="#004C6B"
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
import { mdiArrowRight } from "@mdi/js";
import { toTypedSchema } from "@vee-validate/zod";
import { number, object, string } from "zod";
import { formatDate } from "@/core/helpers/format-date"
import { useField, useForm } from "vee-validate";
import type { Product } from "@/products/models/product";
import { getProducts } from "@/products/products-service";

const quantityInputs = ref<any[]>([]);
const priceInputs = ref<number[]>([]);
const productCodes = ref<string[]>([]);
const color_selected = ref<string[]>([]);

const products = ref<Product[]>([])
const selectedProduct = ref<Product>()

const addProducteDialog = ref({
  open: false,
  productId: 0
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
    productCodes.value = JSON.parse(orderDetails.value.order_details.color_selected) as string[]

    quantityInputs.value = [...orderDetails.value.order_details.quantity_selected]

    orderDetails.value.products.forEach((product) => {
      priceInputs.value.push(product.price)
      productCodes.value.push(product.product_code)
    })
  }
})

const dialogQuestion = (title: string, id: number) => {
    return `هل تريد حذف  ${title} من الطلبية  ${id} ؟`
}

const onRemoveProduct = (index: number, id: number) => {
  products.value = products.value!.filter(item => item.id !== id)
  quantityInputs.value.splice(index, 1)
  priceInputs.value.splice(index, 1)
  productCodes.value.splice(index, 1)
}

const total = computed(() => {
   return products.value.reduce((acc, product, currentIndex) => acc + (product.price * (quantityInputs.value[currentIndex] ?? 0)), 0)
})

const submit  = handleSubmit(values => {

    const body: PatchOrderRequest = {
      ...values,
      product_codes: productCodes.value,
      quantity_selected: quantityInputs.value,
      total_price: total.value,
      color_selected: JSON.stringify(color_selected.value)
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
  productCodes.value.push(product.product_code)
  products.value.push(product)
}

</script>