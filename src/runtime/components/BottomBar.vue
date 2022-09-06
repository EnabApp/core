<template>
  <!-- Main -->
  <div
    v-if="barState"
    ref="windowRef"
    w="full"
    h="60px"
    flex="~"
    justify="center"
    items="center"
    bg="primary dark:primaryOp"
    z="200"
  >
    <!-- Content -->
    <div h="46px" flex="~" items="center" w="full" m="x-3%">
      <!-- Menu Icon -->
      <BottomBarMenu :BreakpointWindow="BreakpointWindow"/>
      <!-- Divider -->
      <div h="32px" w="1px" bg="secondary dark:secondaryOp" m="x-16px"></div>

      <!-- Applications -->
      <div flex="~ gap-7px grow" h="full" items="center">
        <TransitionGroup>
          <!-- Application loop -->

            <div
            v-for="app in appManager.getRunningApps"
            :key="'bottom-bar-app-' + app.id"
            @click="minimizeApp(app)"
            :class="[
              app.id == appManager.focused
                ? 'text-primaryOp dark:text-primary '
                : 'text-secondaryOp dark:text-secondary hover:text-primaryOp dark:hover:text-primary' ,
                twoXs || xs || sm ? 'w-[5%]' : md ? 'w-[10%]' : 'w-[15%]' ,
            ]"
            class="group"
            cursor="pointer"
            px="16px"

            h="87%"
            flex="~ gap-7px"
            position="relative"
            items="center"
            justify="start"
            bg="secondary dark:secondaryOp"
            border="rounded-5px"
            transition="all 0.025s ease-in-out"
          >
            <!-- Application Icon -->
            <component h="16px" w="16px" :is="`${app.name}Icon`"></component>

            <!-- Application Title -->

            <span v-if="! (twoXs || xs || sm)" un-text="xl" class="truncate" >
              {{ app.title }}
            </span>
            <IconClose v-if="! (twoXs || xs || sm)"
              h="13px"
              w="13px"
              @click.prevent="app.toggleRunning()"
              position="absolute"
              un-text="primaryOp dark:primary"
              left="4"
              class="invisible group-hover:visible"
            ></IconClose>
          </div>

        </TransitionGroup>
      </div>

      <!-- Divider -->
      <div v-if="! (twoXs || xs || md || sm)" h="32px" w="1px" bg="secondary dark:secondaryOp" m="x-16px"></div>

      <BottomBarDatetime v-if="! (twoXs || xs || md || sm)" />

      <!-- Divider -->
      <div h="32px" w="1px" bg="secondary dark:secondaryOp" m="x-16px"></div>

      <!-- Notifications -->
      <BottomBarNotifications />
      <!-- <div text="white"> {{size}}</div> -->

      <!-- Divider -->
      <!-- <div h="32px" w="1px" bg="secondary dark:secondaryOp" m="x-16px"></div> -->

      <!-- Bottombar minimize -->
      <!-- <div un-text="primaryOp dark:primary">
            <div cursor="pointer" @dblclick="barToggle()" h="32px" w="32px" class="i-bi-arrow-down-right-square-fill"></div>
        </div> -->
    </div>
  </div>

  <!-- Floating Button -->
  <div
    ref="floatingButton"
    v-else
    p="20px"
    position="fixed"
    left="0"
    bottom="0"
    :style="style"
    z="200"
  >
    <div
      un-text="primaryOp dark:primary"
      bg="primary dark:primaryOp"
      border="rounded-10px"
      w="60px"
      h="60px"
      flex="~"
      items="center"
      justify="center"
    >
      <IconArrowUp
        @dblclick="barToggle()"
        cursor="pointer"
        h="32px"
        w="32px"
      ></IconArrowUp>
    </div>
  </div>
</template>

<script setup>
import {
  useAppManager,
  ref,
  computed,
  useToggle,
  useBreakpointWindow,
  useDraggable,
  useWindowSize,
  useFullscreen,
} from "#imports";

//====== Window Size Changing ======//
const windowRef = ref(null);
const BreakpointWindow = useBreakpointWindow(windowRef);
const { size, twoXs, xs, sm, md, lg, xl, twoXl } = BreakpointWindow;

const today = new Date();
const date = computed(() => today.toLocaleDateString("ar-IQ"));

const appManager = useAppManager();

const { width, height } = useWindowSize();

const [barState, barToggle] = useToggle(true);
const floatingButton = ref(null);

const { x, y, style, position } = useDraggable(floatingButton, {
  initialValue: { x: 0, y: "100%" },
  stopPropagation: true,
  onEnd: () => {
    y.value = y.value > height.value / 2 || y.value == "100%" ? "100%" : 0;
    x.value = x.value > width.value / 2 ? width.value - 100 : 0;
  },
});

///////////// Right
// Full Screen
const { isFullscreen, enter, exit, toggle: toggleFullScreen } = useFullscreen();

const minimizeApp = (app) => {
  if (app.minimized) {
    appManager.setFocus(app.id);
    app.minimized = !app.minimized;
  } else {
    if (appManager.focused == app.id) {
      app.minimized = !app.minimized;
      appManager.setFocus(null);
    } else {
      appManager.setFocus(app.id);
    }
  }

  // app.toggleMinimize()
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
