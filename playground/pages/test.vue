<template>

<button @click="appManager.fetch()">جلب التطبيقات </button>

</template>

<script setup>
import { useAppManager } from '#imports';
const appManager = useAppManager();
</script>
