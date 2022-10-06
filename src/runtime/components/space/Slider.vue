<template>
    <div :style="`width:${width}px; height:${height}px;`" ref="sliderRef" class="swipe">
        <div class="swipe-wrap" style="width: 100% !important">
            <slot />
        </div>
    </div>
</template>

<script setup>
import Swipe from 'swipejs';
// import { useSpace } from '../../composables/useSpace'
// const spaceStore = useSpace()
const router = useRouter()
const route = useRoute()

const props = defineProps({
    width: {
        type: Number || String,
        default: 0
    },
    height: {
        type: Number || String,
        default: 0
    },
    spaceData: {
        type: Object,
        required: true
    },
    selected: {
        type: Number
    }
})

const sliderRef = ref(null)
let slider = ref(null)

const emit = defineEmits(['selectedIndex', 'sliderInit'])
const options = {
    startSlide: props.selected,
    speed: 400,
    auto: 0,
    draggable: props.spaceData?.boards?.length > 1,
    continuous: false,
    disableScroll: false,
    stopPropagation: true,
    ignore: ".scroller",
    callback: function (index, elem, dir) {
        emit('selectedIndex', index)
        if (route.params.boardId) {
            history.pushState(
                {},
                null,
                route.params.boardId = props.spaceData?.boards[index]?.id
            )
        }
    },
    transitionEnd: function (index, elem) {
    }
}

onMounted(() => {
    slider = new Swipe(sliderRef.value, options);
    emit('sliderInit', slider)
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