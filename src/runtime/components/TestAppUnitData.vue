<template>
    <div cursor="pointer" @click="click()" :class="{ 'bg-tertiary' : clicks % 2 !== 0 }" rounded="6" flex="~ col gap-2" h="full" items="center" justify="center">
        <div>I am app [ {{ componentData }} ]</div>
        <div>Clicks: {{ clicks }}</div>
    </div>
</template>

<script setup>
    const props = defineProps(['componentData'])
    const clicks = ref(0)
    const click = () => {
        clicks.value++
    }
</script>