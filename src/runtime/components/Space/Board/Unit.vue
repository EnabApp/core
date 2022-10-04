<template>
    <div h="full" w="full" :style="`grid-column: span ${colSpan} / span ${colSpan}; grid-row: span ${rowSpan} / span ${rowSpan}; aspect-ratio: ${colSpan} / ${rowSpan}; order: ${unit.order}`" bg="secondary dark:secondaryOp" rounded="6">
        <div>
            <component v-if="unit.componentName" :is="unit.componentName" />
            <slot v-else />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    unit: {
        type: Object,
        required: true
    }
})
const colSpan = props.unit.colSpan ?? 1
const rowSpan = props.unit.rowSpan ?? 1
</script>