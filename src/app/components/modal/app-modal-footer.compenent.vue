<script setup lang="ts">
import { AppResources } from "@/app/app.resoures";
import { withDefaults, defineProps, defineEmits } from "vue";

type AppModalFooterProps = {
  isForm: boolean;
  showSaveButton: boolean;
  saveText?: string;
  showResetButton: boolean;
  resetText?: string;
  showDismissButton: boolean;
  dismissText?: string;
};
type AppModalFooterEmits = {
  (e: "onClose"): void;
  (e: "onSave", evt: Event): void;
};

const props = withDefaults(defineProps<AppModalFooterProps>(), {
  isForm: false,
  showSaveButton: true,
  saveText: AppResources.save,
  showResetButton: false,
  resetText: AppResources.reset,
  showDismissButton: true,
  dismissText: AppResources.close,
});

const emits = defineEmits<AppModalFooterEmits>();

const closeModal = () => emits("onClose");
const onSave = (evt: Event) => emits("onSave", evt);
</script>

<template>
  <div class="modal-footer">
    <button
      type="button"
      class="btn btn-secondary"
      data-dismiss="modal"
      @click="closeModal"
      v-if="props.showDismissButton"
    >
      {{ props.dismissText }}
    </button>

    <button
      type="reset"
      class="btn btn-outline-secondary"
      v-if="props.showResetButton"
    >
      {{ props.resetText }}
    </button>

    <button
      type="submit"
      class="btn btn-success"
      @click="onSave"
      v-if="props.showSaveButton"
    >
      {{ props.saveText }}
    </button>
  </div>
</template>
