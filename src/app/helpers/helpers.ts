import { IIndexable, StoreResourcesItem } from "../types";

function hasKey<T extends object>(obj: T, key: PropertyKey): key is keyof T {
  return key in obj;
}

export function mapTo<
  TSource extends IIndexable<any>,
  TTarget extends IIndexable<any>
>(from: TSource, to: TTarget) {
  if (isNullOrUndefined(from) || isNullOrUndefined(to)) return;

  for (const key in from) {
    if (hasKey(to, key) === false) return;

    to[key] = from[key] as any;
  }
}

export function mapFrom<
  TSource extends IIndexable<any>,
  TTarget extends IIndexable<any>
>(source: TSource, target: TTarget) {
  if (isNullOrUndefined(source) || isNullOrUndefined(target)) return;

  for (const key in source) {
    if (hasKey(target, key) === false) continue;

    if (Array.isArray(target[key])) {
      (target[key] as any) = source[key];

      continue;
    }

    if (isDate(target[key])) {
      (target[key] as Date) = new Date(String(source[key]));

      continue;
    }

    if (isBoolean(target[key])) {
      (target[key] as boolean) = source[key] as boolean;

      continue;
    }

    if (isNumber(target[key])) {
      (target[key] as number) = Number(String(source[key]));

      continue;
    }

    (target[key] as any) = source[key];
  }
}

export function isNullOrUndefined(value: any): boolean {
  return value === undefined || value === null;
}

export function isNullOrWhiteSpace(value: string | null | undefined): boolean {
  return isNullOrUndefined(value) || value?.trim()?.length === 0;
}

export function env(key: string, defaultValue = ""): string {
  return process.env[key] ?? defaultValue;
}

export function vueEnv(key: string, defaultValue = ""): string {
  return env(`VUE_APP_${key}`, defaultValue);
}

export function createStoreResourceItem(
  namespace: string,
  value: string
): StoreResourcesItem {
  return {
    value: value,
    namespaced: `${namespace}/${value}`,
  };
}

export function isString<T>(value: T): boolean {
  return typeof value === "string";
}

export function isNumber<T>(value: T): boolean {
  return typeof value === "number" && isNaN(value) === false;
}

export function isBoolean<T>(value: T): boolean {
  return typeof value === "boolean";
}

export function isDate<T>(value: T) {
  if (value instanceof Date === false) return false;

  const date = new Date(String(value));

  return value && isValidDate(date);
}

export function isValidDate(date: Date) {
  return isValidNumber(date.getDate());
}

export function isValidNumber<T extends number>(value: T): boolean {
  return isNaN(value) === false;
}

export function getEventTarget<T extends EventTarget>(evt: Event): T {
  const { target } = evt;
  return target as T;
}

export function extractDateFormDateTime(
  date: Date | string | undefined
): string {
  if (!date) return "";

  const rawDate: Date = isString(date) ? new Date(date) : (date as Date);

  return rawDate.toISOString().split("T")[0];
}

export function createDateFromString(value: string): Date {
  const valueHandled = value.includes("T") ? value : `${value}T00:00:00`;

  return new Date(valueHandled);
}

export function queryParamsParse<TRequest>(request: TRequest): string {
  let key: keyof typeof request;
  let param: TRequest[keyof TRequest];
  const params: string[] = [];

  for (key in request) {
    param = request[key];

    if (Array.isArray(param)) {
      for (const value of param) {
        params.push(`${key.toString()}=${value}`);
      }

      continue;
    }

    params.push(`${key.toString()}=${param}`);
  }

  return `?${params.join("&")}`;
}

export function arraySum<T>(arr: T[], valorToAggrate: (item: T) => number) {
  return arr.reduce((agg, item) => agg + valorToAggrate(item), 0);
}
