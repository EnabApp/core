<template>
    <div h="screen" flex="~ col">
        <!-- Space Header : Component -->
        <SpaceHeader pt="5" :spaceData="spaceData" :selected="selectedBoardIndex" />

        <!-- Boards Container -->
        <div ref="boardsRef" h="full" w="full" justify="center" flex="~ grow" mt="5 md:10">
            <!-- Slider : Component -->
            <SpaceSlider v-if="boards.width > 0 && boards.height > 0" :width="boards.width" :height="boards.height" :spaceData="spaceData" :selected="selectedBoardIndex" @selectedIndex="selectedBoardIndex = $event" @sliderInit="sliderObject = $event">
                <div v-for="(b, index) in spaceData?.boards" :key="'board-index-' + index" float="left" width="100%" position="relative" overflow="hidden">
                    <SpaceBoard>
                        <template v-if="mobile">
                            <SpaceBoardUnit v-for="unit in b.units.mobile" :key="unit.id" :unit="unit" />
                        </template>
                        <template v-if="tablet">
                            <SpaceBoardUnit v-for="unit in b.units.tablet" :key="unit.id" :unit="unit" />
                        </template>
                        <template v-if="desktop">
                            <SpaceBoardUnit v-for="unit in b.units.desktop" :key="unit.id" :unit="unit" />
                        </template>
                    </SpaceBoard>
                </div>
            </SpaceSlider>
        </div>

        <!-- Space Footer : Component -->
        <SpaceFooter :selected="selectedBoardIndex" :spaceData="spaceData" :slider="sliderObject" pb="5" mt="5 md:10" />
    </div>
</template>
  
  
<script setup>
import { useRouter, useRoute, useHead } from '#imports'
import { ref, onMounted, reactive, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useSpace } from '../composables/useSpace'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useScreenOrientation } from '@vueuse/core'

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
        class: "bg-primary dark:bg-primaryOp text-tertiary dark:text-tertiaryOp mx-5 md:mx-15",
        dir: "rtl",
        // oncontextmenu: "return false",

    },
    htmlAttrs: {
        lang: "ar",
    },
});

const props = defineProps({
    spaceData: {
        type: Object
    }
})

// Boards Container Reference
const boardsRef = ref(null)
// Get the size of the boards container
const elementSize = useElementSize(boardsRef)

// Responsive units
const breakpoints = useBreakpoints({
    tablet: 640,
    laptop: 1024,
    desktop: 1280,
})

const mobile = breakpoints.smaller('tablet')
const tablet = breakpoints.between('tablet', 'laptop')
const desktop = breakpoints.greaterOrEqual('laptop')

const {
    orientation,
} = useScreenOrientation()

const responsive = computed( () => {
    if (orientation.value.includes("portrait")) {
        return {
            columns: mobile.value ? 2 : tablet.value ? 4 : 7,
            rows: mobile.value ? 4 : tablet.value ? 6 : 4,
        }
    } else {
        return {
            columns: mobile.value ? 4 : tablet.value ? 6 : 7,
            rows: mobile.value ? 2 : tablet.value ? 4 : 4,
        }
    }
})

// Reactive object to store the size of the boards container
const boards = reactive({
    width: 0,
    height: 0
})

// Watch for changes in the size of the boards container
watch(() => elementSize, (size) => {
    const { height, width } = size
    const { columns, rows } = responsive.value
    boards.height = height.value
    boards.width = (height.value / rows) * columns - 32 *2
}, { deep: true })

// Get the selected board index from the route
const initialIndex = props.spaceData?.boards?.findIndex(b => b.id == route.params?.boardId)
const selectedBoardIndex = ref(initialIndex == -1 ? 0 : initialIndex)

// Slider Object
const sliderObject = ref(null)





// Calculate data units of the boards container
const dataUnitsCount = computed(() => {
    props.spaceData?.boards.forEach((board, index) => {
        for (const device of Object.keys(board?.units)){
            const units = board?.units[device]
            const totalSpans = units.reduce((a, b) => a + b.colSpan * b.rowSpan, 0)
            if (mobile.value){
                console.log(`[INFO][Board ID => ${board.id}][Mobile] Total spans should be 8, and it is`, totalSpans)
                return totalSpans
            } else if (tablet.value){
                console.log(`[INFO][Board ID => ${board.id}][Tablet] Total spans should be 24, and it is`, totalSpans)
                return totalSpans
            } else {
                console.log(`[INFO][Board ID => ${board.id}][Desktop] Total spans should be 28, and it is`, totalSpans)
                return totalSpans
            }
        }
    })
})
dataUnitsCount.value

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
  
  