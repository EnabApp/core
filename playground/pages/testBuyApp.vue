<template>

  <button @click="appManager.buyApp(2)">شراء حزمة</button>

</template>

<script setup>
import { useAppManager } from '#imports';
const appManager = useAppManager();
</script>
