<script setup lang="ts">
import { defineProps } from "vue";

type AppCardRowProps = {
  label: string;
  value: string;
};

const props = defineProps<AppCardRowProps>();
</script>

<template>
  <div class="d-flex row py-3">
    <div class="col-5 fw-bolder">{{ props.label }}</div>
    <div class="col">{{ value }}</div>
  </div>
</template>
