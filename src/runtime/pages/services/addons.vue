<template>
    <NuxtLayout name="space" :boardsData="[ board2 ]" />
</template>

<script setup>
import { Board } from '../../models/Board'

const board2 = new Board({
    id: '2',
    name: 'My Board 2',
    units: {
        mobile: [
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
        ],
        tablet: [
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
            { id: '1', colSpan: 1, rowSpan: 1 },
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

// const apps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
//             .map(i => ({ id: i, colSpan: 1, rowSpan: 1, componentName: 'TestAppUnitData', componentData: i }))


// const board3 = new Board({
//     id: '3',
//     name: 'My Board 3',
//     units: [
//         { id: '1', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: '2' },
//         ...apps
//         // { id: '2', colSpan: 1, rowSpan: 1 },
//         // { id: '3', colSpan: 1, rowSpan: 1 },
//         // { id: '4', colSpan: 1, rowSpan: 1 },
//         // { id: '5', colSpan: 1, rowSpan: 1 },
//         // { id: '7', colSpan: 1, rowSpan: 1 },
//         // { id: '6', colSpan: 1, rowSpan: 4 },
//         // { id: '8', colSpan: 1, rowSpan: 1 },
//         // { id: '9', colSpan: 1, rowSpan: 1 },
//         // { id: '10', colSpan: 1, rowSpan: 1 },
//         // { id: '11', colSpan: 1, rowSpan: 1 },
//         // { id: '12', colSpan: 1, rowSpan: 1 },
//         // { id: '13', colSpan: 1, rowSpan: 1 },
//         // { id: '14', colSpan: 1, rowSpan: 1 },
//         // { id: '15', colSpan: 1, rowSpan: 1 },
//         // { id: '16', colSpan: 1, rowSpan: 1 },
//         // { id: '17', colSpan: 1, rowSpan: 1 },
//         // { id: '18', colSpan: 1, rowSpan: 1 },
//         // { id: '19', colSpan: 1, rowSpan: 1 },
//         // { id: '20', colSpan: 1, rowSpan: 1 },
//         // { id: '21', colSpan: 1, rowSpan: 1 },
//         // { id: '22', colSpan: 1, rowSpan: 1 },
//     ]
// })


</script>