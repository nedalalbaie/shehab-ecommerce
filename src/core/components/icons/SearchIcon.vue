<template>
  <svg
    :class="props.customStyle"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.24 10.27L0.509998 16L2 17.49L7.73 11.76C8.8 12.53 10.09 13 11.5 13C15.09 13 18 10.09 18 6.5C18 2.91 15.09 0 11.5 0C7.91 0 5 2.91 5 6.5C5 7.91 5.47 9.2 6.24 10.27ZM11.5 2C13.99 2 16 4.01 16 6.5C16 8.99 13.99 11 11.5 11C9.01 11 7 8.99 7 6.5C7 4.01 9.01 2 11.5 2Z"
      fill="#4F4539"
    />
  </svg>
</template>
<script setup lang="ts">
const props = defineProps<{ customStyle: string }>()
</script>