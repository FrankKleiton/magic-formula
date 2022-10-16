class MagicFormula {
  private _companies: any[];

  constructor(companies: any[]) {
    this._companies = companies;
  }

  filterPriceEarnings(start: number, end: number) {
    this._companies = this._companies.filter((c) => {
      return c.priceEarnings >= start && c.priceEarnings <= end;
    });
  }

  filterReturnOnAsset(start: number, end: number) {
    this._companies = this._companies.filter((c) => {
      return c.returnOnAsset >= start && c.returnOnAsset <= end;
    });
  }

  get companies() {
    return this._companies;
  }
}

describe("magic formula", () => {
  test("should apply price earnings filter", () => {
    const data = [
      { ticket: "eternit3", priceEarnings: 2.5, returnOnAsset: 20 },
      { ticket: "tasa3", priceEarnings: 2, returnOnAsset: 20 },
      { ticket: "tasa3", priceEarnings: 5, returnOnAsset: 20 },
    ];
    const formula = new MagicFormula(data);

    formula.filterPriceEarnings(2.5, 4);

    expect(formula.companies).toHaveLength(1);
    expect(formula.companies[0].priceEarnings).toBe(2.5);
  });

  test("should apply return on assetfilter", () => {
    const data = [
      { ticket: "eternit3", priceEarnings: 2.5, returnOnAsset: 20 },
      { ticket: "tasa3", priceEarnings: 2, returnOnAsset: 30 },
      { ticket: "tasa3", priceEarnings: 5, returnOnAsset: 40 },
    ];
    const formula = new MagicFormula(data);

    formula.filterReturnOnAsset(25, 50);

    expect(formula.companies).toHaveLength(2);
    formula.companies.forEach((c) => {
      expect(c.returnOnAsset >= 25).toBeTruthy();
      expect(c.returnOnAsset <= 50).toBeTruthy();
    });
  });
});
