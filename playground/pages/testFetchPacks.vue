<template>

  <div>
    {{appManager.getPacks}}
  </div>

</template>

<script setup>
import { useAppManager } from '#imports';
const appManager = useAppManager();
await appManager.fetchPacks()
console.log(appManager.getPacks)
</script>
