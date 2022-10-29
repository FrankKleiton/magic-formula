import { Company } from "../domain/entities/company";
import { Filter } from "../domain/entities/filter";

describe("filter", () => {
  test("should throw exception if property doesn`t exists", () => {
    const filter = new Filter([
      new Company("eternit3", 2.5, 20),
      new Company("tasa3", 2, 30),
      new Company("tasa4", 5, 40),
    ]);

    expect(() => filter.filter("nonexistent", 10, 20)).toThrowError(
      "Invalid property!"
    );
  });

  test("should throw exception if end is smaller then start", () => {
    const filter = new Filter([
      new Company("eternit3", 2.5, 20),
      new Company("tasa3", 2, 30),
      new Company("tasa4", 5, 40),
    ]);

    expect(() => filter.filter("priceEarnings", 10, 2)).toThrowError(
      "Invalid range!"
    );
  });
});
