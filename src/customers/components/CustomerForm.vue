<template>
  <form @submit.prevent="submit">
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-6">
      <v-text-field
        v-model="name"
        label="إسم الزبون"
        variant="outlined"
        color="primary"
        placeholder="إسم الزبون"
        :error-messages="errors.name"
      />

      <v-text-field
        v-model="phone_number"
        label="رقم الهاتف"
        variant="outlined"
        color="primary"
        placeholder="رقم الهاتف"
        :error-messages="errors.phone_number"
      />

      <v-text-field
        v-model="email"
        label="الإيميل"
        type="number"
        variant="outlined"
        color="primary"
        placeholder="الإيميل"
        :error-messages="errors.email"
      />

      <v-text-field
        v-model="address"
        label="العنوان"
        type="text"
        variant="outlined"
        color="primary"
        placeholder="العنوان"
        :error-messages="errors.address"
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
        {{ editMode ? 'تعديل زبون' : 'إضافة زبون' }}
      </v-btn>
    </div>
  </form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField } from 'vee-validate';
import { object, string } from 'zod';
import type { Customer, CustomerFormRequest } from "../models/customer";
import { computed, watchEffect } from "vue";

const props = defineProps<{
  isLoading: boolean,
  customer?: Customer
}>()
const emit = defineEmits<{
  submit: [value: CustomerFormRequest]
}>()

const editMode = computed(() => !!props.customer)

const validationSchema = toTypedSchema(
  object({
    name: string().min(1, 'يجب إدخال إسم الزبون '),
    phone_number: string().min(1, 'يجب إدخال  رقم الهاتف '),
    email: string().min(1, 'يجب إدخال الإيميل  '),
    address: string().min(1, 'يجب إختيار العنوان')
  })
);

const { handleSubmit, errors, meta, setValues } = useForm({
  validationSchema
});

const { value: name } = useField<string>('name');
const { value: phone_number } = useField<number>('phone_number');
const { value: email } = useField<string>('email');
const { value: address } = useField<number>('address');

watchEffect(() => {
  if (props.customer) {
    setValues({
      ...props.customer
    })
  }
})

const submit = handleSubmit(values => {
  emit("submit", values)
})

</script>