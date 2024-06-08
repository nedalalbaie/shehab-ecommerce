<script setup lang="ts">
defineProps<{
    title: string;
    icon: string | any;
    value: string | number;
    color: string;
}>();
</script>

<template>
  <div class="w-full p-2">
    <v-card class="h-[140px] w-full">
      <div class="flex justify-between items-center p-7">
        <div class="flex flex-col gap-3 items-start w-full">
          <div class="font-medium text-gray-500 max-w-[90%]">
            {{ title }}
          </div>

          <div class="font-bold text-2xl">
            {{ value }}
          </div>
        </div>

        <div
          class="px-3 py-3 rounded-lg bg-opacity-30"
          :class="color"
        >
          <v-icon :icon="icon" />
        </div>
      </div>
    </v-card>
  </div>
</template>
