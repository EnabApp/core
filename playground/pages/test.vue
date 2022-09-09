<template>

<button @click="appManager.getSolvedConversations()">جلب المحادثات المحلوله</button>

</template>

<script setup>
import { useAppManager } from '#imports';
const appManager = useAppManager();
</script>
