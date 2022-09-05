<template>
    <Teleport to="body">
        <div v-if="notificationsCenter.getShowedNotifications?.length > 0" z="120" class="absolute" flex="~ col gap-3" left="0" top="0" w="100" p="8">
            <TransitionGroup>
                <BottomBarNotificationsNotify :notify="notify" v-for="notify in notificationsCenter.getShowedNotifications?.splice(0, 5)" :key="'notify-' + notify.id" />
            </TransitionGroup>
        </div>
    </Teleport>
</template>


<script setup>
    import { useNotifications } from '../../../composables/useNotifications'
    const notificationsCenter = useNotifications()
    
</script>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.v-enter-active {
  transition: all 0.15s ease-out;
}

.v-leave-active {
  transition: all 0.15s ease-in;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>