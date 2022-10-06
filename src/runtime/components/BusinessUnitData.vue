<template>
    <NuxtLink :to="`/space/`" cursor="pointer" bg="hover:info dark:hover:infoOp" un-text="2xl primaryOp dark:primary center" decoration="none" rounded="6" flex="~ col gap-2" h="full" items="center" justify="center">
        مساحات مجموعة العبدالله
    </NuxtLink>
</template>

<script setup>
    // import { useSpace } from '../composables/useSpace'
    // const spaceStore = useSpace()
    // const props = defineProps(['unit', 'componentData'])
    // const select = () => {
    //     spaceStore.setSelectedSpaceId(props.componentData.id)
    //     spaceStore.setSelectedBoardId(props.componentData?.boards[0]?.id)
    // }
</script>