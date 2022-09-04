<template>
  <!-- Main -->
  <div v-if="app" @click.stop="iconClick"  transform="~ active:scale-95" :class="{ 'animate-pulse': app.booting }" flex="~ col" p="2" items="center" justify="start" cursor="pointer" border="rounded-5px" bg="hover:secondary dark:hover:secondaryOp" un-text="primaryOp dark:primary hover:primaryOp dark:hover:primary center">
    <!-- Icon Container -->
    <div bg="primaryOp dark:primary" flex="~" items="center" justify="center" w="32px sm:48px xl:64px" h="32px sm:48px xl:64px" m="b-7px sm:b-10px xl:b-14px" border="rounded-5px">
      <!-- Icon -->
      <div :class="app.icon" un-text="primary dark:primaryOp" w="18px sm:24px xl:32px" h="18px sm:24px xl:32px"></div>
    </div>

    <!-- Title -->
    <span max-w="76px" un-text="xs sm:base" leading="relaxed">{{ app.title }}</span>
  </div>



  <!-- If No App Passed -->
  <div v-else flex="~ col" p="2" items="center" justify="start" border="rounded-5px" un-text="secondaryOp dark:secondary center">
    <!-- Icon Container -->
    <div bg="secondary dark:secondaryOp" flex="~" items="center" justify="center" w="32px sm:48px xl:64px" h="32px sm:48px xl:64px" m="b-7px sm:b-10px xl:b-14px" border="rounded-5px">
    </div>

    <!-- Title -->
    <span max-w="76px" leading="relaxed">...</span>
  </div>
  
</template>

<script setup>
import { useAppManager, ref } from '#imports';


const props = defineProps({
  app: {
    default: "",
  },

})

const appManager = useAppManager()

const iconClick = () => {
  props.app.open()
  appManager.setFocus(props.app.id)
}
</script>
