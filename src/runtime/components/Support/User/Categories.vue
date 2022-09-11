<template>
  <div
    flex="~ col gap-4 grow"
    justify="center"
    items="center"
    w="full"
    h="full"
  >
    <div
      gap="10px"
      :class="{
        'grid grid-cols-3': sm || md || lg || xl || twoXl,
        'grid grid-cols-2': xs,
        'grid grid-cols-2 ': twoXs,
      }"
      items="center"
    >
      <div
        v-for="item in 6"
        :key="item"
        flex="~ col gap-18px"
        cursor="pointer"
        class="group"
        justify="center"
        items="center"
        p="t-3px"
        bg="hover:secondaryOp hover:opacity-30 dark:hover:secondaryOp"
        :class="{
          'w-120px h-120px': twoXs,
          'w-130px h-130px': xs,
          'w-188px h-188px': sm || md || lg || xl || twoXl,
        }"
        border="2 secondary dark:secondaryOp rounded-10px"
      >
        <!-- Category Icon -->
        <div
          flex="~ col"
          justify="center"
          items="center"
          bg="secondary group-hover:primary"
          w="55px"
          h="55px"
          rounded="full"
        >
          <IconEmail
            :class="{
              'w-32px h-32px': twoXs || xs,
              'w-38px h-38px': sm || md || lg || xl || twoXl,
            }"
            text="primaryOp"
          />
          <!-- <component w="38px" h="38px" text="primaryOp" :is="`${Category.name}Icon`"></component>  -->
        </div>

        <!-- Category Name -->
        <span
          p="5px"
          text="primaryOp dark:primary"
          :class="{ 'text-sm': twoXs, 'text-md': xs }"
          font="semibold"
        >
          مشكله المشاكل
        </span>
      </div>
    </div>

    <!-- UI Input & Button -->
    <div flex="~ gap-2" justify="between" w="80%">
      <UiInput placeholder="وصف السؤال" icon="IconQuestionMark" w="90%" />
      <UiButton @click="$emit('nextStep')" w="20%">ارسل</UiButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  BreakpointWindow: {
    type: Object,
  },
});

const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.BreakpointWindow;
</script>
