<template>
  <form>
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
        type="number"
        variant="outlined"
        color="primary"
        placeholder="رقم الهاتف"
        :error-messages="errors.phone_number"
        @input="convertAmountToNumber"
      />

      <v-text-field
        v-model="email"
        label="الإيميل"
        variant="outlined"
        color="primary"
        placeholder="الإيميل"
        :error-messages="errors.email"
      />
    </div>

    <div class="mt-4">
      <v-switch
        v-model="is_trusted"
        :true-value="1"
        :false-value="0"
        inset
        :center-affix="true"
        color="primary"
        :label="is_trusted ? 'إالفاء التوثيق' : 'توثيق'"
        :error-messages="errors.is_trusted"
      />
      <p>
        {{ is_trusted ? 'الزبون موثق إضفط لإلغاء توثيقه' : 'غير موثق إضفط الزر للتوثيق' }}
      </p>
    </div>
  </form>

  <Form
    :initial-values="initialData"
    :validation-schema="schema"
    class="mt-10 w-1/2"
    @submit="onSubmit" 
  >
    <h2 class="text-2xl mb-4">
      العناوين
    </h2>
    {{ initialData.addresses }}
    <FieldArray
      v-slot="{ fields, push, remove }"
      name="addresses"
    >
      <div
        v-for="(fieldItem, index) in fields"
        :key="fieldItem.key"
        class="mt-6"
      >
        <div class="flex gap-4 w-full">
          <div class="w-full">
            <span>
              {{ index + 1 }} .
            </span>

            <Field
              :id="`addresses_${index}`"
              v-slot="{ field, errors: ypuErrors }"
              class="border h-12 outline-none w-full"
              :name="`addresses[${index}].address_name`"
            >
              <v-text-field
                v-model="field.value"
                v-bind="field"
                label="إسم العنوان"
                variant="outlined"
                color="primary"
                placeholder="إسم العنوان"
                :error-messages="ypuErrors"
              />
            </Field>
          
            <div class="flex gap-4">
              <Field
                :id="`addresses_${index}`"
                v-slot="{ field, errors: ypuErrors }"
                class="border h-12 outline-none w-full"
                :name="`addresses[${index}].city`"
              >
                <v-text-field
                  v-model="field.value"
                  v-bind="field"
                  label="المدينة"
                  variant="outlined"
                  color="primary"
                  placeholder="المدينة"
                  :error-messages="ypuErrors"
                />
              </Field>

              <Field
                :id="`addresses_${index}`"
                v-slot="{ field, errors: ypuErrors }"
                class="border h-12 outline-none w-full"
                :name="`addresses[${index}].neighbourhood`"
              >
                <v-text-field
                  v-model="field.value"
                  v-bind="field"
                  label="الشارع"
                  variant="outlined"
                  color="primary"
                  placeholder="الشارع"
                  :error-messages="ypuErrors"
                />
              </Field>
            </div>
          
            <Field
              :id="`addresses_${index}`"
              v-slot="{ field, errors: ypuErrors }"
              class="border h-12 outline-none w-full"
              :name="`addresses[${index}].description`"
            >
              <v-text-field
                v-model="field.value"
                v-bind="field"
                label="الوصف"
                variant="outlined"
                color="primary"
                placeholder="الوصف"
                :error-messages="ypuErrors"
              />
            </Field>
          </div>

          <v-btn
            v-if="index > 0"
            variant="text"
            class="mx-1"
            density="comfortable"
            icon
            color="error"
            @click="remove(index)"
          >
            <v-icon :icon="mdiDelete" />
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              حذف
            </v-tooltip>
          </v-btn>
        </div>

        <div
          v-if="fields.length! > 1 && (index + 1) !== fields.length"
          class="h-[1px] w-full bg-gray-300 my-6"
        />
      </div>

      <div
        class="mt-4"
        @click="push({ addresses: '' })"
      >
        <v-btn
          variant="text"
          class="mx-1"
          density="comfortable"
          icon
          color="primary"
        >
          <v-icon :icon="mdiPlus" />
          <v-tooltip
            activator="parent"
            location="bottom"
          >
            أضف
          </v-tooltip>
        </v-btn>
      </div>
    </FieldArray>


    <div class="mt-6">
      <v-btn
        :disabled="!meta.valid"
        size="large"
        rounded="xl"
        variant="elevated"
        color="primary"
        type="submit"
        :loading="props.isLoading"
      >
        حفظ
      </v-btn>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { number, object, string } from 'zod'
import type { Customer, EditCustomerBody } from '../models/customer'
import {  ref, watchEffect } from 'vue'
import type { Address, EditAddressBody } from '@/addresses/models/address'
import {
   mdiDelete
  } from '@mdi/js'

const props = defineProps<{
  isLoading: boolean
  customer?: Customer
  customerAddresses?: Address[]
}>()
const emit = defineEmits<{
  submit: [value: EditCustomerBody]
}>()

const validationSchema = toTypedSchema(
  object({
    name: string().min(1, 'يجب إدخال إسم الزبون '),
    phone_number: string().min(1, 'يجب إدخال  رقم الهاتف '),
    email: string().min(1, 'يجب إدخال الإيميل  '),
    is_trusted: number()
  })
)

const {  errors, meta, setValues, values: customerValues } = useForm({
  validationSchema
})

const { value: name } = useField<string>('name')
const { value: phone_number } = useField<string>('phone_number')
const { value: email } = useField<string>('email')
const { value: is_trusted } = useField<0 | 1>('is_trusted')

const convertAmountToNumber = () => {
  phone_number.value = phone_number.value.toString()
}

import { Form, FieldArray, Field } from 'vee-validate';
import { object as yupObject, string as yupString, array,
   StringSchema, ArraySchema, BooleanSchema, NumberSchema, type AnyObjectSchema, type AnySchema } from 'yup';
import {
  mdiPlus
} from "@mdi/js";

const initialData = ref({
  addresses: [
    {
      address_name: '',
      city: '',
      neighbourhood: '',
      description: ''
    }
  ]
});

type ConditionalSchema<T> = T extends string
  ? StringSchema
  : T extends number
  ? NumberSchema
  : T extends boolean
  ? BooleanSchema
  : T extends Record<any, any>
  ? AnyObjectSchema
  : T extends Array<any>
  ? ArraySchema<any, any>
  : AnySchema;

type Shape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};

const schema = yupObject<Shape<EditAddressBody>>({
}).shape({
  addresses: array()
    .of(
      yupObject().shape({
        address_name: yupString().required("العنوان مطلوب"),
        city: yupString().required("المدينة مطلوبة"),
        neighbourhood: yupString().required("الشارع مطلوب"),
        description: yupString().required("الوصف مطلوب"),
      })
    )
    .strict(),
})

const onSubmit = (values: any) => {
  if (!meta.value.valid) {
    return
  }
  
  emit('submit', {
    ...values,
    ...customerValues
  })
}

watchEffect(() => {
  if (props.customer) {
    setValues({
      ...props.customer,
      phone_number: props.customer.phone_number
    })
    console.log(initialData.value.addresses);
    initialData.value.addresses = props.customerAddresses as Address[]
    console.log(initialData.value.addresses);
    
  }
})

</script>
