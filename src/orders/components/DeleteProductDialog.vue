<template>
  <v-dialog
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
          @click="emits('remove-product')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Product } from '@/products/models/product';
import type { OrderDetails } from '../models/order-details';

defineProps<{
  orderDetails: OrderDetails
}>()
const emits = defineEmits<{
  'remove-product': []
}>()

const deleteProducteDialog = defineModel<{
  open: boolean,
  product: Product | null,
  index: number
}>({required: true})

const dialogQuestion = (title: string, id: string) => {
    return `هل تريد حذف  ${title} من الطلبية  ${id} ؟`
}

</script>