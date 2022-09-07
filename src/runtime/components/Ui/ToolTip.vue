<template>
  <div ref="myHoverableElement" class="group relative inline-block">
    <slot />
    <div
      v-if="isHovered"
      :class="tooltipPos[position]"
      class="absolute flex items-center hidden"
    >
      <div
        v-if="position === 'top'"
        id="top"
        class="relative text-center z-10 w-100px px-3px py-5px pb-5px text-sm font-thin text-white bg-secondaryOp rounded-5px"
      >
        {{ text }}
      </div>
      <div
        v-if="position === 'left'"
        id="left"
        class="relative text-center z-10 w-100px px-3px py-5px pb-5px text-sm font-thin text-white bg-secondaryOp rounded-5px"
      >
        {{ text }}
      </div>
      <div
        v-if="position === 'right'"
        id="right"
        class="relative text-center z-10 w-100px px-3px py-5px pb-5px text-sm font-thin text-white bg-secondaryOp rounded-5px"
      >
        {{ text }}
      </div>
      <div
        v-if="position === 'bottom'"
        id="bottom"
        class="relative text-center z-10 w-100px px-3px py-5px pb-5px text-sm font-thin text-white bg-secondaryOp rounded-5px"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useElementHover } from "#imports";

const myHoverableElement = ref();
const isHovered = useElementHover(myHoverableElement);

const tooltipPos = {
  top: "bottom-full left-50% mb-2 -ml-50px",
  bottom: "top-full left-50% mt-2 -ml-50px",
  left: "-top-5px right-110% mr-1",
  right: "-top-5px left-110% ml-1",
};

const props = defineProps({
  text: {
    type: String,
    requierd: true,
  },
  position: {
    type: String,
    default: "top",
  },
});
</script>

<style scoped>
#bottom::after {
  content: " ";
  position: absolute;
  bottom: 100%; /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #505050 transparent;
}
#left::after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 100%; /* To the right of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent #505050;
}
#right::after {
  content: " ";
  position: absolute;
  top: 50%;
  right: 100%; /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #505050 transparent transparent;
}
#top::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #505050 transparent transparent transparent;
}
</style>