<template>
  <div>
        <label
          v-for="option in options"
          :key="option.id"
          class="flex flex-row items-center cursor-pointer text-primaryOp dark:text-primary"
        >
          <UiIcon class="ml-2" :icon="checked.includes(option.id) ? 'i-ic-baseline-check-box' : 'i-ic-baseline-check-box-outline-blank'"/>
          <span :for="option.id">{{ option.name }}</span>
          
          <input
            :id="option.id"
            v-model="checked"
            type="checkbox"
            :value="option.id"
            @change="onChange()"
            class="hidden"
          >
          
        </label>
  </div>
</template>

<script setup>
import {ref} from "#imports"

const props = defineProps({
    options: {
      type: Array,
      required: true,
      default: () => []
    }
})

const checked = ref([])

const emit = defineEmits(["update:modelValue"]);

function onChange() {
  emit('update:modelValue', checked.value);
}
</script>
