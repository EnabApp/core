<template>
    <NuxtLayout name="space" boardsCount="2">
        <template #test>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="4" :rowSpan="4">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
        </template>
        <template #test2>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="4" :rowSpan="4">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
            <SpaceBoardUnit :colSpan="2" :rowSpan="2">x</SpaceBoardUnit>
        </template>
    </NuxtLayout>
</template>

<script setup>
</script>