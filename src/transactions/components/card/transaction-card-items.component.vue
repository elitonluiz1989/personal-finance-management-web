<script setup lang="ts">
import AppBadge from "@/app/components/bagde/app-badge.component.vue";
import { BootstrapColorsEnum } from "@/app/enums/bootstrap-colors.enum";
import { CurrencyFormatterStatic } from "@/app/helpers/currency-formatter";
import { TransactionItem } from "@/transactions/models/transaction-item.model";
import { computed, defineProps } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type TransactionCardItemProps = {
  item: TransactionItem;
};

const props = defineProps<TransactionCardItemProps>();

const installmentDescription = computed(
  (): string =>
    `${props.item.installment?.number}/${props.item.installment?.balance?.installmentsNumber}`
);
</script>

<template>
  <div class="d-flex flex-wrap w-100 p-1">
    <span class="fw-bolder">
      {{ props.item.installment?.balance?.name }}
    </span>

    <span class="mx-2">-</span>

    <AppBadge
      :text="installmentDescription"
      :color="BootstrapColorsEnum.dark"
    />

    <span class="ms-2 me-auto">
      {{ CurrencyFormatterStatic.format(props.item.amountPaid) }}
    </span>

    <span class="text-warning" v-if="props.item.partiallyPaid">
      <FontAwesomeIcon
        icon="fa-solid fa-circle-exclamation"
        title="Partially Paid"
      />
    </span>
  </div>
</template>

<style scoped lang="scss"></style>
