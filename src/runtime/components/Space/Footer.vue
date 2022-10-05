<template>
    <div flex="~ gap-2 row-reverse" justify="center">
        <div v-for="(board, index) in boardsData" :key="board.id" @click="slider.slide(index, 500)" w="4" h="4" :class="[
            index == selected
            ? 'bg-primaryOp dark:bg-primary'
            : 'bg-secondary dark:bg-tertiary'
        ]" cursor="pointer" class="group" rounded="full" position="relative">
            <span p="1" text="sm center secondaryOp dark:secondary" rounded="lg" class="invisible group-hover:visible" bg="tertiaryOp dark:tertiary" position="absolute" top="-10" right="-14" w="120px">
                {{board.name}}
            </span>
        </div>
    </div>
</template>

<script setup>
// import { useSpace } from '../../composables/useSpace'
// const spaceStore = useSpace()
const props = defineProps({
    boardsData: {
        type: Array,
        required: true
    },
    selected: {
        type: Number,
        required: true
    }
})
</script>