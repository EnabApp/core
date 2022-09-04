<template>
  <div
    h="50px sm:80px"
    bg="primary dark:primaryOp opacity-90 dark:opacity-90"
    class="backdrop-blur-[5px]"
    border="~ t-0 secondary dark:secondaryOp rounded-b-10px"
  >
    <div
      flex="~"
      justify="between"
      items="center"
      p="y-10px x-18px sm:y-20px sm:x-36px"
    >
      <!-- Right Actions -->
      <div>
        <div
          v-if="!username"
          h="30px sm:35px xl:40px"
          w="30px sm:35px xl:40px"
          un-text="primaryOp dark:primary"
          class="i-line-md-loading-twotone-loop"
        ></div>
        <div v-else un-text="md sm:lg xl:xl primaryOp dark:primary">
          <span v-if="username">{{ username }}</span>
          <span v-else>لا يوجد اسم</span>
        </div>
      </div>

      <!-- Left Actions -->
      <div flex="~ gap-14px row-reverse" items="center">
        <div
          cursor="pointer"
          bg="primaryOp dark:primary"
          border="rounded-5px"
          un-text="primary dark:primaryOp"
          h="30px sm:35px xl:40px"
          w="30px sm:35px xl:40px"
          flex="~"
          items="center"
          justify="center"
          @click="userProfile.logout()"
        >
          <IconLogOut
            h="16px sm:22px"
            w="16px sm:22px"
          ></IconLogOut>
        </div>

        <div
          @click="toggleDark()"
          cursor="pointer"
          bg="primaryOp dark:primary"
          border="rounded-5px"
          un-text="primary dark:primaryOp"
          h="30px sm:35px xl:40px"
          w="30px sm:35px xl:40px"
          flex="~"
          items="center"
          justify="center"
        >
          <div h="16px sm:22px" w="16px sm:22px">
            <IconLightMode v-if="!isDark" />
            <IconDarkMode v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDark, useToggle, useUserProfile } from "#imports";
const userProfile = useUserProfile();
const profile = userProfile.getProfile;
const username = profile.username;

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
