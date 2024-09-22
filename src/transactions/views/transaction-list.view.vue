<script setup lang="ts">
import { StoreHelper } from "@/app/store/store.helper";
import { computed, onMounted, ref } from "vue";
import TransactionCard from "../components/card/transaction-card.component.vue";
import TransactionForm from "../components/form/transactions-form.component.vue";
import { Transaction } from "../models/transaction.model";
import {
  TransactionsFormStrings as FormStrings,
  TransactionsStoreStrings as StoreStrings,
} from "../transactions.strings";
import { TransactionBasicDto } from "../models/transaction-basic.dto";

const form = ref<InstanceType<typeof TransactionForm> | null>(null);

const formData = new TransactionBasicDto();
formData.date = new Date();

const transactions = computed(() =>
  StoreHelper.get<Transaction[]>(StoreStrings.getterTransactions.namespaced, [])
);

const editTransactionHandler = async (transactionId: number): Promise<void> => {
  const data = new TransactionBasicDto();
  data.id = transactionId;

  form.value?.openForm(data);
};
const removeTransactionHandler = async (
  transactionId: number
): Promise<void> => {
  const result = confirm(FormStrings.removeTransaction);

  if (!result) return;

  await StoreHelper.dispatch(StoreStrings.removeAdd.namespaced, transactionId);
};

onMounted(
  async (): Promise<void> =>
    StoreHelper.dispatch(StoreStrings.actionList.namespaced)
);
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-end">
        <TransactionForm ref="form" v-slot="{ openForm }">
          <button class="btn btn-primary" @click="openForm(formData)">
            {{ FormStrings.addTransaction }}
          </button>
        </TransactionForm>
      </div>
    </div>

    <div class="row mt-3" v-if="transactions?.length > 0">
      <div
        class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-2 mb-3"
        v-for="(transaction, index) in transactions"
        :key="index"
      >
        <TransactionCard
          :transaction="transaction"
          @on-edit="editTransactionHandler"
          @on-remove="removeTransactionHandler"
        />
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-12">
        <p class="text-center">No records.</p>
      </div>
    </div>
  </div>
</template>
