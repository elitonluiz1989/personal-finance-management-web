<script setup lang="ts">
import { computed, defineProps, withDefaults } from "vue";
import { ManagementStrings as Strings } from "../../management.strings";
import { ManagementStatusEnum } from "@/management/management-status.enum";
import AppBadge from "@/app/components/bagde/app-badge.component.vue";
import { BootstrapColorsEnum } from "@/app/enums/BootstrapColorsEnum.enum";

type ManagementItemHeaderPropsType = {
  status: ManagementStatusEnum;
  userName?: string;
};

const props = withDefaults(defineProps<ManagementItemHeaderPropsType>(), {
  status: ManagementStatusEnum.Unsaved,
  userName: Strings.userNotFound,
});

const badgeColor = computed((): BootstrapColorsEnum => {
  if (props.status === ManagementStatusEnum.Updated)
    return BootstrapColorsEnum.danger;

  if (props.status === ManagementStatusEnum.Outdated)
    return BootstrapColorsEnum.warning;

  return BootstrapColorsEnum.success;
});

const badgeText = computed((): string => {
  if (props.status === ManagementStatusEnum.Updated) return Strings.updated;

  if (props.status === ManagementStatusEnum.Outdated) return Strings.outdated;

  return Strings.unsaved;
});
</script>

<template>
  <tr>
    <th class="bg-dark text-white text-center" colspan="3">
      <div class="d-flex justify-content-between px-1 py-2">
        <span>{{ userName }}</span>

        <AppBadge :color="badgeColor" :text="badgeText" :fit-content="true" />
      </div>
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
  </tr>
</template>
