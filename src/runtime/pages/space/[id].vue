<template>
    <div>
        <SpaceHeader />
        {{ id }}
        <br />
        {{ space ? 'found' : 'not found' }}
    </div>
</template>

<script setup>
import { useSpace } from '../../composables/useSpace'
const { getSelectedSpaceId: id, getSelectedSpace: space } = useSpace()
</script>