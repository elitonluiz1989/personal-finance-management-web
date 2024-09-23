import { User } from "@/users/user.model";
import { ManagementItem } from "./management-item.model";
import { ManagementTotal } from "./management-total.model";
import { IIndexable } from "@/app/types";
import { mapFrom } from "@/app/helpers/helpers";
import { ManagementStatusEnum } from "../management-status.enum";
import { ManagementRemainingValue } from "./management-remaining-value.model";

export class Management {
  public id = 0;
  public status: ManagementStatusEnum = ManagementStatusEnum.Unsaved;
  public user?: User;
  public remainingValue: ManagementRemainingValue | undefined;
  public items: ManagementItem[] = [];
  public total: ManagementTotal | undefined;

  get isRecorded(): boolean {
    return +this.id > 0;
  }

  public static createFrom<TData extends IIndexable<any>>(
    data: TData
  ): Management {
    const management = new Management();

    Management.createUser<TData>(data, management);
    Management.createRemaninigValue(data, management);
    Management.createItems<TData>(data, management);
    Management.createTotal<TData>(data, management);

    mapFrom(data, management);

    return management;
  }

  private static createUser<TData extends IIndexable<any>>(
    data: TData,
    management: Management
  ) {
    if (!data.user) return;

    management.user = User.createFrom(data.user);

    delete data.user;
  }

  private static createRemaninigValue<TData extends IIndexable<any>>(
    data: TData,
    management: Management
  ) {
    if (!data.remainingValue) return;

    management.remainingValue = ManagementRemainingValue.createFrom(
      data.remainingValue
    );

    delete data.remainingValue;
  }

  private static createItems<TData extends IIndexable<any>>(
    data: TData,
    management: Management
  ) {
    if (!data.items) return;

    for (const item of data.items) {
      const managementItem = ManagementItem.createFrom(item);

      management.items.push(managementItem);
    }

    delete data.items;
  }

  private static createTotal<TData extends IIndexable<any>>(
    data: TData,
    management: Management
  ) {
    if (!data.total) return;

    management.total = ManagementTotal.createFrom(data.total);

    delete data.total;
  }
}
