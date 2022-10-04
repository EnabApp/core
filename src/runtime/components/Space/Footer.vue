<template>
    <div flex="~ gap-2 row-reverse" justify="center">
        <span v-for="(board, index) in spaceStore?.getSelectedSpace?.boards" :key="board.id" w="4" h="4" :class="[
            index == spaceStore?.getSelectedBoardIndex
            ? 'bg-primaryOp dark:bg-primary'
            : 'bg-secondary dark:bg-tertiary'
        ]" rounded="full"></span>
    </div>
</template>

<script setup>
import { useSpace } from '../../composables/useSpace'
const spaceStore = useSpace()
</script>