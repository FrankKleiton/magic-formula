import { RunMagicFormulaPresenter } from "../presenter/run-magic-formula-presenter";
import { RunMagicFormulaUsecase } from "../domain/usecases/run-magic-formula-usecase";
import { CompanyGatewayFake } from "./company-gateway-fake";

describe("run formula usecase", () => {
  test("should run formula", async () => {
    const usecase = new RunMagicFormulaUsecase();
    const gateway = new CompanyGatewayFake();
    const presenter = new RunMagicFormulaPresenter();

    usecase.addGateway(gateway);
    usecase.addPresenter(presenter);

    await usecase.run();

    expect(presenter.getInvokedResponse().length).toBeGreaterThan(1);

    for (let i = 1; i < presenter.getInvokedResponse().length; i++) {
      const companies = presenter.getInvokedResponse();
      expect(companies[i].points.total).toBeGreaterThanOrEqual(
        companies[i - 1].points.total
      );
    }
  });
});
