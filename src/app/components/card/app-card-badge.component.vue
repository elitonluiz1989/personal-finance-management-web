<script setup="" lang="ts">
import { computed, defineProps } from "vue";
import * as FinanceType from "@/app/enums/finance-type.enum";

type AppCardBadgeProps = {
  type: FinanceType.FinanceTypeEnum | undefined;
};

const props = defineProps<AppCardBadgeProps>();

const cssStyles = computed(() => ({
  "app_card__badges--credit": props.type === FinanceType.FinanceTypeEnum.credit,
  "app_card__badges--debt": props.type === FinanceType.FinanceTypeEnum.debt,
}));

const text = computed((): string => FinanceType.getDescription(props.type));
</script>

<template>
  <div class="d-flex flex-column" :class="cssStyles">
    <span class="badge border border-white text-white">
      {{ text }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.app_card__badges {
  &--credit {
    .badge {
      background-color: $app-credit-type-color;
    }
  }

  &--debt {
    .badge {
      background-color: $app-debt-type-color;
    }
  }
}
</style>
