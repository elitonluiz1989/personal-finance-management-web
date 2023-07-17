<script setup lang="ts">
import AppBadge from "@/app/components/bagde/app-badge.component.vue";
import { BootstrapColorsEnum } from "@/app/enums/BootstrapColorsEnum.enum";
import { CurrencyFormatterStatic } from "@/app/helpers/currency-formatter";
import InstallmentBadge from "@/installments/components/installment-badge.component.vue";
import { Installment } from "@/installments/installment.model";
import { TransactionsFormStrings as FormStrings } from "@/transactions/transactions.strings";
import { defineEmits, defineProps, ref, withDefaults } from "vue";
import TransactionsFormInstallmentsModal from "./transactions-form-installments-modal.component.vue";
import { arraySum } from "@/app/helpers/helpers";

type TransactionsFormInstallmentsPropsType = {
  allowSelection?: boolean;
  amountLimit?: number;
};
type TransactionsFormInstallmentsEmitsType = {
  (e: "onSearch", appendData: boolean): void;
  (e: "onAddInstallments", installmentId: Installment[]): void;
};

const showModal = ref(false);
const selectedAmountFormatted = ref(CurrencyFormatterStatic.format(0));
const selectedInstallments = ref<Installment[]>([]);

let selectedAmount = 0;

const props = withDefaults(
  defineProps<TransactionsFormInstallmentsPropsType>(),
  {
    allowSelection: true,
    amountLimit: 0,
  }
);
const emits = defineEmits<TransactionsFormInstallmentsEmitsType>();

const openModal = () => {
  showModal.value = true;

  emits("onSearch", false);
};
const closeModal = () => (showModal.value = false);
const search = (appendData: boolean) => emits("onSearch", appendData);
const selectedAmountHandler = () => {
  selectedAmount = arraySum(
    selectedInstallments.value,
    (installment: Installment) => installment.amount
  );

  if (selectedAmount <= 0) selectedAmount = 0;

  selectedAmountFormatted.value =
    CurrencyFormatterStatic.format(selectedAmount);
};
const selectInstallments = (installments: Installment[]) => {
  if (selectedInstallments.value.length === 0) {
    selectedInstallments.value = installments;
  } else {
    selectedInstallments.value.push(...installments);
  }

  selectedAmountHandler();

  emits("onAddInstallments", selectedInstallments.value);
};
</script>

<template>
  <button
    class="btn btn-primary my-3"
    :disabled="!props.allowSelection"
    @click.prevent="openModal"
  >
    {{ FormStrings.addInstallments }}
  </button>

  <div class="border rounded p-2">
    <ul class="container-fluid mb-0" v-if="selectedInstallments.length > 0">
      <li
        class="card row flex-row mb-2 p-1"
        v-for="(installment, index) in selectedInstallments"
        :key="index"
      >
        <div class="col-auto d-flex align-items-center text-center border-end">
          {{ installment.numberDescriptionHandler() }}
        </div>

        <div class="col">
          <div class="w-100 fw-bolder">{{ installment.balance?.name }}</div>

          <div class="d-flex">
            <AppBadge
              class="me-1"
              :color="BootstrapColorsEnum.secondary"
              :text="installment.referenceFormatted"
            />

            <InstallmentBadge
              :status="installment.status"
              :description="installment.statusDescription"
            />
          </div>
        </div>

        <div class="col-auto d-flex align-items-center text-end border-start">
          {{ installment.amountHandler() }}
        </div>
      </li>

      <li class="row p-1">
        <div class="col fw-bolder text-end">Total:</div>

        <div class="col-auto fw-bolder text-end">
          {{ selectedAmountFormatted }}
        </div>
      </li>
    </ul>

    <p class="mb-0 py-2 text-center" v-else>No installments selected</p>
  </div>

  <TransactionsFormInstallmentsModal
    :show="showModal"
    :allow-selection="props.allowSelection"
    :amount-limit="props.amountLimit"
    @on-search="(appendData: boolean) => search(appendData)"
    @on-close="closeModal"
    @on-select-installments="selectInstallments"
    v-if="props.allowSelection"
  />
</template>

<style scoped lang="scss">
.installments {
  max-height: 23rem;
  overflow-y: scroll;
}
</style>
