import { isString, mapFrom } from "@/app/helpers/helpers";
import { IIndexable } from "@/app/types";
import { User } from "@/users/user.model";
import { TransactionTypeEnum } from "../enums/transaction-type.enum";
import { TransactionItem } from "./transaction-item.model";

export class Transaction {
  public id = 0;
  public userId = 0;
  public user: User | undefined;
  public type!: TransactionTypeEnum;
  public date: Date | undefined;
  public amount = 0;
  public items: TransactionItem[] = [];

  public static createFrom<TData extends IIndexable<any>>(
    data: TData
  ): Transaction {
    const transaction = new Transaction();

    if (data.date) {
      transaction.date = isString(data.date) ? new Date(data.date) : data.date;

      delete data.date;
    }

    if (data.user) {
      transaction.user = User.createFrom(data.user);

      delete data.user;
    }

    if (data.items?.length > 0) {
      for (const item of data.items) {
        transaction.items.push(TransactionItem.createFrom(item));
      }

      delete data.items;
    }

    mapFrom(data, transaction);

    return transaction;
  }
}
