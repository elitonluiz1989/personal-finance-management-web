import { State } from "@/app/store/types";
import axios from "axios";
import { Module } from "vuex";
import { Transaction } from "./models/transaction.model";
import { TransactionStore } from "./transaction.types";
import { TransactionsStoreStrings as Strings } from "./transactions.strings";
import { TransactionStoreDto } from "./models/transaction-store.dto";
import { PagedResultsDto } from "@/app/models/paged-results.dto";

export const transactions: Module<TransactionStore, State> = {
  namespaced: true,

  state: {
    transactions: [],
  },

  getters: {
    [Strings.getterTransactions.value](state: TransactionStore): Transaction[] {
      return state.transactions ?? [];
    },
    [Strings.getterTransaction.value](
      state: TransactionStore
    ): (id: number) => Transaction | undefined {
      return (id: number): Transaction | undefined =>
        state.transactions.find((t) => t.id === id);
    },
  },

  mutations: {
    [Strings.setterAddTransactions.value](
      state: TransactionStore,
      payload: Transaction[]
    ) {
      state.transactions = [];

      for (const item of payload) {
        if (item instanceof Transaction) {
          state.transactions.push(item);

          continue;
        }

        state.transactions.push(Transaction.createFrom(item));
      }
    },

    [Strings.setterAddTransaction.value](
      state: TransactionStore,
      payload: Transaction
    ) {
      const transaction = Transaction.createFrom(payload);
      const key = state.transactions.findIndex((t) => t.id === payload.id);

      if (state.transactions[key]) {
        state.transactions[key] = transaction;
      } else {
        state.transactions.push(payload);
      }
    },
  },

  actions: {
    async [Strings.actionList.value]({ commit }, payload: any): Promise<void> {
      const result = await axios.get<PagedResultsDto<Transaction[]>>(
        "/Transactions",
        payload
      );
      const transactions = result?.data?.results ?? [];

      commit(Strings.setterAddTransactions.value, transactions);
    },

    async [Strings.actionAdd.value](
      { dispatch },
      payload: TransactionStoreDto
    ): Promise<void> {
      await axios.post<Transaction>("/Transactions", payload);

      dispatch(Strings.actionList.value);
    },

    async [Strings.actionFind.value](
      { commit },
      payload: number
    ): Promise<void> {
      const result = await axios.get<Transaction>(`/Transactions/${payload}`);

      commit(Strings.setterAddTransaction.value, result?.data);
    },

    async [Strings.removeAdd.value](
      { commit, state },
      payload: number
    ): Promise<void> {
      await axios.delete<Transaction>(`/Transactions/${payload}`);

      const transactions = state.transactions.filter((t) => t.id !== payload);

      commit(Strings.setterAddTransactions.value, transactions);
    },
  },
};
