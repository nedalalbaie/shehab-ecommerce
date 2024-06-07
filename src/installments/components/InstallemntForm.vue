<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-6">
      <v-text-field
        v-model="days_late"
        label="الأيام المتبقية"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="الأيام المتبقية"
        :error-messages="errors.days_late"
        @input="convertDaysToNumber"
      />

      <v-text-field
        v-model="percentage"
        label="النسبة"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="النسبة"
        :error-messages="errors.percentage"
        @input="convertPercentageToNumber"
      />
    </div>

    <div>
      <v-switch
        v-model="show"
        :true-value="1"
        :false-value="0"
        inset
        :center-affix="true"
        color="primary"
        :label="show ? 'إخفاء' : 'عرض'"
        :error-messages="errors.show"
      />
      <!-- <p>
        {{ show ? 'الزبون موثق إضفط لإلغاء توثيقه' : 'غير موثق إضفط الزر للتوثيق' }}
      </p> -->
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
        إضافة
      </v-btn>
    </div>
  </form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { object, number } from 'zod'
import type { Installment } from '../models/installment'

type InstallmentForm = Omit<Installment, 'id'>

const props = defineProps<{
  isLoading: boolean
}>()
const emit = defineEmits<{
  submit: [value: InstallmentForm]
}>()

const validationSchema = toTypedSchema(
  object({
    days_late: number().min(1, 'يجب إدخال الأيام المطلوبة'),
    percentage: number().min(1, 'يجب إدخال النسبة'), // percentage must not be greater than 1000
    show: number()
  })
)

const { handleSubmit, errors, meta } = useForm({
  validationSchema, initialValues: {
    show: 1
  }
})

const { value: days_late } = useField<number>('days_late')
const { value: percentage } = useField<number>('percentage')
const { value: show } = useField<0 | 1>('show')

const convertDaysToNumber = () => {
  days_late.value = Number(days_late.value)
}

const convertPercentageToNumber = () => {
  percentage.value = Number(percentage.value)
}

const submit = handleSubmit((values) => {
  console.log(values)

  emit('submit', values)
})
</script>
