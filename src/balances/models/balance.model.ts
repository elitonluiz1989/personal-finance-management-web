import { Installment } from "@/installments/installment.model";
import { mapFrom } from "@/app/helpers/helpers";
import { BalanceTypeEnum } from "../balances-type.enum";
import { User } from "@/users/user.model";

export class Balance {
  public id = 0;
  public userId = 0;
  public name = "";
  public type: BalanceTypeEnum | undefined;
  public typeDescription = "";
  public date: Date = new Date();
  public amount = 0;
  public financed = false;
  public installmentsNumber = 0;
  public closed = false;
  public user: User | undefined;
  public installments: Installment[] = [];

  public static createFrom(data: any): Balance {
    const balance = new Balance();
    const installments: Installment[] = [];

    if (data.user) {
      balance.user = User.createFrom(data.user);

      delete data.user;
    }

    if (data.installments?.length > 0) {
      for (const installment of data.installments) {
        installments.push(Installment.createFrom(installment));
      }

      balance.installments = installments;

      delete data.installments;
    }

    mapFrom(data, balance);

    return balance;
  }
}
