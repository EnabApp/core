<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  import { useAppManager } from '#imports';
  const appStore = useAppManager()
  appStore.addApp({
    "name": "SystemManager",
    "title": "مدير النظام",
    "minWidth": 350,
    "minHeight": 300
  })
</script>