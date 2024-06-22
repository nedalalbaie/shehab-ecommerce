<template>
  <div>
    <div class="flex justify-end">
      <v-btn
        :append-icon="mdiPlus"
        :to="{ name: 'add-ad' }"
        color="primary"
        rounded="xl"
        size="large"
        variant="elevated"
      >
        إضافة إعلان
      </v-btn>
    </div>
    <div class="flex items-center justify-between mt-8">
      <h1 class="text-3xl">
        الإعلانات
        <span>(3)</span>
      </h1>
      
      <AddsStatusFilters v-model="show" />
    </div>

    <div v-if="!ads.data.value">
      <LoadingAds />
    </div>

    <div
      v-if="ads.data.value"
      class="mt-8"
    >
      <EmptyData v-if="ads.data.value.data.length === 0" />

      <div class="grid gap-6">
        <div
          v-for="ad in ads.data.value?.data"
          :key="ad.id"
          class="h-40 flex justify-between rounded-md shadow-md bg-white"
        >
          <div class="px-4 flex flex-col gap-8">
            <div>
              <div class="flex gap-2 text-xl font-normal mt-4">
                <p>{{ ad.name }}</p>
                <p class="text-green-700">
                  - {{ ad.show === 1 ? "مفعل" : "معطل" }}
                </p>
              </div>
            </div>

            <div class="flex gap-5 py-4">
              <v-btn
                rounded="xl"
                variant="elevated"
                color="primary"
                :to="{name: 'edit-ad', params: {id: ad.id}}"
              >
                تعديل
                <template #prepend>
                  <EditIcon />
                </template>
              </v-btn>

              <v-btn
                rounded="xl"
                variant="elevated"
                color="error"
                type="submit"
                @click="openDeleteDialog(ad)"
              >
                حذف
                <template #prepend>
                  <DeleteIcon fill="fill-white" />
                </template>
              </v-btn>
            </div>
          </div>

          <div>
            <img
              :src="ad.url"
              alt=""
              class="w-60 h-full object-cover object-center rounded-l-md"
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <v-dialog
    v-model="deleteAdDialog.open"
    width="500"
  >
    <v-card
      :title="dialogQuestion()"
      rounded="lg"
      color="#EFE9F5"
      style="padding-block: 1.75rem !important ;"
    >
      <v-card-text>
        لا يمكن التراجع عن هذه العملية.
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          text="لا"
          @click="deleteAdDialog.open = false"
        />
        <v-btn
          :loading="cancelAdMutation.isPending.value"
          text="نعم"
          @click=" onCancelAd()"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { getAds, deleteAd } from "../ads-service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import EditIcon from "@/core/components/icons/EditIcon.vue";
import DeleteIcon from "@/core/components/icons/DeleteIcon.vue";
import CheckIcon from "@/core/components/icons/CheckIcon.vue";
import {
    mdiPlus
} from '@mdi/js'
import LoadingAds from "../components/LoadingAds.vue"
import EmptyData from "@/core/components/EmptyData.vue";
import { ref } from "vue";
import type { Ad } from "../models/ads";
import AddsStatusFilters from "../components/AddsStatusFilters.vue";

const deleteAdDialog = ref<{
  open: boolean,
  ad: Ad | null
}>({
 open: false,
 ad: null
})

const show = ref<1| 0>(1)
  
const ads = useQuery({
  queryKey: ['ads', show],
  queryFn: () => getAds(show.value)
})

const queryClient = useQueryClient()
const cancelAdMutation = useMutation({
  mutationFn: deleteAd,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['ads'] })
    deleteAdDialog.value.open = false
  },
  onError: (error) => {
    console.log(error)
  }
})

const openDeleteDialog = (ad: Ad) => {
  deleteAdDialog.value = {
    open: true,
    ad: ad
  }
}

const onCancelAd = () => {
  cancelAdMutation.mutate(deleteAdDialog.value.ad!.id)
}

const dialogQuestion = () => {
  return `حذف إعلان "${deleteAdDialog.value.ad!.name}" ؟`
}

</script>