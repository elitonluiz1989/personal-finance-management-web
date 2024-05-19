import { createStoreResourceItem } from "@/app/helpers/helpers";

export class ManagementStrings {
  public static noRecords = "No records";
  public static reload = "Reload";
  public static insertionDate = "Insertion Date";
  public static description = "Description";
  public static value = "Value";
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
