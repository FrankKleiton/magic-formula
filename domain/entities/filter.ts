import { Company } from "./company";

class Filter {
  private _data: Company[];

  constructor(companies: Company[]) {
    this._data = companies;
  }

  filter(aProperty: string, start: number, end: number) {
    this.filterCompanies((c: any) => {
      return c[aProperty] >= start && c[aProperty] <= end;
    });
  }

  private filterCompanies(expression: (c: Company) => boolean) {
    this._data = this._data.filter((c) => expression(c));
  }

  result() {
    return this._data;
  }
}

export { Filter };
