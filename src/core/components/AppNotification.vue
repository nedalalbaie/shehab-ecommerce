<template>
  <v-snackbar
    v-model="alertStore.open"
    location="left top"
    :color="alertStore.type"
  >
    <div>
      <v-icon
        :icon="alertStore.icon"
        class="mx-2"
      />
      <p>{{ alertStore.message }}</p>
    </div>

    <template #actions>
      <v-btn
        :icon="mdiClose"
        @click="alertStore.clear()"
      />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js'
import alertStore from '../stores/alert.store'
</script>
