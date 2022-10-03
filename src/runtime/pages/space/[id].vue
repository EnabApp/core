<template>
    <p>
        {{ id }}
        <br />
        {{ space ? 'found' : 'not found' }}
    </p>
</template>

<script setup>
import { useSpace } from '../../composables/useSpace'
const { getSelectedSpaceId: id, getSelectedSpace: space } = useSpace()
</script>