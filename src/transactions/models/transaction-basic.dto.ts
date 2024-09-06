import { TransactionTypeEnum } from "../enums/transaction-type.enum";

export class TransactionBasicDto {
  public id = 0;
  public userId = 0;
  public type: TransactionTypeEnum | undefined = undefined;
  public date: Date | undefined = undefined;
  public amount = 0;
}
