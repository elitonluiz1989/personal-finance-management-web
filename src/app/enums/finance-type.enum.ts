import { AppResources } from "@/app/app.resoures";

export enum FinanceTypeEnum {
  credit = 1,
  debt = 2,
}

export function getDescription(type: FinanceTypeEnum | undefined): string {
  if (type === FinanceTypeEnum.credit) return AppResources.credit;

  if (type === FinanceTypeEnum.debt) return AppResources.debt;

  return "";
}
