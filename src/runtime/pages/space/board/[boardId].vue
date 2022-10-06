<template>
    <NuxtLayout v-if="spaceStore.getSelectedSpace" name="space" :spaceData="spaceStore.getSelectedSpace" />
    <div v-else></div>
</template>

<script setup>
import { useSpace } from '../../../composables/useSpace'
const spaceStore = useSpace()


</script>