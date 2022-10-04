<template>
    <div flex="~ gap-2 row-reverse" justify="center">
        <span v-for="(board, index) in boardsData" :key="board.id" w="4" h="4" :class="[
            index == selected
            ? 'bg-primaryOp dark:bg-primary'
            : 'bg-secondary dark:bg-tertiary'
        ]" rounded="full"></span>
    </div>
</template>

<script setup>
import { useSpace } from '../../composables/useSpace'
const spaceStore = useSpace()
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