<template>

  <button @click="appManager.buyPlan(2)">شراء خطة اقتصادية</button>

</template>

<script setup>
import { useAppManager } from '#imports';
const appManager = useAppManager();
</script>
