<script setup lang="ts">
import { isNullOrUndefined, isNullOrWhiteSpace } from "@/app/helpers/helpers";
import { CurrencyFormatter } from "@/app/helpers/currency-formatter";
import { defineEmits, defineProps, watch, withDefaults } from "vue";

type AppFormInputProps = {
  class: string;
  formField: string;
  modelValue: number;
  maxlength?: number;
  location?: string;
  currency?: string;
  disabled: boolean;
};
type AppFormInputEmits = {
  (e: "update:modelValue", value: number): void;
  (e: "onFocus", evt: Event): void;
  (e: "onKeyUp", evt: Event): void;
};

const minimumNumberLength = 3;
const expectedNumberOfDecimalPlaces = 2;
let rawValue = 0;

const props = withDefaults(defineProps<AppFormInputProps>(), {
  location: navigator?.language,
  maxlength: 200,
  disabled: false,
});
const emits = defineEmits<AppFormInputEmits>();

const currencyFormatter = new CurrencyFormatter(props.location, props.currency);

const currencyHandler = (value: string): void => {
  value = value.toString().replace(/[^\d]/g, "");

  if (isNullOrWhiteSpace(value)) return;

  if (value.lastIndexOf(".") !== -1) {
    value = value.padEnd(value.length + 1, "0");
  } else {
    value = value.padStart(minimumNumberLength, "0");
  }

  const valueLength = value.length;
  value =
    value.substring(0, valueLength - expectedNumberOfDecimalPlaces) +
    "." +
    value.substring(valueLength - expectedNumberOfDecimalPlaces);

  rawValue = Number.parseFloat(value);

  if (isNaN(rawValue)) rawValue = 0;
};
const triggerFocus = (evt: Event): void => {
  emits("onFocus", evt);
};
const currencyElementHandler = (
  element: HTMLInputElement | null,
  inputValue?: string | undefined
): void => {
  element =
    element ??
    document.querySelector<HTMLInputElement>(
      `input[form-field=${props.formField}]`
    );

  if (!element) return;

  const value =
    inputValue ?? element.value.toString().replace(/[^\d]/g, "") ?? "";

  currencyHandler(value);

  element.value = currencyFormatter.format(rawValue);
};
const onKeyUpHandler = (evt: Event): void => {
  const { target } = evt;
  const element = target as HTMLInputElement;

  currencyElementHandler(element);

  emits("onKeyUp", evt);
  emits("update:modelValue", rawValue);
};

watch(
  () => props.modelValue,
  (newValue: number): void => {
    if (newValue === rawValue) return;

    const valueFormatted = newValue.toFixed(2).toString().replaceAll(".", "");

    currencyElementHandler(null, valueFormatted);
  }
);
</script>

<template>
  <div class="position-relative w-100">
    <input
      type="text"
      :class="props.class"
      :maxlength="props.maxlength"
      :form-field="props.formField"
      :disabled="props.disabled"
      @focus="triggerFocus"
      @keyup="onKeyUpHandler"
      v-if="isNullOrUndefined(props.maxlength)"
    />

    <input
      type="text"
      :class="props.class"
      :form-field="props.formField"
      :disabled="props.disabled"
      @focus="triggerFocus"
      @keyup="onKeyUpHandler"
      v-else
    />
  </div>
</template>
