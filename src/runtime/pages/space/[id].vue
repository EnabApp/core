<template>
    <div h="screen" flex="~ col" items="center">
        <SpaceHeader pt="10" w="full" />
        <div ref="boardsRef" flex="grow" mt="17">
            <div v-if="boards.width > 0 && boards.height > 0" grid="~ gap-2 cols-8" :style="`width:${boards.width}px; height:${boards.height}px`">
                <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
                <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
                <SpaceBoardUnit :colSpan="4" :rowSpan="4">x</SpaceBoardUnit>
                <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
                <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            </div>
        </div>
        <div flex="~ gap-2" justify="center" pb="8" mt="16">
            <span w="4" h="4" bg="secondary dark:tertiary" rounded="full"></span>
            <span w="4" h="4" bg="primaryOp dark:primary" rounded="full"></span>
            <span w="4" h="4" bg="secondary dark:tertiary" rounded="full"></span>
        </div>
        <!-- {{ id }}
        <br />
        {{ space ? 'found' : 'not found' }} -->
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useSpace } from '../../composables/useSpace'
const { getSelectedSpaceId: id, getSelectedSpace: space } = useSpace()

const boardsRef = ref(null)
const { width, height } = useElementSize(boardsRef)
const boards = reactive({
    width: 0,
    height: 0
})

watch(() => height.value, (newHeight) => {
    boards.height = newHeight
    boards.width = newHeight * 2
})
</script>