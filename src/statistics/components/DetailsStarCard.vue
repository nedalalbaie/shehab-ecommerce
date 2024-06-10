<script setup lang="ts">
import TopLeftArrowIcon from './icons/TopLeftArrowIcon.vue';

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
      <div class="flex gap-3 w-full p-7">
        <div>
          <div class="font-medium text-gray-500">
            {{ title }}
          </div>

          <div class="font-bold text-2xl">
            {{ value }} د.ل
          </div>
        </div>

        <div
          class="px-3 py-3 rounded-lg bg-opacity-30 flex gap-1 text-green-700"
          :class="color"
        >
          <p>%13.25</p>
          <v-icon :icon="TopLeftArrowIcon" />
        </div>
      </div>
    </v-card>
  </div>
</template>
