import { mapFrom } from "@/app/helpers/helpers";
import { IIndexable } from "@/app/types";
import { InstallmentStatusEnum } from "./installment-status.enum";
import { BalanceSimplified } from "./../balances/models/balance-simplified.model";
import { CurrencyFormatterStatic } from "@/app/helpers/currency-formatter";

export class Installment {
  public id = 0;
  public balanceId = 0;
  public reference = 0;
  public referenceFormatted = "";
  public number = 0;
  public status: InstallmentStatusEnum = InstallmentStatusEnum.created;
  public statusDescription = "";
  public amount = 0;
  public amountPaid = 0;
  public amountRemaining = 0;
  public deletedAt: Date | undefined = undefined;
  public active = false;
  public balance: BalanceSimplified | undefined = undefined;

  public numberDescriptionHandler(): string {
    return `${this.number}/${this.balance?.installmentsNumber}`;
  }

  public amountHandler = (): string => {
    let amount = this.amount;

    if (this.status == InstallmentStatusEnum.partiallyPaid)
      amount = this.amountRemaining;

    return CurrencyFormatterStatic.format(amount);
  };

  public static castList<T extends IIndexable<any>>(data: T[]): Installment[] {
    const installments: Installment[] = [];

    for (const installment of data) {
      installments.push(this.createFrom(installment));
    }

    return installments;
  }

  public static createFrom<T extends IIndexable<any>>(data: T): Installment {
    const installment = new Installment();

    if (data.balance) {
      installment.balance = BalanceSimplified.createFrom(data.balance);

      delete data.balance;
    }

    mapFrom(data, installment);

    return installment;
  }
}
