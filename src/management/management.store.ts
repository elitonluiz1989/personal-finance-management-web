import { Module } from "vuex";
import { ManagementState } from "./management.types";
import { State } from "@/app/store/types";
import { ManagementStoreStrings as Strings } from "./management.strings";
import axios from "axios";
import { Management } from "./models/management.model";
import { ManagementStoreFilter } from "./models/management-store.filter";

export const management: Module<ManagementState, State> = {
  namespaced: true,

  state: {
    items: [],
  },

  getters: {
    [Strings.getterItems.value](state: ManagementState) {
      return state.items;
    },
  },

  mutations: {
    [Strings.setterAddItems.value](
      state: ManagementState,
      payload: Management[]
    ) {
      state.items = [];

      for (const item of payload) {
        if (item instanceof Management) {
          state.items.push(item);

          continue;
        }

        const managementCreated = Management.createFrom(item);
        state.items.push(managementCreated);
      }
    },
  },

  actions: {
    async [Strings.actionList.value](
      { commit },
      payload: string
    ): Promise<void> {
      const result = await axios.get<Management[]>(`Management/${payload}`);
      const items = result?.data ?? [];

      commit(Strings.setterAddItems.value, items);
    },

    async [Strings.actionSave.value](
      { dispatch },
      payload: ManagementStoreFilter
    ): Promise<void> {
      await axios.post(`Management`, payload);
    },
  },
};
