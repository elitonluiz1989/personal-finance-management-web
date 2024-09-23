export class Currency {
  public value = 0;

  private _formatter = Intl.NumberFormat(navigator?.language ?? "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  private _valueFormated = "";

  get valueFormatted(): string {
    return this._valueFormated;
  }

  constructor(value: number) {
    this.value = value;

    this.formatValue(value);
  }

  private formatValue(value: number): void {
    this._valueFormated = this._formatter.format(value);
  }
}
