<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-6">
      <v-text-field
        v-model="coupon_code"
        label="كود الكوبون"
        variant="outlined"
        color="primary"
        placeholder="كود الكوبون"
        :error-messages="errors.coupon_code"
      />

      <v-text-field
        v-model="limit"
        label="الحد الأعلي"
        variant="outlined"
        color="primary"
        placeholder="الحد الأعلي"
        :error-messages="errors.limit"
        @keydown="validatePositiveNumbers"
      />

      <v-text-field
        v-model="discount_percentage"
        label="نسبة التخفيض"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="نسبة التخفيض"
        :error-messages="errors.discount_percentage"
      />

      <div class="mt-8">
        <v-date-picker
          v-model="expire_date"
          color="primary"
          header="إنتهاء الصلاحية"
          :border="true"
          title=""
          show-adjacent-months
        />
      </div>
    </div>

    <p
      v-if="startDateErrorMessage"
      class="text-red-600 text-sm mt-1 duration-150"
    >
      {{ startDateErrorMessage }}
    </p>

    <div class="mt-3">
      <v-btn
        :disabled="!meta.valid || startDateErrorMessage !== null"
        size="large"
        variant="elevated"
        color="primary"
        type="submit"
        :loading="props.isLoading"
      >
        {{ editMode ? 'تحديث' : 'إضافة' }}
      </v-btn>
    </div>
  </form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField } from 'vee-validate';
import { object, string, date } from 'zod';
import type { Coupon, CouponFormRequest } from "../models/coupon";
import { computed, ref, watchEffect } from "vue";
import { formatToDatePicker, fromatDatePickerToDate } from '@/core/helpers/format-date';
import { validatePositiveNumbers } from '@/core/helpers/onlyPositiveNumbersRegex';

const props = defineProps<{
    isLoading: boolean,
    coupon?: Coupon
}>()
const emit = defineEmits<{
    submit: [value: CouponFormRequest]
}>()

const editMode = computed(() => !!props.coupon)
const startDateErrorMessage = ref<string | null>(null)

const validationSchema = toTypedSchema(
    object({
        coupon_code: string().min(1, 'يجب إدخال كود الكوبون '),
        limit: string().min(1, 'يجب إدخال  الحد الأعلي  ')
        .max(4, "يجب أن لا يكون أكثر من 10 ألاف"),
        discount_percentage: string()
        .min(1, 'يجب إدخال نسبة التخفيض  ')
        .max(3, "يجب أن لا يكون أكثر من 3 أرقام")
        
        ,
        expire_date: date()
    })
);

const { handleSubmit, errors, meta, setValues, values } = useForm({
    validationSchema
});

const { value: coupon_code } = useField<string>('coupon_code');
const { value: limit } = useField<string>('limit');
const { value: discount_percentage } = useField<string>('discount_percentage');
const { value: expire_date } = useField<string>('expire_date');

watchEffect(() => {
    if (props.coupon) {
        setValues({
            ...props.coupon,
           limit: String(props.coupon.limit),
           expire_date: formatToDatePicker(props.coupon.expire_date)
        })
    }
})

watchEffect(() => {
  if (values.expire_date) {
    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0)
    
    if (values.expire_date < currentDate) {
       startDateErrorMessage.value = 'لا يمكن إختيار تاريخ أقل من تاريخ اليوم'
    } else {
      startDateErrorMessage.value = null
    }
  }
})

const submit = handleSubmit(values => {
    emit("submit", {
      ...values,
      limit: Number(values.limit), 
      expire_date: fromatDatePickerToDate(values.expire_date)
    })
})

</script>