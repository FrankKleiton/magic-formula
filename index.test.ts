class Company {
  private _ticket: string;
  private _priceEarnings: number;
  private _returnOnAsset: number;

  constructor(ticket: string, priceEarnings: number, returnOnAsset: number) {
    this._ticket = ticket;
    this._priceEarnings = priceEarnings;
    this._returnOnAsset = returnOnAsset;
  }

  get ticket() {
    return this._ticket;
  }

  get priceEarnings() {
    return this._priceEarnings;
  }

  get returnOnAsset() {
    return this._returnOnAsset;
  }
}

class MagicFormula {
  private _companies: Company[];

  constructor(companies: Company[]) {
    this._companies = companies;
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

describe("magic formula", () => {
  test("should apply price earnings filter", () => {
    const data = [
      new Company("eternit3", 2.5, 20),
      new Company("eternit3", 2, 20),
      new Company("eternit3", 5, 20),
    ];
    const formula = new MagicFormula(data);

    formula.filterPriceEarnings(2.5, 4);

    formula.companies.forEach((c) => {
      expect(c.priceEarnings >= 2.5).toBeTruthy();
      expect(c.priceEarnings <= 4).toBeTruthy();
    });
  });

  test("should apply return on assetfilter", () => {
    const data = [
      new Company("eternit3", 2.5, 20),
      new Company("tasa3", 2, 30),
      new Company("tasa4", 5, 40),
    ];
    const formula = new MagicFormula(data);

    formula.filterReturnOnAsset(25, 50);

    formula.companies.forEach((c) => {
      expect(c.returnOnAsset >= 25).toBeTruthy();
      expect(c.returnOnAsset <= 50).toBeTruthy();
    });
  });
});
