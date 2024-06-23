<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";
import { ManagementStrings as Strings } from "../management.strings";

type ManagementActionsPropsType = {
  date: string;
  allManagementsRecord: boolean;
};
type ManagementActionsEmitsType = {
  (e: "changeReference", evt: Event): void;
  (e: "save"): void;
  (e: "search"): void;
};

const props = defineProps<ManagementActionsPropsType>();
const emits = defineEmits<ManagementActionsEmitsType>();

const saveText = ref<string>(Strings.saveAll);
const saveStyles = ref<string>("btn btn-success ms-2");

const changeReference = (evt: Event) => emits("changeReference", evt);
const save = () => emits("save");
const search = () => emits("search");

watch(
  () => props.allManagementsRecord,
  (newValue: boolean, oldValue: boolean) => {
    if (oldValue == newValue) return;

    saveText.value = newValue ? Strings.updateAll : Strings.saveAll;
    saveStyles.value = newValue
      ? "btn btn-danger ms-2"
      : "btn btn-success ms-2";
  }
);
</script>

<template>
  <div class="col-12 d-flex justify-content-center">
    <input
      class="input-form"
      type="month"
      :value="date"
      @change="changeReference"
    />

    <button :class="saveStyles" @click="save">
      {{ saveText }}
    </button>

    <button class="btn btn-primary ms-2" @click="search">
      {{ Strings.reload }}
    </button>
  </div>
</template>
