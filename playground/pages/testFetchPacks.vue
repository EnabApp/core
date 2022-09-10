<template>

  <button @click="appManager.fetchPacks()"> جلب الباقات</button>

</template>

<script setup>
import { useAppManager } from '#imports';
const appManager = useAppManager();
</script>
