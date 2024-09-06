import { TransactionBasicDto } from "./transaction-basic.dto";

export class TransactionStoreDto extends TransactionBasicDto {
  public id = 0;
  public installmentsIds: number[] = [];
}
