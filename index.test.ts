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

  test("should apply return on asset filter", () => {
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

  describe("points", () => {
    let data: Company[];

    beforeEach(() => {
      data = [
        new Company("eternit3", 2, 20),
        new Company("tasa4", 3, 10),
        new Company("pmam3", 4, 30),
      ];
    });

    test("should be different then 0", () => {
      const formula = new MagicFormula(data);

      formula.doMagic();

      formula.companies.forEach((c) => {
        expect(c.points.priceEarnings).not.toBe(0);
        expect(c.points.returnOnAsset).not.toBe(0);
      });
    });

    test("companies should have right priceEarnings points", () => {
      const formula = new MagicFormula(data);

      formula.doMagic();

      expect(formula.findByTicket("eternit3")?.points.priceEarnings).toBe(1);
      expect(formula.findByTicket("tasa4")?.points.priceEarnings).toBe(2);
      expect(formula.findByTicket("pmam3")?.points.priceEarnings).toBe(3);
    });

    test("companies should have right returnOnAsset points", () => {
      const formula = new MagicFormula(data);

      formula.doMagic();

      expect(formula.findByTicket("eternit3")?.points.returnOnAsset).toBe(2);
      expect(formula.findByTicket("tasa4")?.points.returnOnAsset).toBe(1);
      expect(formula.findByTicket("pmam3")?.points.returnOnAsset).toBe(3);
    });

    test("companies should have right total points", () => {
      const formula = new MagicFormula(data);

      formula.doMagic();

      expect(formula.findByTicket("eternit3")?.points.total).toBe(3);
      expect(formula.findByTicket("tasa4")?.points.total).toBe(3);
      expect(formula.findByTicket("pmam3")?.points.total).toBe(6);
    });
  });
});

class MagicFormula {
  private _companies: Company[];

  constructor(companies: Company[]) {
    this._companies = companies;
  }

  doMagic() {
    this.addPoints("priceEarnings");
    this.addPoints("returnOnAsset");
  }

  private addPoints(aProperty: string) {
    const key: any = aProperty;

    this._companies = this._companies
      .sort((a: any, b: any) => {
        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;

        return 0;
      })
      .map((company: any, index) => {
        company.points[key] = index + 1;

        return company;
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

class Company {
  private _ticket: string;
  private _priceEarnings: number;
  private _returnOnAsset: number;
  private _points: Points = new Points();

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

  get points() {
    return this._points;
  }
}

class Points {
  private _priceEarnings: number = 0;
  private _returnOnAsset: number = 0;

  get priceEarnings() {
    return this._priceEarnings;
  }

  set priceEarnings(aValue) {
    this._priceEarnings = aValue;
  }

  get returnOnAsset() {
    return this._returnOnAsset;
  }

  set returnOnAsset(aValue) {
    this._returnOnAsset = aValue;
  }

  get total() {
    return this._priceEarnings + this._returnOnAsset;
  }
}
