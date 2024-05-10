<template>
  <div class="grid grid-cols-productsCards gap-4">
    <div
      v-for="i in 4"
      :key="i"
      class="rounded-lg bg-white dark:bg-[#363636] shadow-lg dark:shadow-full-dark p-4 mt-7"
    >
      <div
        v-for="j in 5"
        :key="j"
        :class="j > 1 ? 'mt-5' : ''"
        class="skeleton w-full h-9 rounded-lg "
      />
    </div>
  </div>
</template>
  
  <style>
  .skeleton {
    background-color: #b33737;
    position: relative;
    animation: skeleton-pulse 1s linear alternate infinite;
  }
  
  @keyframes skeleton-pulse {
    0% {
      transform: scale(0.99);
      background-color: hsl(197, 10%, 73%);
    }
  
    100% {
      transform: scale(0.99);
      background-color: hsl(200, 20%, 95%);
      ;
    }
  }
  </style>