<template>
    <NuxtLayout name="space" :spaceData="space" />
</template>

<script setup>
import { Space } from '../../models/Space'
import { Board } from '../../models/Board'



const board2 = new Board({
    id: '2',
    name: 'My Board 2',
    units: {
        mobile: [
            { id: '1', colSpan: 2, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 2 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 2 },
            { id: '1', colSpan: 1, rowSpan: 1 },
        ],
        tablet: [
            { id: '1', colSpan: 2, rowSpan: 2 },
            { id: '1', colSpan: 2, rowSpan: 1, componentName: 'TestUnitData', componentData: 'This is data' },
            { id: '1', colSpan: 1, rowSpan: 2 },
            { id: '1', colSpan: 1, rowSpan: 2 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 2, rowSpan: 1, componentName: 'TestUnitData', componentData: 'This is another data' },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 3, rowSpan: 1, componentName: 'TestUnitData', componentData: 'This is also another data' },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
        ],
        desktop: [
            { id: '1', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: 'tEwtwerwer' },
            { id: '2', colSpan: 3, rowSpan: 3 },
            { id: '3', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: '2' },
            { id: '4', colSpan: 3, rowSpan: 1 },
        ]
    }
})

const space = new Space({
    id: '1',
    name: 'My Space',
    boards: [ board2 ]
})


</script>