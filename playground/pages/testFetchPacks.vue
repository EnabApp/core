<template>

  <button @click="appManager.fetchPacks()"> جلب الباقات</button>
  <div>
    {{appManager.getPacks}}
  </div>

</template>

<script setup>
import { useAppManager } from '#imports';
const appManager = useAppManager();
</script>
