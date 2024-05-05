export class ManagementHelper {
  public static getReference(date: Date): number {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return Number(`${year}${month}`);
  }

  public static getCurrentReference(): number {
    return ManagementHelper.getReference(new Date());
  }

  public static getMonthYearStringFromDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${year}-${month}`;
  }
}
