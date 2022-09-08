<template>

<button @click="appManager.buyPack(1)">شراء حزمة</button>

</template>

<script setup>
import { useAppManager } from '#imports';
const appManager = useAppManager();
</script>
