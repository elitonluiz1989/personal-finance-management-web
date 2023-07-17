<script setup lang="ts">
import AppModal from "@/app/components/modal/app-modal.component.vue";
import { IAppModalFooterProps } from "@/app/components/modal/types";
import { StoreHelper } from "@/app/store/store.helper";
import { Installment } from "@/installments/installment.model";
import { InstallmentsResources } from "@/installments/installments.resources";
import { TransactionsFormStrings as FormStrings } from "@/transactions/transactions.strings";
import { computed, defineEmits, defineProps, ref, withDefaults } from "vue";
import TransactionsFormInstallment from "./transactions-form-installment.component.vue";
import { arraySum } from "@/app/helpers/helpers";
import { calculateAmountLimit } from "@/transactions/transactions.helpers";
import { CurrencyFormatterStatic } from "@/app/helpers/currency-formatter";

type TransactionsFormInstallmentsPropsType = {
  show: boolean;
  allowSelection?: boolean;
  amountLimit?: number;
};
type TransactionsFormInstallmentsEmitsType = {
  (e: "onSearch", appendData: boolean): void;
  (e: "onClose"): void;
  (e: "onSelectInstallments", installments: Installment[]): void;
};

const selectedInstallment = ref<Installment[]>([]);

const modalFooterConfig: IAppModalFooterProps = {
  saveText: FormStrings.addInstallments,
};
let selectedAmount = ref(0);

const props = withDefaults(
  defineProps<TransactionsFormInstallmentsPropsType>(),
  {
    allowSelection: true,
    amountLimit: 0,
  }
);
const emits = defineEmits<TransactionsFormInstallmentsEmitsType>();

const installments = computed(() =>
  StoreHelper.get<Installment[]>(
    InstallmentsResources.store.getters.installments.namespaced,
    []
  )
);
const allowSelection = computed(() => {
  if (isNaN(props.amountLimit) || props.amountLimit === 0) return true;

  return selectedAmount.value < props.amountLimit;
});
const amountAvailableToSelect = computed((): string => {
  const amountLimit = calculateAmountLimit(
    props.amountLimit,
    selectedAmount.value
  );

  return CurrencyFormatterStatic.format(amountLimit);
});

const closeModal = () => {
  selectedInstallment.value = [];
  selectedAmount.value = 0;

  emits("onClose");
};
const search = (appendData: boolean) => emits("onSearch", appendData);
const selectedAmountHandler = () => {
  selectedAmount.value = arraySum(
    selectedInstallment.value,
    (installment) => installment.amount
  );
};
const addInstallment = (installment: Installment) => {
  selectedInstallment.value.push(installment);

  selectedAmountHandler();
};
const removeInstallment = (installment: Installment) => {
  selectedInstallment.value = selectedInstallment.value.filter(
    (item) => item.id !== installment.id
  );

  selectedAmountHandler();
};
const addInstallmentsEvent = () => {
  emits("onSelectInstallments", selectedInstallment.value);
  closeModal();
};
</script>

<template>
  <AppModal
    id="transaction-installments-modal"
    title="Installments"
    :show="props.show"
    :footer="modalFooterConfig"
    @on-save="addInstallmentsEvent"
    @on-close="closeModal"
  >
    <div v-if="installments?.length > 0">
      <div class="w-100 mb-2">
        {{ FormStrings.amountAvailableToSelect(amountAvailableToSelect) }}
      </div>

      <div class="card overflow-hidden mb-1 border-secondary">
        <ul class="installments w-100 list-unstyled pt-1 ps-1 pb-3 pe-1 m-0">
          <li
            class="mt-2"
            v-for="(installment, index) in installments"
            :key="index"
          >
            <TransactionsFormInstallment
              :installment="installment"
              :allow-selection="allowSelection"
              @on-add-installment="addInstallment"
              @on-remove-installment="removeInstallment"
            />
          </li>
        </ul>
      </div>

      <div>
        <button
          class="btn btn-outline-secondary w-100"
          @click.prevent="search(true)"
        >
          {{ FormStrings.loadMore }}
        </button>
      </div>
    </div>
  </AppModal>
</template>
