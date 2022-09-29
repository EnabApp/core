<template>
  <div absolute="~" top="32" :class="{
    'right-10% w-80%': twoXs,
    'right-20% w-60%': xs,
    'mr-40% right-10% w-40% ': sm || md,
  }" rounded="10px" bg="primary dark:primaryOp" border="1 secondaryOp dark:secondary" h="70%" flex="~ col"
    items="center">
    <img
      src="https://d1oqwsnd25kjn6.cloudfront.net/production/curio_primary_images/12566/original/Feb._25_2018-SteveJobs.jpg?1518809726"
      w="90px" h="90px" border="1 secondaryOp dark:secondary" rounded="full" top="-12" absolute="~" />

    <!--  Close Button  -->
    <IconClose absolute="~" left="12px" top="12px" w="14px" h="14px" text="primary" cursor="pointer" z="30"
      @click="$emit('closeMiniState')" />

    <div mt="56px" flex="~ col gap-23px" max-w="200px" p="3" h="full" w="full" items="center">

      <!--  User Name  -->
      <span text="24px primaryOp dark:primary" truncate="~" font="thin" :class="{ 'max-w-98%': twoXs }">حسن الخالدي
        حسابي الثاني
      </span>

      <!-- = User Stuff == -->
      <div flex="~ col gap-8px" w="full">

        <!-- = User Email == -->
        <div flex="~" items="center" justify="between">
          <span truncate="~" text="primaryOp dark:primary">gruceing@gmail.com</span>
          <IconEmail text="primaryOp dark:primary" w="18px" h="18px" />
        </div>

        <div flex="~" items="center" justify="between">

          <!-- = User Phone Number == -->
          <span truncate="~" text="primaryOp dark:primary">07730281556</span>
          <IconPhone text="primaryOp dark:primary" w="18px" h="18px" />
        </div>

        <div flex="~" items="center" justify="between">

          <!-- = User Business Title == -->
          <span truncate="~" text="primaryOp dark:primary">خل يولن</span>
          <IconBusiness text="primaryOp dark:primary" w="18px" h="18px" />
        </div>

        <div flex="~" items="center" justify="between">

          <!-- = User Points == -->
          <span truncate="~" text="primaryOp dark:primary">5,584</span>
          <IconPoints text="primaryOp dark:primary" w="18px" h="18px" />
        </div>
      </div>

      <div overflow="y-auto">
        <span text="right 16px primaryOp dark:primary">تطبيقات المستخدم</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "#imports";
import { useSupport } from "../../../composables/useSupport";

const props = defineProps(["BreakpointWindow"]);

const support = useSupport();

watch(
  () => support.getSelectedConversationId,
  async () => {
    if (support.getSelectedConversationId){
      console.log(support.getSelectedConversation)
      // support.fetchProfile(support.getSelectedConversation.user.id);
    }
  },
  {deep: true}
);

const { xs, sm, md, lg, xl, twoXs } = props.BreakpointWindow;
</script>
