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
      desktop: [
          {
            id: '1',
            colSpan: 1,
            rowSpan: 1,
            componentName: 'BusinessUnitData',
        },
        ...[...Array(27)].map((_, index) => {
            return {
                id: index,
                colSpan: 1,
                rowSpan: 1,
            }
        })
      ]
    }
  })
]

const space = new Space({
  id: 'my-boards',
  name: 'أعمالي',
  boards: boards
})

</script>
