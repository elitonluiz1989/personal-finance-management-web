import { BalanceTypeEnum } from "@/balances/balances-type.enum";
import { Currency } from "../currency";
import { IIndexable } from "@/app/types";
import { isNumber, mapFrom } from "@/app/helpers/helpers";

export class ManagementTotal {
  public type = BalanceTypeEnum.credit;
  public value: Currency | undefined;

  public static createFrom<TData extends IIndexable<any>>(
    data: TData
  ): ManagementTotal {
    const total = new ManagementTotal();

    ManagementTotal.createAmount<TData>(data, total);

    mapFrom(data, total);

    return total;
  }

  private static createAmount<TData extends IIndexable<any>>(
    data: TData,
    total: ManagementTotal
  ) {
    if (!data.value || !isNumber(data.value)) {
      return;
    }

    total.value = new Currency(data.value);

    delete data.value;
  }
}
