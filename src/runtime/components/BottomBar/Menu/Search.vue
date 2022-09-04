<template>
    <div h="30px sm:43px" m="t-20px" flex="~ gap-2" p="x-13px" items="center" justify="start" bg="secondary dark:secondaryOp" un-text="secondaryOp dark:secondary focus-within:primaryOp dark:focus-within:primary" border="rounded-10px">
        <IconSearch  h="16px" w="16px"/>
        <input ref="searchInput" v-model="modelValue" @input="(event) => $emit('update:modelValue', event.target.value)" flex="grow" placeholder="بحث..." type="search" un-text="xs sm:lg secondaryOp dark:secondary focus:primaryOp dark:focus:primary" class="bg-transparent border-0 outline-none focus:outline-none" />
    </div>
</template>

<script setup>
import { ref, onMounted } from '#imports'

const props = defineProps({
  modelValue: String
})

const searchInput = ref(null);

onMounted(() => searchInput.value.focus())
</script>