<template>
    <p>{{ id }}</p>
</template>

<script setup>
import { useSpace } from '../../composables/useSpace'
const spaceStore = useSpace()

// Space id can access from anywhere.
const id = spaceStore.getSpaceId
</script>