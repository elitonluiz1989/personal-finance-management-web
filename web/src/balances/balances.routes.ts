import { authenticationGuard } from "@/authentication/authentication.guard";
import BalancesListView from "@/balances/balances-list.view.vue";
import { UserRoleEnum } from "@/users/enuns/user-role.enum";
import { RouteLocationNamedRaw, RouteRecordRaw } from "vue-router";

export const BalancesRoutes: RouteRecordRaw[] = [
  {
    path: "/balances",
    name: "balances",
    meta: {
      authorized: [UserRoleEnum.Administrator],
    },
    beforeEnter: [authenticationGuard],
    redirect: (): RouteLocationNamedRaw => ({ name: "balances.list" }),
    children: [
      {
        path: "list",
        name: "balances.list",
        component: BalancesListView,
      },
    ],
  },
];
