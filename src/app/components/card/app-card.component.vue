<script setup lang="ts">
import { FinanceTypeEnum } from "@/app/enums/finance-type.enum";
import { computed, defineProps, withDefaults } from "vue";

type AppCardProps = {
  title: string;
  type: FinanceTypeEnum | undefined;
  useActions?: boolean;
};

const props = withDefaults(defineProps<AppCardProps>(), {
  useActions: false,
});

const cardCssStyle = computed((type: FinanceTypeEnum) => ({
  "card card--credit bg-white pb-1":
    props.type === FinanceTypeEnum.credit && props.useActions === false,
  "card card--debt bg-white pb-1":
    props.type === FinanceTypeEnum.debt && props.useActions === false,
  "card card--credit bg-white":
    props.type === FinanceTypeEnum.credit && props.useActions === true,
  "card card--debt bg-white":
    props.type === FinanceTypeEnum.debt && props.useActions === true,
}));
</script>

<template>
  <div :class="cardCssStyle">
    <div class="card__header d-flex mb-0">
      <div
        class="d-flex flex-fill align-items-center justify-content-center py-2 text-white fw-bolder"
      >
        {{ props.title }}
      </div>

      <slot name="header"></slot>
    </div>

    <div class="flex-fill">
      <slot name="content"></slot>
    </div>

    <div
      class="card__actions d-flex justify-content-evenly py-2"
      v-if="props.useActions"
    >
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.card {
  $selector: &;

  &__header {
    border-top-right-radius: 0.3rem;
    border-top-left-radius: 0.3em;
  }

  &__actions {
    border-top-width: 1px;
    border-top-style: solid;
  }

  &--credit {
    border-color: $app-credit-color;

    #{$selector}__header {
      background-color: $app-credit-color;
    }

    #{$selector}__actions {
      border-top-color: $app-credit-color;
    }
  }

  &--debt {
    border-color: $app-debt-color;

    #{$selector}__header {
      background-color: $app-debt-color;
    }

    #{$selector}__actions {
      border-top-color: $app-debt-color;
    }
  }
}
</style>
