import { Gateway } from "../interfaces/gateway";
import { MagicFormula } from "../entities/magic-formula";
import { Presenter } from "../interfaces/presenter";
import { Filter } from "../entities/filter";

class RunMagicFormulaUsecase {
  private _gateway?: Gateway;
  private _presenter?: Presenter;

  async run() {
    if (this._gateway && this._presenter) {
      const result = await this._gateway.list();

      const filter = new Filter(result);
      filter.filter("priceEarnings", 2, 25);
      filter.filter("returnOnAsset", 10, 100);

      const magicFormula = new MagicFormula(filter.result());

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
