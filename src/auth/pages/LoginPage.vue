<template>
  <div class="px-6 py-4 max-w-[500px] mx-auto min-h-screen flex flex-col justify-center">
    <form @submit.prevent="submit">
      <img
        src="../../assets/images/panda.png"
        alt="logo"
        class="w-logo mx-auto mb-6"
      >
      <v-text-field
        v-model="email"
        label="الإيميل الإلكتروني"
        variant="outlined"
        color="primary"
        class="mt-2"
        placeholder="الإيميل الإلكتروني"
        :error-messages="errors.email"
      />

      <v-text-field
        v-model="password"
        label="كلمة السر"
        variant="outlined"
        color="primary"
        class="mt-2"
        placeholder="كلمة السر"
        :error-messages="errors.password"
      />

      <!-- <div class="flex justify-between w-full">
        <v-checkbox
          v-model="enabled"
          label="تذكرني "
        />
         <p class="mt-4">
          نسيت كلمة المرور؟
        </p> 
      </div> -->

      <div class="flex justify-center items-center">
        <v-btn
          :disabled="!meta.valid"
          size="large"
          variant="elevated"
          color="primary"
          type="submit"
          class="mt-3 w-full"
          rounded="xl"
          :loading="loginMutation.isPending.value"
        >
          تسجيل الدخول  
        </v-btn>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField } from 'vee-validate';
import * as zod from 'zod';
import { useMutation } from '@tanstack/vue-query'
import { login } from '../auth-service';
import router from '@/router';

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().min(1, 'يجب إدخال  الإيميل الإلكتروني '),
    password: zod.string().min(1, 'يجب إدخال كلمة السر '),
    enabled: zod.optional(zod.boolean())
  })
);

const { handleSubmit, errors, meta } = useForm({
  validationSchema,
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');
const { value: enabled } = useField<boolean>('enabled');

const loginMutation = useMutation({
  mutationFn: login,
  onSuccess: () => {
    router.replace('/')
  },
  onError: (error) => {
    console.log(error)
  }
})

const submit = handleSubmit(values => {
   loginMutation.mutate(values)
  
})

</script>