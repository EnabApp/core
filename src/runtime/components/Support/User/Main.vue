<template>
  <div
    flex="~ gap-4 col grow"
    overflow-y="auto"
    h="100px"
    :class="{
      'w-100%': twoXs || xs || sm,
      'w-77% container mx-13%': md,
      'w-66% container mx-17%': lg,
      'w-56% container mr-22%': xl,
      'w-46% container mx-27%': twoXl,
    }"
  >
    <SupportUserCategories
      v-if="step == 1"
      @nextStep="step = 2"
      :BreakpointWindow="BreakpointWindow"
    />
    <SupportUserWaiting v-if="step == 2" />
    <SupportUserMessages v-if="step == 3" />
  </div>
</template>
<script setup>
const props = defineProps({
  BreakpointWindow: {
    type: Object,
  },
});
const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.BreakpointWindow;

const step = ref(1);
</script>
