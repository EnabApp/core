<template>
  <div ref="menuEl" position="relative">
    <!-- Menu Icon -->
    <IconEnab :class="[ online ? 'text-success' : 'text-error']" @click="menuPanelToggle()" cursor="pointer" h="45px" />
    <!-- Menu Panel -->
    <Transition name="menu-panel">
      <div v-if="menuPanelState" position="absolute" w="xs sm:sm md:lg xl:xl" h="xs:md md:28rem" m="4" bottom="60px sm:180px xl:225px" right="-15px sm:auto" flex="~ col" justify="between">
        <div flex="~ col grow" bg="primary dark:primaryOp" p="y-28px x-24px sm:y-20px sm:x-34px xl:y-10px xl:x-35px" border="~ b-0 secondary dark:secondaryOp rounded-t-10px">
          <!-- Search Bar -->
          <BottomBarMenuSearch v-model="searchText" />

          <!-- Quick Access -->
          <BottomBarMenuQuickAccess :apps="apps" />

          <!-- Statistics -->
          <BottomBarMenuStatistics />
        </div>

        <BottomBarMenuActionBar />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useAppManager, useTauri, ref, computed, useToggle, onClickOutside, useOnline } from '#imports';
import { exit } from "@tauri-apps/api/process";

const appManager = useAppManager();

const [menuPanelState, menuPanelToggle] = useToggle(false);
const menuEl = ref(null);
onClickOutside(menuEl, (event) => (menuPanelState.value = false));

const isTauri = useTauri();

const closeApp = async () => await exit(1);

////////////////////////////
// Applications Searching //
////////////////////////////
const searchText = ref("");
const apps = computed(() => {
  if (searchText.value)
    return appManager.getCoreApps.filter(app => app.title.includes(searchText.value));
  else
    return appManager.getCoreApps
});


// Online Status
const online = useOnline()

</script>

 

<style scoped>
.menu-panel-enter-active {
  transition: all 0.15s ease-out;
}

.menu-panel-leave-active {
  transition: all 0.15s ease-in;
}

.menu-panel-enter-from,
.menu-panel-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>
