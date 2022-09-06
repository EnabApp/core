<template>
    <div w="full">
        <div ref="myHoverableElement" flex="~ col gap-2" p="4" text="primaryOp dark:primary" border="rounded-lg" transition="~ duration-150 ease-in-out" bg="secondary dark:secondaryOp hover:primary dark:hover:primaryOp">
            <div flex="~" justify="between" items="center" text="secondaryOp dark:secondary">
                <div flex="~ gap-2">
                    <component v-if="isIconExists" h="5" w="5" :is="toast.icon"></component>
                    <IconNotification v-else w="5" h="5" />
                    <span text="sm">
                        {{ toast.title }}
                    </span>
                </div>
                <IconClose cursor="pointer" @click="toasts.removeToast(toast)" w="4" h="4" text="hover:primaryOp dark:hover:primary" />
            </div>
            <p>
                {{ toast.message }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, useMouseInElement, ref, useTimeoutFn } from '#imports'
import { useToasts } from '../../../composables/useToasts'
import { resolveDynamicComponent } from 'vue';

const toasts = useToasts()

const myHoverableElement = ref()

const { isOutside } = useMouseInElement(myHoverableElement)

const { isPending, start, stop } = useTimeoutFn(() => toasts.removeToast(props.toast), 3000)

watch( () => isOutside.value, (_isOutside) => {
    if (_isOutside) start()
    else stop()
})

const props = defineProps(['toast'])

const isIconExists = typeof resolveDynamicComponent(props.toast.icon) !== 'string' && props.toast.icon
</script>
