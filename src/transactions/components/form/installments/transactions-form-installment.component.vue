<script setup lang="ts">
import AppBadge from "@/app/components/bagde/app-badge.component.vue";
import { BootstrapColorsEnum } from "@/app/enums/bootstrap-colors.enum";
import InstallmentBadge from "@/installments/components/installment-badge.component.vue";
import { Installment } from "@/installments/installment.model";
import { computed, defineEmits, defineProps, ref, withDefaults } from "vue";

type TransactionsFormInstallmentPropsType = {
  installment: Installment;
  allowSelection: boolean;
};
type TransactionsFormInstallmentEmitsType = {
  (e: "onAddInstallment", installment: Installment): void;
  (e: "onRemoveInstallment", installment: Installment): void;
};

const selected = ref<boolean>(false);

const props = withDefaults(
  defineProps<TransactionsFormInstallmentPropsType>(),
  {
    allowSelection: true,
  }
);
const emits = defineEmits<TransactionsFormInstallmentEmitsType>();

const cssStyles = computed(() => ({
  "btn btn-outline-secondary d-flex flex-row align-items-center p-2 w-100 selected":
    selected.value,
  "btn btn-outline-secondary d-flex flex-row align-items-center p-2 w-100":
    selected.value === false,
}));

const select = () => {
  if (selected.value) {
    selected.value = false;

    emits("onRemoveInstallment", props.installment);

    return;
  }

  if (props.allowSelection === false) return;

  selected.value = true;

  emits("onAddInstallment", props.installment);
};
</script>

<template>
  <button :class="cssStyles" @click.prevent="select()">
    <div
      class="d-flex col-auto align-items-center p-2 border-end border-secondary"
    >
      {{ props.installment.numberDescription }}
    </div>

    <div class="col">
      <div class="text-start mx-2">
        <span class="fw-bolder" :title="props.installment.balance?.name">
          {{ props.installment.balance?.name }}
        </span>
      </div>

      <div class="text-start mx-2">
        <AppBadge
          :color="BootstrapColorsEnum.secondary"
          :text="props.installment.referenceFormatted"
        />

        <span class="ms-2">
          {{ props.installment.amountFormatted }}
        </span>
      </div>
    </div>

    <div class="col-auto p-2 border-start border-secondary">
      <InstallmentBadge
        :status="props.installment.status"
        :description="props.installment.statusDescription"
      />
    </div>
  </button>
</template>

<style scoped lang="scss">
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";

%btn-hover-rules {
  & div {
    border-color: white !important;
  }
}

%selected-rules {
  background-color: $secondary;
  color: white;
}

.btn-outline-secondary:hover {
  @extend %btn-hover-rules;
}

.selected {
  @extend %selected-rules;

  &:hover {
    @extend %selected-rules;
  }

  @extend %btn-hover-rules;
}
</style>
