<template>

<div>
  {{appManager.getPacks()}}
</div>
</template>

<script setup>
import { useAppManager } from '#imports'
const appManager = useAppManager()
appManager.fetchPacks()
console.log(appManager.getPacks)


</script>


