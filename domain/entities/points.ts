class Points {
  private _priceEarnings: number = 0;
  private _returnOnAsset: number = 0;

  get priceEarnings() {
    return this._priceEarnings;
  }

  set priceEarnings(aValue) {
    this._priceEarnings = aValue;
  }

  get returnOnAsset() {
    return this._returnOnAsset;
  }

  set returnOnAsset(aValue) {
    this._returnOnAsset = aValue;
  }

  get total() {
    return this._priceEarnings + this._returnOnAsset;
  }
}

export { Points };
