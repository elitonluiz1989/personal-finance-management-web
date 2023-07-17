import { Installment } from "@/installments/installment.model";
import { TransactionStateService as StateService } from "@/transactions/transaction-state.service";
import { TransactionsFormService } from "./transactions-form.service";

export class TransactionsFormEventsService {
  constructor(private _form: TransactionsFormService) {}

  public amountChangeHandler(): void {
    if (this._form.fields.amount.changed) {
      this._form.fields.userId.enable();
      this._form.fields.type.enable();
      this._form.updateAmountValues();
      this._form.validateIfAllowAddInstallments();

      return;
    }

    this._form.updateAmountValues();
    this._form.fields.userId.disable();
    this._form.fields.type.disable();
    this._form.allowAddInstallments.value = false;
  }

  public userChangeHandler(): void {
    this._form.fields.userId.clearValidation();
    this.validateInstallmentSearch();
  }

  public typeChangeHandler(): void {
    this._form.fields.type.clearValidation();
    this.validateInstallmentSearch();
  }

  public validateIfAllowAddInstallments(installments: Installment[]): void {
    this.addingInstallmentsHandler(installments);

    this._form.updateAmountValues();
    this._form.validateIfAllowAddInstallments();
  }

  public closeModalHandler(): void {
    this._form.resetState();
    this._form.enableAll();
    this._form.reset();
    StateService.clearInstallments();
  }

  public async searchInstallments(appendData = false): Promise<void> {
    this.validateInstallmentSearch(appendData);

    await this._form.searchForUserInstallments(appendData);
  }

  public reset(): void {
    this._form.reset();
    this._form.installmentsAmount.value = 0;
    StateService.clearInstallments();
  }

  private addingInstallmentsHandler(installments: Installment[]) {
    if (this._form.fields.installments.value?.length === 0) {
      this._form.fields.installments.model.value = installments;

      return;
    }

    this.removeInstallmentsNotSelected(installments);

    const installmentsToAdd = installments.filter(
      (installment) =>
        !this._form.fields.installments.model.value.includes(installment)
    );

    if (installmentsToAdd.length > 0)
      this._form.fields.installments.model.value.push(...installmentsToAdd);
  }

  private removeInstallmentsNotSelected(installments: Installment[]) {
    this._form.fields.installments.model.value =
      this._form.fields.installments.model.value.filter((installment) =>
        installments.includes(installment)
      );
  }

  private validateInstallmentSearch(appendData = false): void {
    this._form.validateIfAllowAddInstallments();

    if (
      this._form?.fields?.userId?.changed === false ||
      this._form?.fields?.type?.changed === false
    ) {
      StateService.clearInstallments();

      return;
    }

    if (appendData === false) StateService.clearInstallments();
  }
}
