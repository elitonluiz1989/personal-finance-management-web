<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { Balance } from "@/balances/models/balance.model";
import { BalanceTypeEnum } from "@/balances/balances-type.enum";
import { CurrencyFormatterStatic } from "@/app/helpers/currency-formatter";
import BalanceCardItem from "./balance-card-item.component.vue";
import BalanceCardBadge from "./balance-card-badge.component.vue";
import BalanceCardActions from "./balance-card-actions.component.vue";
import BalanceCardInstallments from "./installments/balance-card-installments.component.vue";

type BalanceCardProps = {
  balance: Balance;
};
type BalanceCardEmits = {
  (e: "onEdit", balanceId: number): void;
  (e: "onRefinance", balanceId: number): void;
  (e: "onRemove", balanceId: number): void;
};

const props = defineProps<BalanceCardProps>();
const emits = defineEmits<BalanceCardEmits>();

const cardCssStyle = (type: BalanceTypeEnum | undefined) => ({
  "balance--credit": type === BalanceTypeEnum.credit,
  "balance--debt": type === BalanceTypeEnum.debt,
});

const triggerEdit = () => emits("onEdit", props.balance.id);
const triggerRefinance = () => emits("onRefinance", props.balance.id);
const triggerRemove = () => emits("onRemove", props.balance.id);
</script>

<template>
  <div class="balance card" :class="cardCssStyle(props.balance.type)">
    <div class="balance__title d-flex px-2 py-2 mb-0">
      <div
        class="d-flex flex-fill align-items-center justify-content-center mb-0 text-white fw-bolder"
      >
        {{ props.balance.name }}
      </div>

      <BalanceCardBadge
        :type="props.balance.type"
        :closed="props.balance.closed"
      />
    </div>

    <div class="container-fluid flex-fill bg-white">
      <BalanceCardItem
        class="balance__user"
        label="User"
        :value="props.balance.user?.name ?? ''"
      />

      <BalanceCardItem
        label="Date"
        :value="props.balance.date"
        :value-handler="(date: Date) => date.toLocaleDateString()"
      />

      <BalanceCardItem
        label="Amount"
        :value="props.balance.amount"
        :value-handler="(amount: number) => CurrencyFormatterStatic.format(amount)"
      />
    </div>

    <BalanceCardInstallments
      :installments="props.balance.installments"
      :type="props.balance.type"
    />

    <BalanceCardActions
      :id="balance.id"
      :type="balance.type"
      @on-edit="triggerEdit"
      @on-refinance="triggerRefinance"
      @on-remove="triggerRemove"
    />
  </div>
</template>

<style scoped lang="scss">
@import "./balance-card.scss";

.balance {
  $selector: &;

  min-height: 20.6rem;
  background-color: #f9f9f9;

  &__title {
    border-top-right-radius: 0.3rem;
    border-top-left-radius: 0.3em;
  }

  &--credit {
    border-color: $card-credit-color;

    #{$selector}__title {
      background-color: $card-credit-color;
    }

    #{$selector}__user {
      border-bottom: 1px solid $card-credit-color;
    }

    #{$selector}__actions {
      border-top: 1px solid $card-credit-color;
    }
  }

  &--debt {
    border-color: $card-debt-color;

    #{$selector}__title {
      background-color: $card-debt-color;
    }

    #{$selector}__user {
      border-bottom: 1px solid $card-debt-color;
    }

    #{$selector}__actions {
      border-top: 1px solid $card-debt-color;
    }
  }
}
</style>
