<template>
  <Suspense>
    <AsyncCityView></AsyncCityView>
    <template #fallback>
      <p class="text-center text-white">Loading...</p>
    </template>
  </Suspense>
</template>

<script setup lang="ts"></script>
