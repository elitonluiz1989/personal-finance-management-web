import { BalanceTypeEnum } from "@/balances/balances-type.enum";
import { isNullOrWhiteSpace } from "@/app/helpers/helpers";
import { Currency } from "./currency";

export class ManagementHelper {
  public static formatAmount(
    amount?: Currency,
    type?: BalanceTypeEnum
  ): string {
    if (isNullOrWhiteSpace(amount?.valueFormatted) || !type) {
      return "0";
    }

    const sign = type === BalanceTypeEnum.credit ? "+" : "-";

    return `${sign}${amount?.valueFormatted}`;
  }

  public static getAmountStyle(type?: BalanceTypeEnum): string {
    if (type === BalanceTypeEnum.credit)
      return "px-2 border-end border-dark text-end text-success";

    return "px-2 border-end border-dark text-end text-danger";
  }
}
