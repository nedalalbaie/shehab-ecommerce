<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4 mt-6">
      <v-text-field
        v-model="code"
        label="كود التخفيض"
        variant="outlined"
        color="primary"
        placeholder="كود التخفيض"
        :error-messages="errors.code"
      />

      <v-autocomplete
        v-model="discount_type"
        :hide-no-data="false"
        item-title="label"
        item-value="value"
        :items="discountTypeOptions"
        hide-selected
        label="نوع التخفيض"
        placeholder="نوع التخفيض"
        variant="outlined"
        color="primary"
        auto-select-first
        :error-messages="errors.discount_type"
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
        v-model="amount"
        label="نسبة التخفيض"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="نسبة التخفيض"
        :error-messages="errors.amount"
        @input="convertAmountToNumber"
      />
    </div>

    <div class="flex gap-14 mt-10">
      <v-date-picker
        v-model="start_date"
        color="primary"
        header="تاريخ بداية التخفيض"
        :border="true"
        title=""
        show-adjacent-months
      />

      <v-date-picker
        v-model="end_date"
        color="primary"
        header="تاريخ إنتهاء التخفيض"
        :border="true"
        title=""
        show-adjacent-months
        height="550px"
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
        {{ editMode ? 'تعديل ' : 'حفظ ' }}
      </v-btn>
    </div>
  </form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField } from 'vee-validate';
import { object, string, literal, date } from 'zod';
import type { Discount, DiscountFormRequest } from "../models/discount";
import { discountTypeOptions } from "../models/discountType";
import { computed, watchEffect } from "vue";
import { formatToDatePicker, fromatDatePickerToDate } from '@/core/helpers/format-date';

const props = defineProps<{
  isLoading: boolean,
  discount?: Discount
}>()
const emit = defineEmits<{
  submit: [value: DiscountFormRequest]
}>()

const editMode = computed(() => !!props.discount)

const validationSchema = toTypedSchema(
  object({
    code: string().min(1, 'يجب إدخال كود الكوبون '),
    discount_type: literal('percentage').or(literal('fixed')),
    amount: string().min(1, 'يجب إدخال نسبة التخفيض  '),
    start_date: date(),
    end_date: date()
  })
);

const { handleSubmit, errors, meta, setValues } = useForm({
  validationSchema
});

const { value: code } = useField<string>('code');
const { value: discount_type } = useField<string>('discount_type');
const { value: amount } = useField<string>('amount');
const { value: start_date } = useField<Date>('start_date');
const { value: end_date } = useField<Date>('end_date');

watchEffect(() => {
  if (props.discount) {
    setValues({
      ...props.discount,
      start_date: formatToDatePicker(props.discount.start_date),
      end_date: formatToDatePicker(props.discount.end_date)
    })
  }
})

const submit = handleSubmit(values => {
  emit("submit", {
    ...values,
    start_date: fromatDatePickerToDate(values.start_date),
    end_date: fromatDatePickerToDate(values.end_date)
  })
})

const convertAmountToNumber = () => {
  amount.value = amount.value.toString()
}

</script>