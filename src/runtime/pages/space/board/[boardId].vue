<template>
    <NuxtLayout name="space" boardsCount="2">
        <template #test>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="4" :rowSpan="4">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
        </template>

        <template #test2>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="4" :rowSpan="4">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
        </template>
    </NuxtLayout>
</template>

<script setup>
import { Space } from '../../../models/Space'
import { Board } from '../../../models/Board'
import { Unit } from '../../../models/Unit'

// My Space
const mySpace = new Space({
    id: '1',
    name: 'My Space',
    boards: [ myFirstBoard, mySecondBoard]
})

// My First Board
const myFirstBoard = new Board({
    id: '1',
    name: 'My Board',
    units: [
        { id: '1', colSpan: 2, rowSpan: 2 },
        { id: '2', colSpan: 2, rowSpan: 2 },
        { id: '3', colSpan: 4, rowSpan: 4 },
        { id: '4', colSpan: 2, rowSpan: 2 },
        { id: '5', colSpan: 2, rowSpan: 2 },
    ]
})

// My Second Board
const mySecondBoard = new Board({
    id: '2',
    name: 'My Board 2',
    units: [
        ...[
            1, 2, 3, 4, 5, 6, 7, 8,
            9, 10, 11, 12, 13, 14, 15, 16,
            17, 18, 19, 20, 21, 22, 23, 24,
            25, 26, 27, 28, 29, 30, 31, 32
        ].map(item => { return { id: item } })
    ]
})
</script>