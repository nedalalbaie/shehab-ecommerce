<template>
  <form @submit.prevent="submit">
    <div class="grid gap-x-8 gap-y-2 mt-6 mb-4">
      <v-text-field
        v-model="name"
        class="lg:w-1/2"
        label="الإسم"
        variant="outlined"
        color="primary"
        placeholder="الإسم"
        :error-messages="errors.name"
      />
    </div>

    <p>
      ملاحطة: تاريخ بداية الإعلان يجب أن يكون أصغر من تاريخ النهاية .
    </p>

    <div class="flex gap-14 mt-6">
      <v-date-picker
        v-model="start_date"
        color="primary"
        header="تاريخ بداية الإعلان"
        :border="true"
        title=""
        show-adjacent-months
      />

      <v-date-picker
        v-model="end_date"
        color="primary"
        header="تاريخ إنتهاء الإعلان"
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

    <div class="mt-4">
      <v-switch
        v-model="show"
        :true-value="1"
        :false-value="0"
        inset
        :center-affix="true"
        color="primary"
        :label="show ? 'تعطيل' : 'تفعيل'"
        :error-messages="errors.show"
      />
      <p>
        {{ show ? ' الإعلان مفعل حالياً وسيظهر للمستخدمين' : 'الإعلان غير مفعل حاليا' }}
      </p>
    </div>

    <div
      v-if="!editMode"
      class="mt-8 lg:w-1/4"
    >
      <AdImageUpload @handle-image="handleImage" />
    </div>

    <div class="mt-6">
      <v-btn
        :disabled="isDisabled || startDateErrorMessage !== null"
        size="large"
        variant="elevated"
        color="primary"
        type="submit"
        :loading="props.isLoading"
      >
        {{ editMode ? 'تحديث ' : 'إضافة' }}
      </v-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField } from 'vee-validate';
import { object, string, date, union, literal } from 'zod';
import type { PostOrPatchAdRequest, Ad } from "../models/ads";
import { computed, ref, watchEffect } from "vue";
import AdImageUpload from "../components/AdImageUpload.vue"
import { formatToDatePicker, fromatDatePickerToDate } from '@/core/helpers/format-date';

const props = defineProps<{
  isLoading: boolean,
  ad?: Ad,
  editMode?: boolean
}>()
const emit = defineEmits<{
  submit: [value: PostOrPatchAdRequest]
}>()

const selectedImageState = ref<"filled" | "empty">("empty")
const imageFile = ref<File>()
const isDisabled = computed(() => !meta.value.valid || selectedImageState.value == "empty")

const startDateErrorMessage = ref<string | null>(null)

const validationSchema = toTypedSchema(
  object({
    name: string().min(1, 'يجب إدخال  إسم الإعلان '),
    show: union([
      literal(0),
      literal(1),
    ]),

    start_date: date() ,
    end_date: date()
  })
);

const { handleSubmit, errors, meta, setValues, values } = useForm({
  validationSchema,
  initialValues: {
    show: 0
  }
});

const { value: name } = useField<number>('name');
const { value: show } = useField<0 | 1>('show');
const { value: start_date } = useField<Date>('start_date');
const { value: end_date } = useField<Date>('end_date');

watchEffect(() => {
  if (props.ad) {
    setValues({
      ...props.ad,
      start_date: formatToDatePicker(props.ad.start_date),
      end_date: formatToDatePicker(props.ad.end_date)
    })

    selectedImageState.value = props.ad.url ? "filled" : "empty"
  }
})

const submit = handleSubmit(values => {
  emit("submit", {
    ...values,
    url:  props.editMode ? props.ad!.url : imageFile.value as File,
    start_date: fromatDatePickerToDate(values.start_date),
    end_date: fromatDatePickerToDate(values.end_date)
  })
})

const handleImage = (imageFileParam: File | null, state: "filled" | "empty") => {
  imageFile.value = imageFileParam as File
  selectedImageState.value = state
}

watchEffect(() => {
  if (values.start_date) {

    // if (editMode.value) {

    // }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0)
    
    if (values.start_date! < currentDate) {
       startDateErrorMessage.value = 'لا يمكن إختيار تاريخ أقل من تاريخ اليوم'
    }
    
  else if (values.end_date! <= values.start_date!) {
     startDateErrorMessage.value = 'تاريخ النهاية يجب أن يكون أكبر من تاريخ البداية '
  } else {
    startDateErrorMessage.value = null
  }

 }
})

</script>