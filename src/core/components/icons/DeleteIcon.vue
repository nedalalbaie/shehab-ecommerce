<template>
  <svg
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="customStyle"
  >
    <path
      d="M1.5 12.25C1.5 13.075 2.175 13.75 3 13.75H9C9.825 13.75 10.5 13.075 10.5 12.25V4.75C10.5 3.925 9.825 3.25 9 3.25H3C2.175 3.25 1.5 3.925 1.5 4.75V12.25ZM10.5 1H8.625L8.0925 0.4675C7.9575 0.3325 7.7625 0.25 7.5675 0.25H4.4325C4.2375 0.25 4.0425 0.3325 3.9075 0.4675L3.375 1H1.5C1.0875 1 0.75 1.3375 0.75 1.75C0.75 2.1625 1.0875 2.5 1.5 2.5H10.5C10.9125 2.5 11.25 2.1625 11.25 1.75C11.25 1.3375 10.9125 1 10.5 1Z"
      :class="fill"
    />
  </svg>
</template>
<script setup lang="ts">
// eslint-disable-next-line
const props = defineProps<{ fill: string, customStyle?: string }>()
</script>