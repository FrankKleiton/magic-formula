import { Company } from "../entities/company";

interface Presenter {
  getInvokedResponse(): Company[];
  present(result: Company[]): void;
}

export { Presenter };
