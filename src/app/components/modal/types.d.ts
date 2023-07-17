import { IIndexable } from "@/app/types";

export interface IAppModalFooterProps
  extends IIndexable<boolean | string | null> {
  showSaveButton?: boolean;
  saveText?: string;
  showResetButton?: boolean;
  resetText?: string;
  showDismissButton?: boolean;
  dismissText?: string;
}
