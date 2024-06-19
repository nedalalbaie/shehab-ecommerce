<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4 mt-6">
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
        v-model="discount_value"
        label="قيمة التخفيض"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="قيمة التخفيض"
        :error-messages="errors.discount_value"
        @input="convertAmountToNumber"
      />
    </div>

    <p class="mt-6">
      ملاحطة: تاريخ بداية التخفيض يجب أن يكون أصغر من تاريخ النهاية .
    </p>

    <div class="flex gap-14 mt-6">
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

    <p
      v-if="startDateErrorMessage"
      class="text-red-600 text-sm mt-1 duration-150"
    >
      {{ startDateErrorMessage }}
    </p>

    <div class="mt-6">
      <v-btn
        :disabled="!meta.valid || startDateErrorMessage !== null"
        size="large"
        variant="elevated"
        color="primary"
        type="submit"
        :loading="props.isLoading"
      >
        {{ editMode ? 'تحديث ' : 'إضافة ' }}
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
import { computed, ref, watchEffect } from "vue";
import { formatToDatePicker, fromatDatePickerToDate } from '@/core/helpers/format-date';

const props = defineProps<{
  isLoading: boolean,
  discount?: Discount
}>()
const emit = defineEmits<{
  submit: [value: DiscountFormRequest]
}>()

const editMode = computed(() => !!props.discount)
const startDateErrorMessage = ref<string | null>(null)

const validationSchema = toTypedSchema(
  object({
    discount_type: literal('percentage').or(literal('fixed')),
    discount_value: string().min(1, 'يجب إدخال قيمة التخفيض  '),
    start_date: date(),
    end_date: date()
  })
);

const { handleSubmit, errors, meta, setValues, values } = useForm({
  validationSchema
});

const { value: discount_type } = useField<string>('discount_type');
const { value: discount_value } = useField<string>('discount_value');
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

watchEffect(() => {
  if (values.start_date) {
    
    const currentDate = new Date();
    
    if (values.start_date < currentDate) {
       startDateErrorMessage.value = 'لا يمكن إختيار تاريخ أقل من تاريخ اليوم'
    }
  
    else if (values.end_date! <= values.start_date!) {
       startDateErrorMessage.value = 'تاريخ النهاية يجب أن يكون أكبر من تاريخ البداية '
    } else {
      startDateErrorMessage.value = null
    }
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
  discount_value.value = discount_value.value.toString()
}

</script>