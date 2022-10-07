<!-- SHOW SPACES FOR A BUSINESS -->

<template>
    <SpaceContainer :space="mySpace" />
</template>
  
<script setup>
import { Space } from '../models/Space'
import { useSpace } from '../composables/useSpace'

const store = useSpace()
const { businessId } = useRoute()?.params

// Fetching spaces
await store.fetch(businessId)

const mySpace = new Space({
    name: 'مساحاتي',
    business: {
        name: 'اسم العمل'
    },
    boards: [{ units: store.getSpacesAsUnits }]
})
</script>
  