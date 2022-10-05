<template>
    <div flex="~" justify="between">
        <!-- Right Titles -->
        <div flex="~" text="2xl medium">
            <!-- Icon -->
            <div flex="~" ml="2" items="center" justify="center" text="hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">
                <IconBoards w="8" />
            </div>
            

            <!-- Business Title -->
            <NuxtLink v-if="isHasBusiness" to="/" decoration="none" un-text="tertiary dark:tertiaryOp hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">Business Name</NuxtLink>
            <IconArrowLeft v-if="isHasBusiness" w="8" />
            
            <!-- Space Title -->
            <NuxtLink v-if="isHasSpace" :to="`/space/${$route.params.spaceId}`" decoration="none" un-text="tertiary dark:tertiaryOp hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">Space Name</NuxtLink>
            <IconArrowLeft v-if="isHasSpace" text="primaryOp dark:primary" w="8" />
            
            <!-- Board Title -->
            <span p="2" text="primaryOp dark:primary">{{ board?.name }}</span>

        </div>

        <!-- Left Actions -->
        <div flex="~ gap-3" items="center">
            <div flex="~" items="center" justify="center" w="10" h="10" rounded="full" bg="secondary dark:secondaryOp" cursor="pointer">
                <IconNotification text="primaryOp dark:primary" w="5" h="5" />
            </div>
            <IconUser w="10" cursor="pointer" />
        </div>
    </div>
</template>

<script setup>
// import { useSpace } from '../../composables/useSpace'
// const spaceStore = useSpace()
const props = defineProps({
    boardsData: {
        type: Array,
        required: true
    },
    selected: {
        type: Number,
        required: true
    }
})
const board = computed( () => props.boardsData[props.selected] );
const isHasBusiness = board?.business
const isHasSpace = board?.space

</script>