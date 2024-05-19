import { Reference } from "@/app/helpers/Reference";
import { StoreHelper } from "@/app/store/store.helper";
import { ManagementStoreStrings as StoreStrings } from "./management.strings";
import {
  createDateFromString,
  getEventTarget,
  isNullOrWhiteSpace,
} from "@/app/helpers/helpers";
import { BalanceTypeEnum } from "@/balances/balances-type.enum";
import { Management } from "./models/management.model";

export class ManagementService {
  public reference: Reference;

  constructor() {
    this.reference = new Reference(new Date("2021-10-01T00:00:00"));
  }

  public async search(): Promise<void> {
    await StoreHelper.dispatch(
      StoreStrings.actionList.namespaced,
      this.reference.numberValue
    );
  }

  public getData(): Management[] {
    return StoreHelper.get<Management[]>(
      StoreStrings.getterItems.namespaced,
      []
    );
  }

  public onChangeReference(evt: Event): void {
    const target = getEventTarget<HTMLInputElement>(evt);

    if (isNullOrWhiteSpace(target.value)) {
      return;
    }

    const date = createDateFromString(target.value);

    if (this.reference.equals(date)) {
      return;
    }

    this.reference.refill(date);
    this.search();
  }

  public formatAmount(amount?: string, type?: BalanceTypeEnum): string {
    if (isNullOrWhiteSpace(amount) || !type) {
      return "0";
    }

    const sign = type === BalanceTypeEnum.credit ? "+" : "-";

    return `${sign}${amount}`;
  }

  public getAmountStyle(type?: BalanceTypeEnum): string {
    if (type === BalanceTypeEnum.credit) return "px-2 text-end text-success";

    return "px-2 text-end text-danger";
  }
}
