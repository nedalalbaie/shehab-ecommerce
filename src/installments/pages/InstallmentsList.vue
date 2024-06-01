<template>
  <h2 class="text-3xl font-medium">
    الإستحقاقات
    <span
      v-if="installments && installments.total > 0"
      class="bg-gray-200 px-2 rounded-lg text-2xl"
    > {{ installments.total }}</span>
  </h2>
  <div class="flex justify-between mt-8">
    <div class="w-72">
      <v-text-field
        v-model="searchValue"
        label="البحث"
        variant="outlined"
        color="primary"
        clearable
        placeholder="البحث"
        density="compact"
        @input="handleSearch"
      />
    </div>
    <v-btn
      :append-icon="mdiPlus"
      :to="{ name: 'add-installment' }"
      color="primary"
      variant="elevated"
      rounded="xl"
    >
      إضافة إستحقاق
    </v-btn>
  </div>
  
  <LoadingSkeleton v-if="isPending" />
  
  <div
    v-if="installments"
    class="shadow-lg rounded-lg mt-4 border border-gray-200"
  >
    <v-data-table-server
      sticky
      :items-per-page="listParams.limit"
      :page="listParams.page"
      :headers="headers"
      :items-length="installments.total"
      :items="installments.data"
      :loading="isPending"
      @update:options="onTableOptionsChange({ page: $event.page, limit: $event.itemsPerPage })"
    >
      <template #[`item.actions`]="{ item }">
        <div class="flex gap-1">
          <v-dialog width="500">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="mx-1"
                density="comfortable"
                icon
                color="error"
              >
                <v-icon :icon="mdiDelete" />
                <v-tooltip
                  activator="parent"
                  location="bottom"
                >
                  حذف
                </v-tooltip>
              </v-btn>
            </template>
  
            <template #default="{ isActive }">
              <v-card
                :title="dialogQuestion('')"
                rounded="lg"
                color="#EFE9F5"
                style="padding-block: 1.75rem !important "
              >
                <v-card-text> سيتم حذف هذه الإستحقاق بشكل نهائي . </v-card-text>
  
                <v-card-actions>
                  <v-spacer />
  
                  <v-btn
                    text="لا"
                    @click="isActive.value = false"
                  />
                  <v-btn
                    text="نعم"
                    @click="
                      isActive.value = false;
                      onDeleteInstallment(item.id)
                    "
                  />
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>
  <script setup lang="ts">
  import { mdiPlus } from '@mdi/js'
  import { ref } from 'vue'
  import { getInstallments, deleteInstallment} from '../installment-service'
  import type { PaginationParams } from '@/core/models/pagination-params'
  import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
  import debounce from 'lodash.debounce'
  import LoadingSkeleton from '@/core/components/LoadingSkeleton.vue'
  import { mdiDelete } from '@mdi/js'
  
  const searchValue = ref('')
  const listParams = ref<PaginationParams & { search_value: string }>({
    page: 1,
    limit: 10,
    search_value: ''
  })
  
  const { data: installments, isPending} = useQuery({
    queryKey: ['installments', listParams],
    queryFn: () => getInstallments(listParams.value)
  })
  
  const headers = [
    { title: 'الأيام المتبقية', value: 'days_late', width: '300px', sortable: false },
    { title: 'النسبة', value: 'percentage', width: '300px', sortable: false },
    { title: 'العرض', value: 'show', width: '300px', sortable: false },
    { title: 'الإجرائات', key: 'actions', width: '300px', sortable: false }
  ]
  
  const queryClient = useQueryClient()
  
  
  const onTableOptionsChange = ({ page, limit }: PaginationParams) => {
    listParams.value = {
      ...listParams.value,
      page: page ?? 1,
      limit: limit ?? 10
    }
  }
  
  const handleSearch = debounce(() => {
    listParams.value.search_value = searchValue.value
  }, 300)
  
  const deleteInstallmentMutation = useMutation({
    mutationFn: deleteInstallment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['installments'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })
  
  const onDeleteInstallment = (id: number) => {
    deleteInstallmentMutation.mutate(id)
  }
  
  const dialogQuestion = (productCode: string) => {
    return `حذف الإستحقاق ${productCode}# ؟`
  }
  
  </script>
  