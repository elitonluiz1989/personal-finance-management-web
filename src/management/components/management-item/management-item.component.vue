<script setup lang="ts">
import { defineEmits, defineProps, inject } from "vue";
import { Management } from "../../models/management.model";
import ManagementItemHeader from "./management-item-header.component.vue";
import ManagementItemContent from "./management-item-content.component.vue";
import ManagementItemTotal from "./management-item-total.component.vue";
import { ManagementStrings as Strings } from "@/management/management.strings";
import { TransactionsFormStrings } from "@/transactions/transactions.strings";
import { ManagementService } from "@/management/management.service";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { TransactionBasicDto } from "@/transactions/models/transaction-basic.dto";
import { TransactionFormsOpenAction } from "@/transactions/transaction.types";

type ManagementItemPropsType = {
  management: Management;
};

type ManagementItemEmitsType = {
  (e: "openForm", data: TransactionBasicDto): void;
};

const props = defineProps<ManagementItemPropsType>();
const emits = defineEmits<ManagementItemEmitsType>();
const service = inject<ManagementService>("ManagementService");

const addTransaction = () => {
  const formData = new TransactionBasicDto();
  formData.userId = props.management.user!.id;
  formData.date = service?.reference.value;

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
      <management-item-total
        :total="management.total"
        v-if="management.total"
      />
    </tfoot>
  </table>

  <div class="d-flex justify-content-center" v-else>
    <p>{{ Strings.userNotFound }}</p>
  </div>
</template>
