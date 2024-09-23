import { BalanceTypeEnum } from "@/balances/balances-type.enum";
import { Currency } from "../currency";
import { mapFrom, isNumber } from "@/app/helpers/helpers";
import { IIndexable } from "@/app/types";

export class ManagementRemainingValue {
  public description = "";
  public type = BalanceTypeEnum.credit;
  public value: Currency | undefined;

  public static createFrom<TData extends IIndexable<any>>(
    data: TData
  ): ManagementRemainingValue {
    const remainingValue = new ManagementRemainingValue();

    ManagementRemainingValue.createAmount<TData>(data, remainingValue);

    mapFrom(data, remainingValue);

    return remainingValue;
  }

  private static createAmount<TData extends IIndexable<any>>(
    data: TData,
    remainingValue: ManagementRemainingValue
  ) {
    if (!data.value || !isNumber(data.value)) {
      return;
    }

    remainingValue.value = new Currency(data.value);

    delete data.value;
  }
}
