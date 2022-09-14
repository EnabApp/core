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
        'grid grid-cols-2': twoXs || xs,
      }"
      overflow-y="auto"
      p="4"
      items="center"
      w="95%"
    >
      <!-- Case Content -->
      <div
        v-for="item in 9"
        :key="item"
        flex="~ col gap-18px"
        cursor="pointer"
        class="group"
        justify="center"
        items="center"
        p="t-3px"
        bg="hover:secondaryOp hover:opacity-30 dark:hover:secondaryOp"
        :class="{
          'w-95% h-120px': twoXs || xs,
          'w-95% h-170px': sm || md || lg || xl || twoXl,
        }"
        border="2 secondary dark:secondaryOp rounded-10px"
      >
        <!-- Category Icon -->
        <div
          flex="~ col"
          justify="center"
          items="center"
          bg="secondary group-hover:primary"
          :class="{
            'w-60px h-60px': twoXs || xs,
            'w-75px h-75px': sm || md || lg || xl || twoXl,
          }"
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
          :class="{ 'text-sm': twoXs || xs, 'text-md': sm }"
          font="semibold"
        >
          مشكله المشاكل
        </span>
      </div>
    </div>

    <!-- UI Input & Button -->
    <div flex="~ gap-2" justify="between" w="95%">
      <UiInput
        size="md"
        placeholder="وصف السؤال"
        icon="IconQuestionMark"
        w="90%"
      />
      <UiButton
        size="md"
        @click="$emit('nextStep')"
        :class="{
          'w-48%': twoXs,
          'w-30%': xs,
          'w-23%': sm,
          'w-20%': md || lg || xl || twoXl,
        }"
        >بدء المحادثة</UiButton
      >
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
