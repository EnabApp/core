<template>

  <button @click="appManager.buyApp(1)">شراء حزمة</button>

</template>

<script setup>
import { useAppManager } from '#imports';
const appManager = useAppManager();
</script>
