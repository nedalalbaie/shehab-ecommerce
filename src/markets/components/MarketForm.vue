<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-6">
      <v-text-field
        v-model="market_name"
        label="إسم المحل"
        variant="outlined"
        color="primary"
        placeholder="إسم المحل"
        :error-messages="errors.market_name"
      />

      <v-text-field
        v-model="owner_name"
        label="إسم مالك المحل"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="إسم مالك المحل"
        :error-messages="errors.owner_name"
      />

      <v-text-field
        v-model="phone_number"
        label="رقم الهاتف"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="نسبة الهاتف"
        :error-messages="errors.phone_number"
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
        {{ editMode ? 'تعديل المحل' : 'إضافة' }}
      </v-btn>
    </div>
  </form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField } from 'vee-validate';
import { object, string, number, date } from 'zod';
import type { Market, MarketFormRequest } from "../models/market";
import { computed, watchEffect } from "vue";
import { formatToDatePicker, fromatDatePickerToDate } from '@/core/helpers/format-date';

const props = defineProps<{
    isLoading: boolean,
    market?: Market
}>()
const emit = defineEmits<{
    submit: [value: MarketFormRequest]
}>()

const editMode = computed(() => !!props.market)

const validationSchema = toTypedSchema(
    object({
        market_name: string().min(1, 'يجب إدخال  إسم المحل '),
        owner_name: string().min(1, 'يجب إدخال إسم مالك المحل  '),
        phone_number: string().min(1, 'يجب إدخال رقم الهاتف  '),
    })
);

const { handleSubmit, errors, meta, setValues } = useForm({
    validationSchema
});

const { value: market_name } = useField<string>('market_name');
const { value: owner_name } = useField<string>('owner_name');
const { value: phone_number } = useField<string>('phone_number');

watchEffect(() => {
    if (props.market) {
        setValues({
            ...props.market
        })
    }
})

const submit = handleSubmit(values => {
    emit("submit", {
      ...values,
      active_market: 1,
      authenticated: 1,
      location_link: ""
    })
})

</script>