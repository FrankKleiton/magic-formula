import { Points } from "./points";

class Company {
  private _ticket: string;
  private _priceEarnings: number;
  private _returnOnAsset: number;
  private _points: Points = new Points();

  constructor(ticket: string, priceEarnings: number, returnOnAsset: number) {
    this._ticket = ticket;
    this._priceEarnings = priceEarnings;
    this._returnOnAsset = returnOnAsset;
  }

  get ticket() {
    return this._ticket;
  }

  get priceEarnings() {
    return this._priceEarnings;
  }

  get returnOnAsset() {
    return this._returnOnAsset;
  }

  get points() {
    return this._points;
  }
}

export { Company };
