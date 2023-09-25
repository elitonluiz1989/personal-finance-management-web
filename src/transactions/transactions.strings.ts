import { createStoreResourceItem } from "@/app/helpers/helpers";

export class TransactionsFormStrings {
  public static insertTitle = "Add transaction";
  public static editTitle = "Edit transaction";

  public static id = "Id";
  public static date = "Date";
  public static amount = "Amount";
  public static user = "User";
  public static type = "Type";
  public static installments = "Installments";

  public static addTransaction = "Add transaction";
  public static loadMore = "Load more";
  public static amoutSelectedInstallments = "Amount of selected installments:";
  public static transactionNotFound = "Trasanction not found";
  public static addInstallments = "Add installments";
  public static userInstallmentsNotFound = "Intallments not found";
  public static amountAvailableToSelect = (amount: string) =>
    `Amount avaliable to select: ${amount}`;
}

export class TransactionsStoreStrings {
  public static namespace = "transactions";

  public static getterTransactions = createStoreResourceItem(
    TransactionsStoreStrings.namespace,
    "getTransactions"
  );
  public static getterTransaction = createStoreResourceItem(
    TransactionsStoreStrings.namespace,
    "getTransaction"
  );

  public static setterAddTransaction = createStoreResourceItem(
    TransactionsStoreStrings.namespace,
    "addTransaction"
  );
  public static setterAddTransactions = createStoreResourceItem(
    TransactionsStoreStrings.namespace,
    "addTransactions"
  );

  public static actionList = createStoreResourceItem(
    TransactionsStoreStrings.namespace,
    "list"
  );
  public static actionFindAction = createStoreResourceItem(
    TransactionsStoreStrings.namespace,
    "find"
  );
  public static actionAdd = createStoreResourceItem(
    TransactionsStoreStrings.namespace,
    "add"
  );
}
