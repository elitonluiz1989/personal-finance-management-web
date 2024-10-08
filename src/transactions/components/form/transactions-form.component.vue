<script setup lang="ts">
import AppFormInputCurrency from "@/app/components/form/input-curreny/app-form-input-currency.component.vue";
import AppModal from "@/app/components/modal/app-modal.component.vue";
import AppValidationMessages from "@/app/components/validation-messages/app-validation-messages.component.vue";
import { Installment } from "@/installments/installment.model";
import { computed, defineEmits, defineExpose, onMounted } from "vue";
import { TransactionsFormStrings as FormStrings } from "../../transactions.strings";
import TransactionsFormInstallments from "./installments/transactions-form-installments.component.vue";
import { TransactionsFormEventsService } from "./services/transactions-form-events.service";
import { TransactionsFormService } from "./services/transactions-form.service";
import { calculateAmountLimitByList } from "@/transactions/transactions.helpers";
import { TransactionBasicDto } from "@/transactions/models/transaction-basic.dto";
import { Transaction } from "@/transactions/models/transaction.model";
import { TransactionFormsOpenAction } from "@/transactions/transaction.types";

type TransactionsFormEmitsType = {
  (e: "onSave"): void;
  (e: "onClose"): void;
};

const emits = defineEmits<TransactionsFormEmitsType>();

const form = new TransactionsFormService();
const events = new TransactionsFormEventsService(form);

const modalTitle = computed((): string => form.getModalTitle());

const openForm: TransactionFormsOpenAction = async (
  data?: TransactionBasicDto
): Promise<void> => {
  form.resetState();

  form.show.value = true;

  if (!data) return;

  if (data.id > 0) {
    await form.fillForByTransactionId(data.id);

    return;
  }

  const transaction = Transaction.createFrom<TransactionBasicDto>(data);

  form.editMode.value = false;
  form.fields.populate(transaction);
};
const closeModal = (): void => {
  events.closeModalHandler();

  emits("onClose");
};

form.setBeforeSubmitHandler(closeModal);

const amoutLimit = computed((): number => {
  if (form.fields.installments.value.length === 0)
    return form.fields.amount.value;

  return calculateAmountLimitByList(
    form.fields.amount.value,
    form.fields.installments.value
  );
});
const onSearch = (appendData: boolean) => events.searchInstallments(appendData);
const onSelectInstallments = (installments: Installment[]) =>
  events.validateIfAllowAddInstallments(installments);
const save = async (): Promise<void> => {
  await form.submit();

  emits("onSave");
};

onMounted(async (): Promise<void> => {
  await form.populateUsers();
});

defineExpose({ openForm });
</script>

<template>
  <slot :open-form="openForm"></slot>

  <AppModal
    :show="form.show.value"
    :title="modalTitle"
    :is-form="true"
    :footer="form.modalFooterConfig"
    @on-close="closeModal"
    @on-reset="() => events.reset()"
    @on-save.prevent="save"
  >
    <div class="container-fluid">
      <div class="form-group row">
        <div class="col-12 col-sm-5 mb-3">
          <label class="form-label">{{ FormStrings.date }}</label>

          <input
            type="date"
            class="form-control"
            form-field="date"
            :disabled="form.fields.date.disabled"
            @change="form.fields.date.clearValidation"
            v-model="form.fields.date.model.value"
          />

          <AppValidationMessages
            :validations="form.fields.date.validations"
            v-if="form.fields.date.invalid"
          />
        </div>

        <div class="col-12 col-sm-4 mb-3">
          <label class="form-label">
            {{ FormStrings.amount }}
          </label>

          <AppFormInputCurrency
            class="form-control text-end"
            form-field="amount"
            :maxlength="14"
            :disabled="form.fields.amount.disabled"
            @on-focus="() => form.fields.amount.clearValidation()"
            @on-key-up="() => events.amountChangeHandler()"
            v-model="form.fields.amount.model.value"
          />

          <AppValidationMessages
            :validations="form.fields.amount.validations"
            v-if="form.fields.amount.invalid"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-sm mb-3">
          <label class="form-label">{{ FormStrings.user }}</label>

          <select
            class="form-control"
            form-field="user"
            :disabled="form.fields.userId.disabled"
            @change="events.userChangeHandler"
            v-model="form.fields.userId.model.value"
          >
            <option value="0">...</option>

            <template v-if="form.users.value.length > 0">
              <option
                :value="user.id"
                v-for="(user, index) of form.users.value"
                :key="index"
              >
                {{ user.name }}
              </option>
            </template>
          </select>

          <AppValidationMessages
            :validations="form.fields.userId.validations"
            v-if="form.fields.userId.invalid"
          />
        </div>

        <div class="col-12 col-sm-4">
          <label class="form-label">
            {{ FormStrings.type }}
          </label>

          <select
            class="form-control"
            form-field="type"
            :disabled="form.fields.type.disabled"
            @change="events.typeChangeHandler"
            v-model="form.fields.type.model.value"
          >
            <option value="0">...</option>

            <template v-if="form.transactionTypes.length > 0">
              <option
                :value="type.value"
                :key="index"
                v-for="(type, index) of form.transactionTypes"
              >
                {{ type.key }}
              </option>
            </template>
          </select>

          <AppValidationMessages
            :validations="form.fields.type.validations"
            v-if="form.fields.type.invalid"
          />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-12">
          <TransactionsFormInstallments
            :transaction-installments="form.fields.installments.value"
            :allow-selection="form.allowAddInstallments.value"
            :amount-limit="amoutLimit"
            :disabled="form.editMode.value"
            @on-search="onSearch"
            @on-select-installments="onSelectInstallments"
          />

          <AppValidationMessages
            :validations="form.fields.installments.validations"
            v-if="form.fields.installments.invalid"
          />
        </div>
      </div>
    </div>
  </AppModal>
</template>
