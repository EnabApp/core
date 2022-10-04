<template>
    <div h="screen" flex="~ col">
        <SpaceHeader pt="5" />
        
        <SpaceFooter pb="5" mt="10" />
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useSpace } from '../../composables/useSpace'
const spaceStore = useSpace()

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

onMounted(() => {
    spaceStore.setSelectedBoardId(null)
})

</script>