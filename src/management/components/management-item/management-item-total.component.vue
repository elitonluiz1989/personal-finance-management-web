<script setup lang="ts">
import { defineProps } from "vue";
import { ManagementStrings as Strings } from "../../management.strings";
import { ManagementTotal } from "../../models/management-total.model";
import { ManagementHelper as Helper } from "../../management.helper";

type ManagementItemTotalPropsType = {
  total: ManagementTotal;
};

defineProps<ManagementItemTotalPropsType>();
</script>

<template>
  <tr>
    <td class="px-2 border-end border-dark text-end fw-bolder" colspan="2">
      {{ Strings.total }}
    </td>

    <td :class="Helper.getAmountStyle(total?.type)">
      {{ Helper.formatAmount(total.value?.valueFormatted, total.type) }}
    </td>
  </tr>
</template>
