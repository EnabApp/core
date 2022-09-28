<template>

  <div>
    {{appManager.getApps}}
  </div>

</template>

<script setup>
import { useAppManager } from '#imports'
const appManager = useAppManager()
appManager.fetchTheSixMostDownloadedApps()
console.log(appManager.getApps)

</script>


