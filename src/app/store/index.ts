import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { authentication } from "@/authentication/store";
import { State } from "./types";
import { balances } from "@/balances/store";
import { installments } from "@/installments/store";
import { users } from "@/users/store";
import { transactions } from "@/transactions/transaction.store";

export const storeKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    authentication,
    balances,
    installments,
    transactions,
    users,
  },

  state: {
    isLoading: false,
  },
});
