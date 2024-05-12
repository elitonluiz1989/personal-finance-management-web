import { createStoreResourceItem } from "@/app/helpers/helpers";

export class ManagementStrings {
  public static reload = "Reload";
}

export class ManagementStoreStrings {
  public static namespace = "management";

  public static getterItems = createStoreResourceItem(
    ManagementStoreStrings.namespace,
    "getItems"
  );

  public static setterAddItems = createStoreResourceItem(
    ManagementStoreStrings.namespace,
    "addItems"
  );

  public static actionList = createStoreResourceItem(
    ManagementStoreStrings.namespace,
    "list"
  );
}
