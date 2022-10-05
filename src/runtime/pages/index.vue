<template>
  <div>
    Business
  </div>
</template>

<script setup>

definePageMeta({
  title: "Home",
  // middleware: auth
});

console.log(await $fetch('/api/hello'))

</script>
