import { BalanceTypeEnum } from "@/balances/balances-type.enum";
import { ManagementItemTypeEnum } from "../management-item-type.enum";
import { Currency } from "../currency";
import { isNumber, mapFrom } from "@/app/helpers/helpers";
import { IIndexable } from "@/app/types";

export class ManagementItem {
  public id = 0;
  public reference = 0;
  public type = BalanceTypeEnum.credit;
  public managementType = ManagementItemTypeEnum.installment;
  public description = "";
  public amount: Currency | undefined;

  public static createFrom<TData extends IIndexable<any>>(
    data: TData
  ): ManagementItem {
    const item = new ManagementItem();

    ManagementItem.createAmount<TData>(data, item);

    mapFrom(data, item);

    return item;
  }

  private static createAmount<TData extends IIndexable<any>>(
    data: TData,
    item: ManagementItem
  ) {
    if (!data.amount || !isNumber(data.amount)) {
      return;
    }

    item.amount = new Currency(data.amount);

    delete data.amount;
  }
}
