<template>
  <v-dialog
    v-model="isOpen"
    class="w-2/5"
  >
    <v-card>
      <div class="p-7">
        <v-card-title>
          إضافة تخفيض للمنتج
          ({{ productName }})
        </v-card-title>

        <v-card-text>
          <v-autocomplete
            v-model="discountId"
            :hide-no-data="false"
            item-title="discount_value"
            item-value="id"
            :items="discounts"
            :loading="isPending"
            hide-selected
            label="التخفيضات"
            placeholder="التخفيضات"
            variant="outlined"
            color="primary"
            auto-select-first
            class=" mt-4"
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
            :loading="addProductDiscountMutation.isPending.value"
            color="primary"
            type="submit"
            variant="tonal"
            @click="onAddDiscount"
          >
            إضافة
          </v-btn>

          <v-btn
            color="error"
            type="button"
            @click="isOpen = false"
          >
            الغاء
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { addProductDiscount } from '../products-service';
import { getDiscounts } from '@/discounts/discounts-service';
import { ref } from 'vue';

const props = defineProps<{
  productId: number,
  productName: string
}>()

const isOpen = defineModel<boolean>({required: true})
const discountId = ref()

const { data: discounts, isPending} = useQuery({
  queryKey: ['discounts'],
  queryFn: () => getDiscounts({page:1, limit: 200})
})

const queryClient = useQueryClient()
const addProductDiscountMutation = useMutation({
    mutationFn: addProductDiscount,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        isOpen.value = false
    },
    onError: (error) => {
        console.log(error)
    }
})

const onAddDiscount = () => {
  const body = {
    id: props.productId,
    discount_id: discountId.value
  }
  addProductDiscountMutation.mutate(body)
}
</script>