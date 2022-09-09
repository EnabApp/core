<template>
  <div flex="~ gap-3" p="2" bg="secondaryOp" rounded="5px" items="center" justify="between">
    <div flex="~ gap-3" w="65%">
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
        border="rounded-full secondaryOp 3"
        class="bg-secondaryOp dark:bg-secondary"
      ></div>
    </div>
    <div flex="~ col gap-1" w="60%">
      <span  text="primaryOp dark:primary" truncate="~" font="semibold"
        >حسن الخالدي حسابي الثاني</span
      >
      <span un-text="secondary sm">الفئة : Ui / Bugs</span>
    </div>
    </div>

    <div flex="~ gap-2" justify="between" w="30%" px="1">
      <IconConversation  @click="$emit('unselect')" w="24px" h="24px" text="primary" />
      <IconProfile w="24px" h="24px" text="primary" />
      <IconLock w="24px" h="24px" text="primary" />
    </div>
  </div>
</template>
<script setup>
  const emit = defineEmits(["unselect"]);
</script>
