export class Currency {
  public value = 0;

  get valueFormatted(): string {
    return this.value.toLocaleString();
  }

  constructor(value: number) {
    this.value = value;
  }
}
