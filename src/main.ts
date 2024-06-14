import { createApp } from "vue";
import "./registerServiceWorker";
import "@/app/assets/scss/app.scss";
import { AxiosHelper } from "@/app/helpers/axios";
import router from "@/app/router";
import { store, storeKey } from "@/app/store";
import App from "@/app/views/app.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleUp as fasAngleUp,
  faAngleDown as fasAngleDown,
  faFloppyDisk as fasFloppyDisk,
  faMoneyBillTransfer as fasMoneyBillTransfer,
  faTrashCan as fasTrashCan,
  faCaretUp as fasCaretUp,
  faPlus as fasPLus,
  faPen as fasPen,
  faCircle as fasCircle,
  faCircleExclamation as fasCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fasAngleUp,
  fasAngleDown,
  fasFloppyDisk,
  fasMoneyBillTransfer,
  fasTrashCan,
  fasCaretUp,
  fasPLus,
  fasPen,
  fasCircle,
  fasCircleExclamation
);

createApp(App).use(store, storeKey).use(router).mount("#app");

AxiosHelper.configure();
