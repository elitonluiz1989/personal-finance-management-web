<script setup lang="ts">
import { computed, defineProps, inject, withDefaults } from "vue";
import { ManagementStrings as Strings } from "../../management.strings";
import { ManagementStatusEnum } from "@/management/management-status.enum";
import { ManagementService } from "@/management/management.service";
import { User } from "@/users/user.model";

type ManagementItemHeaderPropsType = {
  status: ManagementStatusEnum;
  user: User;
};

const props = withDefaults(defineProps<ManagementItemHeaderPropsType>(), {
  status: ManagementStatusEnum.Unsaved,
  userName: Strings.userNotFound,
});

const service = inject<ManagementService>("ManagementService");

const recordBtnStyles = computed((): string => {
  if (props.status === ManagementStatusEnum.Unsaved)
    return "btn btn-success px-2 py-1";

  return "btn btn-danger px-2 py-1";
});
const recordBtnText = computed((): string => {
  if (props.status === ManagementStatusEnum.Unsaved) return Strings.save;

  return Strings.update;
});
const showRecordBtn = computed(
  () => props.status !== ManagementStatusEnum.Updated
);
</script>

<template>
  <tr class="bg-dark">
    <th class="px-1 py-2 text-white" colspan="3">
      {{ user.name }}
    </th>

    <th class="px-1 py-2">
      <button
        :class="recordBtnStyles"
        @click="service?.save(user.id)"
        v-if="showRecordBtn"
      >
        {{ recordBtnText }}
      </button>
    </th>
  </tr>

  <tr>
    <th class="bg-secondary text-white text-center">
      {{ Strings.insertionDate }}
    </th>

    <th class="bg-secondary text-white text-center">
      {{ Strings.description }}
    </th>

    <th class="bg-secondary text-white text-center">
      {{ Strings.value }}
    </th>

    <th class="bg-secondary text-white text-center">
      {{ Strings.actions }}
    </th>
  </tr>
</template>
