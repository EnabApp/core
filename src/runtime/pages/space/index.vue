<template>
    <NuxtLayout name="space" :spaceData="space" />
</template>

<script setup>
import { Space } from '../../models/Space'
import { Board } from '../../models/Board'
import { useSpace } from '../../composables/useSpace'
const spaceStore = useSpace()
const spaces = spaceStore.getSpaces


const boards = [
    new Board({
        id: '1',
        units: {
            desktop: spaces.map(space => {
                return {
                    id: space.id,
                    colSpan: 1,
                    rowSpan: 1,
                    componentData: space,
                    componentName: 'SpaceUnitData'
                }
            })
        }
    })
]

const space = new Space({
    id: 'my-boards',
    business: {
        name: 'مجموعة العبدالله',
    },
    name: 'مساحاتي',
    boards: boards
})

</script>