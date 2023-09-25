<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
  ref,
  watch,
  withDefaults,
} from "vue";
import AppModalFooter from "./app-modal-footer.compenent.vue";
import AppModalHeader from "./app-modal-header.component.vue";
import { IAppModalFooterProps } from "./types";

type AppModalProps = {
  id?: string;
  title: string;
  show: boolean;
  isForm?: boolean;
  footer?: IAppModalFooterProps;
};
type AppModalEmits = {
  (e: "onClose", show: boolean): void;
  (e: "onReset", evt: Event): void;
  (e: "onSave", evt: Event): void;
};

const props = withDefaults(defineProps<AppModalProps>(), {
  id: "",
  show: false,
  isForm: false,
});
const showModal = ref(false);
const labelId = `${props.id}-label`;

const modalCssStyles = computed(() => ({
  "modal fade show": showModal.value,
  "modal fade": showModal.value === false,
}));
const modalDropCssStyles = computed(() => ({
  "modal-backdrop fade show": showModal.value,
  "modal-backdrop fade": showModal.value === false,
}));
const modalId = computed(() => props.id ?? "");

watch(
  () => props.show,
  (value: boolean) => {
    showModal.value = value;
  }
);

const emits = defineEmits<AppModalEmits>();

const onClose = () => {
  showModal.value = false;

  emits("onClose", false);
};
const onReset = (evt: Event) => emits("onReset", evt);
const onSave = (evt: Event) => emits("onSave", evt);
</script>

<template>
  <div
    :id="modalId"
    :class="modalCssStyles"
    tabindex="-1"
    role="dialog"
    :aria-labelledby="labelId"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form v-if="props.isForm" @submit="onSave" @reset="onReset">
          <AppModalHeader
            :title="props.title"
            :label-id="labelId"
            @trigger-on-close="onClose"
          />

          <div class="modal-body">
            <slot></slot>
          </div>

          <AppModalFooter
            :is-form="true"
            :show-save-button="props.footer?.showSaveButton"
            :save-text="props.footer?.saveText"
            :show-reset-button="props.footer?.showResetButton"
            :reset-text="props.footer?.resetText"
            :show-dismiss-button="props.footer?.showDismissButton"
            :dismiss-text="props.footer?.dismissText"
            @on-close="onClose"
          />
        </form>

        <template v-else>
          <AppModalHeader
            :title="props.title"
            :label-id="labelId"
            @trigger-on-close="onClose"
          />

          <div class="modal-body">
            <slot></slot>
          </div>

          <AppModalFooter
            :is-form="false"
            :show-save-button="props.footer?.showSaveButton"
            :save-text="props.footer?.saveText"
            :show-reset-button="props.footer?.showResetButton"
            :reset-text="props.footer?.resetText"
            :show-dismiss-button="props.footer?.showDismissButton"
            :dismiss-text="props.footer?.dismissText"
            @on-close="onClose"
            @on-save="onSave"
          />
        </template>
      </div>
    </div>
  </div>

  <div :class="modalDropCssStyles"></div>
</template>

<style scoped lang="scss">
$modal-zindex: 1071;

%modal-inital {
  z-index: -1;
}

.close {
  background-color: transparent;
  border: 0;
}

.modal {
  display: block;

  @extend %modal-inital;

  &.show {
    z-index: $modal-zindex + 1;

    .modal-dialog {
      opacity: 1;
    }
  }

  &-dialog {
    opacity: 0;
  }
}

.modal-backdrop {
  @extend %modal-inital;

  &.show {
    z-index: $modal-zindex;
  }
}
</style>
