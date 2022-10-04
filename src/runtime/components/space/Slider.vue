<template>
    <div ref="sliderRef" class="swipe">
        <div :style="`width:${width}px; height:${height}px;`" class="swipe-wrap text-primary">
            <div>
                <TestBoard />
            </div>
            <div>
                <TestBoard />
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