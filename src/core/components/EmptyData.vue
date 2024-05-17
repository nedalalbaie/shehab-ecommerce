<template>
  <div class="mt-8 flex flex-col items-center gap-4">
    <img
      src="../../assets/images/NoDataFound.png"
      alt="No data found"
      class="w-2/5"
    >
    <p class="text-2xl">
      لا توجد بيانات
    </p>
    <v-btn
      color="#424242"
      variant="elevated"
      @click="refetch"
    >
      إعادة المحاولة
    </v-btn>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  refetch: []
}>()

const refetch = () => emit("refetch")
</script>