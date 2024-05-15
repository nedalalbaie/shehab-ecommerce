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

    <div class="lg:w-1/2 mt-12 lg:mt-0">
      <iframe
        class="w- h-[25rem]"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.3809451652833!2d39.19203125090872!3d21.531954875714302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3cfd4906639d9%3A0x3885f685a367999f!2z2YXYudmH2K8g2LPZgdix2KfYoSDYp9mE2LnZhNmFINmE2YTYqtiv2LHZitio!5e0!3m2!1sen!2sly!4v1677401828377!5m2!1sen!2sly"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
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
import { object, string, number } from 'zod';
import type { Market, MarketFormRequest } from "../models/market";
import { computed, watchEffect } from "vue";

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
        active_market: number(),
        location_link: string()
    })
);

const { handleSubmit, errors, meta, setValues } = useForm({
    validationSchema , 
    initialValues: {
      active_market: 1,
      location_link: "https://www.google.com"
    }
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
   console.log(values);
   
    emit("submit", values)
})

</script>