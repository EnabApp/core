<template>
  <div ref="myHoverableElement" class="group relative inline-block">
    <slot/>
        <div v-if="isHovered" :class="tooltipPos[position]" class="absolute flex flex-col items-center hidden">
          <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-secondaryOp rounded-md">{{ text }}</span>
        </div>
  </div>
</template>

<script setup>
import {ref, useElementHover} from "#imports"

const myHoverableElement = ref()
const isHovered = useElementHover(myHoverableElement)



const tooltipPos = {
  "top": "bottom-full mb-1",
  "bottom": "top-full mt-1",
  "left": "right-full mr-1",
  "right": "left-full ml-1",
}


const props = defineProps({
    text: {
        type: String,
        requierd: true,
    },
    position: {
        type: String,
        default: "top",
    },

})
</script>

<style scoped>

</style>
