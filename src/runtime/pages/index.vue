<template>
  <NuxtLayout name="space" :spaceData="space" />
</template>

<script setup>
import { Space } from '../models/Space'
import { Board } from '../models/Board'


const boards = [
  new Board({
    id: '1',
    units: {
      desktop: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map(id => {
        return {
          id: id,
          colSpan: 1,
          rowSpan: 1,
        }
      })
    }
  })
]

const space = new Space({
  id: 'my-boards',
  name: 'أعمالي',
  boards: boards
})

</script>