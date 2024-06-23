<script setup lang="ts">
import { ManagementService } from "@/management/management.service";
import { ManagementStrings as Strings } from "../../management.strings";
import { TransactionsFormStrings as TransactionsStrings } from "@/transactions/transactions.strings";
import { defineProps, inject } from "vue";
import TransactionForm from "@/transactions/components/form/transactions-form.component.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type ManagementItemActionsPropsType = {
  userId: number;
  isRecorded: boolean;
};

defineProps<ManagementItemActionsPropsType>();

const service = inject<ManagementService>("ManagementService");

const getSaveText = (recorded: boolean) =>
  recorded ? Strings.update : Strings.save;
</script>

<template>
  <tr class="border-bottom bg-dark text-center">
    <td colspan="3">
      <div class="d-flex justify-content-between w-50 mx-auto">
        <TransactionForm
          :date="service?.reference?.stringValue"
          @on-close="async (): Promise<void> => await service?.save(userId)"
          v-slot="{ handler }"
        >
          <button
            class="btn text-white"
            :title="TransactionsStrings.addTransaction"
            @click="handler"
          >
            <FontAwesomeIcon icon="fa-solid fa-money-bill-transfer" size="2x" />
          </button>
        </TransactionForm>

        <button
          class="btn ms-3 text-white"
          :title="getSaveText(isRecorded)"
          @click="async () => await service?.save(userId)"
        >
          <FontAwesomeIcon icon="fa-solid fa-floppy-disk" size="2x" />
        </button>
      </div>
    </td>
  </tr>
</template>
