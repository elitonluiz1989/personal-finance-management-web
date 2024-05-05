import { authenticationGlobalGuard } from "@/authentication/authentication-global.guard";
import { AuthenticationRoutes } from "@/authentication/authentication.routes";
import { BalancesRoutes } from "@/balances/balances.routes";
import { ManagementRoutes } from "@/management/management.routes";
import { TransactionsRoutes } from "@/transactions/transaction.routes";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  ...ManagementRoutes,
  ...AuthenticationRoutes,
  ...BalancesRoutes,
  ...TransactionsRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(authenticationGlobalGuard);

export default router;
