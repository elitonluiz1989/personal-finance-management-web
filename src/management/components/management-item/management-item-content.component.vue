<script setup lang="ts">
import { defineProps } from "vue";
import { ManagementHelper as Helper } from "../../management.helper";
import { ManagementItem } from "../../models/management-item.model";

type ManagementItemContentPropsType = {
  content: ManagementItem;
};

defineProps<ManagementItemContentPropsType>();
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
</template>
