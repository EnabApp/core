<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAppManager } from "#imports";
const appStore = useAppManager();
appStore.addApp({
  name: "SystemManager",
  title: "مدير النظام",
  minWidth: 370,
  minHeight: 635,
});

appStore.addApp({
  name: "Support",
  title: "الدعم الفني",
  minWidth: 368,
  minHeight: 495,
});
</script>
