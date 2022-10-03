<template>
  <div h="full" w="full" border="~">
    test
    <UiInput label="noice" />
  </div>
</template>

<script setup>
definePageMeta({
  title: "Home",
  // middleware: auth
});

// window.onbeforeunload = function() { window.history.forward(1); };

</script>


<style scoped>
/* CLOSE TRANSITION */
.v-enter-active {
  animation: bounce-in 0.3s;
}

.v-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.desktop-loading-enter-active,
.desktop-loading-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.desktop-loading-enter-from,
.desktop-loading-leave-to {
  opacity: 0;
}

</style>
