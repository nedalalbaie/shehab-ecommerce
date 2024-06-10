<script setup lang="ts">
  import { logout } from "@/auth/auth-service";
  import {
    mdiLogout,
    mdiAccountMultiple,
    mdiTicketPercentOutline,
    mdiArchiveOutline,
    mdiShoppingOutline
    
  } from "@mdi/js";
  import ProductIcon from './icons/ProductIcon.vue';
  import CategoryIcon from "./icons/CategoryIcon.vue"
  import AdsIcon from "./icons/AdsIcon.vue"
  import Statistics from "./icons/StatisticsIcon.vue"
  import DiscountIcon from "./icons/DiscountIcon.vue"
  import OrderSvg from "./icons/OrderSvg.vue"
  import { ref } from "vue";
  import { useDisplay } from "vuetify";
  // import themeStore from "../stores/theme-store";

  // const theme = useTheme();
  const breakpoint = useDisplay();
  const drawer = ref(breakpoint.lgAndUp.value);

  // const toggleTheme = () => {
  //   themeStore.toggleTheme();
  //   theme.global.name.value = themeStore.theme;
  // };

  const onLogout = () => {
    logout();
  };

  const navRoutes = [
    { title: 'التصنيفات', icon: CategoryIcon, alt: 'Categories',  route: '/categories' },
    { title: 'إدارة الأقساط', icon: mdiAccountMultiple, alt: 'Installment', route: '/installments' },
    { title: 'الطلبات', icon: OrderSvg, alt: 'Orders', route: '/orders' },
    { title: 'الفواتير', icon: mdiTicketPercentOutline, alt: 'bills', route: '/bills' },
    { title: 'الزبائن', icon: mdiAccountMultiple, alt: 'Users', route: '/customers' },
    { title: 'الإعلانات', icon: AdsIcon, alt: 'Ads', route: '/ads' },
    { title: 'الإحصائيات', icon: Statistics, alt: 'statistics', route: '/' },
]

  const productCatalogRoutes = [
      { title: 'المحلات', icon: mdiShoppingOutline, alt: 'Products', route: '/markets' },
      { title: 'المنتجات', icon: ProductIcon, alt: 'Products', route: '/products' },
      { title: 'تفاصيل المنتجات', icon: ProductIcon, alt: 'Products Details', route: '/productsDetails' },
  ]

  // const categoriesRoutes = [
  //   { title: 'الأساسية', icon: CategoryIcon, alt: 'MainCategories',  route: '/mainCategories' },
   
  //   { title: ' الفرعية', icon: SubCategoryIcon, alt: 'Sub Categories',  route: '/subCategories' },
  // ]

  const promotionsRoutes = [
      { title: 'الكوبونات', icon: mdiTicketPercentOutline, alt: 'coupons', route: '/coupons' },
      { title: 'النخفيضات', icon: DiscountIcon, alt: 'discounts', route: '/discounts' },
  ]

</script>

<template>
  <v-layout class="rounded">
    <!-- <v-app-bar
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
    </v-app-bar> -->

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

        <!-- <v-list-group>
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
        </v-list-group> -->

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
          class="mt-1"
        >
          <v-list-item
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
        </div>

        <v-list-item
          class="mt-6"
          color="primary"
          link
          exact
          @click="onLogout"
        >
          <template #prepend>
            <v-icon :icon="mdiLogout" />
          </template>

          <v-list-item-title>   تسجيل الخروج</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="min-h-screen">
      <main class="max-w-[1400px] mx-auto px-6 py-10"> 
        <RouterView />
      </main>
    </v-main>
  </v-layout>
</template>
