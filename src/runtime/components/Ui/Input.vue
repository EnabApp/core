<template>
  <div flex="~ col gap-1">
    <!-- Label -->
    <label
      v-if="label"
      class="text-md font-medium text-secondaryOp dark:text-secondary"
      >{{ label }}</label
    >

    <!-- Main Input Components -->
    <div
      class="group"
      :class="{
        'focus-within:border-primaryOp dark:focus-within:border-primary':
          !error,
        'focus-within:border-error-500': error,
      }"
      flex="~ gap-2"
      font="leading-tight"
      justify="between"
      p="x-2"
      un-text="xl secondary dark:secondaryOp"
      border="~ 1 secondary dark:secondaryOp rounded-[5px]"
      outline="none focus-within:none"
    >
      <div flex="~ gap-2 grow" items="center">
        <!-- Icon -->
        <component v-if="icon" h="20px" w="20px" text="dark:primary primaryOp" :is="`${icon}`" />

        <!-- Input -->
        <input
          :value="modelValue"
          w="20"
          @input="$emit('update:modelValue', $event.target.value)"
          :placeholder="placeholder"
          :type="type == 'password' ? statePassword : type"
          class="py-2 text-md text-secondaryOp bg-transparent border-0 outline-none appearance-none dark:text-secondary dark:bg-transparent grow focus:outline-none"
        />
      </div>

      <!-- Buttons -->
      <div
        id="buttons"
        flex="~ gap-1"
        items="center"
        p="b-0.5"
        m="1"
        overflow="y-hidden"
      >
        <!-- Type password -->
        <div class="flex gap-1" v-if="type == 'password'">
          <button
            v-if="statePassword == 'password'"
            @click="showPassword()"
            text="xl gray-500 dark:gray-200"
          >
            <IconGridiconsNotVisible w="18px" />
          </button>
          <button
            v-else
            @click="showPassword()"
            text="xl gray-700 dark:text-gray-50"
          >
            <IconGridiconsVisible w="18px" />
          </button>
        </div>

        <!-- Incrementals -->
        <div flex="~ gap-1 col" v-if="type == 'number'">
          <button
            @click="increase()"
            text="xl secondaryOp dark:secondary"
            cursor="pointer"
          >
            <IconEpArrowUp w="18px" />
          </button>
          <button
            @click="decrease()"
            text="xl secondaryOp dark:secondary"
            cursor="pointer"
          >
            <IconEpArrowDown w="18px" />
          </button>
        </div>

        <!-- Alternative Buttons -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useToggle } from "#imports";
const props = defineProps({
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  icon: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  error: {
    type: Boolean,
    default: false,
  },
  increment: {
    type: String,
    default: "1",
  },
});

const emit = defineEmits(["update:modelValue"]);

// Toggling Password View
const [statePassword, showPassword] = useToggle(props.type, {
  truthyValue: "password",
  falsyValue: "text",
});

const increase = () => {
  const inputValue = inputRef.value.value;
  inputRef.value.value = parseFloat(inputValue) + parseFloat(props.increment);
  emit("update:modelValue", inputRef.value.value);
};
const decrease = () => {
  const inputValue = inputRef.value.value;
  inputRef.value.value = parseFloat(inputValue) - parseFloat(props.increment);
  emit("update:modelValue", inputRef.value.value);
};
</script>

<style scoped>
#buttons::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

/* #buttons::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} */

#buttons::-webkit-scrollbar-thumb {
  background-color: #bbb;
  /* outline: 1px solid slategrey; */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
