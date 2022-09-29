<template>
  <div flex="~" p="2" bg="secondary dark:secondaryOp  hover:opacity-70" rounded="5px" items="center" justify="between">
    <div @click.stop="support.showMiniProfile()" flex="~ gap-3" items="center">

      <!-- Back Icon -->
      <div w="30px" v-if="!(md || sm)">
        <IconBack @click.stop="support.unselectConversation()" w="24px" h="24px" text="primaryOp dark:primary" cursor="pointer" />
      </div>

      <div flex="~ gap-3" max-w="200px" cursor="pointer">
        <div relative="~">

          <!-- User Image -->
        <div v-if="conversation.user.avatar_url">
          <img :src="conversation.user.avatar_url" w="48px" h="48px" rounded="full" />
        </div>
        <div v-else>
          <IconPerson bg="secondary dark:secondaryOp" w="48px" h="48px" rounded="full" />
        </div>

          <!-- Online State -->
          <div w="10px" h="10px" right="34px" bottom="2px" position="absolute" border="rounded-full primary dark:primaryOp 3" :class="
          support.selectedConversation.isOnline
            ? 'bg-success'
            : 'bg-secondaryOp dark:bg-secondary'
        "></div>
        </div>
        <div flex="~ col gap-1" max-w="full">
            
            <!--  User Name -->
          <span text="primaryOp dark:primary" w="70%" truncate="~" font="semibold">
            <span v-if="conversation.user?.username">
              {{ conversation.user?.username }}</span>
            <span v-else>لا يوجد اسم</span>
          </span>

          <!-- User Issue -->
          <span un-text="secondaryOp dark:secondary sm">الفئة : Ui / Bugs</span>
        </div>
      </div>
    </div>

    <!-- Conversation Lock -->
    <div flex="~ gap-2" justify="between" w="30px" mx="2" px="1">
      <IconUnlock v-if="showLock" @click="showLock = false" w="24px" h="24px" text="primaryOp dark:primary" cursor="pointer" />
      <IconLock v-else @click="showLock = true" w="24px" h="24px" text="error" cursor="pointer" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "#imports";
import { useSupport } from "../../../composables/useSupport";

const props = defineProps({
  conversation: {
    type: Object,
  },
  BreakpointWindow: {
    type: Object,
  },
});

const support = useSupport()

const {size, xs, sm, md, lg, xl, twoXs } = props.BreakpointWindow;

const showLock = ref(true);
</script>
