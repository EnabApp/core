<template>
  <div
    flex="~ gap-4 col grow"
    h="100px"
    class="transition-all duration-300 pop-up delay-75"
    :class="{
      'w-100%': twoXs || xs || sm,
      'w-85% container mx-7% ': md,
      'w-70% container mx-15%': lg,
      'w-55% container mr-22%': xl,
      'w-45% container mx-27%': twoXl,
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

watch(
  () => step.value,
  (val) => {
    if (val == 2) {
      setTimeout(() => {
        step.value = 3;
      }, 3000);
    }
  }
);
</script>
