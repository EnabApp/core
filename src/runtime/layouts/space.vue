<template>
    <div h="screen" flex="~ col">
        <!-- Space Header : Component -->
        <SpaceHeader pt="5" />

        <!-- Boards Container -->
        <div ref="boardsRef" w="full" justify="center" flex="~ grow" mt="10">
            <!-- Slider : Component -->
            <SpaceSlider v-if="boards.width > 0 && boards.height > 0" :width="boards.width" :height="boards.height" :boardsCount="boardsCount">
                <div v-for="(b, index) in slotsBoards" :key="'board-index-' + index" float="left" width="100%" position="relative" overflow="hidden">
                    <SpaceBoard>
                        <slot :name="b" />
                    </SpaceBoard>
                </div>
            </SpaceSlider>
        </div>

        <!-- Space Footer : Component -->
        <SpaceFooter pb="5" mt="10" />
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
    boardsCount: {
        default: 1
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
    boards.width = newHeight * 2
})
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
  
  