<template>
  <div class="rounded-lg bg-white dark:bg-[#363636] shadow-lg dark:shadow-full-dark p-4 mt-7">
    <div class="flex justify-around">
      <div class="skeleton w-full h-9 rounded-lg m-2" />
    </div>
    <div
      v-for="i in 2"
      :key="i"
      class="flex justify-around items-center mt-4"
    >
      <div
        v-for="j in 4"
        :key="j"
        class="skeleton w-80 h-9 rounded-lg m-2"
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
