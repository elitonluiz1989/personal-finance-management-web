<script setup lang="ts">
import {
  BootstrapColorsEnum,
  getBootstrapColorsEnumDescription,
} from "@/app/enums/bootstrap-colors.enum";
import { computed, defineProps, withDefaults } from "vue";

type AppBadgeProps = {
  color: BootstrapColorsEnum;
  text: string;
  fitContent?: boolean;
};
const props = withDefaults(defineProps<AppBadgeProps>(), {
  fitContent: false,
});

const cssStyles = computed(() => {
  const styles = ["badge"];

  styles.push(handleBadgeColor());

  if (props.fitContent) styles.push("fit-content");

  return styles.join(" ");
});

const handleBadgeColor = (): string => {
  const color = getBootstrapColorsEnumDescription(props.color);

  return `text-bg-${color}`;
};
</script>

<template>
  <span :class="cssStyles">
    {{ props.text }}
  </span>
</template>
