<template>
  <v-layout
    class="rounded-md"
    style="direction: rtl;"
  >
    <v-navigation-drawer
      permanent
      width="100"
      color="secondary"
    >
      <v-divider />
      <div class="flex flex-col items-center ">
        <router-link
          v-for="(item, i) in navRoutes"
          :key="i"
          :to="item.route"
          class="mt-4 rounded-md p-2 hover:bg-red-200 "
        >
          <v-tooltip
            location="left center"
            offset="16px"
            :text="item.title"
            class="w-96"
          >
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                class="cursor-pointer" 
                size="38"
                :icon="item.icon"
                :value="item"
              />  
            </template>
          </v-tooltip>
        </router-link>
        <div
          class="cursor-pointer rounded-md hover:bg-red-200 p-2 mt-20"
          @click="logout"
        >
          <v-icon
            class="cursor-pointer" 
            size="38"
            :icon="mdiLogout"
          />
        </div>
      </div>
    </v-navigation-drawer>

    <v-main class="min-h-screen bg-[#FFF8F4]">
      <main class="max-w-[1400px] mx-auto px-6 py-10">
        <RouterView />
      </main>
    </v-main>
  </v-layout>
</template>
  
<script setup lang="ts">
import { mdiLogout } from "@mdi/js"
import { useTheme } from 'vuetify';
import { logout } from "@/auth/auth-service"
import themeStore from "@/core/stores/theme-store"
import ProductIcon from './icons/ProductIcon.vue';
import CategoryIcon from "./icons/CategoryIcon.vue"
import ReceiptIcon from "./icons/ReceiptIcon.vue"
import AdsIcon from "./icons/AdsIcon.vue"
import UserIcon from "./icons/UserIcon.vue"
import Statistics from "./icons/StatisticsIcon.vue"
import DiscountIcon from "./icons/DiscountIcon.vue"
import SubCategoryIcon from "./icons/SubCategoryIcon.vue"

import {
  mdiAccountMultiple,
  mdiTicketPercentOutline
} from "@mdi/js"

const theme = useTheme()

const toggleTheme = () => {
    themeStore.toggleTheme()
    theme.global.name.value = themeStore.theme
}

const navRoutes = [
    { title: 'المنتجات', icon: ProductIcon, alt: 'Products', route: '/products' },
    { title: 'التصنيفات', icon: CategoryIcon, alt: 'Categories',  route: '/categories' },
    { title: 'التصنيفات الفرعية', icon: SubCategoryIcon, alt: 'Sub Categories',  route: '/subCategories' },
    { title: 'الطلبات', icon: ReceiptIcon, alt: 'Orders', route: '/orders' },
    { title: 'الإعلانات', icon: AdsIcon, alt: 'Ads', route: '/ads' },
    { title: 'الزبائن', icon: mdiAccountMultiple, alt: 'Users', route: '/customers' },
    { title: 'الكوبونات', icon: mdiTicketPercentOutline, alt: 'coupons', route: '/coupons' },
    { title: 'الفواتير', icon: mdiTicketPercentOutline, alt: 'bills', route: '/bills' },
    { title: 'النخفيضات', icon: DiscountIcon, alt: 'discounts', route: '/discounts' },
    { title: 'الإحصائيات', icon: Statistics, alt: 'statistics', route: '/statistics' },
]

</script>
  
<style scoped>
a.router-link-active {
  background-color: #f4c691;
}
</style>