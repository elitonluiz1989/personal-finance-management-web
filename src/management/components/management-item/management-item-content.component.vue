<script setup lang="ts">
import { defineProps, inject } from "vue";
import { ManagementHelper as Helper } from "../../management.helper";
import { ManagementItem } from "../../models/management-item.model";
import { ManagementItemTypeEnum } from "@/management/management-item-type.enum";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ManagementService } from "@/management/management.service";
import { TransactionsFormStrings as TransactionsStrings } from "@/transactions/transactions.strings";

type ManagementItemContentPropsType = {
  userId: number;
  content: ManagementItem;
};

defineProps<ManagementItemContentPropsType>();

const isRemaininValue = (type: ManagementItemTypeEnum): boolean =>
  type === ManagementItemTypeEnum.remainingValue;

const isTransaction = (type: ManagementItemTypeEnum): boolean =>
  type === ManagementItemTypeEnum.transaction;

const service = inject<ManagementService>("ManagementService");
</script>

<template>
  <td class="px-2 border-end border-dark text-end">
    {{ content.date }}
  </td>

  <td class="px-2 border-end border-dark text-end">
    {{ content.description }}
  </td>

  <td :class="Helper.getAmountStyle(content.type)">
    {{ Helper.formatAmount(content.amount?.valueFormatted, content.type) }}
  </td>

  <td class="px-2 border-end border-dark text-center">
    <TransactionForm
      :date="service?.reference.dateStringValue"
      @on-close="async (): Promise<void> => await service?.save(content.id)"
      v-slot="{ handler }"
      v-if="isRemaininValue(content.managementType)"
    >
      <button
        class="border-0 bg-transparent"
        :title="TransactionsStrings.addTransaction"
        @click="handler"
      >
        <FontAwesomeIcon icon="fa-solid fa-money-bill-transfer" />
      </button>
    </TransactionForm>

    <TransactionForm
      :date="service?.reference.dateStringValue"
      @on-close="async (): Promise<void> => await service?.save(content.id)"
      v-slot="{ handler }"
      v-if="isTransaction(content.managementType)"
    >
      <button
        class="border-0 bg-transparent"
        :title="TransactionsStrings.addTransaction"
        @click="handler"
      >
        <FontAwesomeIcon icon="fa-solid fa-pencil" />
      </button>
    </TransactionForm>

    {{ content.managementType }}
  </td>
</template>
