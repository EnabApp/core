<template>
    <div flex="~" justify="between">
        <!-- Right Titles -->
        <div flex="~" text="2xl medium">
            <!-- Icon -->
            <div flex="~" ml="2" items="center" justify="center" text="hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">
                <IconBoards w="8" />
            </div>
            

            <!-- Business Title -->
            <NuxtLink to="/" decoration="none" un-text="tertiary dark:tertiaryOp hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">{{ spaceStore.getSelectedSpace?.business?.name }}</NuxtLink>
            
            <!-- Space Title -->
            <IconArrowLeft v-if="spaceStore.getSelectedSpace?.name" w="8" />
            <NuxtLink :to="`/space/${spaceStore.getSelectedSpace?.id}`" decoration="none" un-text="tertiary dark:tertiaryOp hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">{{ spaceStore.getSelectedSpace?.name }}</NuxtLink>
            
            <!-- Board Title -->
            <IconArrowLeft v-if="spaceStore.getSelectedBoard?.name" text="primaryOp dark:primary" w="8" />
            <span p="2" text="primaryOp dark:primary">{{ spaceStore.getSelectedBoard?.name }}</span>

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
import { useSpace } from '../../composables/useSpace'
const spaceStore = useSpace()
</script>