<template>
    <!-- Header -->
    <div @dblclick="app.toggleMaximize()" :class="{ 'border-rounded-t-[5px]': !app.maximized,  'opacity-90': appManager.focused != app.id}" class="backdrop-blur-[5px]" ref="el" bg="primary dark:primaryOp" h="70%" flex="~ gap-2" place="items-center" justify="between" p="y-2 x-20px" text="lg" font="medium">

        <!-- Title & Icon -->
        <div flex="~ grow gap-14px" items="center" text="primaryOp dark:primary">
            <div :class="app.icon" class="text-4xl"></div>
            <span class="text-xl">{{ app.parentApp && app.parentApp + " - " }} {{ app.title }}</span>
        </div>

        <!-- <div @dblclick.stop="() => { }" v-if="!app.maximized && app.resizeable" flex="~ gap-2" bg="b-20" p="2" border="rounded-lg" items="center">
            <div @click="prevSize()" cursor="pointer" text="w-80 dark:w-40" class="w-4 h-4 i-akar-icons-circle-minus-fill"></div>
            <div @click="nextSize()" cursor="pointer" text="w-80 dark:w-40" class="w-4 h-4 i-akar-icons-circle-plus-fill"></div>
        </div> -->

        <span @dblclick.stop="() => { }" @click="app.toggleMinimize()" cursor="pointer" w="18px" h="18px" border="rounded-full"  bg="secondary">
        </span>
        <span @dblclick.stop="() => { }" @click="app.toggleMaximize()" cursor="pointer" w="18px" h="18px" border="rounded-full" bg="secondary">
        </span>
        <span @dblclick.stop="() => { }" @click="app.toggleRunning()" cursor="pointer" w="18px" h="18px" border="rounded-full" class="bg-error">
        </span>
    </div>
</template>

<script setup>
import { useToggle, useDraggable, ref } from '#imports';

const props = defineProps({
    app: {
        type: Object,
        required: true,
    },
    appManager: {
        type: Object,
        required: true,
    },
})

const [statePin, togglePin] = useToggle(false);

const emit = defineEmits(["onPin", "onMove", "onResize"]);


const el = ref(null);

const { x, y, style } = useDraggable(el, {
    initialValue: { x: 40, y: 40 },
    onStart: () => {
        props.appManager.setFocus(props.app.id);
    },
    onMove: () => {
        props.app.maximized = false;

        if (y.value < 0) {
            y.value = 0;
            props.app.toggleMaximize();
        }

        emit("onMove", { x: x.value, y: y.value });
    },
});
</script>