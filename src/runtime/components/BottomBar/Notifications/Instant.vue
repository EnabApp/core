<template>
    <Teleport to="body">
        <div v-show="toasts.getToasts?.length > 0" z="120" class="absolute" flex="~ col gap-3" left="0" top="0" w="100" p="8">
            <TransitionGroup>
                <BottomBarNotificationsNotify :toast="toast" v-for="toast in toasts.getToasts?.slice(0, 5)" :key="toast.title" />
            </TransitionGroup>
        </div>
    </Teleport>
</template>


<script setup>
    import { useToasts } from '../../../composables/useToasts'
    const toasts = useToasts()
</script>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.v-enter-active {
  transition: all 0.25s ease-out;
}

.v-leave-active {
  transition: all 0.25s ease-in;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
</style>