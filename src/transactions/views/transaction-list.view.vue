<script setup lang="ts">
import { StoreHelper } from "@/app/store/store.helper";
import { computed, onMounted, ref } from "vue";
import TransactionCard from "../components/card/transaction-card.component.vue";
import TransactionForm from "../components/form/transactions-form.component.vue";
import { Transaction } from "../models/transaction.model";
import { TransactionsStoreStrings as StoreStrings } from "../transactions.strings";

const form = ref<InstanceType<typeof TransactionForm> | null>(null);

const transactions = computed(() =>
  StoreHelper.get<Transaction[]>(StoreStrings.getterTransactions.namespaced, [])
);

const editTransactionHandler = async (transactionId: number) =>
  form.value?.showModal(transactionId);

onMounted(
  async (): Promise<void> =>
    StoreHelper.dispatch(StoreStrings.actionList.namespaced)
);
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-end">
        <TransactionForm ref="form" />
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
