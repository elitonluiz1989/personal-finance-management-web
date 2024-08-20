<script setup lang="ts">
import AppBadge from "@/app/components/bagde/app-badge.component.vue";
import { BootstrapColorsEnum } from "@/app/enums/bootstrap-colors.enum";
import { CurrencyFormatterStatic } from "@/app/helpers/currency-formatter";
import InstallmentBadge from "@/installments/components/installment-badge.component.vue";
import { Installment } from "@/installments/installment.model";
import { TransactionsFormStrings as FormStrings } from "@/transactions/transactions.strings";
import { defineEmits, defineProps, ref, watch, withDefaults } from "vue";
import TransactionsFormInstallmentsModal from "./transactions-form-installments-modal.component.vue";
import { arraySum } from "@/app/helpers/helpers";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type TransactionsFormInstallmentsPropsType = {
  transactionInstallments?: Installment[];
  allowSelection?: boolean;
  amountLimit?: number;
  disabled?: boolean;
};
type TransactionsFormInstallmentsEmitsType = {
  (e: "onSearch", appendData: boolean): void;
  (e: "onSelectInstallments", installmentId: Installment[]): void;
};

const showModal = ref(false);
const selectedAmountFormatted = ref(CurrencyFormatterStatic.format(0));
const selectedInstallments = ref<Installment[]>([]);

let selectedAmount = 0;

const props = withDefaults(
  defineProps<TransactionsFormInstallmentsPropsType>(),
  {
    transactionInstallments: () => [],
    allowSelection: true,
    amountLimit: 0,
    disabled: false,
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
    (installment: Installment) => installment.amountHandled
  );

  if (selectedAmount <= 0) selectedAmount = 0;

  selectedAmountFormatted.value =
    CurrencyFormatterStatic.format(selectedAmount);
};
const selectInstallments = (installments: Installment[]): void => {
  if (selectedInstallments.value.length === 0) {
    selectedInstallments.value = installments;
  } else {
    selectedInstallments.value.push(...installments);
  }

  selectedAmountHandler();

  emits("onSelectInstallments", selectedInstallments.value);
};
const removeInstallment = (installmentId: number): void => {
  selectedInstallments.value = selectedInstallments.value.filter(
    (installment) => installment.id !== installmentId
  );

  selectedAmountHandler();

  emits("onSelectInstallments", selectedInstallments.value);
};

watch(
  (): Installment[] => props.transactionInstallments,
  (installments: Installment[]): void => {
    selectedInstallments.value = installments ?? [];
    selectedAmountHandler();
  }
);
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
          {{ installment.numberDescription }}
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
          {{ installment.amountFormatted }}
        </div>

        <div
          class="col-auto d-flex align-items-center text-end border-start"
          v-if="disabled === false"
        >
          <button
            class="border-0 bg-transparent m-0"
            @click.prevent="removeInstallment(installment.id)"
          >
            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
          </button>
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
