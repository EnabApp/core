<template>
    <div>
        SAME COMPONENT
        <br />
        {{componentData}}
        <br />
        Cols: {{unit.colSpan}} <br />
        Rows: {{unit.rowSpan}}
    </div>
</template>

<script setup>
const props = defineProps(['componentData', 'unit'])
</script>