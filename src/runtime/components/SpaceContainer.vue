<template>
    <div h="screen" flex="~ col">
        <!-- Space Header : Component -->
        <SpaceHeader pt="5" :spaceData="spaceData" :selected="selectedBoardIndex" />

        <!-- Boards Container -->
        <div ref="boardsContainer" h="full" w="full" justify="center" flex="~ grow" mt="5 md:10">
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
import { useRoute } from '#imports'
import { ref, reactive, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useResponsive } from '../composables/useResponsive'
import { fillUnits } from '../composables/useUtilities'

// Properties
const props = defineProps(['space'])

// Responsive Composable
const { boardSize, desktop, tablet, mobile } = useResponsive();

// Slider Object
const sliderObject = ref(null)

// Selected Board Index
const selectedBoardIndex = ref(0)

// Boards Container Reference
const boardsContainer = ref(null)
const elementSize = useElementSize(boardsContainer)
const boards = reactive({ width: 0, height: 0 })

// Watch Change in element size
watch(() => elementSize, (size) => {
    const { height, width } = size
    const { columns, rows } = boardSize.value

    // Set Boards Container Size
    boards.height = height.value
    boards.width = (height.value / rows) * columns - 32 * 2
}, { deep: true })


// Fill empty units
const spaceData = computed (() => {
    const space = props.space
    space?.boards?.forEach(b => {
        b.units = fillUnits(b.units)
    })
    return space
})

// // define head peroperties 
// useHead({
//     titleTemplate: () => {
//         return route.meta.title ? `${route.meta.title} · Enab` : "Enab";
//     },
//     viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
//     charset: "utf-8",
//     meta: [{ name: "description", content: "My amazing site." }],
//     bodyAttrs: {
//         class: "bg-primary dark:bg-primaryOp text-tertiary dark:text-tertiaryOp mx-5 md:mx-15",
//         dir: "rtl",
//         // oncontextmenu: "return false",

//     },
//     htmlAttrs: {
//         lang: "ar",
//     },
// });











// Calculate data units of the boards container
// const dataUnitsCount = computed(() => {
//     props.spaceData?.boards.forEach((board, index) => {
//         for (const device of Object.keys(board?.units)){
//             const units = board?.units[device]
//             const totalSpans = units.reduce((a, b) => a + b.colSpan * b.rowSpan, 0)
//             if (mobile.value){
//                 console.log(`[INFO][Board ID => ${board.id}][Mobile] Total spans should be 8, and it is`, totalSpans)
//                 return totalSpans
//             } else if (tablet.value){
//                 console.log(`[INFO][Board ID => ${board.id}][Tablet] Total spans should be 24, and it is`, totalSpans)
//                 return totalSpans
//             } else {
//                 console.log(`[INFO][Board ID => ${board.id}][Desktop] Total spans should be 28, and it is`, totalSpans)
//                 return totalSpans
//             }
//         }
//     })
// })
// dataUnitsCount.value
</script>