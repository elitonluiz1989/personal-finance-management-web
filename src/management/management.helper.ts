import { BalanceTypeEnum } from "@/balances/balances-type.enum";
import { isNullOrWhiteSpace } from "@/app/helpers/helpers";

export class ManagementHelper {
  public static formatAmount(amount?: string, type?: BalanceTypeEnum): string {
    if (isNullOrWhiteSpace(amount) || !type) {
      return "0";
    }

    const sign = type === BalanceTypeEnum.credit ? "+" : "-";

    return `${sign}${amount}`;
  }

  public static getAmountStyle(type?: BalanceTypeEnum): string {
    if (type === BalanceTypeEnum.credit)
      return "px-2 border-end border-dark text-end text-success";

    return "px-2 border-end border-dark text-end text-danger";
  }
}
