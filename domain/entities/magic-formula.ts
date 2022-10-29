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
    const key: any = aProperty;

    this._companies = this._companies
      .sort((a: any, b: any) => {
        if (asc ? a[key] > b[key] : a[key] < b[key]) return 1;
        if (asc ? a[key] < b[key] : a[key] > b[key]) return -1;

        return 0;
      })
      .map((company: any, index) => {
        company.points[key] = index + 1;

        return company;
      });
  }

  sort(key: string) {
    return this._companies.sort((a: any, b: any) => {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;

      return 0;
    });
  }

  findByTicket(aValue: string) {
    return this.companies.find((c) => c.ticket == aValue);
  }

  filterPriceEarnings(start: number, end: number) {
    this.filterCompanies((c: Company) => {
      return c.priceEarnings >= start && c.priceEarnings <= end;
    });
  }

  filterReturnOnAsset(start: number, end: number) {
    this.filterCompanies((c: Company) => {
      return c.returnOnAsset >= start && c.returnOnAsset <= end;
    });
  }

  private filterCompanies(expression: (c: Company) => boolean) {
    this._companies = this._companies.filter((c) => expression(c));
  }

  get companies() {
    return this._companies;
  }
}

export { MagicFormula };
