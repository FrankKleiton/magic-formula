import { Company } from "../domain/entities/company";

class CompanyGatewayFake {
  list() {
    return [
      new Company("eternit3", 1, 40),
      new Company("eternit3", 3, 30),
      new Company("eternit3", 2, 20),
    ];
  }
}

export { CompanyGatewayFake };
