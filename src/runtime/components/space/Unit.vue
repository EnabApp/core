<template>
    <div :style="`grid-column: span ${colSpan} / span ${colSpan}; grid-row: span ${rowSpan} / span ${rowSpan}; aspect-ratio: ${colSpan/rowSpan}`" class="" bg="secondary dark:secondaryOp" rounded="6">
        <div p="4">
            <slot/>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    colSpan: {
        type: Number,
        default: 1
    },
    rowSpan: {
        type: Number,
        default: 1
    },
})
</script>