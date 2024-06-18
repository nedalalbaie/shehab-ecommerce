<template>
  <div>
    <v-carousel
      v-model="carousel"
      hide-delimiters
    >
      <v-carousel-item
        :src="`${storage}${product.image1_path}`"
        cover
      />
      <v-carousel-item
        :src="`${storage}${product.image2_path}`"
        cover
      />
      <v-carousel-item
        :src="`${storage}${product.image3_path}`"
        cover
      />
      <v-carousel-item
        :src="`${storage}${product.image4_path}`"
        cover
      />
    </v-carousel>

    <div class="custom-navigation">
      <img
        :class="styleSelectedImage(0)"
        :src="`${storage}${product.image1_path}`"
        @click="goToSlide(0)"
      >
      <img
        :class="styleSelectedImage(1)"
        :src="`${storage}${product.image2_path}`"
        @click="goToSlide(1)"
      >
      <img
        :class="styleSelectedImage(2)"
        :src="`${storage}${product.image3_path}`"
        @click="goToSlide(2)"
      >
      <img
        :class="styleSelectedImage(3)"
        :src="`${storage}${product.image4_path}`"
        @click="goToSlide(3)"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '../models/product'

defineProps<{
  product: Pick<Product, 'image1_path'| 'image2_path' | 'image3_path' | 'image4_path'>
}>()

const carousel = ref(0)
const storage = import.meta.env.VITE_API_Storage

const goToSlide = (index: number) => {
  carousel.value = index
}

const styleSelectedImage = (index: number) => {
  return carousel.value === index ? 'border-red-500' : 'border-white'
}
</script>

<style scoped>
.custom-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.custom-navigation img {
  height: 6rem;
  width: 6.5rem;
  cursor: pointer;
  margin: 0 2px;
  object-fit: cover;
  border-radius: 6px;
  border-width: 4px;
  border-style: solid;
  transition: all 150ms;
}
</style>
