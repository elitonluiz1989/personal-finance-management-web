<script setup lang="ts">
import { StoreHelper } from "@/app/store/store.helper";
import {
  ManagementStrings as Strings,
  ManagementStoreStrings as StoreStrings,
} from "../management.strings";
import { computed, onMounted, ref, watch } from "vue";
import { ManagementHelper as Helper } from "../management.helpers";
import { Management } from "../models/management.model";
import { BalanceTypeEnum } from "@/balances/balances-type.enum";
import { isNullOrWhiteSpace, isNumber } from "@/app/helpers/helpers";

const referenceDate = ref(Helper.getMonthYearStringFromDate(new Date()));
const reference = ref(Helper.getReferenceFromString(referenceDate.value));

const managementData = computed(() =>
  StoreHelper.get<Management[]>(StoreStrings.getterItems.namespaced, [])
);

const itemAmountStyle = (type?: BalanceTypeEnum) => {
  if (type === BalanceTypeEnum.credit) return "px-2 text-end text-success";

  return "px-2 text-end text-danger";
};
const search = () =>
  StoreHelper.dispatch(StoreStrings.actionList.namespaced, reference.value);
const onChangeReference = (newValue: string, oldValue: string): void => {
  if (newValue === oldValue || isNullOrWhiteSpace(newValue)) {
    return;
  }

  const referenceValue = Number(newValue.replace("-", ""));

  if (!isNumber(referenceValue) || reference.value === referenceValue) {
    return;
  }

  reference.value = referenceValue;

  search();
};
const formartValue = (value?: string, type?: BalanceTypeEnum): string => {
  if (isNullOrWhiteSpace(value) || !type) {
    return "0";
  }

  const sign = type === BalanceTypeEnum.credit ? "+" : "-";

  return `${sign}${value}`;
};

onMounted(async (): Promise<void> => await search());

watch(referenceDate, onChangeReference);
</script>

<template>
  <div class="container-fluid" v-if="managementData">
    <div class="row pb-5">
      <div class="col-12 d-flex justify-content-center">
        <input class="input-form" type="month" v-model="referenceDate" />

        <button class="btn btn-primary ms-2" @click="search">
          {{ Strings.reload }}
        </button>
      </div>
    </div>

    <div class="row">
      <div
        class="col-12 d-flex justify-content-center"
        v-for="(management, index) in managementData"
        :key="index"
      >
        <table class="table border border-dark">
          <thead>
            <tr>
              <th class="bg-dark text-white text-center" colspan="2">
                {{ management.user?.name }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              class="border-bottom border-dark text-end"
              v-for="(item, index) in management.items"
              :key="index"
            >
              <td class="px-2 border-end border-dark text-end">
                {{ item.description }}
              </td>

              <td :class="itemAmountStyle(item.type)">
                {{ formartValue(item.amount?.valueFormatted, item.type) }}
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td class="px-2 border-end border-dark text-end fw-bolder">
                Total
              </td>

              <td :class="itemAmountStyle(management.total?.type)">
                {{
                  formartValue(
                    management.total?.value?.valueFormatted,
                    management.total?.type
                  )
                }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>

  <div class="container-fluid" v-else>
    <div class="row">
      <div class="col-12 d-flex justify-content-center">No records</div>
    </div>
  </div>
</template>
