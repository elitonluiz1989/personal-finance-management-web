<script setup lang="ts">
import { defineEmits, defineProps, inject } from "vue";
import { Management } from "../../models/management.model";
import ManagementItemHeader from "./management-item-header.component.vue";
import ManagementItemContent from "./management-item-content.component.vue";
import { ManagementStrings as Strings } from "@/management/management.strings";
import { TransactionsFormStrings } from "@/transactions/transactions.strings";
import { ManagementService } from "@/management/management.service";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { TransactionBasicDto } from "@/transactions/models/transaction-basic.dto";
import { ManagementHelper } from "@/management/management.helper";
import { Reference } from "@/app/helpers/Reference";

type ManagementItemPropsType = {
  management: Management;
  reference: Reference;
};

type ManagementItemEmitsType = {
  (e: "openForm", data: TransactionBasicDto): void;
};
const props = defineProps<ManagementItemPropsType>();
const emits = defineEmits<ManagementItemEmitsType>();
const service = inject<ManagementService>("ManagementService");

const addTransaction = () => {
  const formData = new TransactionBasicDto();
  formData.userId = props.management.user?.id ?? 0;
  formData.date = props.reference?.value;

  emits("openForm", formData);
};
const editTransaction = (formData: TransactionBasicDto): void =>
  emits("openForm", formData);
</script>

<template>
  <table class="table border border-dark" v-if="management.user">
    <thead>
      <management-item-header
        :status="management.status"
        :user="management.user"
      />
    </thead>

    <tbody>
      <tr
        class="border-bottom border-dark text-end"
        v-if="management.remainingValue"
      >
        <td class="px-2 border-end border-dark text-end" colspan="2">
          {{ management.remainingValue.description }}
        </td>

        <td
          :class="
            ManagementHelper.getAmountStyle(management.remainingValue.type)
          "
        >
          {{
            ManagementHelper.formatAmount(
              management.remainingValue.value,
              management.remainingValue.type
            )
          }}
        </td>
      </tr>

      <tr
        class="border-bottom border-dark text-end"
        v-for="(item, index) in management.items"
        :key="index"
      >
        <management-item-content
          :user-id="props.management.user!.id"
          :content="item"
          @open-form="editTransaction"
        />
      </tr>

      <tr class="border-bottom border-dark text-end">
        <td class="px-2 border-end border-dark text-end" colspan="3">
          {{ TransactionsFormStrings.addTransaction }}
        </td>

        <td class="px-2 border-end border-dark text-center">
          <button class="border-0 bg-transparent" @click="addTransaction">
            <FontAwesomeIcon icon="fa-regular fa-square-plus" />
          </button>
        </td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <td class="px-2 border-end border-dark text-end fw-bolder" colspan="2">
          {{ Strings.total }}
        </td>

        <td
          :class="ManagementHelper.getAmountStyle(management.total.type)"
          v-if="management.total"
        >
          {{
            ManagementHelper.formatAmount(
              management.total.value,
              management.total.type
            )
          }}
        </td>
      </tr>
    </tfoot>
  </table>

  <div class="d-flex justify-content-center" v-else>
    <p>{{ Strings.userNotFound }}</p>
  </div>
</template>
