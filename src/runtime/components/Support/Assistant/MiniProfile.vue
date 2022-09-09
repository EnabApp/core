<template>
  <div
    flex="~"
    p="2"
    bg="secondaryOp hover:opacity-70"
    rounded="5px"
    items="center"
    justify="between"
    cursor="pointer"
  >
  <div flex="~ gap-3" items="center">
    <div w="30px" v-if="!(md || sm)">
    <IconBack
        @click="$emit('unselect')"
        w="24px"
        h="24px"
        text="primary"
        cursor="pointer"
      />
  </div>
    <div flex="~ gap-3" max-w="200px">
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
      <div flex="~ col gap-1" max-w="80%">
        <span text="primaryOp dark:primary" truncate="~" font="semibold"
          >حسن الخالدي حسابي الثاني</span
        >
        <span un-text="secondary sm">الفئة : Ui / Bugs</span>
      </div>
    </div>
  </div>


    <div flex="~ gap-2" justify="between" w="30px" mx="2" px="1">
      <IconLock v-if="showLock" @click="showLock=false" w="24px" h="24px" text="primary" cursor="pointer"/>
      <IconUnlock v-else @click="showLock=true" w="24px" h="24px" text="error" cursor="pointer"/>

    </div>
  </div>
</template>
<script setup>
import {ref} from "#imports"
const props = defineProps({
  md: {
    type: Boolean,
  },
  sm: {
    type: Boolean,
  },
});

const showLock = ref(true)

</script>
