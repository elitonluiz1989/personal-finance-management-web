<script setup lang="ts">
import AppCardBadge from "@/app/components/card/app-card-badge.component.vue";
import AppCardRow from "@/app/components/card/app-card-row.component.vue";
import AppCard from "@/app/components/card/app-card.component.vue";
import AppFlyoutList from "@/app/components/flyout-list/app-flyout-list.component.vue";
import { FinanceTypeEnum } from "@/app/enums/finance-type.enum";
import { CurrencyFormatterStatic } from "@/app/helpers/currency-formatter";
import { TransactionItem } from "@/transactions/models/transaction-item.model";
import { defineEmits, defineProps } from "vue";
import * as TransactionType from "../../enums/transaction-type.enum";
import { Transaction } from "../../models/transaction.model";
import TransactionCardItems from "./transaction-card-items.component.vue";
import { AppResources } from "@/app/app.resoures";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type TransactionCardProps = {
  transaction: Transaction;
};
type TransactionCardEmits = {
  (e: "onEdit", transactionId: number): void;
};

const props = defineProps<TransactionCardProps>();
const emits = defineEmits<TransactionCardEmits>();

const transactionTitle = (): string =>
  `Transaction of ${props.transaction.date?.toLocaleDateString() ?? ""}`;
const appCardType = (): FinanceTypeEnum | undefined =>
  TransactionType.toFinanceTypeEnum(props.transaction.type);
const userNameHandler = (): string =>
  props.transaction?.user?.name?.toString() ?? "";
const amountFormatted = (): string =>
  CurrencyFormatterStatic.format(props.transaction.amount);

const editEvent = () => emits("onEdit", props.transaction.id);
</script>

<template>
  <AppCard
    :title="transactionTitle()"
    :type="appCardType()"
    :use-actions="true"
  >
    <template #header>
      <AppCardBadge :type="appCardType" />
    </template>

    <template #content>
      <AppCardRow class="px-2" label="User" :value="userNameHandler()" />

      <AppCardRow class="px-2" label="Amount" :value="amountFormatted()" />

      <AppFlyoutList
        text="Items"
        :type="appCardType()"
        :items="transaction.items"
      >
        <template #item="item">
          <TransactionCardItems :item="(item as TransactionItem)" />
        </template>
      </AppFlyoutList>
    </template>

    <template #actions>
      <button :title="AppResources.edit" @click="editEvent">
        <FontAwesomeIcon icon="fa-solid fa-pen" size="lg" />
      </button>
    </template>
  </AppCard>
</template>

<style scoped>
button {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: transparent;
  border: 0;
}
</style>
