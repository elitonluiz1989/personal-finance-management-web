<script setup lang="ts">
import { defineEmits, defineProps, onMounted } from "vue";
import { ManagementHelper as Helper } from "../../management.helper";
import { ManagementItem } from "../../models/management-item.model";
import { ManagementItemTypeEnum } from "@/management/management-item-type.enum";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { TransactionBasicDto } from "@/transactions/models/transaction-basic.dto";

type ManagementItemContentPropsType = {
  userId: number;
  content: ManagementItem;
};
type ManagementItemContentEmitsType = {
  (e: "openForm", formData: TransactionBasicDto): void;
};

const props = defineProps<ManagementItemContentPropsType>();
const emits = defineEmits<ManagementItemContentEmitsType>();

let formData: TransactionBasicDto;

const isRemaininValue = (type: ManagementItemTypeEnum): boolean =>
  type === ManagementItemTypeEnum.remainingValue;
const isTransaction = (type: ManagementItemTypeEnum): boolean =>
  type === ManagementItemTypeEnum.transaction;

const openForm = (): void => emits("openForm", formData);

onMounted((): void => {
  if (props.content) {
    formData = new TransactionBasicDto();
    formData.id = props.content.id;
    formData.type = props.content.type as number;
    formData.date = new Date(props.content.date);
    formData.userId = props.userId;
    formData.amount = props.content.amount?.value ?? 0;
  }
});
</script>

<template>
  <td class="px-2 border-end border-dark text-end">
    {{ content.date }}
  </td>

  <td class="px-2 border-end border-dark text-end">
    {{ content.description }}
  </td>

  <td :class="Helper.getAmountStyle(content.type)">
    {{ Helper.formatAmount(content.amount, content.type) }}
  </td>

  <td class="px-2 border-end border-dark text-center">
    <button
      class="border-0 bg-transparent"
      v-if="isRemaininValue(content.managementType)"
    >
      <FontAwesomeIcon icon="fa-regular fa-square-plus" />
    </button>

    <button
      class="border-0 bg-transparent"
      @click="openForm"
      v-if="isTransaction(content.managementType)"
    >
      <FontAwesomeIcon icon="fa-solid fa-pencil" />
    </button>
  </td>
</template>
