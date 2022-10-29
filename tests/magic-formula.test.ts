import { Company } from "../domain/entities/company";
import { MagicFormula } from "../domain/entities/magic-formula";

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
      expect(formula.findByTicket("tasa4")?.points.returnOnAsset).toBe(3);
      expect(formula.findByTicket("pmam3")?.points.returnOnAsset).toBe(1);
    });

    test("companies should have right total points", () => {
      const formula = new MagicFormula(data);

      formula.doMagic();

      expect(formula.findByTicket("eternit3")?.points.total).toBe(3);
      expect(formula.findByTicket("tasa4")?.points.total).toBe(5);
      expect(formula.findByTicket("pmam3")?.points.total).toBe(4);
    });

    test("companies should be ordered by total points", () => {
      const data = [
        new Company("eternit3", 1, 40),
        new Company("eternit3", 3, 30),
        new Company("eternit3", 2, 20),
      ];

      const formula = new MagicFormula(data);

      formula.doMagic();

      for (let i = 1; i < formula.companies.length; i++) {
        expect(formula.companies[i].points.total).toBeGreaterThanOrEqual(
          formula.companies[i - 1].points.total
        );
      }
    });
  });
});
