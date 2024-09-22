import { TransactionBasicDto } from "./models/transaction-basic.dto";
import { Transaction } from "./models/transaction.model";

export type TransactionStore = {
  transactions: Transaction[];
};

export type TransactionFormsOpenAction = (
  data?: TransactionBasicDto
) => Promise<void>;
