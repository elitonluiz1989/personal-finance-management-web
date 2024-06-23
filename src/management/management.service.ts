import { Reference } from "@/app/helpers/Reference";
import { StoreHelper } from "@/app/store/store.helper";
import { ManagementStoreStrings as StoreStrings } from "./management.strings";
import {
  createDateFromString,
  getEventTarget,
  isNullOrWhiteSpace,
} from "@/app/helpers/helpers";
import { Management } from "./models/management.model";
import { ManagementStoreFilter } from "./models/management-store.filter";

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

  public async save(userId?: number | undefined): Promise<void> {
    const filter: ManagementStoreFilter = {
      reference: this.reference.numberValue,
      userId: userId,
    };

    await StoreHelper.dispatch(StoreStrings.actionSave.namespaced, filter);
    await this.search();
  }
}
