import { Transaction } from "./models/transaction.model";

export type TransactionStore = {
  transactions: Transaction[];
};

export type TransactionFormsOpenAction = (id: number) => Promise<void>;
