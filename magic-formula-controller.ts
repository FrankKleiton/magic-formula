import { RunMagicFormulaUsecase } from "./domain/usecases/run-magic-formula-usecase";
import { CompanyGateway } from "./gateway/company-gateway";
import { RunMagicFormulaPresenter } from "./presenter/run-magic-formula-presenter";

class MagicFormulaController {
  async run() {
    const usecase = new RunMagicFormulaUsecase();
    const gateway = new CompanyGateway();
    const presenter = new RunMagicFormulaPresenter();

    usecase.addGateway(gateway);
    usecase.addPresenter(presenter);

    await usecase.run();

    presenter.getInvokedResponse().forEach((company) => {
      console.log(company.ticket, "   -   ", company.points.total, "\n");
    });
  }
}

new MagicFormulaController().run();
