<template>
  <h2 class="text-3xl font-medium">
    الأقساط
    <span
      v-if="installments && installments.total > 0"
      class="bg-gray-200 px-2 rounded-lg text-2xl"
    > {{ installments.total }}</span>
  </h2>
  <div class="flex justify-end mt-8">
    <!-- <div class="w-72">
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
    </div> -->

    <v-btn
      :append-icon="mdiPlus"
      :to="{ name: 'add-installment' }"
      color="primary"
      variant="elevated"
      rounded="xl"
      size="large"
    >
      إضافة قسط
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
      <template #[`item.show`]="{ item }">
        <v-chip
          :color="getStatusColor(item.show)"
        >
          {{ getStatusLabel(item.show) }}
        </v-chip>
      </template>

      <template #[`item.actions`]="{ item }">
        <div class="flex gap-1">
          <v-btn
            v-if="item.show == 1"
            :loading="deleteInstallmentMutation.isPending.value"
            variant="tonal"
            class="mx-1"
            density="comfortable"
            icon
            color="warning"
            @click="onDeleteInstallment(item.id)"
          >
            <v-icon :icon="mdiCancel" />
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              الغاء التفعيل
            </v-tooltip>
          </v-btn>
          <v-btn
            v-if="item.show == 0"
            :loading="deleteInstallmentMutation.isPending.value"
            variant="tonal"
            class="mx-1"
            density="comfortable"
            icon
            color="success"
            @click="onDeleteInstallment(item.id)"
          >
            <v-icon :icon="mdiCheck" />
            <v-tooltip
              activator="parent"
              location="bottom"
            >
              إعادة التفعيل
            </v-tooltip>
          </v-btn>
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>
  <script setup lang="ts">
  import { mdiCancel, mdiCheck, mdiPlus } from '@mdi/js'
  import { ref } from 'vue'
  import { getInstallments, deleteInstallment} from '../installment-service'
  import type { PaginationParams } from '@/core/models/pagination-params'
  import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
  import LoadingSkeleton from '@/core/components/LoadingSkeleton.vue'

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
    { title: 'العرض', value: 'show', key: 'show', width: '300px', sortable: false },
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

  const getStatusColor = (status: number) => {
  return status === 1 ? 'green-darken-4' : 'error'
}

const getStatusLabel = (status: number) => {
  return status === 1 ? 'مفعل' : 'غير مفعل'
}
  
  </script>
  