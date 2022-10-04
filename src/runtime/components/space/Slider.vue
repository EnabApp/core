<template>
    <div :style="`width:${width}px; height:${height}px;`" ref="sliderRef" class="swipe">
        <div class="swipe-wrap text-primary">
            <div>
                <div grid="~ gap-2 cols-8" m="1">
                    <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
                    <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
                    <SpaceBoardUnit :colSpan="4" :rowSpan="4">x</SpaceBoardUnit>
                    <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
                    <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
                </div>
            </div>
            <div>
                <div grid="~ gap-2 cols-8" m="1">
                    <SpaceBoardUnit v-for="item in 32" :key="item">x</SpaceBoardUnit>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Swipe from 'swipejs';

const props = defineProps({
    width: {
        type: Number || String,
        default: 0
    },
    height: {
        type: Number || String,
        default: 0
    }
})

const sliderRef = ref(null)
let slider = ref(null)

onMounted(() => {
    slider = new Swipe(sliderRef.value, {
        startSlide: 0,
        speed: 400,
        auto: 0,
        draggable: true,
        continuous: false,
        disableScroll: false,
        stopPropagation: true,
        ignore: ".scroller",
        callback: function (index, elem, dir) { },
        transitionEnd: function (index, elem) { }
    });
})
</script>


<style scoped>
.swipe {
    overflow: hidden;
    visibility: hidden;
    position: relative;
}

.swipe:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
}

.swipe-wrap {
    overflow: hidden;
    position: relative;
}

.swipe-wrap>div {
    float: left;
    width: 100%;
    position: relative;
    overflow: hidden;
}
</style>