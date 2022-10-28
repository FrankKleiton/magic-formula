import { Company } from "../entities/company";

export interface Gateway {
  list(): Company[];
}
