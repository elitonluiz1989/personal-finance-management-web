<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { FinanceTypeEnum } from "../../enums/finance-type.enum";

type AppFlyoutListProps = {
  text: string;
  type: FinanceTypeEnum | undefined;
  items: Array<object>;
};

const props = defineProps<AppFlyoutListProps>();
const clicked = ref(false);

const cssStyles = computed(() => ({
  "flyout--credit": props.type === FinanceTypeEnum.credit,
  "flyout--debt": props.type === FinanceTypeEnum.debt,
}));
const angleDownStyles = computed(() => ({
  "flyout-indicator--rotated": clicked.value,
}));

const onToggle = () => (clicked.value = !clicked.value);
</script>

<template>
  <div class="flyout" :class="cssStyles">
    <button
      class="w-100 py-2 pe-0 d-flex flex-column bg-white border-0"
      @click="onToggle"
    >
      <div class="d-flex w-100">
        <div class="flex-fill ps-3 text-start">{{ text }}</div>

        <div class="flyout-indicator" :class="angleDownStyles">
          <FontAwesomeIcon icon="fa-solid fa-plus" />
        </div>
      </div>

      <div class="position-relative w-100">
        <div class="flyout-floating position-absolute w-100" v-if="clicked">
          <div class="flyout-caret d-flex justify-content-end overflow-hidden">
            <FontAwesomeIcon icon="fa-solid fa-caret-up" size="lg" />
          </div>

          <ul
            class="flyout-list ps-0 m-0 rounded bg-white"
            v-if="props.items.length > 0"
          >
            <li
              class="d-flex list-style-none py-2"
              v-for="(item, index) in props.items"
              :key="index"
            >
              <slot name="item" v-bind="item"></slot>
            </li>
          </ul>
        </div>
      </div>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.flyout {
  $selector: &;

  &-indicator {
    width: 2rem;
    transition: all 0.35s;
    transform: rotate(0);

    &--rotated {
      transform: rotate(45deg);
    }
  }

  &-floating {
    padding-bottom: 1rem;
    z-index: 1;
    top: 0;
    right: 0.3rem;
  }

  &-caret {
    height: 10px;
    padding-right: 0.28rem;
  }

  &-list {
    border-width: 1px;
    border-style: solid;
    box-shadow: 1px 1px 10px #555;

    li {
      border-bottom-width: 1px;
      border-bottom-style: solid;

      &:last-child {
        border-bottom: 0;
      }
    }
  }

  &--credit {
    border-top: 1px solid $app-credit-color;

    #{$selector}-floating {
      border-color: $app-credit-color;
    }

    #{$selector}-caret {
      color: $app-credit-color;
    }

    #{$selector}-list {
      border-color: $app-credit-color;

      li {
        border-bottom-color: $app-credit-color;
      }
    }
  }

  &--debt {
    border-top: 1px solid $app-debt-color;

    #{$selector}-floating {
      border-color: $app-debt-color;
    }

    #{$selector}-caret {
      color: $app-debt-color;
    }

    #{$selector}-list {
      border-color: $app-debt-color;

      li {
        border-bottom-color: $app-debt-color;
      }
    }
  }

  &-reference {
    min-width: 7rem;
  }

  .badge {
    height: fit-content;
  }
}
</style>
