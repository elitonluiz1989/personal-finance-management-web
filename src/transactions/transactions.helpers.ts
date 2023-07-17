import { arraySum } from "@/app/helpers/helpers";
import { Installment } from "@/installments/installment.model";

export function calculateAmountLimitByList(
  amountLimit: number,
  installments: Installment[]
): number {
  const currentAmount = arraySum(
    installments,
    (installment) => installment.amount
  );

  return calculateAmountLimit(amountLimit, currentAmount);
}

export function calculateAmountLimit(
  amountLimit: number,
  currentAmount: number
): number {
  const amountAvailable = amountLimit - currentAmount;

  if (amountAvailable < 0) return 0;

  return amountAvailable;
}
