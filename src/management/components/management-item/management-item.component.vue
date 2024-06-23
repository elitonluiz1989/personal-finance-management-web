<script setup lang="ts">
import { defineProps } from "vue";
import { Management } from "../../models/management.model";
import ManagementItemHeader from "./management-item-header.component.vue";
import ManagementItemContent from "./management-item-content.component.vue";
import ManagementItemTotal from "./management-item-total.component.vue";
import ManagementItemActions from "./management-item-actions.component.vue";

type ManagementItemPropsType = {
  management: Management;
};

defineProps<ManagementItemPropsType>();
</script>

<template>
  <table class="table border border-dark">
    <thead>
      <management-item-header
        :status="management.status"
        :user-name="management.user?.name"
      />
    </thead>

    <tbody>
      <tr
        class="border-bottom border-dark text-end"
        v-for="(item, index) in management.items"
        :key="index"
      >
        <management-item-content :content="item" />
      </tr>
    </tbody>

    <tfoot>
      <management-item-total :total="management.total!" />

      <management-item-actions
        :user-id="management.user!.id"
        :is-recorded="management.isRecorded"
      />
    </tfoot>
  </table>
</template>
