<script setup lang="ts">
import { StoreHelper } from "@/app/store/store.helper";
import {
  ManagementStrings as Strings,
  ManagementStoreStrings as StoreStrings,
} from "../management.strings";
import { ComputedRef, computed, onMounted } from "vue";
import { Management } from "../models/management.model";
import TransactionForm from "@/transactions/components/form/transactions-form.component.vue";
import { ManagementService } from "../management.service";

const service = new ManagementService();

const managementData: ComputedRef<Management[]> = computed(service.getData);

onMounted(async (): Promise<void> => await service.search());
</script>

<template>
  <div class="container-fluid">
    <div class="row pb-5">
      <div class="col-12 d-flex justify-content-center">
        <input
          class="input-form"
          type="month"
          :value="service.reference.stringValue"
          @change="service.onChangeReference"
        />

        <button class="btn btn-primary ms-2" @click="service.search">
          {{ Strings.reload }}
        </button>
      </div>
    </div>

    <div class="row" v-if="managementData && managementData.length > 0">
      <div
        class="col-12 d-flex justify-content-center"
        v-for="(management, index) in managementData"
        :key="index"
      >
        <table class="table border border-dark">
          <thead>
            <tr>
              <th class="bg-dark text-white text-center" colspan="3">
                {{ management.user?.name }}
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
          </thead>

          <tbody>
            <tr
              class="border-bottom border-dark text-end"
              v-for="(item, index) in management.items"
              :key="index"
            >
              <td class="px-2 border-end border-dark text-end">
                {{ item.date }}
              </td>

              <td class="px-2 border-end border-dark text-end">
                {{ item.description }}
              </td>

              <td :class="service.getAmountStyle(item.type)">
                {{
                  service.formatAmount(item.amount?.valueFormatted, item.type)
                }}
              </td>
            </tr>

            <tr class="border-bottom border-dark text-center">
              <td class="justify-content-evenly py-1" colspan="3">
                <TransactionForm :date="service.reference.stringValue" />
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td
                class="px-2 border-end border-dark text-end fw-bolder"
                colspan="2"
              >
                Total
              </td>

              <td :class="service.getAmountStyle(management.total?.type)">
                {{
                  service.formatAmount(
                    management.total?.value?.valueFormatted,
                    management.total?.type
                  )
                }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-12 d-flex justify-content-center">
        {{ Strings.noRecords }}
      </div>
    </div>
  </div>
</template>
