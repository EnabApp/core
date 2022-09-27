<template>


  <div>
    {{ appManager.getApps }}
  </div>

</template>

<script setup>
import { useAppManager } from '#imports'
const appManager= useAppManager()
appManager.fetchLastSixApps()
console.log(appManager.getApps)

</script>


