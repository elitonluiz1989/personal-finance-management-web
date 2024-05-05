import { User } from "@/users/user.model";
import { ManagementItem } from "./management-item.model";
import { ManagementTotal } from "./management-total.model";
import { IIndexable } from "@/app/types";
import { mapFrom } from "@/app/helpers/helpers";

export class Management {
  public user?: User;
  public items: ManagementItem[] = [];
  public total: ManagementTotal | undefined;

  public static createFrom<TData extends IIndexable<any>>(
    data: TData
  ): Management {
    const management = new Management();

    Management.createUser<TData>(data, management);
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
