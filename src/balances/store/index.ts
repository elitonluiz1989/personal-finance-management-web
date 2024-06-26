import { Module } from "vuex";
import { BalancesState } from "./types";
import axios from "axios";
import { State } from "@/app/store/types";
import { BalancesResources } from "../balances.resources";
import { Balance } from "../models/balance.model";
import { isNullOrUndefined } from "@/app/helpers/helpers";
import { RefinancedBalance } from "../models/balance-refinanced.model";

const balanceDataHandler = (payload: Balance, state: BalancesState): void => {
  const balance = Balance.createFrom(payload);
  const index = state.balances.findIndex((p: Balance) => p.id === payload.id);

  if (index >= 0) {
    state.balances[index] = balance;

    return;
  }

  state.balances.push(balance);
};
const balancesDataHandler = (payload: Balance[], state: BalancesState) => {
  state.balances = [];

  for (const data of payload) {
    balanceDataHandler(data, state);
  }
};

export const balances: Module<BalancesState, State> = {
  namespaced: true,

  state: {
    balances: [],
  },

  getters: {
    [BalancesResources.store.getters.balances.value](
      state: BalancesState
    ): Balance[] {
      return state.balances ?? [];
    },
    [BalancesResources.store.getters.balance.value](
      state: BalancesState
    ): (id: number) => Balance | undefined {
      return (id: number) => state.balances.find((b) => b.id === id);
    },
  },

  mutations: {
    [BalancesResources.store.mutations.addBalanceOnBalances.value](
      state: BalancesState,
      payload: Balance
    ) {
      const balances = state.balances.filter(
        (b: Balance) => b.id !== payload.id
      );
      balances.push(payload);

      balancesDataHandler(balances, state);
    },
    [BalancesResources.store.mutations.addBalances.value](
      state: BalancesState,
      payload: Balance[]
    ) {
      balancesDataHandler(payload, state);
    },
    [BalancesResources.store.mutations.addBalance.value](
      state: BalancesState,
      payload: Balance
    ) {
      balanceDataHandler(payload, state);
    },
  },

  actions: {
    async [BalancesResources.store.actions.list.value](
      { commit },
      payload: any
    ) {
      const result = await axios.get<Balance[]>("/Balances", payload);
      const balances = result.data ?? [];

      commit(BalancesResources.store.mutations.addBalances.value, balances);
    },
    async [BalancesResources.store.actions.find.value](
      { commit },
      payload: number
    ) {
      const result = await axios.get<Balance>(`/Balances/${payload}`);

      if (!result.data) return;

      commit(BalancesResources.store.mutations.addBalance.value, result.data);
    },
    async [BalancesResources.store.actions.add.value](
      { commit, dispatch },
      payload: Balance
    ) {
      const result = await axios.post<Balance>("/Balances", payload);

      if (isNullOrUndefined(result.data)) {
        dispatch(BalancesResources.store.actions.list.namespaced);

        return;
      }

      commit(BalancesResources.store.mutations.addBalance.value, result.data);
    },
    async [BalancesResources.store.actions.refinance.value](
      { commit, dispatch },
      payload: RefinancedBalance
    ) {
      const result = await axios.post<Balance>("/RefinancedBalances", payload);

      if (isNullOrUndefined(result.data)) {
        dispatch(BalancesResources.store.actions.list.namespaced);

        return;
      }

      commit(BalancesResources.store.mutations.addBalance.value, result.data);
    },
    async [BalancesResources.store.actions.remove.value](
      { state, commit },
      payload: number
    ) {
      const result = await axios.delete<boolean>(`/Balances/${payload}`);

      if (!result || result.data === false) return;

      const balances = state.balances?.filter((b) => b.id !== payload) ?? [];

      commit(BalancesResources.store.mutations.addBalances.value, balances);
    },
  },
};
