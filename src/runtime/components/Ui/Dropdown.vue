<template>
  <div w="full" @click="dropdown = true" position="relative">
    <!-- Showing multiple selects -->
    <div v-if="multiple">
      <span
        v-for="item in selectedItems"
        @click="selectItem(item)"
        :key="item.id"
        p="x-1"
        text="xs gray-600"
        bg="gray-200"
        border="~ rounded-md gray-100 dark:gray-600"
        >{{ item.value }}</span
      >
    </div>

    <!-- Main Search -->
    <UiInput
      :label="label"
      :placeholder="placeholder"
      v-model="search"
      :icon="icon ? icon : dropdown ? 'IconBxsUpArrow' : 'IconBxsDownArrow'"
    >
      <slot />
    </UiInput>

    <div
      v-if="dropdown"
      ref="dropdownRef"
      w="full"
      bg="white dark:secondary-500"
      border="~ gray-50 dark:gray-600 rounded-lg"
      position="absolute"
      text="secondary-900"
      m="t-1"
      shadow="~ gray-200 dark:gray-900"
    >
      <div flex="~ col gap-2" p="2">
        <div
          @click="selectItem(item)"
          v-for="item in searchResult"
          :key="item.id"
          :class="{
            'font-medium': item.id == selectedIdRef,
          }"
          bg="hover:gray-100 dark:hover:secondary-600"
          p="x-2 y-1"
          flex="~"
          justify="between"
          items="center"
          text="sm"
          border="rounded-lg"
        >
          <span>{{ item.value }}</span>
          <span v-if="selectedIdRef == item.id">
            <div class="i-humbleicons-times"></div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside, ref, computed } from '#imports'

const props = defineProps({
  modelValue: {
    type: String,
  },
  list: {
    type: Array,
    default: [],
  },
  selectedId: {
    type: String,
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  icon: {
    type: String,
  },
});

// DropDown Showing / Hiding
const dropdown = ref(false);
const dropdownRef = ref(null);

// Select / Search
const selectedIdRef = ref(props.selectedId);
const search = ref("");
const selectedItems = ref([]);

// Searching
const searchResult = computed(() => {
  const text = search.value;
  const list = props.list;
  if (!text) return list;
  return list.filter((item) =>
    item.value.toLowerCase().includes(text.toLowerCase())
  );
});

// Selecting / Emitting
const emit = defineEmits(["update:modelValue"]);

const selectItem = (item) => {
  if (props.multiple) {
    if (selectedItems.value.find((x) => x.id == item.id)) {
      selectedItems.value = selectedItems.value.filter((x) => x.id != item.id);
    } else {
      selectedItems.value.push(item);
    }
    emit(
      "update:modelValue",
      JSON.stringify(selectedItems.value.map((item) => item.id))
    );
  } else {
    if (selectedIdRef.value == item.id) {
      selectedIdRef.value = null;
      search.value = null;
      emit("update:modelValue", null);
    } else {
      selectedIdRef.value = item.id;
      search.value = item.value;
      emit("update:modelValue", item.id.toString());
    }
  }
};

// Outside
onClickOutside(dropdownRef, (event) => {
  dropdown.value = false;
  if (selectedIdRef.value) {
    search.value = props.list.find(
      (item) => item.id === selectedIdRef.value
    ).value;
  }
});
</script>
