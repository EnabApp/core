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
    "name": "SystemManagerApp",
    "title": "مدير النظام",
    "icon": "i-ci-settings-filled",
    "minWidth": 350,
    "minHeight": 300
  })
</script>