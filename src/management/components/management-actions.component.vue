<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { ManagementStrings as Strings } from "../management.strings";

type ManagementActionsPropsType = {
  date: string;
};
type ManagementActionsEmitsType = {
  (e: "changeReference", evt: Event): void;
  (e: "search"): void;
};

const props = defineProps<ManagementActionsPropsType>();
const emits = defineEmits<ManagementActionsEmitsType>();

const changeReference = (evt: Event) => emits("changeReference", evt);
const search = () => emits("search");
</script>

<template>
  <div class="col-12 d-flex justify-content-center">
    <input
      class="input-form"
      type="month"
      :value="props.date"
      @change="changeReference"
    />

    <button class="btn btn-primary ms-2" @click="search">
      {{ Strings.reload }}
    </button>
  </div>
</template>
