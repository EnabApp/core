<template>
    <div h="screen" flex="~ col">
        <!-- Space Header : Component -->
        <SpaceHeader pt="5" :boardsData="boardsData" :selected="selectedBoardIndex" />

        <!-- Boards Container -->
        <div ref="boardsRef" h="full" w="full" justify="center" flex="~ grow" mt="10">
            <!-- Slider : Component -->
            <SpaceSlider v-if="boards.width > 0 && boards.height > 0" :width="boards.width" :height="boards.height" :boardsData="boardsData"  :selected="selectedBoardIndex" @selectedIndex="selectedBoardIndex = $event" @sliderInit="sliderObject = $event">
                <div v-for="(b, index) in boardsData" :key="'board-index-' + index" float="left" width="100%" position="relative" overflow="hidden">
                    <SpaceBoard>
                        <SpaceBoardUnit v-for="unit in b.units" :key="unit.id" :unit="unit" />
                    </SpaceBoard>
                </div>
            </SpaceSlider>
        </div>

        <!-- Space Footer : Component -->
        <SpaceFooter :selected="selectedBoardIndex" :boardsData="boardsData" :slider="sliderObject" pb="5" mt="10" />
    </div>
</template>
  
  
<script setup>
import { useRouter, useRoute, useHead } from '#imports'
import { ref, onMounted, reactive, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useSpace } from '../composables/useSpace'

const route = useRoute();

const slots = useSlots();
const slotsBoards = Object.keys(slots)

// define head peroperties 
useHead({
    titleTemplate: () => {
        return route.meta.title ? `${route.meta.title} · Enab` : "Enab";
    },
    viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
    charset: "utf-8",
    meta: [{ name: "description", content: "My amazing site." }],
    bodyAttrs: {
        class: "bg-primary dark:bg-primaryOp text-tertiary dark:text-tertiaryOp mx-15",
        dir: "rtl",
        // oncontextmenu: "return false",

    },
    htmlAttrs: {
        lang: "ar",
    },
});

const props = defineProps({
    boardsData: {
        type: Array
    }
})

// Boards Container Reference
const boardsRef = ref(null)
// Get the size of the boards container
const { width, height } = useElementSize(boardsRef)

// Reactive object to store the size of the boards container
const boards = reactive({
    width: 0,
    height: 0
})

// Watch for changes in the height of the boards container
watch(() => height.value, (newHeight) => {
    boards.height = newHeight
    boards.width = (newHeight * 2) - 16
})

// Get the selected board index from the route
const initialIndex = props.boardsData?.findIndex(b => b.id == route.params?.boardId)
const selectedBoardIndex = ref(initialIndex == -1 ? 0 : initialIndex)

// Slider Object
const sliderObject = ref(null)
</script>
  
<style>
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
    border-radius: 1rem;

}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, .3);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, .5);
}
</style>
  
  