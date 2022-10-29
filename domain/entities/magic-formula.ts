import { Company } from "./company";

class MagicFormula {
  private _companies: Company[];

  constructor(companies: Company[]) {
    this._companies = companies;
  }

  doMagic() {
    this.addPoints("priceEarnings");
    this.addPoints("returnOnAsset", false);

    this.sortByTotal();
  }

  private sortByTotal() {
    this._companies = this._companies.sort((a: Company, b: Company) => {
      if (a.points.total > b.points.total) return 1;
      if (a.points.total < b.points.total) return -1;

      return 0;
    });
  }

  private addPoints(aProperty: string, asc: boolean = true) {
    this._companies = this._companies
      .sort((a: any, b: any) => {
        if (asc ? a[aProperty] > b[aProperty] : a[aProperty] < b[aProperty])
          return 1;
        if (asc ? a[aProperty] < b[aProperty] : a[aProperty] > b[aProperty])
          return -1;

        return 0;
      })
      .map((company: any, index) => {
        company.points[aProperty] = index + 1;

        return company;
      });
  }

  findByTicket(aValue: string) {
    return this.companies.find((c) => c.ticket == aValue);
  }

  get companies() {
    return this._companies;
  }
}

export { MagicFormula };
