<template>
  <div ref="notificationsEl" position="relative" un-text="primaryOp dark:primary">
    <!-- Icon -->
    <UiToolTip :text="notifications.getNotSeenLength + ' إشعارات'">
      <div position="relative" @click="() => { notificationsPanelToggle(), setSeen() }" cursor="pointer">
        <IconNotificationOff v-if="!notifications.isConnected" text="error" h="32px" w="32px"></IconNotificationOff>
        <IconNotificationRing v-else-if="notifications.getNotSeenLength > 0" text="warning" h="32px" w="32px"></IconNotificationRing>
        <IconNotification v-else h="32px" w="32px"></IconNotification>
        <!-- <span position="absolute" p="x-1 y-0.5" rounded="~" bg="error" top="1" text="xs">{{notifications.getNotRead}}</span> -->
      </div>
    </UiToolTip>


    <!-- Instant Notifications -->
    <BottomBarNotificationsInstant />

    <!-- Notifications Panel -->
    <Transition name="notifications-panel">
      <div v-if="notificationsPanelState" bg="primary dark:primaryOp" position="absolute" left="-8px xl:-16px" bottom="50px sm:60px" border="~ secondary dark:secondaryOp rounded-10px">
        <div w="xs md:xs xl:sm" h="lg" flex="~ col gap-20px" p="y-20px x-20px xl:y-30px xl:x-30px">
          <!-- Header - Title & Button -->
          <div flex="~" items="center" justify="between">
            <span un-text="lg xl:xl">الإشعارات</span>
            <IconTrash w="20px" h="20px" cursor="pointer" un-text="error 2xl"></IconTrash>
          </div>

          <!-- Notifications List -->
          <div overflow="y-scroll" p="l-2" flex="~ col gap-20px">
            <!-- Loop Iterations -->
            <div v-for="item in notifications.getNotifications" :key="item" flex="~ col gap-5px" cursor="pointer" p="10px" border="~ transparent hover:secondary dark:hover:secondaryOp rounded-5px">
              <div flex="~" justify="between" items="center">
                <!-- Right : Icon & Title -->
                <div flex="~ grow gap-2" justify="start" items="center">
                  <!-- Icon -->
                  <IconBxsCart h="32px" min-w="32px" max-w="32px" />
                  <!-- Title -->
                  <span un-text="lg xl:xl">{{item.title}}</span>
                </div>

                <!-- Left : Time -->
                <div >
                  <span un-text="xs xl:sm secondaryOp dark:secondary">{{ item.dates }}</span>
                </div>
              </div>
              <div mr="40px">
                <span un-text="xs xl:sm secondaryOp dark:secondary">{{ item.message }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { exit } from "@tauri-apps/api/process";
import { useToggle, ref, onClickOutside , useNotifications } from '#imports'

const [notificationsPanelState, notificationsPanelToggle] = useToggle(false);
const notificationsEl = ref(null);
onClickOutside(
  notificationsEl,
  (event) => (notificationsPanelState.value = false)
);

const notifications = useNotifications()

const setSeen = () => {
  notifications.setSeenAll()
}

</script>

<style scoped>
.notifications-panel-enter-active {
  transition: all 0.15s ease-out;
}

.notifications-panel-leave-active {
  transition: all 0.15s ease-in;
}

.notifications-panel-enter-from,
.notifications-panel-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>
