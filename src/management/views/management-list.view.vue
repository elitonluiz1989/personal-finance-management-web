<script setup lang="ts">
import { ManagementStrings as Strings } from "../management.strings";
import { ComputedRef, computed, onMounted, provide } from "vue";
import { Management } from "../models/management.model";
import { ManagementService } from "../management.service";
import ManagementActions from "../components/management-actions.component.vue";
import ManagementItem from "../components/management-item/management-item.component.vue";

const service = new ManagementService();

const managements: ComputedRef<Management[]> = computed(service.getData);
const allManagementsRecorded: ComputedRef<boolean> = computed(
  () =>
    managements.value.length !== 0 &&
    managements.value.every((p) => p.isRecorded)
);

onMounted(async (): Promise<void> => await service.search());

provide("ManagementService", service);
</script>

<template>
  <div class="container-fluid">
    <div class="row pb-5">
      <management-actions
        :date="service.reference.stringValue"
        :all-managements-record="allManagementsRecorded"
        @change-reference="(evt: Event) => service.onChangeReference(evt)"
        @save="async () => await service.save()"
        @search="async () => await service.search()"
      />
    </div>

    <div class="row" v-if="managements && managements.length > 0">
      <div
        class="col-12 d-flex justify-content-center"
        v-for="(management, index) in managements"
        :key="index"
      >
        <management-item :management="management" />
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-12 d-flex justify-content-center">
        {{ Strings.noRecords }}
      </div>
    </div>
  </div>
</template>
