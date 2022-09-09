<template>
  <!-- //===== here is the Conversation case  ======// -->
  <div w="98%">
    <div
      cursor="pointer"
      transition="~ duration-200 ease-in-out"
      :class="{
        'bg-secondary dark:bg-secondaryOp':
          selectedConversationId == conversation.id,
      }"
      bg="hover:secondary dark:hover:secondaryOp"
      p="2%"
      rounded="10px"
      flex="~ gap-3"
      items="center"
      h="60px"
    >
      <div relative="~">
        <img
          src="https://d1oqwsnd25kjn6.cloudfront.net/production/curio_primary_images/12566/original/Feb._25_2018-SteveJobs.jpg?1518809726"
          w="48px"
          h="48px"
          rounded="full"
        />
        <div
          w="10px"
          h="10px"
          right="34px"
          bottom="2px"
          position="absolute"
          border="rounded-full primaryOp 3"
          :class="
            conversation.isOnline
              ? 'bg-success'
              : 'bg-secondaryOp dark:bg-secondary'
          "
        ></div>
      </div>
      <!-- //===== User Name is below me!  =====// -->

      <div
        flex="~ col"
        :class="{
          'w-90%': twoXl || md,
          'w-70%': xl || lg || sm,
          'w-100%': xs || twoXs,
        }"
      >
        <div flex="~" items="center" justify="between">
          <span
            text="primaryOp dark:primary"
            w="70%"
            truncate="~"
            font="semibold"
            >{{ conversation.user_id?.username }}</span
          >
          <span right="0" un-text="secondary end xs">1 ساعة</span>
        </div>

        <span w="80%" truncate="~" un-text="secondary sm"
          >هلو حبيبي ممكن مساعدة ؟</span
        >
        <span un-text="white">{{ size }}</span>
      </div>

      <!-- //===== state dote under me [HELPP!]  =====// -->
    </div>
    <div h="0.5px" w="full" bg="secondary dark:secondaryOp" m="y-5px"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  conversation: {
    type: Object,
  },
  selectedConversationId: {
    type: String,
  },
  BreakpointWindow: {
    type: Object,
  },
});

const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.BreakpointWindow;
</script>
