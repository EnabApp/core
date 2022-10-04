<template>
    <div h="screen" flex="~ col">
        <SpaceHeader pt="5" />
        <div ref="boardsRef" w="full" justify="center" flex="~ grow" mt="10">
            <SpaceSlider :width="boards.width" :height="boards.height" v-if="boards.width > 0 && boards.height > 0" />
        </div>
        <SpaceFooter pb="5" mt="10" />
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useSpace } from '../../../composables/useSpace'
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