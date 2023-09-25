import { IAppModalFooterProps } from "@/app/components/modal/types";
import { arraySum } from "@/app/helpers/helpers";
import { FormService } from "@/app/services/form/form.service";
import { ValidationService } from "@/app/services/validation/validation.service";
import { StoreHelper } from "@/app/store/store.helper";
import { Installment } from "@/installments/installment.model";
import * as TransactionType from "@/transactions/enums/transaction-type.enum";
import { TransactionFormFields } from "@/transactions/models/transaction-form-fields.model";
import { TransactionStateService as StateService } from "@/transactions/transaction-state.service";
import {
  TransactionsFormStrings as FormStrings,
  TransactionsStoreStrings as StoreStrings,
} from "@/transactions/transactions.strings";
import { User } from "@/users/user.model";
import { ref } from "vue";

export class TransactionsFormService extends FormService<TransactionFormFields> {
  public show = ref(false);
  public modalTitle = ref(FormStrings.insertTitle);
  public editMode = ref(false);
  public users = ref<User[]>([]);
  public allowAddInstallments = ref(false);
  public amountLimit = ref(0);
  public installmentsAmount = ref(0);
  public transactionTypes = TransactionType.toKeyValue();

  private _modalFooterConfig!: IAppModalFooterProps;
  private _page = 1;

  constructor() {
    super();

    this.disableComboxes();
  }

  get modalFooterConfig(): IAppModalFooterProps {
    return this._modalFooterConfig;
  }

  public getModalTitle(): string {
    return this.editMode.value
      ? FormStrings.editTitle
      : FormStrings.insertTitle;
  }

  public resetState(): void {
    this.show.value = false;
    this.editMode.value = false;
    this.modalTitle.value = FormStrings.insertTitle;
    this.installmentsAmount.value = 0;
  }

  public updateAmountValues(): void {
    this.installmentsAmount.value = arraySum(
      this._formFields.installments.model.value,
      (installment: Installment) => installment.amount
    );
    this.amountLimit.value =
      this._formFields.amount.value - this.installmentsAmount.value;
  }

  public validateIfAllowAddInstallments(): void {
    this.allowAddInstallments.value =
      this._formFields.amount.changed &&
      this._formFields.userId.changed &&
      this._formFields.type.changed &&
      this.amountLimit.value > 0;
  }

  public async searchForUserInstallments(appendData: boolean): Promise<void> {
    this._page = appendData ? this._page + 1 : 1;

    await StateService.listInstallments(this._formFields, this._page);
  }

  public async populateUsers(): Promise<void> {
    this.users.value = await StateService.getUsers();
  }

  public async fillForByTransactionId(id: number): Promise<void> {
    const transaction = await StateService.findTransaction(id);

    if (!transaction) {
      alert(FormStrings.transactionNotFound);

      return;
    }

    this._formFields.populate(transaction);
    this.editMode.value = true;
  }

  public setBeforeSubmitHandler(handler: () => void): void {
    this._beforeSubmitHandler = handler;
  }

  public override async submit(): Promise<void> {
    this.validate();

    if (this.invalid) return;

    const dto = this._formFields.createStoreDto();

    await StoreHelper.dispatch(StoreStrings.actionAdd.namespaced, dto);

    if (this._beforeSubmitHandler instanceof Function)
      this._beforeSubmitHandler();
  }

  protected override initialize(): void {
    this._modalFooterConfig = { show: true };
    this._formFields = new TransactionFormFields();
    this._validateService = new ValidationService(this._formFields);
  }

  private disableComboxes() {
    this._formFields.userId.disable();
    this._formFields.type.disable();
  }
}
