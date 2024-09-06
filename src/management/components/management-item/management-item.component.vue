<script setup lang="ts">
import { defineProps, inject, onMounted, reactive } from "vue";
import { Management } from "../../models/management.model";
import ManagementItemHeader from "./management-item-header.component.vue";
import ManagementItemContent from "./management-item-content.component.vue";
import ManagementItemTotal from "./management-item-total.component.vue";
import { ManagementStrings as Strings } from "@/management/management.strings";
import { TransactionsFormStrings } from "@/transactions/transactions.strings";
import { ManagementService } from "@/management/management.service";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TransactionForm from "@/transactions/components/form/transactions-form.component.vue";
import { TransactionBasicDto } from "@/transactions/models/transaction-basic.dto";

type ManagementItemPropsType = {
  management: Management;
};

const props = defineProps<ManagementItemPropsType>();
const service = inject<ManagementService>("ManagementService");
const formData = reactive<TransactionBasicDto>(new TransactionBasicDto());

onMounted(() => {
  formData.userId = props.management.user!.id;
  formData.date = service?.reference.value;
});
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
        <management-item-content :user-id="formData.userId" :content="item" />
      </tr>

      <tr class="border-bottom border-dark text-end">
        <td class="px-2 border-end border-dark text-end" colspan="3">
          {{ TransactionsFormStrings.addTransaction }}
        </td>

        <td class="px-2 border-end border-dark text-center">
          <TransactionForm
            :data="formData"
            @on-close="service?.save(formData.userId)"
            v-slot="{ handler }"
          >
            <button
              class="border-0 bg-transparent"
              :title="TransactionsFormStrings.addTransaction"
              @click="handler"
            >
              <FontAwesomeIcon icon="fa-regular fa-square-plus" />
            </button>
          </TransactionForm>
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
