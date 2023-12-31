import { AppResources } from "@/app/app.resoures";
import { FinanceTypeEnum } from "@/app/enums/finance-type.enum";
import { IIndexable, KeyValue } from "@/app/types";

export enum TransactionTypeEnum {
  credit = 1,
  debt,
}

const descriptions: IIndexable<string> = {
  [TransactionTypeEnum.credit.toString()]: AppResources.credit,
  [TransactionTypeEnum.debt.toString()]: AppResources.debt,
};

export function toKeyValue(): KeyValue<string, TransactionTypeEnum>[] {
  const values: KeyValue<string, TransactionTypeEnum>[] = [];

  for (const key in descriptions) {
    values.push({
      key: descriptions[key],
      value: Number(key),
    });
  }

  return values;
}

export function toFinanceTypeEnum(
  value: TransactionTypeEnum | undefined
): FinanceTypeEnum | undefined {
  if (value === TransactionTypeEnum.credit) return FinanceTypeEnum.credit;

  if (value === TransactionTypeEnum.debt) return FinanceTypeEnum.debt;

  return undefined;
}
