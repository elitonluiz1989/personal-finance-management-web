import {
  createDateFromString,
  extractDateFormDateTime,
  isDate,
  isValidDate,
} from "./helpers";

export class Reference {
  private _numberValue = 0;
  private _stringValue = "";

  constructor(private _date: Date) {
    this._numberValue = this.toNumber(this._date);
    this._stringValue = this.toYearMonthDateString();
  }

  get numberValue(): number {
    return this._numberValue;
  }

  get stringValue(): string {
    return this._stringValue;
  }

  get value(): Date {
    return this._date;
  }

  get dateStringValue(): string {
    return this.stringValue + "-01";
  }

  public static CreateFromString(value: string): Reference | undefined {
    const date = createDateFromString(value);

    if (!isDate(date)) {
      return undefined;
    }

    return new Reference(date);
  }

  public equals(date: Date): boolean {
    if (!isValidDate(date)) {
      return false;
    }

    const dateReference = this.toNumber(date);

    return this._numberValue === dateReference;
  }

  public refill(date: Date) {
    this._date = date;
    this._numberValue = this.toNumber(this._date);
    this._stringValue = this.toYearMonthDateString();
  }

  public toYearMonthDateString(): string {
    const year = this._date.getFullYear();
    const month = this.monthHandler(this._date);

    return `${year}-${month}`;
  }

  public toNumber(date: Date): number {
    const year = date.getFullYear();
    const month = this.monthHandler(date);

    return Number(`${year}${month}`);
  }

  public toString(): string {
    return extractDateFormDateTime(this._date);
  }

  private monthHandler(date: Date): string {
    const month = date.getMonth() + 1;

    return month.toString().padStart(2, "0");
  }
}
