<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { computed, ref, watch, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: string | unknown
    variant?: 'outlined' | 'filled'
    errorMessages?: string
    density?: 'default' | 'comfortable' | 'compact'
    disabled?: boolean
  }>(),
  {
    variant: 'filled',
    density: 'default',
    disabled: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const date = ref<{
  day: string | null
  month: string | null
  year: string | null
}>({
  day: null,
  month: null,
  year: null
})

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      const dateValue = parseISO(value as string)
      date.value = {
        day: dateValue.getDate().toString(),
        month: (dateValue.getMonth() + 1).toString(),
        year: dateValue.getFullYear().toString()
      }
    }

    if (value === '') {
      date.value = {
        day: null,
        month: null,
        year: null
      }
    }
  },
  { immediate: true }
)

const isError = computed(() => {
  return Boolean(props.errorMessages?.length)
})

const onInput = () => {
  if (
    isNaN(Number(date.value.day)) ||
    isNaN(Number(date.value.month)) ||
    isNaN(Number(date.value.year))
  ) {
    emit('update:modelValue', null)
    return
  }

  const day = Number(date.value.day)
  const month = Number(date.value.month)
  const year = Number(date.value.year)

  const isDayValid = day && day > 0 && day < 32
  const isMonthValid = month && month > 0 && month < 13
  const isYearValid = year && year > 0 && year.toString().length === 4

  if (isDayValid && isMonthValid && isYearValid) {
    const dateValue = new Date(year!, month! - 1, day!)
    emit('update:modelValue', format(dateValue, 'yyyy-MM-dd'))
  } else {
    emit('update:modelValue', null)
  }
}

watchEffect(() => {
  if (date.value.day ) {
    onInput()
  }
})

watchEffect(() => {
  if (date.value.month ) {
    onInput()
  }
})

// watch(
//   () => date.value.month,
//   (month) => {
//     if (month) {
      
//        onInput()
//     }
//   }
// )

</script>

<template>
  <div class="w-full">
    <v-label class="mb-1">
      {{ label }}
    </v-label>
    <div class="grid grid-cols-3 gap-1">
      <v-select
        v-model="date.day"
        label="اليوم"
        name="day"
        :density="density"
        :variant="variant"
        :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]"
        :error="isError"
        hide-details
      />

      <!-- <v-text-field
        v-model="date.day"
        :density="density"
        :disabled="disabled"
        hide-details
        :variant="variant"
        :error="isError"
        label="اليوم"
        name="day"
        @input="onInput"
      /> -->
      <v-select
        v-model="date.month"
        label="الشهر"
        name="month"
        :density="density"
        :variant="variant"
        :items="[1,2,3,4,5,6,7,8,9,10,11,12]"
        :error="isError"
        hide-details
      />

      <!-- <v-text-field
        v-model="date.month"
        :density="density"
        :disabled="disabled"
        hide-details
        :error="isError"
        :variant="variant"
        label="الشهر"
        name="month"
        @input="onInput"
      /> -->
      <v-text-field
        v-model="date.year"
        :density="density"
        :disabled="disabled"
        hide-details
        :error="isError"
        :variant="variant"
        label="السنة"
        name="year"
        @input="onInput"
      />
    </div>
    <v-messages
      class="mt-2 px-4 opacity-100"
      :messages="errorMessages"
      color="error"
      :active="isError"
    />
  </div>
</template>
