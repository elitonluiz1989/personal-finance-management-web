import { Store } from "vuex";
import { State } from "./types";
import { isNullOrUndefined } from "@/app/helpers/helpers";
import { store } from "@/app/store";

export class StoreHelper {
  static get store(): Store<State> {
    return store;
  }

  public static getRaw(getter: string): any {
    return this.store?.getters[getter];
  }

  public static get<TValue>(getter: string, defualtValue: TValue): TValue {
    const value = this.store?.getters[getter];

    if (isNullOrUndefined(value)) return defualtValue;

    return value as TValue;
  }

  public static getWithParameters<TValue, TParam>(
    getter: string,
    param: TParam,
    defualtValue: TValue
  ): TValue {
    if (this.store?.getters[getter] instanceof Function === false)
      return defualtValue;

    const value = this.store.getters[getter](param);

    if (isNullOrUndefined(value)) return defualtValue;

    return value as TValue;
  }

  public static set<TPayload>(setter: string, payload: TPayload): void {
    this.store?.commit(setter, payload);
  }

  public static async dispatch<TPayload>(
    action: string,
    payload?: TPayload
  ): Promise<void> {
    await this.store?.dispatch(action, payload);
  }
}
