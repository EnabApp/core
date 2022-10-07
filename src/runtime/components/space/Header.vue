<template>
    <div flex="~" justify="between">
        <!-- Right Titles -->
        <div flex="~" text="2xl medium tertiary dark:tertiaryOp">
            <!-- Icon -->
            <NuxtLink :to="homeRedirectionRoute()" ml="2" items="center" justify="center" un-text="tertiary dark:tertiaryOp hover:primaryOp dark:hover:primary" cursor="pointer" p="2">
                <IconBoards w="8" />
            </NuxtLink>
            

            <!-- Business Title -->
            <div v-if="isHasBusiness" decoration="none" p="2" class="hidden lg:flex">
                {{ space?.business?.name }}
            </div>
            <IconArrowLeft v-if="isHasBusiness" w="8" class="hidden lg:flex" />
            
            <!-- Space Title -->
            <div v-if="isHasSpace" decoration="none" class="hidden md:flex" p="2">
                {{ space.name }}
            </div>
            <IconArrowLeft v-if="isHasSpace && board?.name" text="primaryOp dark:primary" w="8" class="hidden md:flex" />
            
            <!-- Board Title -->
            <span p="2" text="primaryOp dark:primary">{{ board?.name }}</span>

        </div>

        <!-- Left Actions -->
        <div flex="~ gap-3" items="center">
            <UiToolTip position="bottom" :text="$colorMode.preference == 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'" class="hidden md:flex">
                <div @click="$colorMode.preference == 'dark' ? $colorMode.preference = 'light' : $colorMode.preference = 'dark'" flex="~" items="center" justify="center" w="10" h="10" rounded="full" cursor="pointer" bg="secondary dark:secondaryOp">
                    <IconLightMode v-if="colorMode.value == 'dark'" text="primaryOp dark:primary" w="5" h="5" />
                    <IconDarkMode v-else text="primaryOp dark:primary" w="5" h="5" />
                </div>
            </UiToolTip>


            <UiToolTip v-for="action in actions" :key="action.icon" position="bottom" :text="action.text" class="hidden md:flex">
                <NuxtLink :to="`/space/${action.space}/board/${action.board}`" flex="~" items="center" justify="center" w="10" h="10" rounded="full" cursor="pointer" :class="[
                $route.path == `/space/${action.space}/board/${action.board}` ? 'bg-info dark:bg-infoOp' : 'bg-secondary dark:bg-secondaryOp'
        ]">
                <component :is="action.icon" text="primaryOp dark:primary" w="5" h="5" />
            </NuxtLink>
            </UiToolTip>

            <IconUser w="10" cursor="pointer" />
            
        </div>
    </div>
</template>

<script setup>
const colorMode = useColorMode()

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

const route = useRoute()
const space = computed(() => props.spaceData)
const board = computed( () => space.value?.boards[props.selected] );
const isHasBusiness = computed(() => route.params.businessId)
const isHasSpace = computed(() => route.params.spaceId)

const homeRedirectionRoute = () => {
    // const path = route.path
    // if (path == '/') return ''
    // if (path == '/space/') return '/'
    // else return '/space/'
    if (isHasSpace.value) return `/${isHasBusiness.value}`
    else if (isHasBusiness.value) return '/'
    else return '/'
}

const actions = [
    {
        icon: 'IconBxsCart',
        text: 'المتجر',
        space: 'store',
        board: 'apps'
    },
    {
        icon: 'IconNotification',
        text: 'الإشعارات',
        space: 'store',
        board: 'apps'
    },
]
</script>