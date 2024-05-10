<template>
  <OrderDetails
    :order="order.data.value!"
    @submit="handleSubmit"
  >
    <template #default>
      <div
        v-for="product in orderProducts"
        :key="product.id"
        class="grid grid-cols-3 items-start px-8 py-3"
      >
        <p class="border-b-2 border-neutral-600 pb-1 w-fit">
          {{ product.item }}
        </p>
        <v-text-field
          v-model="product.quantity"
          class="w-32"
          label="الكمية"
          type="number"
          variant="outlined"
          color="primary"
          placeholder="الكمية"
        />

        <div class="flex items-start gap-6">
          <v-text-field
            v-model="product.price"
            class="w-32"
            label="السعر"
            type="number"
            variant="outlined"
            color="primary"
            placeholder="السعر"
          />

          <v-dialog width="500">
            <template #activator="{ props }">
              <v-btn v-bind="props">
                <DeleteIcon
                  fill="fill-black"
                  custom-style="w-7 h-7 cursor-pointer"
                />
              </v-btn>
            </template>

            <template #default="{ isActive }">
              <v-card
                :title="dialogQuestion(product.item, product.id)"
                rounded="lg"
                color="#EFE9F5"
                style="padding-block: 1.75rem !important ;"
              >
                <v-card-text>
                  سيتم حذف عدد {{ product.quantity }} {{ product.quantity === 1 ? 'عنصر' : 'عناصر' }} بقيمة {{ product.price }} د.ل من هذه الطلبية.
                  لا يمكن التراجع عن هذه العملية.
                </v-card-text>

                <v-card-actions>
                  <v-spacer />

                  <v-btn
                    text="لا"
                    @click="isActive.value = false"
                  />
                  <v-btn
                    text="نعم"
                    @click="isActive.value = false"
                  />
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </div>
    </template>
  </OrderDetails>
</template>
  
<script setup lang="ts">
import { reactive } from "vue";
import OrderDetails from "../components/OrderDetails.vue"
import DeleteIcon from "@/core/components/icons/DeleteIcon.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useQueryClient, useMutation, useQuery } from "@tanstack/vue-query";
import { patchOrder, getOrder } from "../orders-service";
import type { PatchOrderRequest } from "../models/order";

const orderProducts = reactive([
    {
        id: 1,
        item: "سرير مواليد Happy Baby",
        quantity: 1,
        price: 199.0
    },
    {
        id: 2,
        item: "مناشف اطفال",
        quantity: 3,
        price: 20.0
    },
])

const dialogQuestion = (title: string, id: number) => {
    return `هل تريد حذف  ${title} من الطلبية  ${id} ؟`
}

const route = useRoute();
const id = Number(route.params.id);

const order = useQuery({
    queryKey: ['order'],
    queryFn: () => getOrder(id)
})

const queryClient = useQueryClient()
const patchOrderMutation = useMutation({
    mutationFn: ({ id, body }: { id: number, body: PatchOrderRequest, }) => patchOrder(id, body),
    onSuccess: () => {
        router.replace({ name: 'orders' })
        queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (error) => {
        console.log(error)
    }
})

const handleSubmit = (body: PatchOrderRequest) => {
    patchOrderMutation.mutate({ body, id })
}

</script>