<!-- SHOW BUSINESSES -->

<template>
  <SpaceContainer :space="mySpace" />
</template>

<script setup>
import { Space } from '../models/Space'
import { useBusiness } from '../composables/useBusiness'

const store = useBusiness()

// Fetching Businesses
await store.fetch()

const mySpace = new Space({
  name: 'أعمالي',
  boards: [ { units: store.getBusinessesAsUnits } ]
})
</script>
