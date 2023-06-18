import { Installment } from "@/installments/installment.model";
import { TransactionsFormStrings as FormStrings } from "../transactions.resources";
import { extractDateFormDateTime } from "@/app/helpers/helpers";
import { FormField } from "@/app/services/form/form-field.model";
import { FormFields } from "@/app/services/form/form-fields.model";
import { Transaction } from "./transaction.model";
import { TransactionTypeEnum } from "../transaction-type.enum";
import { TransactionStoreDto } from "./transaction-store.dto";

export class TransactionFormFields extends FormFields {
  public id: FormField<number>;
  public date: FormField<string>;
  public amount: FormField<number>;
  public userId: FormField<number>;
  public type: FormField<number>;
  public installments: FormField<Installment[]>;

  constructor() {
    super();

    this.id = this.createFormField(FormStrings.id, 0);
    this.date = this.createFormFieldRequired<string>(
      FormStrings.date,
      extractDateFormDateTime(new Date())
    );
    this.amount = this.createFormFieldRequired<number>(FormStrings.amount, 0);
    this.userId = this.createFormFieldRequired<number>(FormStrings.user, 0);
    this.type = this.createFormFieldRequired<number>(FormStrings.type, 0);
    this.installments = this.createFormFieldRequired<Installment[]>(
      FormStrings.installments,
      []
    );

    this.fillFieldsList();
  }

  public createTransaction(): Transaction {
    const transaction = new Transaction();

    if (this.id.value > 0) transaction.id = this.id.value;

    transaction.date = new Date(this.date.value);
    transaction.amount = +this.amount.value;
    transaction.userId = +this.userId.value;
    transaction.type = +this.type.value as TransactionTypeEnum;
    transaction.installments = this.installments.value.map((i) => i.id);

    return transaction;
  }

  public createStoreDto(): TransactionStoreDto {
    const transaction = new TransactionStoreDto();

    if (this.id.value > 0) transaction.id = this.id.value;

    transaction.date = new Date(this.date.value);
    transaction.amount = +this.amount.value;
    transaction.userId = +this.userId.value;
    transaction.type = +this.type.value as TransactionTypeEnum;
    transaction.installmentsIds = this.installments.value.map((i) => i.id);

    return transaction;
  }
}