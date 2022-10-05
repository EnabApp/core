<template>
    <NuxtLayout name="space" :boardsData="[ board2, board3 ]" />
</template>

<script setup>
import { Board } from '../../models/Board'

const board2 = new Board({
    id: '2',
    name: 'My Board 2',
    units: [
        { id: '1', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData' },
        { id: '2', colSpan: 4, rowSpan: 3 },
        { id: '3', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData' },
        { id: '4', colSpan: 4, rowSpan: 1 },
    ]
})

const board3 = new Board({
    id: '3',
    name: 'My Board 3',
    units: [
        { id: '1', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData' },
        { id: '2', colSpan: 1, rowSpan: 1 },
        { id: '3', colSpan: 1, rowSpan: 1 },
        { id: '4', colSpan: 1, rowSpan: 1 },
        { id: '5', colSpan: 1, rowSpan: 1 },
        { id: '7', colSpan: 1, rowSpan: 1 },
        { id: '6', colSpan: 1, rowSpan: 4 },
        { id: '8', colSpan: 1, rowSpan: 1 },
        { id: '9', colSpan: 1, rowSpan: 1 },
        { id: '10', colSpan: 1, rowSpan: 1 },
        { id: '11', colSpan: 1, rowSpan: 1 },
        { id: '12', colSpan: 1, rowSpan: 1 },
        { id: '13', colSpan: 1, rowSpan: 1 },
        { id: '14', colSpan: 1, rowSpan: 1 },
        { id: '15', colSpan: 1, rowSpan: 1 },
        { id: '16', colSpan: 1, rowSpan: 1 },
        { id: '17', colSpan: 1, rowSpan: 1 },
        { id: '18', colSpan: 1, rowSpan: 1 },
        { id: '19', colSpan: 1, rowSpan: 1 },
        { id: '20', colSpan: 1, rowSpan: 1 },
        { id: '21', colSpan: 1, rowSpan: 1 },
        { id: '22', colSpan: 1, rowSpan: 1 },
    ]
})


</script>