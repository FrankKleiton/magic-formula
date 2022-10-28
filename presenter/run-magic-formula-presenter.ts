import { Company } from "../domain/entities/company";
import { Presenter } from "../domain/interfaces/presenter";

class RunMagicFormulaPresenter implements Presenter {
  private response?: Company[];

  getInvokedResponse() {
    return this.response || [];
  }

  present(result: Company[]) {
    this.response = result;
  }
}

export { RunMagicFormulaPresenter };
