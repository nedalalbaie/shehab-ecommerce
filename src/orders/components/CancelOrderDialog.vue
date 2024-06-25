<template>
  <v-dialog
    v-if="order.status != STATUS.CANCELD"
    v-model="open"
    class="w-3/5"
  >
    <v-card
      :title="dialogQuestion(order.order_number)"
      rounded="lg"
      style="padding-block: 1.75rem !important ;"
    >
      <v-card-text>
        سيتم الغاء هذه الطلبية بشكل نهائي، سيتلقى الزبون اشعارا يوضح ان الطلبية تم الغاؤها.
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          text="لا"
          color="error"
          type="button"
          @click="open = false"
        />
        <v-btn
          color="primary"
          variant="tonal"
          :loading="isLoading"
          text="نعم"
          @click="closeDialog"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Order } from '../models/order';
import { STATUS } from '../models/status';

const open = defineModel<boolean>({required: true})

defineProps<{
  order: Order,
  isLoading: boolean
}>()

const emit = defineEmits<{
  'cancelOrder': []
}>()

const dialogQuestion = (orderCode: string) => {
  return `إلغاء الطلبية ${orderCode} ؟`
}

const closeDialog = () => {
  emit('cancelOrder')
}
</script>