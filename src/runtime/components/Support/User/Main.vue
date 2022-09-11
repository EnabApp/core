<template>
  <div
    flex="~ gap-4 col grow"
    overflow-y="auto"
    h="100px"
    :class="{ 'w-100%': twoXs || xs || sm ,
  'w-76% container mx-12%' : md,
  'w-66% container mx-22%' : lg,
  }"
  >
    <div w="60px" text="white">{{ size }}</div>
    <SupportUserMessages />
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
