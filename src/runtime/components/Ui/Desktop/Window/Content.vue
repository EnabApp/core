<template>
    <div flex="~ grow col" bg="primary dark:primaryOp" :class="{ 'rounded-b-[10px]' : !app.maximized }" ref="contentEl">
        <slot />
    </div>
</template>

<script setup>
import { useElementSize, ref, watch } from '#imports'
const props = defineProps({
    app: {
        type: Object,
        required: true,
    },
});
const contentEl = ref(null)
const emit = defineEmits(['size'])
const size = useElementSize(contentEl)
watch(() => size, () => emit('size', size), {deep: true})

</script>