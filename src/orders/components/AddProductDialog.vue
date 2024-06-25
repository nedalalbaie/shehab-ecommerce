<template>
  <v-dialog
    v-model="addProductDialog.open"
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
          :hex-codes-prop="addProductDialog.colors"
          @passHexcodes="passHexCodes"
        />
      </div>

      <v-card-actions>
        <v-btn
          color="error"
          type="button"
          @click="addProductDialog.open = false"
        >
          الغاء
        </v-btn>

        <v-btn
          color="primary"
          type="submit"
          variant="tonal"
          :disabled="!selectedProduct || addProductDialog.colors.length < 1"
          @click="emits('add-product')"
        >
          إضافة
        </v-btn>
      </v-card-actions>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Product } from '@/products/models/product';
import ColorPicker from "@/products/components/ColorPicker copy.vue";

defineProps<{
  productsOptions: Product [],
  isPending: boolean
}>()
const emits = defineEmits<{
  'add-product': [],
  passHexCodes:  [value: string []]
}>()

const passHexCodes = (hexCodes: string []) => {
  emits('passHexCodes', hexCodes)
}

const addProductDialog = defineModel<{
  open: boolean,
  colors: string [],
  productColors: string [] | null
}>('addProductDialog', {required: true})

const selectedProduct = defineModel<Product | undefined>('selectedProduct', {required: true})

const convertToObject = (hexCodesParam: any) => {
  if (typeof JSON.parse(hexCodesParam) == 'string' ) {
    return JSON.parse(JSON.parse(hexCodesParam)) as string[]   
  } 
 return JSON.parse(hexCodesParam) as string[]   
}

</script>