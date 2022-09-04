<template>
  <div w="full" h="full">
    <div
      h="full"
      @click.right="
        ($event) => {
          toggle(), getPosition(), (clickedElement = $event);
        }
      "
    >
      <slot />
    </div>
    <Transition>
      <div
        class="backdrop-blur-lg"
        border="rounded-xl"
        ref="target"
        v-if="state"
        bg="w-40"
        p="4"
        w="48"
        h="content"
        position="fixed"
        :style="[`left: ${currentX}px`, `top: ${currentY}px`]"
        flex="~ col gap-2"
        z="250"
      >
        <slot name="menu" />

        <UiMenuItem icon="i-akar-icons-copy" @click="copy()" title="نسخ" />
        <UiMenuItem
          icon="i-akar-icons-clipboard"
          @click="paste()"
          title="لصق"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
const { x, y, sourceType } = useMouse();

const currentX = ref(0);
const currentY = ref(0);

const { width, height } = useWindowSize()

const getPosition = () => {
    // console.log(width.value, height.value)
  currentX.value = x.value;
  currentY.value = y.value;
  
  if (x.value + 230 > width.value) currentX.value = x.value - 230
  if (y.value + 110 > height.value) currentY.value = y.value - 110

  

};

const [state, toggle] = useToggle(false);

const target = ref(null);

onClickOutside(target, (event) => (state.value = false));

const { $toast } = useNuxtApp();

// Functionality
const clickedElement = ref(null);

const copy = () => {
  let text =
    clickedElement.value.target.innerText || clickedElement.value.target.value;
  console.log(text);
};

const paste = async () => {
  let el = clickedElement.value.target;
  let type = el.tagName.toLowerCase();
  if (type !== "input") {
    $toast.error("لايمكن استخدام اللصق هنا");
  } else {
    el.value += await navigator.clipboard.readText();
  }
};
</script>

<style scoped>
.v-enter-active {
  transition: all 0.075s ease-out;
}

.v-leave-active {
  transition: all 0.075s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scaleY(0.1);
}
</style>
