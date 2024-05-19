<!-- <template>
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
    { title: 'المحلات', icon: ProductIcon, alt: 'Products', route: '/markets' },
    { title: 'المنتجات', icon: ProductIcon, alt: 'Products', route: '/products' },
    { title: 'التصنيفات الأساسية', icon: CategoryIcon, alt: 'MainCategories',  route: '/mainCategories' },
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
</style> -->

<script setup lang="ts">
  import { logout } from "@/auth/auth-service";
  import {
    mdiAccountGroup,
    mdiFileSign,
    mdiFolderOpen,
    mdiLogout,
    mdiOfficeBuilding,
    mdiReceiptText,
    mdiThemeLightDark,
    mdiViewDashboard,
    mdiFaceAgent,
    mdiAccountMultiple,
    mdiTicketPercentOutline,
    mdiArchiveOutline,
    mdiShoppingOutline
    
  } from "@mdi/js";
  import ProductIcon from './icons/ProductIcon.vue';
  import CategoryIcon from "./icons/CategoryIcon.vue"
  import ReceiptIcon from "./icons/ReceiptIcon.vue"
  import AdsIcon from "./icons/AdsIcon.vue"
  import UserIcon from "./icons/UserIcon.vue"
  import Statistics from "./icons/StatisticsIcon.vue"
  import DiscountIcon from "./icons/DiscountIcon.vue"
  import SubCategoryIcon from "./icons/SubCategoryIcon.vue"
  import { ref, watchEffect } from "vue";
  import { useDisplay, useTheme } from "vuetify";
  import authStore from "../stores/auth.store";
  import themeStore from "../stores/theme-store";

  const theme = useTheme();
  const breakpoint = useDisplay();
  const drawer = ref(breakpoint.lgAndUp.value);

  const toggleTheme = () => {
    themeStore.toggleTheme();
    theme.global.name.value = themeStore.theme;
  };

  const onLogout = () => {
    logout();
  };

  const navRoutes = [
    { title: 'الطلبات', icon: ReceiptIcon, alt: 'Orders', route: '/orders' },
    { title: 'الإعلانات', icon: AdsIcon, alt: 'Ads', route: '/ads' },
    { title: 'الزبائن', icon: mdiAccountMultiple, alt: 'Users', route: '/customers' },
    { title: 'الفواتير', icon: mdiTicketPercentOutline, alt: 'bills', route: '/bills' },
    { title: 'الإحصائيات', icon: Statistics, alt: 'statistics', route: '/statistics' },
]

  const productCatalogRoutes = [
      { title: 'المحلات', icon: mdiShoppingOutline, alt: 'Products', route: '/markets' },
      { title: 'المنتجات', icon: ProductIcon, alt: 'Products', route: '/products' },
      // { title: 'تفاصيل المنتجات', icon: ProductIcon, alt: 'Products Details', route: '/productsDetails' },
  ]

  const categoriesRoutes = [
    { title: 'الأساسية', icon: CategoryIcon, alt: 'MainCategories',  route: '/mainCategories' },
    { title: 'الثانوية', icon: CategoryIcon, alt: 'Categories',  route: '/categories' },
    { title: ' الفرعية', icon: SubCategoryIcon, alt: 'Sub Categories',  route: '/subCategories' },
  ]

  const promotionsRoutes = [
      { title: 'الكوبونات', icon: mdiTicketPercentOutline, alt: 'coupons', route: '/coupons' },
      { title: 'النخفيضات', icon: DiscountIcon, alt: 'discounts', route: '/discounts' },
  ]

</script>

<template>
  <v-layout class="rounded">
    <v-app-bar
      flat
      color="primary"
    >
      <template #prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </template>
      <v-app-bar-title>متجر شهاب</v-app-bar-title>

      <template #append>
        <v-btn
          flat
          :icon="mdiThemeLightDark"
          @click="toggleTheme"
        />
        <v-btn
          flat
          icon
          @click="onLogout"
        >
          <v-icon :icon="mdiLogout" />
          <v-tooltip activator="parent">
            تسجيل الخروج
          </v-tooltip>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :permanent="breakpoint.lgAndUp.value"
      location="start"
    >
      <v-list nav>
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="mdiArchiveOutline"
              title="كاتالوج المنتجات"
            />
          </template>

          <v-list-item
            v-for="(item, i) in productCatalogRoutes"
            :key="i"
            :value="item"
            color="primary"
            link
            exact
            :to="item.route"
          >
            <template #prepend>
              <v-icon :icon="item.icon" />
            </template>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="mdiArchiveOutline"
              title="التصنيفات"
            />
          </template>

          <v-list-item
            v-for="(item, i) in categoriesRoutes"
            :key="i"
            :value="item"
            color="primary"
            link
            exact
            
            :to="item.route"
          >
            <template #prepend>
              <v-icon :icon="item.icon" />
            </template>
            <div class="flex">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </div>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="mdiArchiveOutline"
              title="الخصومات"
            />
          </template>

          <v-list-item
            v-for="(item, i) in promotionsRoutes"
            :key="i"
            :value="item"
            color="primary"
            link
            exact
            :to="item.route"
          >
            <template #prepend>
              <v-icon :icon="item.icon" />
            </template>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <div
          v-for="(item, i) in navRoutes" 
          :key="i"
        >
          <v-list-item
            :value="item"
            color="primary"
            link
            exact
            rounded="shaped"
            :to="item.route"
          >
            <template #prepend>
              <v-icon :icon="item.icon" />
            </template>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-main class="min-h-screen">
      <main class="max-w-[1400px] mx-auto px-6 py-10"> 
        <RouterView />
      </main>
    </v-main>
  </v-layout>
</template>
