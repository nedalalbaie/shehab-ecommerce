<template>
  <div>
    <div class="flex justify-end">
      <v-btn
        :append-icon="mdiPlus"
        :to="{ name: 'add-ad' }"
        color="primary"
        size="large"
        rounded="xl"
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
      <div class="flex gap-4">
        <button class="bg-sky-200 py-1 px-2 rounded-md flex items-center gap-2">
          مفعل
          <CheckIcon fill="black" />
        </button>
        <button class="py-1 px-2 rounded-md flex items-center gap-2 border-2 border-gray-300">
          معطل
          <CheckIcon fill="black" />
        </button>
      </div>
    </div>

    <div v-if="!ads.data.value">
      <LoadingAds />
    </div>

    <div
      v-if="ads.data.value"
      class="mt-8"
    >
      <EmptyData v-if="ads.data.value.data.length === 0" />

      <div class="grid grid-cols-2 gap-6">
        <div
          v-for="ad in ads.data.value?.data"
          :key="ad.id"
          class="h-40 flex justify-between rounded-md shadow-md bg-white"
        >
          <div class="px-4 flex flex-col gap-8">
            <div>
              <div class="flex gap-2 text-2xl font-medium mt-4">
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

              <v-dialog
                width="500"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
  
                    rounded="xl"
                    variant="elevated"
                    color="#004C6B"
                    type="submit"
                  >
                    حذف
                    <template #prepend>
                      <DeleteIcon fill="fill-white" />
                    </template>
                  </v-btn>
                </template>

                <template #default="{ isActive }">
                  <v-card
                    :title="dialogQuestion(ad.name)"
                    rounded="lg"
                    color="#EFE9F5"
                    style="padding-block: 1.75rem !important ;"
                  >
                    <v-card-text>
                      سيتم الغاء هذا الإعلان بشكل نهائي .
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer />

                      <v-btn
                        text="لا"
                        @click="isActive.value = false"
                      />
                      <v-btn
                        text="نعم"
                        @click="isActive.value = false; onCancelAd(ad.id)"
                      />
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </div>
          </div>

          <div>
            <img
              :src="`${storage}/${ad.url}`"
              alt=""
              class="w-60 h-full object-cover object-center rounded-l-md"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
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

const storage = import.meta.env.VITE_API_Storage
  
const ads = useQuery({
  queryKey: ['ads'],
  queryFn: () => getAds()
})

const queryClient = useQueryClient()
const cancelAdMutation = useMutation({
  mutationFn: deleteAd,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['ads'] })
  },
  onError: (error) => {
    console.log(error)
  }
})

const onCancelAd = (id: number) => {
  cancelAdMutation.mutate(id)
}

const dialogQuestion = (orderCode: string) => {
  return `حذف الإعلان ${orderCode} ?`
}

</script>