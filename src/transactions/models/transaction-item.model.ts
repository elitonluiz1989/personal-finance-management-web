import { Installment } from "@/installments/installment.model";
import { TransactionItemTypeEnum } from "../enums/transaction-item-type.enum";
import { IIndexable } from "@/app/types";
import { mapFrom } from "@/app/helpers/helpers";

export class TransactionItem {
  public transactionId = 0;
  public installmentId = 0;
  public type: TransactionItemTypeEnum | undefined;
  public typeDescription = "";
  public partiallyPaid = false;
  public amountPaid = 0;
  public installment: Installment | undefined;

  public static createFrom<T extends IIndexable<any>>(
    data: T
  ): TransactionItem {
    const transactionItem = new TransactionItem();

    if (data.installment) {
      transactionItem.installment = Installment.createFrom(data.installment);

      delete data.installment;
    }

    mapFrom(data, transactionItem);

    return transactionItem;
  }
}
