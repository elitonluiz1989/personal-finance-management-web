import { authenticationGuard } from "@/authentication/authentication.guard";
import { UserRoleEnum } from "@/users/enuns/user-role.enum";
import { RouteRecordRaw } from "vue-router";
import ManagementView from "@/management/views/management-list.view.vue";

export const ManagementRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "management",
    component: ManagementView,
    meta: {
      authorized: [UserRoleEnum.administrator],
    },
    beforeEnter: [authenticationGuard],
  },
];
