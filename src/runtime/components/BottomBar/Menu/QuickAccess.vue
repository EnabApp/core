<template>
    <div m="y-13px sm:y-14px xl:y-16px" un-text="white">
        <span un-text="primaryOp dark:primary sm sm:base">الوصول السريع</span>
    </div>
    <div grid="~ cols-5 auto-rows-min" min-h="">

        <UiDesktopMiniIcon v-for="component in apps" :key="'app-' + component.id" :app="component" />

        <UiDesktopMiniIcon v-for="component in (10 - apps.length)" :key="'skeleton-' + component.id" />

    </div>
</template>

<script setup>
const props = defineProps({
    apps: Array
})

</script>