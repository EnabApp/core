<template>
    <div flex="~" justify="between">
        <!-- Right Titles -->
        <div flex="~" text="2xl medium">
            <!-- Icon -->
            <div flex="~" ml="2" items="center" justify="center" text="hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">
                <IconBoards w="8" />
            </div>
            

            <!-- Business Title -->
            <a v-if="isHasBusiness" href="/" decoration="none" un-text="tertiary dark:tertiaryOp hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">
                {{ space?.business?.name }}
            </a>
            <IconArrowLeft v-if="isHasBusiness" w="8" />
            
            <!-- Space Title -->
            <NuxtLink v-if="isHasSpace" :to="`/space/${$route.params.spaceId}`" decoration="none" un-text="tertiary dark:tertiaryOp hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">
                {{ space.name }}
            </NuxtLink>
            <IconArrowLeft v-if="isHasSpace && board?.name" text="primaryOp dark:primary" w="8" />
            
            <!-- Board Title -->
            <span p="2" text="primaryOp dark:primary">{{ board?.name }}</span>

        </div>

        <!-- Left Actions -->
        <div flex="~ gap-3" items="center">
            <NuxtLink @click="spaceStore.setSelectedBoardId('apps', 'store')" :to="'/space/store/board/apps'" flex="~" items="center" justify="center" w="10" h="10" rounded="full" bg="secondary dark:secondaryOp" cursor="pointer">
                <IconBxsCart text="primaryOp dark:primary" w="5" h="5" />
            </NuxtLink>
            <div flex="~" items="center" justify="center" w="10" h="10" rounded="full" bg="secondary dark:secondaryOp" cursor="pointer">
                <IconNotification text="primaryOp dark:primary" w="5" h="5" />
            </div>
            <IconUser w="10" cursor="pointer" />
            
        </div>
    </div>
</template>

<script setup>
import { useSpace } from '../../composables/useSpace'
const spaceStore = useSpace()
const props = defineProps({
    spaceData: {
        type: Object,
        required: true
    },
    selected: {
        type: Number,
        required: true
    }
})
const space = computed(() => props.spaceData)
const board = computed( () => space.value?.boards[props.selected] );
const isHasBusiness = space.value?.business
const isHasSpace = space.value

</script>