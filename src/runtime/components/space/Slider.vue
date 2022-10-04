<template>
    <div :style="`width:${width}px; height:${height}px;`" ref="sliderRef" class="swipe">
        <div class="swipe-wrap">
            <slot />
        </div>
    </div>
</template>

<script setup>
import Swipe from 'swipejs';
import { useSpace } from '../../composables/useSpace'
const spaceStore = useSpace()
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
    }
})

const sliderRef = ref(null)
let slider = ref(null)

const options = {
    startSlide: spaceStore.getSelectedBoardIndex,
    speed: 400,
    auto: 0,
    draggable: true,
    continuous: false,
    disableScroll: false,
    stopPropagation: true,
    ignore: ".scroller",
    callback: function (index, elem, dir) { },
    transitionEnd: function (index, elem) {
        history.pushState(
            {},
            null,
            route.params.boardId = spaceStore.getSelectedSpace?.boards[index]?.id
        )
        spaceStore.setSelectedBoardId(spaceStore.getSelectedSpace?.boards[index]?.id)
        // router.replace({
        //     params: {
        //         boardId: space?.boards[index]?.id
        //     }
        // })
    }
}

onMounted(() => {
    slider = new Swipe(sliderRef.value, options);
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