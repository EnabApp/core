<template>
  <!-- Main -->
  <div v-if="isInstalled" :class="{ 'animate-pulse': app.booting }" transform="~ active:scale-90" transition="transform .075s ease-in-out" @click.stop="iconClick" w="80px xl:100px" h="100px sm:140px" flex="~ col" items="center" justify="start" p="2" cursor="pointer" border="rounded-10px" bg="hover:primary dark:hover:primaryOp" un-text="primary dark:primaryOp hover:primaryOp dark:hover:primary">
    <div bg="primary dark:primaryOp" flex="~" items="center" justify="center" w="80px xl:100px" min-h="60px sm:80px xl:100px" m="b-18px" border="rounded-5px">
      <component v-if="isIconExists" un-text="primaryOp dark:primary" w="32px sm:48px xl:64px" h="32px sm:48px xl:64px" :is="`${app.name}Icon`"></component>
      <IconAppDefault v-else un-text="primaryOp dark:primary" w="32px sm:48px xl:64px" h="32px sm:48px xl:64px"></IconAppDefault>
    </div>
    <span truncate="~" w="80px md:90px xl:100px" un-text="sm center sm:base">{{ app.title }}</span>
  </div>
  
  <!-- If Not Installed -->
  <div v-else animate-pulse="~" w="60px sm:80px xl:100px" h="100px sm:140px" flex="~ col" items="center" justify="start" p="2" border="rounded-10px" un-text="primary dark:primaryOp hover:primaryOp dark:hover:primary">
    <div bg="secondary dark:secondaryOp" flex="~" items="center" justify="center" w="60px sm:80px xl:100px" min-h="60px sm:80px xl:100px" m="b-18px" border="rounded-5px">
    </div>
    <span un-text="sm sm:base error">{{ app.title }}</span>
  </div>
  
  
</template>

<script setup>
import { useAppManager, ref } from '#imports';
import { resolveDynamicComponent } from 'vue';

const props = defineProps({
  app: {
    type: Object,
    default: "",
  },
})


const appManager = useAppManager()

const iconClick = () => {
  props.app.open()
  appManager.setFocus(props.app.id)
}

const isInstalled = typeof resolveDynamicComponent(`${props.app.name}Main`) !== 'string'
const isIconExists = typeof resolveDynamicComponent(`${props.app.name}Icon`) !== 'string'
</script>
