import { Gateway } from "../interfaces/gateway";
import { MagicFormula } from "../entities/magic-formula";
import { Presenter } from "../interfaces/presenter";

class RunMagicFormulaUsecase {
  private _gateway?: Gateway;
  private _presenter?: Presenter;

  async run() {
    if (this._gateway && this._presenter) {
      const result = await this._gateway.list();

      const magicFormula = new MagicFormula(result);

      magicFormula.filterPriceEarnings(2, 25);
      magicFormula.filterReturnOnAsset(10, 100);

      magicFormula.doMagic();

      this._presenter.present(magicFormula.companies);
    }
  }

  addGateway(gateway: Gateway) {
    this._gateway = gateway;
  }

  addPresenter(presenter: Presenter) {
    this._presenter = presenter;
  }
}

export { RunMagicFormulaUsecase };
