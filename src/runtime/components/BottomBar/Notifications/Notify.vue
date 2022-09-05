<template>
    <div w="full">
        <div flex="~ col gap-2" p="4" text="primaryOp dark:primary" border="rounded-lg" bg="secondary dark:secondaryOp">
            <div flex="~" justify="between" items="center" text="secondaryOp dark:secondary">
                <div flex="~ gap-2">
                    <IconNotification w="5" h="5" />
                    <span text="sm">
                        {{ notify.title }}
                    </span>
                </div>
                <IconClose cursor="pointer" @click="notify.showed = false" w="5" h="5" />
            </div>
            <p>
                {{ notify.message }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from '#imports'

const props = defineProps(['notify'])
onMounted(() => setTimeout(() => props.notify.showed = false, 5000))
</script>