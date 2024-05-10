<template>
  <svg
    width="14"
    height="11"
    :class="customStyle"
    viewBox="0 0 14 11"
    :fill="fill"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.75012 8.12738L1.62262 4.99988L0.557617 6.05738L4.75012 10.2499L13.7501 1.24988L12.6926 0.192383L4.75012 8.12738Z"
      :class="fill"
    />
  </svg>
</template>
<script setup lang="ts">
// eslint-disable-next-line
const props = defineProps<{ fill: string, customStyle?: string }>()
</script>